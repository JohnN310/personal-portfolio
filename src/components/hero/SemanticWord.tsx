"use client";
import { useEffect, useRef, ReactNode } from "react";
import { registerSemanticNode, unregisterSemanticNode } from "./particleStore";

export function SemanticWord({ children, keyword }: { children: ReactNode; keyword: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    const updatePosition = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      registerSemanticNode(keyword, {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, { passive: true });

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
      unregisterSemanticNode(keyword);
    };
  }, [keyword]);

  return (
    <span ref={ref} className="semantic-word" style={{ display: 'inline-block', position: 'relative', zIndex: 10 }}>
      {children}
    </span>
  );
}
