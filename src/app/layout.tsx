import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";
const manrope = localFont({ src: "../../public/fonts/manrope-latin.woff2", variable: "--font-manrope", display: "swap", weight: "200 800" });
export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: { default: "John Nguyen — Software, AI & Useful Products", template: "%s · John Nguyen" },
  description: "John Nguyen is a software builder, AI researcher, and Remeli co-founder. Explore products, agentic AI, and research built with curiosity and care.",
  robots: { index: Boolean(process.env.SITE_URL), follow: Boolean(process.env.SITE_URL) },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={manrope.variable}><body id="top"><a className="skip-link" href="#main">Skip to content</a><SiteHeader/>{children}<SiteFooter/></body></html>;
}
