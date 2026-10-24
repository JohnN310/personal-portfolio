import { SectionLink } from "./SectionLink";
import Link from "next/link";
import { Arrow, Container } from "@/components/ui";
import { MobileNavEnhancement } from "./MobileNavEnhancement";
const links = [["Work", "/#work"], ["Research Experience", "/#research"], ["Work Experience", "/#experience"], ["Leadership Experience", "/#leadership"], ["About", "/#about"]];
export function SiteHeader() { return <header className="site-header"><Container className="header-inner"><Link href="/" className="wordmark" aria-label="John Nguyen home">john<span className="brand-star" aria-hidden="true">✳</span></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <SectionLink key={label} href={href}>{label}</SectionLink>)}</nav><SectionLink className="header-contact" href="/#contact">Let’s talk <Arrow diagonal/></SectionLink><MobileNavEnhancement><summary>Menu <span aria-hidden="true">+</span></summary><nav aria-label="Mobile navigation">{links.map(([label, href]) => <SectionLink key={label} href={href}>{label}</SectionLink>)}<SectionLink href="/#contact">Contact</SectionLink></nav></MobileNavEnhancement></Container></header>; }
