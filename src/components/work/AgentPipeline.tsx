import { AgentFlowDemo } from "@/components/demos/AgentFlowDemo";

const stages = [
  ["Scanning", "Analyze the source code before conversion."],
  ["Translation", "Smalltalk-to-Java and SQL-to-Java conversion tools handle the two migration paths."],
  ["Evaluation", "Review the translated behavior against the source and review results again after testing."],
  ["Dependencies", "Generate dependencies needed by the converted code."],
  ["Testing", "Include testing in the workflow, beyond text generation alone."],
];
export function AgentPipeline({
  compact = false,
  href = compact ? "/work/agentic-migration" : undefined,
  ariaLabel,
}: {
  compact?: boolean;
  href?: string;
  ariaLabel?: string;
} = {}) {
  return <div>
    <AgentFlowDemo href={href} ariaLabel={ariaLabel}/>
    {!compact && <div className="diagram-controls pipeline-controls">{stages.map(([title,detail]) => <details key={title}><summary>{title}<span aria-hidden="true">+</span></summary><p>{detail}</p></details>)}</div>}
  </div>;
}
