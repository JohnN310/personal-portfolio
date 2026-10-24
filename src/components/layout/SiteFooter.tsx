import Link from "next/link";
import { Container } from "@/components/ui";
export function SiteFooter() { return <footer className="site-footer"><Container><Link href="/" className="wordmark">john<span className="brand-star" aria-hidden="true">✳</span></Link><span>Thoughtfully built. Always curious.</span><a href="#top">Back to top ↑</a><small>© {new Date().getFullYear()} John Nguyen</small></Container></footer>; }
