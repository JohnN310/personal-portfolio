"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "./RemeliDiagram.module.css";

const scenes = [
  { title: "List the surplus.", role: "Seller", subtitle: "A bakery adds today’s unsold pastries.", action: "Listing published", label: "New listing" },
  { title: "Find a good deal.", role: "Buyer", subtitle: "Nearby food. A fraction of the price.", action: "Save 67%", label: "Near you" },
  { title: "Reserve it for $4.", role: "Buyer", subtitle: "One bag reserved for pickup.", action: "Order confirmed", label: "Your order" },
  { title: "Pick up. Enjoy.", role: "Pickup", subtitle: "Good food gets a second chance.", action: "Picked up ✓", label: "Ready to collect" },
];
export function RemeliDiagram({ href = "/work/remeli" }: { href?: string }) {
  const [step,setStep] = useState(0);
  const scene = scenes[step];
  return <figure className={styles.figure} aria-label="Remeli marketplace walkthrough">
    <div className={styles.top}><strong>remeli<span>✳</span></strong><span>Product walkthrough</span></div>
    <Link href={href} className={styles.preview} aria-label="Open Remeli and try the marketplace demo">
      <div className={styles.scene} key={step}>
        <div className={styles.phone}>
          <div className={styles.phoneTop}><span>remeli</span><span>{scene.role}</span></div>
          <div className={styles.screen}>
            <p className={styles.screenLabel}>{scene.label}</p>
            <div className={styles.foodArt} aria-hidden="true"><span>🥐</span><span>🥖</span><span>🥐</span></div>
            <strong className={styles.foodTitle}>Bakery surprise bag</strong>
            <p className={styles.store}>Neighborhood bakery</p>
            <div className={styles.price}><strong>$4</strong><del>$12</del><span>−67%</span></div>
            <div className={styles.receipt}>{step < 2 ? <><span>Pickup today</span><strong>5–6 PM</strong></> : <><span>{step === 2 ? "Reserved" : "Pickup code"}</span><strong>{step === 2 ? "1 bag · $4" : "RM–042"}</strong></>}</div>
            <div className={styles.confirmation}>{scene.action}<span aria-hidden="true">{step < 2 ? "↗" : "✓"}</span></div>
          </div>
        </div>
        <div className={styles.caption}><span className={styles.stepLabel}>0{step+1} / 04</span><h4>{scene.title}</h4><p>{scene.subtitle}</p></div>
      </div>
    </Link>
    <div className={styles.footer}>
      <div className={styles.progress} role="group" aria-label="Walkthrough scenes">{scenes.map((item,index) => <button type="button" key={item.title} aria-label={`Scene ${index+1}: ${item.title}`} aria-pressed={index === step} onClick={() => { setStep(index); }}>{["List", "Find", "Reserve", "Pickup"][index]}</button>)}</div>
    </div>
    <figcaption className={styles.note}>Simulated flow · Sample prices · Click to try</figcaption>
  </figure>;
}
