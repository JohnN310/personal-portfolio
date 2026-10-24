"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./Demos.module.css";
const steps = [
  { name: "Scan", detail: "Read the Smalltalk project and identify methods.", code: "Counter >> increment\n    count := count + 1.\n    ^ count", file: "Counter.st" },
  { name: "Translate", detail: "Convert the method into Java.", code: "int increment() {\n    count = count + 1;\n    return count;\n}", file: "Counter.java" },
  { name: "Evaluate", detail: "Check the translated behavior against the source.", code: "Source: count + 1\nJava:   count + 1\nReturn: updated count", file: "Behavior review" },
  { name: "Dependencies", detail: "Assemble the class and required dependencies.", code: "class Counter {\n  private int count = 0;\n  int increment() {\n    return ++count;\n  }\n}", file: "Counter.java" },
  { name: "Test", detail: "Check that successive calls update the counter.", code: "Counter c = new Counter();\nassert c.increment() == 1;\nassert c.increment() == 2;", file: "Example checks" },
  { name: "Evaluate again", detail: "Review the test results and final Java output.", code: "class Counter {\n  private int count = 0;\n  int increment() {\n    return ++count;\n  }\n}", file: "Java output" },
];
export function AgentFlowDemo({
  href,
  ariaLabel = "Open Agentic AI and explore the framework",
}: {
  href?: string;
  ariaLabel?: string;
} = {}) {
  const [step, setStep] = useState(0), [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true), [visible, setVisible] = useState(false);
  const root = useRef<HTMLElement>(null);
  useEffect(() => { const query = matchMedia("(prefers-reduced-motion: reduce)"); const sync = () => setReduced(query.matches); sync(); query.addEventListener("change",sync); const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting)); if (root.current) observer.observe(root.current); return () => { query.removeEventListener("change",sync); observer.disconnect(); }; }, []);
  useEffect(() => { if (paused || reduced || !visible) return; const timer = setInterval(() => { if (!document.hidden) setStep(value => (value+1)%steps.length); }, 2600); return () => clearInterval(timer); }, [paused,reduced,visible]);
  const current = steps[step];
  const preview = (
    <>
      <div className={styles.codePane}>
        <div><span>{current.file}</span><span className={styles.blue}>Agent {step+1}{href ? " ↗" : ""}</span></div>
        <pre><code>{current.code}</code></pre>
      </div>
      <p className={styles.explanation}>{current.detail}</p>
    </>
  );

  return <section ref={root} className={styles.demo} aria-label="Animated six-agent migration walkthrough">
    <div className={styles.top}><strong>Smalltalk <span className={styles.blue}>→</span> Java</strong><span className={styles.note}>{step+1} / 6</span></div>
    <p className={styles.note}>{href ? "Illustrative walkthrough · Click to explore framework" : "Illustrative walkthrough · No live code execution"}</p>
    <ol className={styles.flow}>{steps.map((item,index) => <li key={item.name}><button type="button" aria-current={step === index ? "step" : undefined} onClick={() => { setStep(index); setPaused(true); }}><span>{index < step ? "✓" : index+1}</span>{item.name}</button></li>)}</ol>
    <div className={styles.handoff} aria-hidden="true"><span key={step} className={!paused && !reduced && visible ? styles.movingPacket : undefined}/></div>
    {href ? (
      <Link href={href} className={styles.preview} aria-label={ariaLabel}>
        {preview}
      </Link>
    ) : (
      preview
    )}
    <div className={styles.playback}><button type="button" onClick={() => { setStep(0); setPaused(true); }}>Restart</button>{!reduced && <button type="button" onClick={() => setPaused(value => !value)}>{paused ? "Play" : "Pause"}</button>}<button type="button" onClick={() => { setStep(value => (value+1)%steps.length); setPaused(true); }}>Next step →</button></div>
    {reduced && <p className={styles.note}>Reduced motion: use the steps to advance.</p>}
  </section>;
}
