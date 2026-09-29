#!/usr/bin/env python3
"""Build design/Investments.html from Investments.src.html.

Data comes from Supabase only: design/investments-data.json is the output of the
query in that file's header comment (rows, dom, ind, desc, league). Logo image
maps live in investments-logos.json. Refresh the data file from the database,
then run this script.
"""
import json, pathlib
d = pathlib.Path(__file__).parent
data = json.load(open(d / "investments-data.json"))
logos = json.load(open(d / "investments-logos.json"))
doms = set(data["dom"].values())
src = (d / "Investments.src.html").read_text()
dump = lambda v: json.dumps(v, ensure_ascii=False, separators=(",", ":"))
out = (src.replace("__DATA__", dump({k: data[k] for k in ("rows", "dom", "ind", "desc")}))
          .replace("__LOGOS__", dump({k: v for k, v in logos["logos"].items() if k in doms}))
          .replace("__LEAGUE__", dump(data["league"]))
          .replace("__LGLOGOS__", dump(logos["lgLogos"])))
(d / "Investments.html").write_text(out)
print("built Investments.html:", len(data["rows"]), "rows,", len(doms), "domains")
