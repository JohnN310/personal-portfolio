import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { EvidenceMetric as Metric } from "@/content/types";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{diagonal ? <path d="M6 18 18 6M6 6h12v12"/> : <path d="M4 12h16m-6-6 6 6-6 6"/>}</svg>;
}
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) { return <div className={`container ${className}`}>{children}</div>; }
export function ActionLink({ children, variant = "text", className = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: "primary" | "secondary" | "text" }) { return <a {...props} href={props.href?.startsWith("/") && !props.href.startsWith("//") ? `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${props.href}` : props.href} className={`action action-${variant} ${className}`}>{children}<Arrow diagonal={variant === "text"}/></a>; }
export function SectionIntro({ title, summary }: { title: string; summary?: string; eyebrow?: string }) { return <div className="section-intro"><h2 className="section-label">{title}</h2>{summary && <p className="section-summary">{summary}</p>}</div>; }
export function EvidenceMetric({ value, label, qualifier }: Metric) { return <div className="metric"><strong>{value}</strong><span>{label}</span><small>{qualifier}</small></div>; }
export function TechnologyList({ items }: { items: readonly string[] }) { return <ul className="tech-list" aria-label="Technologies">{items.map(item => <li key={item}>{item}</li>)}</ul>; }
export function StoryDisclosure({ id, title, children, defaultOpen = false }: { id?: string; title: string; children: ReactNode; defaultOpen?: boolean }) { return <details className="story-disclosure" id={id} open={defaultOpen}><summary>{title}<span aria-hidden="true" className="plus">+</span></summary><div className="disclosure-body">{children}</div></details>; }
export function FigureFrame({ children, caption }: { children: ReactNode; caption: string }) { return <figure className="figure-frame">{children}<figcaption>{caption}</figcaption></figure>; }
