import { clamp, reducedMotion } from './util';

/*
  The hero animation. Small squares ("bytes") drift around the hero as messy data, together with
  a few labelled source files. One by one they are pulled through a pipe, one lane per colour,
  and land in the dashboard as the cells of a chart. The chart holds, drains away, and the next
  one builds: bars, an area trend, a donut.

  Everything is drawn on one canvas that covers the hero. The dashboard card, the pipe and the
  copy are ordinary elements; the canvas only needs to know where they are.
*/

export const FLOW_COLORS = ['#2f4bf7', '#ffc21f', '#ff5a9d', '#2bd99a', '#ff8a2a'];

export interface FlowScene {
  title: string;
  caption?: string;
  legend?: string[];
}

/** What the dashboard card says while each chart is on it. The order matches the charts below. */
export const FLOW_SCENES: FlowScene[] = [
  { title: 'Revenue by branch', caption: 'Seven branches, this month' },
  { title: 'Margin trend', caption: 'Up 2.1 points since January' },
  { title: 'Sales by channel', legend: ['Stores', 'Online', 'Wholesale', 'Export'] },
];

export interface FlowElements {
  hero: HTMLElement;
  canvas: HTMLCanvasElement;
  /** The empty area of the dashboard card the chart is drawn into. */
  matrix: HTMLElement;
  pipe: HTMLElement;
  copy: HTMLElement;
  screen: HTMLElement;
}

interface Cell { c: number; r: number; k: number; o: number }
interface Ambient {
  x: number; y: number; ax: number; ay: number; ph: number; sp: number;
  s: number; rot: number; vr: number; k: number; al: number; tag: string | null; px: number; py: number;
}
interface Flying { x0: number; y0: number; s0: number; r0: number; c: number; r: number; k: number; t: number; d: number }
interface Landed { c: number; r: number; k: number; b: number }
interface Leaving { c: number; r: number; k: number; t: number }
interface Box { x: number; y: number; w: number; h: number }

const TAGS = ['xlsx', 'csv', 'sql', 'erp', 'pos', 'api', 'crm'];
const BUILD_MS = 2700;   // time over which a chart's bytes are released
const HOLD_MS = 3200;    // time a finished chart stays up

