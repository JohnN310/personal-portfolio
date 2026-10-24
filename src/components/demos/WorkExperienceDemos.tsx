"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./WorkExperienceDemos.module.css";

const modules = ["Inspections", "Estimates", "Approvals", "Repairs", "Parts", "Posting"];
const moduleDescriptions = ["Check vehicle condition and capture findings.", "Review proposed work and estimated cost.", "Confirm the work before repairs begin.", "Track work through the service queue.", "Check parts needed for the repair.", "Prepare the vehicle for its next step."];
export function CoxWalkthrough() {
  const [module, setModule] = useState(0);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function loadNotes() {
    setLoading(true); setLoaded(false);
    timer.current = setTimeout(() => { setLoading(false); setLoaded(true); }, 1700);
  }
  return <section className={styles.demo} aria-label="Cox Automotive illustrative walkthrough">
    <div className={styles.top}><strong>Vehicle reconditioning</strong><span>COX AUTOMOTIVE</span></div>
    <div className={styles.shell}>
      <nav className={styles.sidebar} aria-label="Reconditioning modules">{modules.map((name, index) => <button type="button" key={name} aria-pressed={module === index} onClick={() => setModule(index)}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{name}</button>)}</nav>
      <div className={styles.workspace}>
        <div className={styles.vehicle}><span className={styles.car} aria-hidden="true">▰</span><div><strong>Sample sedan</strong><span>Stock DEMO-024 · In reconditioning</span></div></div>
        <div className={styles.screen} key={module}>
          <div className={styles.screenTitle}><h4>{modules[module]}</h4><span>{module + 1} / 6</span></div>
          {module === 0 ? <>
            <div className={styles.tabs} role="group" aria-label="Illustrative inspection tabs">{["Diagnostics", "Mechanical", "Review"].map((name, index) => <button type="button" key={name} aria-pressed={tab === index} onClick={() => setTab(index)}>{name}</button>)}</div>
            <div className={styles.checklist} key={tab}>{(tab === 0 ? ["Diagnostic scan", "Warning indicators", "Inspection findings"] : tab === 1 ? ["Brakes & tires", "Fluids & filters", "Service recommendations"] : ["Findings collected", "Work items reviewed", "Ready for estimate"]).map((name, index) => <div key={name}><span>{name}</span><span className={styles.tag}>{index === 2 ? "Review" : "Checked"}</span></div>)}</div>
          </> : <><p className={styles.description}>{moduleDescriptions[module]}</p><div className={styles.queue}><span>DEMO-024</span><strong>{["", "Estimate ready", "Awaiting approval", "Service queued", "Parts requested", "Ready to post"][module]}</strong><span className={styles.tag}>Sample status</span></div></>}
        </div>
        <div className={styles.notes}><div><strong>Vehicle notes</strong><button type="button" disabled={loading} onClick={loadNotes}>{loading ? "Loading…" : loaded ? "Load again" : "Load notes"}</button></div><p role="status">{loading ? "Retrieving sample notes…" : loaded ? "Loaded · Check tire pressure before the next inspection." : "Try the improved 1.7-second loading time."}</p></div>
      </div>
    </div>
    <div className={styles.result}><strong>66%<small>less waiting for notes</small></strong><div className={styles.bars}><div><span>Before</span><i style={{ width: "100%" }}/><b>5.0s</b></div><div><span>After</span><i style={{ width: "34%" }}/><b>1.7s</b></div></div></div>
    <div className={styles.footer}><span>Illustrative demo · Sample data<br/>Timing demonstrates the reported result.</span></div>
  </section>;
}
const records = [
  { name: "Access review", year: "2024", id: "DEMO-001", type: "User access control" },
  { name: "Change approval", year: "2024", id: "DEMO-002", type: "Change management" },
  { name: "Access review", year: "2023", id: "DEMO-003", type: "User access control" },
];
export function AuditWalkthrough() {
  const [name, setName] = useState("Access review");
  const [year, setYear] = useState("2024");
  const [state, setState] = useState<"idle" | "searching" | "found" | "empty">("idle");
  const [record, setRecord] = useState<typeof records[number] | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function search() {
    if (timer.current) clearTimeout(timer.current);
    const match = records.find(item => item.year === year && item.name.toLowerCase() === name.trim().toLowerCase());
    setState("searching"); setRecord(null);
    timer.current = setTimeout(() => { setRecord(match ?? null); setState(match ? "found" : "empty"); }, 900);
  }
  return <section className={`${styles.demo} ${styles.audit}`} aria-label="Norfolk Southern illustrative file retrieval demo">
    <div className={styles.top}><strong>Control file retrieval</strong><span>NORFOLK SOUTHERN</span></div>
    <div className={styles.auditBody}>
      <div className={styles.flow} aria-label="Retrieval stages"><span data-active={state === "idle"}>01 Search</span><span data-active={state === "searching"}>02 Match</span><span data-active={state === "found"}>03 Open</span></div>
      <form className={styles.search} onSubmit={event => { event.preventDefault(); search(); }}>
        <label>File name<input value={name} maxLength={80} required onChange={event => { setName(event.target.value); setState("idle"); setRecord(null); if(timer.current) clearTimeout(timer.current); }}/></label>
        <label>Control year<select value={year} onChange={event => { setYear(event.target.value); setState("idle"); setRecord(null); if(timer.current) clearTimeout(timer.current); }}><option>2024</option><option>2023</option></select></label>
        <button type="submit" disabled={state === "searching"}>{state === "searching" ? "Finding…" : "Find file ↗"}</button>
      </form>
      <p className={styles.hint}>Try “Access review” or “Change approval” for 2024.</p>
      <div className={styles.document} aria-live="polite" aria-busy={state === "searching"}>
        {record ? <div className={styles.paper}><div><span>SAMPLE CONTROL FILE</span><span>{record.id}</span></div><h4>{record.name}</h4><p>{record.type} · {record.year}</p><hr/><p><strong>Evidence checklist</strong></p><p>Review owner assigned<br/>Supporting evidence attached<br/>Ready for auditor review</p><span className={styles.stamp}>File opened ✓</span></div> : <div className={styles.empty}><span aria-hidden="true">{state === "searching" ? "⋯" : "⌕"}</span><strong>{state === "searching" ? "Matching name + year" : state === "empty" ? "No sample file found" : "Your evidence, one search away."}</strong><p>{state === "empty" ? "Try Access review for 2023 or 2024." : "A matching sample file opens here."}</p></div>}
      </div>
    </div>
    <div className={styles.result}><strong>91%+<small>less retrieval time</small></strong><div className={styles.time}><del>60s</del><span aria-hidden="true">→</span><b>5s</b></div></div>
    <div className={styles.footer}><span>Fictional records · Accelerated demo<br/>Reported retrieval time: 60 → 5 seconds.</span></div>
  </section>;
}
