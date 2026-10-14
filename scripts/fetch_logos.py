#!/usr/bin/env python3
"""Fill gaps in the LOGOS map (domain -> data URI) in index.html.

Usage: python3 scripts/fetch_logos.py [domain ...]   (no args = every DATA.dom domain missing from LOGOS)

Source: Google's favicon service at 128px (Logo.dev needs a token we do not keep in the repo).
Generic "globe" placeholders are detected by comparing against the response for a bogus domain.
"""
import base64, hashlib, json, re, sys, urllib.request
P = 'index.html'
def fetch(d):
    try:
        r = urllib.request.urlopen(urllib.request.Request(f'https://www.google.com/s2/favicons?domain={d}&sz=128', headers={'User-Agent': 'Mozilla/5.0'}), timeout=20)
    except urllib.error.HTTPError as e:  # 404 = no icon; body is the generic globe
        return e.read()
    return r.read()
def main():
    s = open(P, encoding='utf8').read()
    data = json.loads(re.search(r'^const DATA=(\{.*\});$', s, re.M).group(1))
    m = re.search(r'^const LOGOS=(\{.*\});$', s, re.M); logos = json.loads(m.group(1))
    generic = hashlib.md5(fetch('zzz-not-a-real-domain-xyz.com')).hexdigest()
    todo = sys.argv[1:] or sorted({d for d in data['dom'].values() if d not in logos})
    added = []
    for d in todo:
        try: b = fetch(d)
        except Exception as e: print('fail', d, e); continue
        if hashlib.md5(b).hexdigest() == generic or len(b) < 700:  # fall back to the site's own touch icon
            try: b = urllib.request.urlopen(urllib.request.Request(f'https://{d}/apple-touch-icon.png', headers={'User-Agent': 'Mozilla/5.0'}), timeout=15).read()
            except Exception: print('generic', d); continue
        logos[d] = 'data:image/png;base64,' + base64.b64encode(b).decode(); added.append(d)
    s = s[:m.start()] + 'const LOGOS=' + json.dumps(logos, ensure_ascii=False, separators=(',', ':')) + ';' + s[m.end():]
    open(P, 'w', encoding='utf8').write(s); open('artifacts/investments-table.html', 'w', encoding='utf8').write(s)
    print('added', len(added), added)
if __name__ == '__main__': main()
