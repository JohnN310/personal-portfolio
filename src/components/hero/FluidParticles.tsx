"use client";
import { useEffect, useRef } from "react";
type Particle = { x: number; y: number; hx: number; hy: number; vx: number; vy: number; phase: number; color: string };

export function FluidParticles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current, host = canvas?.parentElement, ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)"), fine = matchMedia("(pointer: fine)");
    let width = 0, height = 0, frame = 0, previous = 0, time = 0, visible = false;
    let particles: Particle[] = [];
    const pointer = { x: -999, y: -999, active: false };
    const colors = ["#66717e", "#87919d", "#3186ff", "#3186ff", "#00b95c", "#fcee48", "#fc413d"];
    function draw(delta = 0) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height); time += delta * .007;
      for (const p of particles) {
        if (delta) {
          p.vx += (p.hx + Math.sin(time + p.phase) * 14 - p.x) * .012 * delta;
          p.vy += (p.hy + Math.cos(time * .7 + p.phase) * 20 - p.y) * .012 * delta;
          if (pointer.active && fine.matches) {
            const dx = p.x - pointer.x, dy = p.y - pointer.y, distance = Math.hypot(dx, dy);
            const force = Math.max(0, 1 - distance / 155);
            // Tangential force curls the wake. Guard exact pointer coincidence.
            p.vx += (dx - dy * .35) / Math.max(distance, 1) * force * 2.8 * delta;
            p.vy += (dy + dx * .35) / Math.max(distance, 1) * force * 2.8 * delta;
          }
          const damping = Math.pow(.9, delta);
          p.vx *= damping; p.vy *= damping; p.x += p.vx * delta; p.y += p.vy * delta;
        }
        const angle = Math.atan2(p.vy + .25, p.vx + .5), length = Math.min(7, 2.4 + Math.hypot(p.vx, p.vy) * .5);
        ctx.globalAlpha = p.x < width * .55 && p.y < height * .72 ? .25 : .75;
        ctx.strokeStyle = p.color; ctx.lineWidth = 1.4; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + Math.cos(angle) * length, p.y + Math.sin(angle) * length); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    function tick(now: number) {
      const delta = previous ? Math.min((now - previous) / 16.667, 2) : 1;
      previous = now; draw(delta); frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame); previous = 0;
      if (visible && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
      else draw();
    }
    function resize() {
      if (!canvas || !host || !ctx) return;
      width = host.clientWidth; height = host.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(fine.matches ? 420 : 100, Math.floor(width * height / 2200));
      particles = Array.from({ length: count }, (_, i) => {
        const u = i * .61803398875 % 1, v = i * .754877666 % 1;
        const hx = u * width, hy = (v * .65 + .18 + Math.sin(u * 7) * .13) * height;
        return { x: hx, y: hy, hx, hy, vx: 0, vy: 0, phase: i * 2.4, color: colors[i % colors.length] };
      });
      draw(); sync();
    }
    function move(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      const rect = canvas!.getBoundingClientRect();
      pointer.x = event.clientX - rect.left; pointer.y = event.clientY - rect.top; pointer.active = true;
    }
    function leave() { pointer.active = false; }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    const sizing = new ResizeObserver(resize);
    sizing.observe(host); observer.observe(host);
    host.addEventListener("pointermove", move, { passive: true }); host.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", leave, { passive: true }); document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync); fine.addEventListener("change", resize); resize();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); sizing.disconnect();
      host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", leave); document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync); fine.removeEventListener("change", resize);
    };
  }, []);
  return <canvas ref={ref} className="particle-field" aria-hidden="true" />;
}
