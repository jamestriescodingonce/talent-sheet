// Liquid-metal logo mark (Paper Shaders). Replaces the flat SVG icon inside .logo;
// if WebGL or the shader fails, the original SVG stays visible.
import { ShaderMount, liquidMetalFragmentShader, ShaderFitOptions, defaultObjectSizing, getShaderColorFromString, LiquidMetalShapes } from "@paper-design/shaders";

const PIXEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

function mount(logo) {
  const svg = logo.querySelector("svg");
  if (!svg || logo.querySelector(".metal-mark")) return;
  const host = document.createElement("span");
  host.className = "metal-mark";
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = "position:relative;display:block;width:26px;height:26px;flex:none";
  logo.insertBefore(host, svg);
  try {
    const p = { ...defaultObjectSizing, scale: 1 };
    new ShaderMount(host, liquidMetalFragmentShader, {
      u_colorBack: getShaderColorFromString("#00000000"),
      u_colorTint: getShaderColorFromString("#58ca9d"),
      u_image: PIXEL,
      u_contour: 0.35, u_distortion: 0.05, u_softness: 0.7, u_repetition: 2,
      u_shiftRed: 0.06, u_shiftBlue: -0.06, u_angle: 70, u_isImage: false,
      u_shape: LiquidMetalShapes.circle,
      u_fit: ShaderFitOptions[p.fit], u_scale: p.scale, u_rotation: p.rotation,
      u_offsetX: p.offsetX, u_offsetY: p.offsetY, u_originX: p.originX, u_originY: p.originY,
      u_worldWidth: p.worldWidth, u_worldHeight: p.worldHeight,
    }, undefined, reduced ? 0 : 0.15, 0, 2, undefined, ["u_image"]);
    svg.style.display = "none";
  } catch (e) {
    host.remove();
  }
}
document.querySelectorAll(".logo").forEach(mount);
