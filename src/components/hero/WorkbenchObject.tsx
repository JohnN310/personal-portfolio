"use client";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useEffect, type ReactNode, type PointerEvent } from "react";
import { Arrow } from "@/components/ui";
const spring = { stiffness: 150, damping: 15, mass: 1 };
export function WorkbenchObject({ href, label, description, children }: { href: string; label: string; description: string; children: ReactNode }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0), y = useMotionValue(0), lift = useMotionValue(0);
  const rotateX = useSpring(x, spring), rotateY = useSpring(y, spring), translateY = useSpring(lift, spring);
  useEffect(() => { if (reduced) { x.set(0); y.set(0); lift.set(0); rotateX.jump(0); rotateY.jump(0); translateY.jump(0); } }, [reduced, x, y, lift, rotateX, rotateY, translateY]);
  const reset = () => { x.set(0); y.set(0); lift.set(0); };
  function point(event: PointerEvent<HTMLAnchorElement>) {
    if (reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(Math.max(-4, Math.min(4, -((event.clientY - bounds.top) / bounds.height - .5) * 8)));
    y.set(Math.max(-4, Math.min(4, ((event.clientX - bounds.left) / bounds.width - .5) * 8)));
    lift.set(-6);
  }
  return <a href={href.startsWith("/") && !href.startsWith("//") ? `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${href}` : href} className="workbench-object" onPointerMove={point} onPointerEnter={point} onPointerLeave={reset} onPointerCancel={reset} onFocus={() => { if (!reduced) lift.set(-6); }} onBlur={reset}>
    <motion.div tabIndex={-1} className="object-motion" style={{ rotateX, rotateY, y: translateY, transformPerspective: 900 }} whileTap={reduced ? undefined : { scale: .98 }}>{children}</motion.div>
    <span className="object-label">{label}<Arrow diagonal/></span><span className="object-description">{description}</span>
  </a>;
}
