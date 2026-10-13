#!/usr/bin/env python3
"""Rebuild DATA.img (athlete photo URLs) and DATA.credits (Wikimedia photo credits) in index.html
from the talent table in Supabase (public read). Usage: python3 scripts/publish_avatars.py"""
import json, re, urllib.request
BASE = 'https://uuvevybaeiscpmprfpgw.supabase.co/rest/v1/'
ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1dmV2eWJhZWlzY3BtcHJmcGd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2NDY4NTUsImV4cCI6MjEwNjIyMjg1NX0.wz5-cd-olMCxroCiDGp_SKD1JwOzQkfdO1g_9DWf-ic'  # public anon key
def get(path):
    out, off = [], 0
    while True:
        r = json.load(urllib.request.urlopen(urllib.request.Request(BASE + path, headers={'apikey': ANON, 'Authorization': 'Bearer ' + ANON, 'Range-Unit': 'items', 'Range': f'{off}-{off+999}'}), timeout=60)); out += r
        if len(r) < 1000: return out
        off += 1000
rows = get('talent?select=name,image_url,image_license,image_credit,image_source_url&image_url=not.is.null&order=name')
img = {r['name']: r['image_url'] for r in rows}
credits = {r['name']: {'artist': r['image_credit'], 'license': r['image_license'], 'page': r['image_source_url']}
           for r in rows if re.search(r'^CC |^Public domain|^CC0', r['image_license'] or '') and 'commons.wikimedia.org' in (r['image_source_url'] or '')}
dump = lambda x: json.dumps(x, ensure_ascii=False, separators=(',', ':'))
s = open('index.html', encoding='utf8').read()
if True:
    for prefix, val in (('DATA.img=', img), ('DATA.credits=', credits)):
        pat = re.compile(r'^' + re.escape(prefix) + r'.*;$', re.M); assert len(pat.findall(s)) == 1, prefix
        s = pat.sub(lambda m: prefix + dump(val) + ';', s, count=1)
    open('index.html', 'w', encoding='utf8').write(s)
    open('artifacts/investments-table.html', 'w', encoding='utf8').write(s)
print(len(img), 'photos,', len(credits), 'credited Wikimedia photos')
