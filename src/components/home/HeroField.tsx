import { useEffect, useRef } from "react";

/**
 * Decorative canvas behind the hero: candlesticks, tick marks, price-line
 * segments and currency glyphs drift slowly and lean away from the pointer.
 * No real figures are drawn, ever. Static under prefers-reduced-motion,
 * idle when off-screen or the tab is hidden, and off on very small screens.
 */
type Kind = "candle" | "tick" | "line" | "glyph";
interface Sprite {
  kind: Kind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  up: boolean;
  glyph: string;
  depth: number;
}

const GLYPHS = ["$", "XAU", "€", "£", "¥", "%"];
const GOLD = "212, 160, 23";
const SLATE = "168, 164, 156";

function make(w: number, h: number, i: number): Sprite {
  const kinds: Kind[] = ["candle", "candle", "tick", "line", "glyph"];
  const kind = kinds[i % kinds.length];
  const depth = 0.4 + Math.random() * 0.6; // far → near
  return {
    kind,
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.12 * depth,
    vy: -(0.04 + Math.random() * 0.1) * depth,
    size: (kind === "glyph" ? 16 : 22) * depth + 8,
    alpha: 0.18 + depth * 0.3,
    up: Math.random() > 0.5,
    glyph: GLYPHS[i % GLYPHS.length],
    depth,
  };
}

function draw(ctx: CanvasRenderingContext2D, s: Sprite, ox: number, oy: number) {
  const x = s.x + ox * s.depth;
  const y = s.y + oy * s.depth;
  const gold = `rgba(${GOLD}, ${s.alpha})`;
  const slate = `rgba(${SLATE}, ${s.alpha})`;
  ctx.lineWidth = 1;
  if (s.kind === "candle") {
    const bodyH = s.size * 0.55;
    ctx.strokeStyle = s.up ? gold : slate;
    ctx.beginPath();
    ctx.moveTo(x, y - s.size / 2);
    ctx.lineTo(x, y + s.size / 2);
    ctx.stroke();
    ctx.strokeRect(x - s.size * 0.18, y - bodyH / 2, s.size * 0.36, bodyH);
  } else if (s.kind === "tick") {
    ctx.strokeStyle = s.up ? gold : slate;
    ctx.beginPath();
    const d = s.size * 0.35;
    if (s.up) {
      ctx.moveTo(x - d, y + d * 0.6);
      ctx.lineTo(x, y - d * 0.6);
      ctx.lineTo(x + d, y + d * 0.6);
    } else {
      ctx.moveTo(x - d, y - d * 0.6);
      ctx.lineTo(x, y + d * 0.6);
      ctx.lineTo(x + d, y - d * 0.6);
    }
    ctx.stroke();
  } else if (s.kind === "line") {
    ctx.strokeStyle = slate;
    ctx.beginPath();
    const w = s.size * 1.6;
    ctx.moveTo(x - w / 2, y + s.size * 0.2);
    ctx.lineTo(x - w / 6, y - s.size * 0.15);
    ctx.lineTo(x + w / 6, y + s.size * 0.05);
    ctx.lineTo(x + w / 2, y - s.size * 0.3);
    ctx.stroke();
  } else {
    ctx.fillStyle = gold;
    ctx.font = `500 ${s.size}px "IBM Plex Mono", ui-monospace, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(s.glyph, x, y);
  }
}

export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 640;
    if (small) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let sprites: Sprite[] = [];
    let raf = 0;
    let visible = true;
    const pointer = { x: -1e4, y: -1e4, has: false };
    const target = { x: 0, y: 0 };
    const offset = { x: 0, y: 0 };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(56, (w * h) / 22000));
      sprites = Array.from({ length: n }, (_, i) => make(w, h, i));
    };

    const frame = () => {
      raf = 0;
      ctx.clearRect(0, 0, w, h);
      // Parallax eases toward the pointer; sprites nearest the cursor lean away.
      offset.x += (target.x - offset.x) * 0.06;
      offset.y += (target.y - offset.y) * 0.06;
      for (const s of sprites) {
        if (!reduced) {
          s.x += s.vx;
          s.y += s.vy;
          if (pointer.has) {
            const dx = s.x + offset.x * s.depth - pointer.x;
            const dy = s.y + offset.y * s.depth - pointer.y;
            const d2 = dx * dx + dy * dy;
            const r = 140;
            if (d2 < r * r && d2 > 1) {
              const d = Math.sqrt(d2);
              const push = ((r - d) / r) * 0.9 * s.depth;
              s.x += (dx / d) * push;
              s.y += (dy / d) * push;
            }
          }
          if (s.y < -40) {
            s.y = h + 40;
            s.x = Math.random() * w;
          }
          if (s.x < -60) s.x = w + 60;
          if (s.x > w + 60) s.x = -60;
        }
        draw(ctx, s, offset.x, offset.y);
      }
      if (!reduced && visible && !document.hidden) raf = window.requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf) raf = window.requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.has = true;
      target.x = (pointer.x / w - 0.5) * -24;
      target.y = (pointer.y / h - 0.5) * -16;
    };
    const onLeave = () => {
      pointer.has = false;
      target.x = 0;
      target.y = 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });

    resize();
    start();
    const host = canvas.parentElement ?? canvas;
    io.observe(canvas);
    window.addEventListener("resize", resize);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", start);
    return () => {
      io.disconnect();
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", start);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="hero-field" />;
}
