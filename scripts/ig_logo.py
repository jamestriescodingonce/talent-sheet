#!/usr/bin/env python3
"""Pull company logos from Instagram profile pictures into TEAMLOGO (company name -> data URI).

Usage: python3 scripts/ig_logo.py            find handles for companies still showing a monogram, verify, add
       python3 scripts/ig_logo.py "Company=handle" ...   force specific handles

Uses the public web_profile_info endpoint on i.instagram.com (needs the x-ig-app-id header, no login).
A guessed handle is accepted only when the profile's full name shares a word with the company name
and the account is non-trivial; website homepages are scraped for an instagram.com link first.
Instagram rate-limits: the script sleeps between calls and stops on repeated failures.
"""
import base64, io, json, re, sys, time, urllib.request
from PIL import Image
P = 'index.html'
H = {'User-Agent': 'Mozilla/5.0', 'x-ig-app-id': '936619743392459'}
def get(u, h=H, t=20):
    return urllib.request.urlopen(urllib.request.Request(u, headers=h), timeout=t).read()
def profile(handle):
    d = json.loads(get(f'https://i.instagram.com/api/v1/users/web_profile_info/?username={handle}'))['data']['user']
    return d
def words(s): return {w for w in re.findall(r'[a-z0-9]{3,}', s.lower()) if w not in ('the','fc','club','team','sports','inc','llc','official')}
def site_handle(url):
    try: html = get(url, {'User-Agent': 'Mozilla/5.0'}, 12).decode('utf8', 'ignore')
    except Exception: return None
    m = re.search(r'instagram\.com/([A-Za-z0-9._]{2,30})/?["\'?]', html)
    return m.group(1) if m and m.group(1) not in ('p', 'explore', 'accounts', 'reel') else None
def guesses(co):
    base = re.sub(r'\([^)]*\)', '', co); base = re.sub(r'[^A-Za-z0-9 ]', '', base).lower().split()
    j = ''.join(base)
    return [j, j + 'official', '_'.join(base), '.'.join(base), 'the' + j]
def main():
    s = open(P, encoding='utf8').read()
    m = re.search(r'^const TEAMLOGO=(\{.*\});$', s, re.M); tl = json.loads(m.group(1))
    logos = json.loads(re.search(r'^const LOGOS=(\{.*\});$', s, re.M).group(1))
    nol = set(json.loads(re.search(r'^const NOLOGO=new Set\((\[.*\])\);', s, re.M).group(1)))
    data = json.loads(re.search(r'^const DATA=(\{.*\});$', s, re.M).group(1))
    dom = data['dom']; cos = sorted({r[1] for r in data['rows']})
    web = {}
    try:
        web = json.loads(open('/tmp/_web.json').read())
    except Exception: pass
    force = dict(a.split('=', 1) for a in sys.argv[1:])
    todo = list(force) or [c for c in cos if c not in tl and (c in nol or not (dom.get(c) and dom[c] in logos))]
    added, fails = [], 0
    for co in todo:
        cand = [force[co]] if co in force else []
        if not cand:
            d = dom.get(co)
            h = site_handle('https://' + d) if d else None
            cand = ([h] if h else []) + guesses(co)
        for h in cand:
            try:
                u = profile(h); time.sleep(1.2); fails = 0
            except Exception as e:
                fails += 1; time.sleep(1.2)
                if fails > 12: print('too many failures, stopping'); todo = []; break
                continue
            ok = co in force or (words(u.get('full_name') or '') & words(co))
            if not ok: continue
            b = get(u['profile_pic_url_hd'] or u['profile_pic_url'], {'User-Agent': 'Mozilla/5.0'})
            im = Image.open(io.BytesIO(b)).convert('RGB'); im.thumbnail((128, 128), Image.LANCZOS)
            o = io.BytesIO(); im.save(o, 'PNG', optimize=True)
            tl[co] = 'data:image/png;base64,' + base64.b64encode(o.getvalue()).decode(); added.append((co, h)); print('ok', co, h); break
        if not todo: break
    s = s[:m.start()] + 'const TEAMLOGO=' + json.dumps(tl, ensure_ascii=False, separators=(',', ':')) + ';' + s[m.end():]
    open(P, 'w', encoding='utf8').write(s); open('artifacts/investments-table.html', 'w', encoding='utf8').write(s)
    print('added', len(added), 'of', len(todo))
if __name__ == '__main__': main()
