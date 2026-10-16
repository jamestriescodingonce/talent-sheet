#!/usr/bin/env python3
"""Turn candidate news stories into data/news.json entries with a 480x270 WebP thumbnail.

Usage: python3 scripts/news_thumb.py candidates.json
candidates.json: [{title, outlet, url, date (YYYY-MM-DD), talent, company}, ...]
For each story: fetch the page, read og:image / twitter:image, crop to 16:9, save assets/news/<date>-<hash>.webp,
and append to data/news.json (skips URLs already there). Stories whose page or image cannot be fetched are
reported and skipped (many outlets 403 scripted fetches; use another outlet's coverage instead).
"""
import sys, json, re, io, hashlib, urllib.request, urllib.parse, html
from PIL import Image
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15', 'Accept-Language': 'en-US,en;q=0.9'}
def get(u, binary=False):
    return urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=25).read()
def og(page, base):
    for pat in (r'<meta[^>]+property=["\']og:image(?::secure_url)?["\'][^>]+content=["\']([^"\']+)', r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image', r'<meta[^>]+name=["\']twitter:image["\'][^>]+content=["\']([^"\']+)'):
        m = re.search(pat, page, re.I)
        if m: return urllib.parse.urljoin(base, html.unescape(m.group(1)))
def main():
    cands = json.load(open(sys.argv[1], encoding='utf8'))
    P = 'data/news.json'; items = json.load(open(P, encoding='utf8')); have = {x['url'] for x in items}
    added = 0
    for c in cands:
        if c['url'] in have: continue
        try:
            page = get(c['url']).decode('utf8', 'ignore'); iu = og(page, c['url'])
            if not iu: print('no og:image', c['url']); continue
            im = Image.open(io.BytesIO(get(iu))).convert('RGB')
        except Exception as e:
            print('skip', c['url'], str(e)[:60]); continue
        w, h = im.size; t = 16 / 9
        if w / h > t: nw = int(h * t); im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
        else: nh = int(w / t); im = im.crop((0, (h - nh) // 3, w, (h - nh) // 3 + nh))
        im = im.resize((480, 270), Image.LANCZOS)
        name = f"assets/news/{c['date']}-{hashlib.md5(c['url'].encode()).hexdigest()[:6]}.webp"
        im.save(name, 'WEBP', quality=82)
        items.append({'title': c['title'], 'outlet': c['outlet'], 'url': c['url'], 'img': name, 'date': c['date'], 'talent': c['talent'], 'company': c.get('company', '')})
        have.add(c['url']); added += 1
    json.dump(items, open(P, 'w', encoding='utf8'), indent=1, ensure_ascii=False)
    print('added', added, 'of', len(cands))
main()
