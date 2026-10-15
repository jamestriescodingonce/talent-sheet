import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { MeshGradient, LiquidMetal } from "@paper-design/shaders-react";

const fill = { position: "absolute", inset: 0, width: "100%", height: "100%" };
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const sp = (v) => (reduced ? 0 : v);

const rows = [
  { co: "Agentiq", ind: "Fintech", talent: ["HD", "RC"], names: "Hunter Dobbins, Ro…", more: 2, type: "Partnership", ver: true, site: "", bg: "#2a2310", fg: "#e8b931" },
  { co: "LOVB Miami", ind: "Pro Sports Team", talent: ["SR", "LL"], names: "Sha'Carri Richardson, Li…", type: "Ownership", ver: false, site: "lovb.com", bg: "#f4d9d2", fg: "#111" },
  { co: "Flow Engineering", ind: "Software & Technology", talent: ["NR"], names: "Nico Rosberg", type: "Investment", ver: true, site: "flowengineering.com", bg: "#f3f3f3", fg: "#111" },
  { co: "Snag", ind: "Real Estate", talent: ["SS"], names: "Sloane Stephens", type: "Investment", ver: false, site: "snagsublets.com", bg: "#f2742b", fg: "#fff" },
  { co: "Kickback Soccer Media", ind: "Media & Entertainment", talent: ["AB"], names: "Alejandro Bedoya", type: "Investment", ver: false, site: "kickbacksoccer.com", bg: "#fafafa", fg: "#111" },
  { co: "Mike's Red Tacos", ind: "Food & Beverage", talent: ["LJ"], names: "LeBron James", type: "Investment", ver: true, site: "mikesredtacos.com", bg: "#fafafa", fg: "#d3261f" },
  { co: "Jack Archer", ind: "Apparel & Footwear", talent: ["AR"], names: "Alex Rodriguez", type: "Investment", ver: true, site: "jackarcher.com", bg: "#fafafa", fg: "#111" },
  { co: "Athletic Brewing", ind: "Food & Beverage", talent: ["DP", "DM"], names: "Dak Prescott, Drake Ma…", type: "Investment", ver: true, site: "athleticbrewing.com", bg: "#fafafa", fg: "#123c7a" },
  { co: "Cleveland Guardians", ind: "Pro Sports Team", talent: ["DW"], names: "Denzel Ward", type: "Ownership", ver: true, site: "mlb.com", bg: "#fafafa", fg: "#c8102e" },
];
const dot = { Partnership: "#f4be4a", Ownership: "#5b9cf6", Investment: "#58ca9d" };
const nav = [["Talent", "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  ["Deals", "M4 4h16v16H4zM8 12l3 3 5-6"], ["Companies", "M4 21V4h10v17M14 9h6v12M8 8h2M8 12h2M8 16h2"],
  ["Industries", "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"], ["News", "M4 4h16v16H4zM8 9h8M8 13h8"], ["FAQ", "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"]];
const Icon = ({ d }) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>);

function Row({ r }) {
  return (
    <tr>
      <td><div className="co"><span className="plus">+</span>
        <span className="logo" style={{ background: r.bg, color: r.fg }}>{r.co[0]}</span>{r.co}</div></td>
      <td className="ind">{r.ind}</td>
      <td><div className="tal"><span className="avs">{r.talent.map((t) => <i key={t}>{t}</i>)}</span>
        <span className="nm">{r.names}</span>{r.more ? <span className="more">+{r.more}</span> : null}</div></td>
      <td><span className="type"><b style={{ background: dot[r.type] }} />{r.type}</span></td>
      <td className={r.ver ? "ver ok" : "ver"}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {r.ver ? <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8 12l3 3 5-6" /> : <path d="M6 3h9l4 4v14H6zM9 12h7M9 16h7" />}</svg>
        {r.ver ? "Verified" : "Reported"}</td>
      <td className="site">{r.site ? <>{r.site} <small>↗</small></> : "—"}</td>
    </tr>
  );
}

function App() {
  const [active] = useState("Deals");
  return (
    <div className="shell">
      <div className="bgfx" aria-hidden="true">
        <MeshGradient style={fill} colors={["#0a0c10", "#0a0f0f", "#0c1a15", "#10261d"]}
          distortion={0.5} swirl={0.15} grainMixer={0} grainOverlay={0} scale={1.6} speed={sp(0.025)} />
      </div>
      <aside className="side">
        <div className="logoRow">
          <span className="mark"><LiquidMetal style={fill} colorBack="#00000000" colorTint="#58ca9d" shape="circle"
            repetition={2} softness={0.7} shiftRed={0.06} shiftBlue={-0.06} distortion={0.05} contour={0.35} angle={70} speed={sp(0.15)} /></span>
          <span className="wm">TALENT<br />SHEET.</span>
        </div>
        <nav>{nav.map(([n, d]) => (
          <a key={n} className={n === active ? "on" : ""} aria-current={n === active ? "page" : undefined}><Icon d={d} />{n}</a>))}</nav>
        <div className="mode"><Icon d="M12 3v2M12 19v2M5 12H3M21 12h-2M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />Light mode</div>
      </aside>
      <main className="main">
        <div className="top"><div className="pill"><Icon d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3" />Search deals, talent, companies…</div></div>
        <header className="head">
          <div className="hcopy"><h1>Deals</h1>
            <p>Every deal on record between athletes and the companies they back. Try “owned since 2024” or “partnered football”, then press Enter to keep it as a filter.</p></div>
        </header>
        <div className="tools"><span><Icon d="M4 6h16M7 12h10M10 18h4" />Filters</span><span><Icon d="M4 7h10M4 12h7M4 17h4M18 5v14M15 16l3 3 3-3" />Sort</span></div>
        <div className="tbl"><table>
          <thead><tr><th>Company</th><th>Industry</th><th>Talent</th><th>Type</th><th>Verified / Reported</th><th>Website</th></tr></thead>
          <tbody>{rows.map((r) => <Row key={r.co} r={r} />)}</tbody></table></div>
      </main>
      <div className="grain grain-page" />
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
