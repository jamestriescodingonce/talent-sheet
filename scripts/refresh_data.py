#!/usr/bin/env python3
"""Regenerate the data embedded in index.html from Supabase (public read via the anon key).

Usage:  python3 scripts/refresh_data.py [--check]

Rebuilds: const DATA (rows [last field = when the deal row was added, null for the bulk import], ind, desc, dom), DATA.hq, DATA.fnd (company founders), const ADDED, const LEAGUE.
Rules baked in (from product feedback):
  - only sports figures are shown (talent categories Athlete, Coach, Executive; Magnus Carlsen kept)
  - palmares.vc / pitchbook.com sources are never shown
  - industry renames: Sports Equipment -> Sports Tech, Clean Energy -> Energy
DATA.img (avatars) and LOGOS/TEAMLOGO are not touched here; see scripts/avatar.py and publish_avatars.py.
"""
import json, re, sys, urllib.request, urllib.parse
BASE = 'https://uuvevybaeiscpmprfpgw.supabase.co/rest/v1/'
ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1dmV2eWJhZWlzY3BtcHJmcGd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2NDY4NTUsImV4cCI6MjEwNjIyMjg1NX0.wz5-cd-olMCxroCiDGp_SKD1JwOzQkfdO1g_9DWf-ic'  # public anon key
KEEP_CATS = {'Athlete', 'Coach', 'Executive'}; KEEP_NAMES = {'Magnus Carlsen'}
BAD = re.compile(r'palmares\.vc|pitchbook\.com|bookingagentinfo', re.I)
REN = {'Sports Equipment': 'Sports Tech', 'Clean Energy': 'Energy'}
CUTOFF = '2026-10-05T18:21'  # bulk imports before this are not individually dated

def get(path):
    out, off = [], 0
    while True:
        req = urllib.request.Request(BASE + path, headers={'apikey': ANON, 'Authorization': 'Bearer ' + ANON, 'Range-Unit': 'items', 'Range': f'{off}-{off+999}'})
        r = json.load(urllib.request.urlopen(req, timeout=60)); out += r
        if len(r) < 1000: return out
        off += 1000

def domain(u):
    if not u: return None
    h = urllib.parse.urlparse(u if '//' in u else '//' + u).netloc.lower()
    return re.sub(r'^www\.', '', h) or None

def build():
    inv = get('investments?select=created_at,investment_date,deal_type,amount_invested,round_total_raised,post_money_valuation,amount_precision,source_url,verification,status,talent(name,sport:sports(name),category:categories(name)),company:companies!investments_company_id_fkey(name,website_url,description,hq,created_at,company_industries(industries(name))),round:rounds(name)&order=investment_date.desc.nullslast,id')
    rows, cos, league = [], {}, {}
    for i in inv:
        t, c = i['talent'], i['company']
        if (t.get('category') or {}).get('name') not in KEEP_CATS and t['name'] not in KEEP_NAMES: continue
        src = i['source_url']; src = None if src and BAD.search(src) else src
        rows.append([t['name'], c['name'], i['investment_date'], i['deal_type'], i['amount_invested'], i['round_total_raised'], i['post_money_valuation'], i['amount_precision'], (i.get('round') or {}).get('name'), src, i['verification'], i['created_at'][:16] if i['created_at'] >= CUTOFF else None])
        cos[c['name']] = c
        if (t.get('sport') or {}).get('name'): league[t['name']] = t['sport']['name']
    ind, desc, dom, hq = {}, {}, {}, {}
    for n, c in cos.items():
        inds = []
        for ci in c.get('company_industries') or []:
            x = REN.get(ci['industries']['name'], ci['industries']['name'])
            if x not in inds: inds.append(x)
        if inds: ind[n] = sorted(inds)
        if c.get('description'): desc[n] = c['description']
        if domain(c.get('website_url')): dom[n] = domain(c['website_url'])
        if c.get('hq'): hq[n] = c['hq']
    added = {n: c['created_at'][:16] for n, c in cos.items() if c['created_at'] >= CUTOFF}
    # founders per company (company_founders table; only companies that are shown on the site)
    fnd = {}
    for f in get('company_founders?select=name,title,company:companies(name)&order=title.desc,name'):
        co = (f.get('company') or {}).get('name')
        if co in cos: fnd.setdefault(co, []).append([f['name'], f.get('title')])
    return rows, ind, desc, dom, hq, added, league, fnd

def main():
    P = 'index.html'; s = open(P, encoding='utf8').read()
    rows, ind, desc, dom, hq, added, league, fnd = build()
    dump = lambda x: json.dumps(x, ensure_ascii=False, separators=(',', ':'))
    def sub(prefix, new):
        nonlocal s
        pat = re.compile(r'^' + re.escape(prefix) + r'.*;$', re.M)
        assert len(pat.findall(s)) == 1, prefix
        s = pat.sub(lambda m: new, s, count=1)
    sub('const DATA={', 'const DATA=' + dump({'rows': rows, 'ind': ind, 'desc': desc, 'dom': dom}) + ';')
    sub('DATA.hq={', 'DATA.hq=' + dump(hq) + ';')
    sub('DATA.fnd={', 'DATA.fnd=' + dump(fnd) + ';')
    sub('const ADDED={', 'const ADDED=' + dump(added) + ';')
    sub('const LEAGUE={', 'const LEAGUE=' + dump(league) + ';')
    print(f'{len(rows)} deal rows, {len({r[1] for r in rows})} companies, {len(desc)} bios, {len(hq)} HQs, {sum(len(v) for v in fnd.values())} founders across {len(fnd)} companies')
    if '--check' not in sys.argv:
        open(P, 'w', encoding='utf8').write(s)
        a = 'artifacts/investments-table.html'
        open(a, 'w', encoding='utf8').write(s); print('wrote', P, 'and', a)

if __name__ == '__main__': main()
