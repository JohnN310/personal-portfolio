export type ProjectSlug = "remeli" | "agentic-migration" | "fraud-detection" | "malware-research" | "cox-automotive" | "norfolk-southern";
export interface EvidenceMetric { value: string; label: string; qualifier: string; }
export interface Project {
  slug: ProjectSlug; number: string; title: string; category: string; headline: string;
  summary: string; role: string; dates: string; problem: string; built: string;
  challenge: string; outcome: string;
  metrics: EvidenceMetric[]; technologies: string[];
}
