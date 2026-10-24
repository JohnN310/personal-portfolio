"use client";
import { useRef, type ReactNode } from "react";
export function MobileNavEnhancement({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  return <details className="mobile-menu" ref={ref} onKeyDown={event => { if (event.key === "Escape" && ref.current?.open) { ref.current.open = false; ref.current.querySelector("summary")?.focus(); } }} onClick={event => { if ((event.target as HTMLElement).closest("a") && ref.current) ref.current.open = false; }}>{children}</details>;
}