/** Starts the animation and returns a function that stops it and releases everything. */
export function startFlow(els: FlowElements, onScene: (index: number) => void): () => void {
  const { hero, canvas, matrix, pipe, copy, screen } = els;
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  const COL = FLOW_COLORS;
  const still = reducedMotion();

  let W = 0, H = 0, dpr = 1, cell = 14, cols = 0, rows = 0, ox = 0, oy = 0, Fx = 0, Fy = 0, lane = 12, vert = false;
  let sr: Box = { x: 0, y: 0, w: 0, h: 0 }, cr: Box = { x: 0, y: 0, w: 0, h: 0 };
  let amb: Ambient[] = [], fly: Flying[] = [], set: Landed[] = [], out: Leaving[] = [], queue: Cell[] = [];
  let qi = 0, scene = -1, phase: 'build' | 'hold' = 'build', pt = 0, last = 0, T = 0;
  let visible = true, raf = 0, dead = false;
  const mouse = { x: -9999, y: -9999 };

  /* ----- the three charts, as lists of grid cells in the order they fill ----- */
  function bars(): Cell[] {
    const n = cols >= 30 ? 7 : 5, g = 1, bw = Math.floor((cols - (n - 1) * g) / n);
    const off = Math.floor((cols - (n * bw + (n - 1) * g)) / 2), hs = [0.42, 0.6, 0.5, 0.78, 0.66, 0.9, 1].slice(7 - n), a: Cell[] = [];
    for (let i = 0; i < n; i++) {
      const h = Math.max(2, Math.round(rows * hs[i] * 0.96));
      for (let r = 0; r < h; r++) for (let c = 0; c < bw; c++) a.push({ c: off + i * (bw + g) + c, r: rows - 1 - r, k: i % 5, o: r * 100 + i * bw + c });
    }
    return a.sort((p, q) => p.o - q.o);
  }
  function area(): Cell[] {
    const a: Cell[] = [];
    for (let c = 0; c < cols; c++) {
      const u = c / (cols - 1), f = 0.2 + 0.62 * Math.pow(u, 1.15) + 0.07 * Math.sin(c * 0.85) + 0.04 * Math.sin(c * 2.1 + 1);
      const h = clamp(Math.round(rows * f), 2, rows);
      for (let r = 0; r < h; r++) a.push({ c, r: rows - 1 - r, k: r >= h - 2 ? 1 : 0, o: c * 100 + r });
    }
    return a.sort((p, q) => p.o - q.o);
  }
  function donut(): Cell[] {
    const a: Cell[] = [], wide = cols >= 30, R = Math.min(rows, cols) / 2 - 0.4, r0 = R * 0.5;
    const cx = wide ? R + 0.5 : (cols - 1) / 2, cy = (rows - 1) / 2, sh = [0.38, 0.25, 0.2, 0.17];
    let acc = 0; const cut = sh.map(s => (acc += s));
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const dx = c - cx, dy = r - cy, d = Math.hypot(dx, dy);
      if (d < r0 || d > R) continue;
      let t = (Math.atan2(dy, dx) + Math.PI / 2) / (2 * Math.PI); if (t < 0) t += 1;
      const k = cut.findIndex(v => t < v);
      a.push({ c, r, k: k < 0 ? 3 : k, o: t * 1000 });
    }
    if (wide) {
      // the legend bars beside the ring, one per slice
      const x0 = Math.ceil(cx + R + 3), wmax = cols - x0;
      sh.forEach((s, i) => {
        const len = Math.max(2, Math.round(wmax * s / 0.38)), y = Math.round(cy - 5 + i * 3);
        for (let c = 0; c < len; c++) for (let rr = 0; rr < 2; rr++) a.push({ c: x0 + c, r: y + rr, k: i, o: 1000 + i * 100 + c });
      });
    }
    return a.sort((p, q) => p.o - q.o);
  }
  const CHARTS = [bars, area, donut];

  const onScreen = (x: number, y: number, pad = 16) => x > sr.x - pad && x < sr.x + sr.w + pad && y > sr.y - pad && y < sr.y + sr.h + pad;
  const inCopy = (x: number, y: number) => x > cr.x && x < cr.x + cr.w && y > cr.y && y < cr.y + cr.h;

  /* ----- the mess: drifting squares, faint where they pass under the copy ----- */
  function seed() {
    amb = [];
    const maxX = vert ? W : sr.x - 26, maxY = vert ? sr.y - 24 : H - 84, top = 86;
    const n = Math.round(clamp(maxX * (maxY - top) / 5200, 60, 200));
    for (let i = 0; i < n; i++) {
      let x = 0, y = 0, t = 0;
      do { x = Math.random() * maxX; y = top + Math.random() * (maxY - top); t++; } while (t < 20 && onScreen(x, y));
      const under = inCopy(x, y);
      amb.push({
        x, y, ax: 6 + Math.random() * 18, ay: 6 + Math.random() * 18, ph: Math.random() * 6.28, sp: 0.25 + Math.random() * 0.6,
        s: 4 + Math.random() * 9, rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.9,
        k: Math.random() < 0.8 ? (Math.random() * 5) | 0 : -1, al: under ? 0.1 + Math.random() * 0.14 : 0.4 + Math.random() * 0.55, tag: null, px: x, py: y,
      });
    }
    // a few labelled source files, only where there is open space
    let placed = 0;
    for (let i = 0; i < 400 && placed < TAGS.length; i++) {
      const x = 34 + Math.random() * (maxX - 68), y = top + 14 + Math.random() * (maxY - top - 28);
      const clear = [[-30, -18], [30, -18], [-30, 18], [30, 18]].every(([dx, dy]) => !inCopy(x + dx, y + dy) && !onScreen(x + dx, y + dy, 6));
      const apart = amb.every(a => !a.tag || Math.hypot(a.x - x, a.y - y) > 76);
      const offPipe = Math.hypot(x - Fx, y - Fy) > (vert ? 150 : 96);
      if (!clear || !apart || !offPipe) continue;
      amb.push({ x, y, ax: 5 + Math.random() * 8, ay: 5 + Math.random() * 8, ph: Math.random() * 6.28, sp: 0.3 + Math.random() * 0.4, s: 0, rot: 0, vr: 0, k: placed % 5, al: 1, tag: TAGS[placed], px: x, py: y });
      placed++;
    }
  }

  function layout() {
    const hr = hero.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2); W = hr.width; H = hr.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    const m = matrix.getBoundingClientRect(), s = screen.getBoundingClientRect(), c = copy.getBoundingClientRect();
    cell = clamp(Math.floor(m.width / 34), 8, 15);
    cols = Math.floor(m.width / cell); rows = Math.floor(m.height / cell);
    ox = m.left - hr.left + (m.width - cols * cell) / 2; oy = m.bottom - hr.top - rows * cell;
    sr = { x: s.left - hr.left, y: s.top - hr.top, w: s.width, h: s.height };
    cr = { x: c.left - hr.left - 18, y: c.top - hr.top - 18, w: c.width + 36, h: c.height + 36 };
    // below 1000px the card sits under the copy, so the bytes come down into it instead of across
    vert = window.innerWidth < 1000;
    lane = clamp(cell - 1, 9, 13);
    if (vert) { Fx = sr.x + sr.w / 2; Fy = sr.y - 56; } else { Fx = sr.x - 62; Fy = m.top - hr.top + m.height / 2; }
    pipe.style.left = Fx + 'px'; pipe.style.top = Fy + 'px';
    pipe.classList.toggle('v', vert);
    seed();
    fly = []; set = []; out = []; scene = -1;
    if (still) { scene = 0; onScene(0); set = CHARTS[0]().map(q => ({ c: q.c, r: q.r, k: q.k, b: 1 })); draw(); }
    else next();
  }

  function next() {
    scene = (scene + 1) % CHARTS.length;
    queue = CHARTS[scene](); qi = 0; phase = 'build'; pt = 0;
    onScene(scene);
  }

  function release(q: Cell) {
    const a = amb[(Math.random() * amb.length) | 0];
    fly.push({ x0: a.px, y0: a.py, s0: a.tag ? 9 : Math.max(5, a.s), r0: a.rot, c: q.c, r: q.r, k: q.k, t: 0, d: 1050 + Math.random() * 600 });
  }

  // A byte's path: two quadratic curves that meet in the pipe, on the lane for its colour.
  function at(p: Flying, u: number): [number, number] {
    const lx = vert ? Fx + (p.k - 2) * lane : Fx, ly = vert ? Fy : Fy + (p.k - 2) * lane;
    const tx = ox + p.c * cell + cell / 2, ty = oy + p.r * cell + cell / 2;
    let ax: number, ay: number, bx: number, by: number, ex: number, ey: number, v: number;
    if (u < 0.5) { v = u * 2; ax = p.x0; ay = p.y0; bx = vert ? lx : lx - 150; by = vert ? ly - 110 : ly; ex = lx; ey = ly; }
    else { v = (u - 0.5) * 2; ax = lx; ay = ly; bx = vert ? lx : lx + Math.max(44, (tx - lx) * 0.5); by = vert ? ly + 64 : ly; ex = tx; ey = ty; }
    const w = 1 - v;
    return [w * w * ax + 2 * w * v * bx + v * v * ex, w * w * ay + 2 * w * v * by + v * v * ey];
  }
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  function step(dt: number) {
    if (phase === 'build') {
      const want = Math.min(queue.length, Math.floor(queue.length * pt / BUILD_MS) + 1);
      while (qi < want) release(queue[qi++]);
      if (qi >= queue.length && !fly.length) { phase = 'hold'; pt = 0; }
    } else if (phase === 'hold' && pt > HOLD_MS) {
      out = set.map(s => ({ c: s.c, r: s.r, k: s.k, t: -(s.c / cols) * 480 })); set = []; next();
    }
    for (let i = fly.length - 1; i >= 0; i--) {
      const p = fly[i]; p.t += dt / p.d;
      if (p.t >= 1) { set.push({ c: p.c, r: p.r, k: p.k, b: 0 }); fly.splice(i, 1); }
    }
    for (const s of set) if (s.b < 1) s.b = Math.min(1, s.b + dt / 240);
    for (let i = out.length - 1; i >= 0; i--) { out[i].t += dt; if (out[i].t > 440) out.splice(i, 1); }
  }

  function draw() {
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    // the mess, which steps away from the pointer
    for (const a of amb) {
      let x = a.x + Math.sin(T * a.sp + a.ph) * a.ax, y = a.y + Math.cos(T * a.sp * 0.8 + a.ph) * a.ay;
      const dx = x - mouse.x, dy = y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 130 && d > 0) { const f = (1 - d / 130) * 34; x += dx / d * f; y += dy / d * f; }
      a.px = x; a.py = y;
      ctx.globalAlpha = a.al;
      ctx.save(); ctx.translate(x, y);
      if (a.tag) {
        ctx.rotate(Math.sin(T * a.sp + a.ph) * 0.14);
        ctx.fillStyle = COL[a.k]; ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(-24, -13, 48, 26, 7); else ctx.rect(-24, -13, 48, 26);
        ctx.fill();
        ctx.fillStyle = '#0b0a26'; ctx.font = '700 12px "JetBrains Mono", monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(a.tag, 0, 1);
      } else {
        ctx.rotate(a.rot + T * a.vr);
        ctx.fillStyle = a.k < 0 ? '#5a5996' : COL[a.k];
        ctx.fillRect(-a.s / 2, -a.s / 2, a.s, a.s);
      }
      ctx.restore();
    }
    // the previous chart draining away
    for (const o of out) {
      const u = clamp(o.t / 440), z = (cell - 2) * (1 - u); if (z <= 0) continue;
      ctx.globalAlpha = 1 - u; ctx.fillStyle = COL[o.k];
      ctx.fillRect(ox + o.c * cell + cell / 2 - z / 2, oy + o.r * cell + cell / 2 - z / 2 + u * u * 30, z, z);
    }
    ctx.globalAlpha = 1;
    // bytes that have landed, with a small pop as each arrives
    for (const s of set) {
      const z = (cell - 2) * (s.b < 1 ? 1 + (1 - s.b) * 0.7 : 1);
      ctx.fillStyle = COL[s.k];
      ctx.fillRect(ox + s.c * cell + cell / 2 - z / 2, oy + s.r * cell + cell / 2 - z / 2, z, z);
    }
    // bytes in flight, each with a short trail
    for (const p of fly) {
      const u = ease(clamp(p.t));
      ctx.fillStyle = COL[p.k];
      for (let j = 3; j >= 0; j--) {
        const uu = Math.max(0, u - j * 0.024), [x, y] = at(p, uu), z = p.s0 + (cell - 2 - p.s0) * uu;
        ctx.globalAlpha = j ? 0.2 / j : 1;
        if (j) ctx.fillRect(x - z / 2, y - z / 2, z, z);
        else { ctx.save(); ctx.translate(x, y); ctx.rotate(p.r0 * (1 - u)); ctx.fillRect(-z / 2, -z / 2, z, z); ctx.restore(); }
      }
    }
    ctx.globalAlpha = 1;
  }

  function frame(now: number) {
    raf = 0;
    if (dead || !visible || document.hidden) { last = 0; return; }
    const dt = Math.min(50, last ? now - last : 16); last = now; T += dt / 1000; pt += dt;
    step(dt); draw();
    raf = requestAnimationFrame(frame);
  }
  // the loop only runs while the hero is on screen and the tab is in front
  const kick = () => { if (!dead && !still && !raf && visible && !document.hidden) raf = requestAnimationFrame(frame); };

  const onMove = (e: PointerEvent) => { const r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
  const onLeave = () => { mouse.x = mouse.y = -9999; };
  hero.addEventListener('pointermove', onMove);
  hero.addEventListener('pointerleave', onLeave);
  document.addEventListener('visibilitychange', kick);

  const io = new IntersectionObserver(es => { visible = es[0].isIntersecting; kick(); });
  io.observe(hero);

  // lay out again whenever the hero changes size (window resize, fonts arriving)
  let lw = 0, lh = 0, timer = 0;
  const ro = new ResizeObserver(() => {
    const r = hero.getBoundingClientRect();
    if (Math.abs(r.width - lw) < 1 && Math.abs(r.height - lh) < 1) return;
    lw = r.width; lh = r.height;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => { if (!dead) { layout(); kick(); } }, 80);
  });
  ro.observe(hero);
  if (document.fonts) document.fonts.ready.then(() => { if (!dead) { layout(); kick(); } });

  return () => {
    dead = true;
    if (raf) cancelAnimationFrame(raf);
    window.clearTimeout(timer);
    io.disconnect(); ro.disconnect();
    hero.removeEventListener('pointermove', onMove);
    hero.removeEventListener('pointerleave', onLeave);
    document.removeEventListener('visibilitychange', kick);
  };
}
