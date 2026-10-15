import React from "react";
import { createRoot } from "react-dom/client";
import { MeshGradient, GrainGradient, Dithering } from "@paper-design/shaders-react";

// Talent Sheet palette (from CLAUDE.md)
const C = {
  accent: "#9ae230",
  bg: "#05080a",
  card: "#0d1613",
  surface: "#101915",
};
const greens = ["#05080a", "#0d2a12", "#2f6b12", C.accent];

const fill = { position: "absolute", inset: 0, width: "100%", height: "100%" };

function Hero() {
  return (
    <section className="hero">
      <MeshGradient
        style={fill}
        colors={greens}
        distortion={0.8}
        swirl={0.5}
        grainMixer={0.25}
        grainOverlay={0.15}
        speed={0.4}
      />
      <div className="hero-fade" />
      <div className="hero-copy">
        <span className="pill">Athlete investment tracker</span>
        <h1>Follow the money behind the athletes.</h1>
        <p>Venture, equity, franchise and brand deals — in one sheet.</p>
      </div>
    </section>
  );
}

const deals = [
  { name: "Thirty Five Ventures", sub: "Kevin Durant · Fund", tag: "Equity", shape: "wave" },
  { name: "Brand ambassador stake", sub: "Naomi Osaka · Brand deal", tag: "Brand deal", shape: "ripple" },
  { name: "Franchise ownership", sub: "Serena Williams · Franchise", tag: "Franchise", shape: "blob" },
];

function Card({ d }) {
  return (
    <div className="card">
      <div className="card-art">
        <GrainGradient
          style={fill}
          colorBack={C.surface}
          colors={[C.accent, "#2f6b12", "#0d2a12"]}
          softness={0.6}
          intensity={0.55}
          noise={0.35}
          shape={d.shape}
          speed={0.5}
        />
      </div>
      <div className="card-body">
        <div className="logo" />
        <div>
          <div className="card-title">{d.name}</div>
          <div className="card-sub">{d.sub}</div>
        </div>
        <span className="tag">{d.tag}</span>
      </div>
    </div>
  );
}

function Band() {
  return (
    <section className="band">
      <Dithering
        style={fill}
        colorBack={C.bg}
        colorFront={C.accent}
        shape="warp"
        type="4x4"
        size={2}
        speed={0.3}
      />
      <div className="band-copy">Dithering band · section divider / CTA background</div>
    </section>
  );
}

createRoot(document.getElementById("root")).render(
  <>
    <Hero />
    <div className="label">Card header art — GrainGradient (wave / ripple / blob)</div>
    <div className="grid">{deals.map((d) => <Card key={d.name} d={d} />)}</div>
    <div className="label">Dithering</div>
    <Band />
  </>
);
