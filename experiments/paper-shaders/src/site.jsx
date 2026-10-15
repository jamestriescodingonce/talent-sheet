import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { MeshGradient, GrainGradient } from "@paper-design/shaders-react";

const C = { accent: "#9ae230", bg: "#05080a", card: "#0d1613", surface: "#101915" };
const fill = { position: "absolute", inset: 0, width: "100%", height: "100%" };
const reduced =
  typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
// Slow drift: mesh 0.12, card art 0.18 (the first prototype ran 0.4-0.5)
const MESH_SPEED = reduced ? 0 : 0.12;
const CARD_SPEED = reduced ? 0 : 0.18;

const deals = [
  { co: "Northwind Capital", who: "Marcus Hale", meta: "Series B · $12M round", type: "Equity", shape: "wave" },
  { co: "Apex Hydration", who: "Dana Okafor", meta: "Brand ambassador · equity grant", type: "Brand deals", shape: "ripple" },
  { co: "Harbor City FC", who: "Luis Ferreira", meta: "Minority ownership · 4%", type: "Franchise", shape: "blob" },
  { co: "Lumen Health", who: "Priya Raman", meta: "Seed · advisor equity", type: "Equity", shape: "truchet" },
  { co: "Stride Footwear", who: "Tom Becker", meta: "Co-founder · 8% stake", type: "Brand deals", shape: "wave" },
  { co: "Metro Hoops", who: "Aisha Grant", meta: "Part owner · expansion team", type: "Franchise", shape: "ripple" },
];
const tabs = ["All", "Equity", "Brand deals", "Franchise"];

function Hero() {
  return (
    <section className="hero">
      <MeshGradient
        style={fill}
        colors={["#05080a", "#0a2410", "#2b6212", C.accent]}
        distortion={0.7}
        swirl={0.45}
        grainMixer={0.35}
        grainOverlay={0.25}
        speed={MESH_SPEED}
      />
      <div className="fade" />
      <div className="grain grain-hero" />
      <div className="hero-copy">
        <span className="pill"><i /> 1,240 deals tracked</span>
        <h1>Follow the money behind the athletes.</h1>
        <p>Venture, equity, franchise and brand-ambassador deals — in one sheet.</p>
        <div className="cta-row">
          <button className="btn primary">Browse deals</button>
          <button className="btn ghost">How it works</button>
        </div>
      </div>
    </section>
  );
}

function Card({ d }) {
  return (
    <article className="card">
      <div className="art">
        <GrainGradient
          style={fill}
          colorBack={C.surface}
          colors={[C.accent, "#2b6212", "#0a2410"]}
          softness={0.7}
          intensity={0.6}
          noise={0.4}
          shape={d.shape}
          speed={CARD_SPEED}
        />
        <div className="grain grain-card" />
      </div>
      <div className="body">
        <div className="logo">{d.co[0]}</div>
        <div className="txt">
          <div className="title">{d.co}</div>
          <div className="sub">{d.who}</div>
        </div>
        <span className="tag">{d.type}</span>
      </div>
      <div className="meta">{d.meta}</div>
    </article>
  );
}

function App() {
  const [tab, setTab] = useState("All");
  const list = deals.filter((d) => tab === "All" || d.type === tab);
  return (
    <>
      <nav className="nav">
        <div className="brand"><span className="dot" />Talent Sheet</div>
        <div className="links"><a>Deals</a><a>Athletes</a><a>FAQ</a></div>
      </nav>
      <Hero />
      <section className="sec">
        <div className="tabs">
          {tabs.map((t) => (
            <button key={t} className={t === tab ? "tab on" : "tab"} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="grid">{list.map((d) => <Card key={d.co} d={d} />)}</div>
      </section>
      <div className="grain grain-page" />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
