import type { ReactNode } from "react";
import type { Project } from "@/content/types";
import { ActionLink, EvidenceMetric, TechnologyList } from "@/components/ui";
export function ProjectFeature({ project, children, reverse = false }: { project: Project; children: ReactNode; reverse?: boolean }) { return <article id={project.slug === "remeli" ? "remeli" : "agentic-ai"} className={`project-feature ${reverse ? "project-reverse" : ""}`}>
  <div className="project-copy"><p className="eyebrow">{project.category}</p><h3>{project.headline.split("\n").map((line, i) => <span key={line}>{i > 0 && <br/>}{line}</span>)}</h3><p className="project-description">{project.summary}</p><div className="project-metrics">{project.metrics.map(metric => <EvidenceMetric key={metric.label} {...metric}/>)}</div><TechnologyList items={project.technologies.slice(0,4)}/><ActionLink href={`/work/${project.slug}`}>Inside the {project.slug === "remeli" ? "build" : "framework"}</ActionLink></div><div className="project-visual">{children}</div>
</article>; }
