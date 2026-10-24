"use client";
import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

export function SectionLink({ href, children, className }: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const destination = new URL(event.currentTarget.href);
    const current = new URL(window.location.href);
    if (!destination.hash || destination.origin !== current.origin || destination.pathname !== current.pathname || destination.search !== current.search || destination.hash !== current.hash) return;
    const section = document.getElementById(decodeURIComponent(destination.hash.slice(1)));
    if (!section) return;
    // A repeated hash does not trigger router scrolling. Wait for the mobile menu to close first.
    event.preventDefault();
    requestAnimationFrame(() => {
      section.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    });
  }
  return <Link href={href} className={className} onClick={handleClick}>{children}</Link>;
}
