import sys, io, json, base64, hashlib, subprocess, urllib.request
from PIL import Image
BASE='https://uuvevybaeiscpmprfpgw.supabase.co'
ANON='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1dmV2eWJhZWlzY3BtcHJmcGd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2NDY4NTUsImV4cCI6MjEwNjIyMjg1NX0.wz5-cd-olMCxroCiDGp_SKD1JwOzQkfdO1g_9DWf-ic'
BG=(220,218,242)  # pale lavender, matches the Mbappe reference
def load(src):
    if src.startswith('http'):
        req=urllib.request.Request(src,headers={'User-Agent':'Mozilla/5.0'})
        return Image.open(io.BytesIO(urllib.request.urlopen(req,timeout=30).read()))
    return Image.open(src)
def process(im, size=512, zoom=1.0):
    im=im.convert('RGBA')
    if im.getchannel('A').getextrema()[0] < 250:   # cutout with transparency -> studio background
        bg=Image.new('RGBA',im.size,BG+(255,)); bg.alpha_composite(im); im=bg
    im=im.convert('RGB'); w,h=im.size
    if h>1.2*w:                                      # tall full-torso portrait -> head-and-shoulders
        cw=int(w*0.78); x0=(w-cw)//2; im=im.crop((x0,0,x0+cw,cw)); w,h=im.size
    s=min(w,h)
    if zoom<1: s=int(s*zoom)
    im=im.crop(((w-s)//2,0,(w-s)//2+s,s))           # square, keep top (heads)
    return im.resize((size,size),Image.LANCZOS)
def upload(im, slug):
    buf=io.BytesIO(); im.save(buf,'WEBP',quality=88); data=buf.getvalue()
    body=json.dumps({'path':slug+'.webp','contentType':'image/webp','b64':base64.b64encode(data).decode(),'sha256':hashlib.sha256(data).hexdigest()}).encode()
    req=urllib.request.Request(BASE+'/functions/v1/store-avatar',data=body,headers={'Authorization':'Bearer '+ANON,'apikey':ANON,'Content-Type':'application/json'})
    r=json.loads(urllib.request.urlopen(req,timeout=60).read()); assert r.get('ok'),r
    return f'{BASE}/storage/v1/object/public/talent-avatars/{slug}.webp', len(data)
if __name__=='__main__':
    src,slug=sys.argv[1:3]
    im=process(load(src)); im.save(f'out_{slug}.png')
    print(*upload(im,slug) if len(sys.argv)>3 and sys.argv[3]=='up' else ('dry',))
