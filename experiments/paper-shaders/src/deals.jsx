import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { MeshGradient, GrainGradient, LiquidMetal } from "@paper-design/shaders-react";

const fill = { position: "absolute", inset: 0, width: "100%", height: "100%" };
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const sp = (v) => (reduced ? 0 : v);

const deals = [
  { co: "Northwind Capital", who: "Marcus Hale", sport: "Basketball", meta: "Series B · $12M round", type: "Equity", year: 2024 },
  { co: "Apex Hydration", who: "Dana Okafor", sport: "Track & field", meta: "Ambassador · equity grant", type: "Brand deals", year: 2023 },
  { co: "Harbor City FC", who: "Luis Ferreira", sport: "Soccer", meta: "Minority ownership · 4%", type: "Franchise", year: 2022 },
  { co: "Lumen Health", who: "Priya Raman", sport: "Tennis", meta: "Seed · advisor equity", type: "Equity", year: 2024 },
  { co: "Stride Footwear", who: "Tom Becker", sport: "Football", meta: "Co-founder · 8% stake", type: "Brand deals", year: 2021 },
  { co: "Metro Hoops", who: "Aisha Grant", sport: "Basketball", meta: "Part owner · expansion team", type: "Franchise", year: 2025 },
];
const tabs = ["All", "Equity", "Brand deals", "Franchise"];

// Dark, desaturated chrome so the metal reads as a material, not a lime sticker.
const Metal = ({ shape, speed = 0.15, ...p }) => (
  <LiquidMetal style={fill} colorBack="#00000000" colorTint="#6fa52a" shape={shape}
    repetition={2} softness={0.7} shiftRed={0.08} shiftBlue={-0.08} distortion={0.05}
    contour={0.35} angle={70} speed={sp(speed)} {...p} />
);

function Card({ d, i }) {
  const [hot, setHot] = useState(false);
  return (
    <article className="card" onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}>
      <div className="art">
        <GrainGradient style={fill} colorBack="#101915" colors={["#5c9a1c", "#1c3d14", "#0c1f0f"]}
          softness={0.85} intensity={0.4} noise={0.3} shape="ripple" scale={1.4} offsetX={(i * 37) % 100 - 50} offsetY={(i * 53) % 60 - 30}
          speed={sp(hot ? 0.12 : 0)} />
        <div className="grain grain-card" />
      </div>
      <div className="row">
        <div className="logo">{d.co[0]}</div>
        <div className="txt"><h3>{d.co}</h3><p>{d.who} · {d.sport}</p></div>
        <span className="tag">{d.type}</span>
      </div>
      <div className="meta"><span>{d.meta}</span><span className="yr">{d.year}</span></div>
    </article>
  );
}

function App() {
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");
  const list = deals.filter((d) => (tab === "All" || d.type === tab) &&
    (d.co + d.who + d.sport).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <nav className="nav">
        <div className="brand"><span className="mark"><Metal shape="circle" scale={1} /></span>Talent Sheet</div>
        <div className="links"><a>Home</a><a className="on" aria-current="page">Deals</a><a>Athletes</a><a>FAQ</a></div>
      </nav>
      <header className="banner">
        <MeshGradient style={fill} colors={["#05080a", "#071a0d", "#12341a", "#3f7a1a"]}
          distortion={0.6} swirl={0.35} grainMixer={0.3} grainOverlay={0.2} speed={sp(0.08)} />
        <div className="shade" />
        <div className="grain grain-banner" />
        <div className="chrome"><Metal shape="metaballs" scale={0.85} speed={0.12} /></div>
        <div className="bcopy">
          <h1>Deals</h1>
          <p>{deals.length} athlete investments across equity, brand and franchise.</p>
        </div>
      </header>
      <section className="sec">
        <div className="bar">
          <div className="tabs" role="tablist">
            {tabs.map((t) => (
              <button key={t} role="tab" aria-selected={t === tab} className={t === tab ? "tab on" : "tab"} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
          <input id="q" className="search" placeholder="Search athlete, company, sport" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="grid">{list.map((d) => <Card key={d.co} d={d} i={deals.indexOf(d)} />)}</div>
        {!list.length && <p className="empty">No deals match that search.</p>}
      </section>
      <div className="grain grain-page" />
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
