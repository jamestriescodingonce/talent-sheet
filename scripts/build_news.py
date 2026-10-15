#!/usr/bin/env python3
"""Embed data/news.json into index.html as `const NEWS=[...]` (and copy to artifacts/).

Each item: title, outlet, url, img (path under assets/news/), date (YYYY-MM-DD), talent, company.
Thumbnails are 480x270 WebP crops of the article's own og:image (see CLAUDE.md, News section).
Usage: python3 scripts/build_news.py
"""
import json, re
s = open('index.html', encoding='utf8').read()
items = sorted(json.load(open('data/news.json', encoding='utf8')), key=lambda x: x['date'], reverse=True)
line = 'const NEWS=' + json.dumps(items, ensure_ascii=False, separators=(',', ':')) + ';'
if re.search(r'^const NEWS=.*;$', s, re.M):
    s = re.sub(r'^const NEWS=.*;$', lambda m: line, s, count=1, flags=re.M)
else:
    s = re.sub(r'^(const LEAGUE=.*;)$', lambda m: m.group(1) + '\n' + line, s, count=1, flags=re.M)
open('index.html', 'w', encoding='utf8').write(s); open('artifacts/investments-table.html', 'w', encoding='utf8').write(s)
print(len(items), 'stories embedded')
