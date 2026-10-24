import { Hero } from "@/components/hero/Hero";
import { Container } from "@/components/ui";
import { ProjectFeature } from "@/components/work/ProjectFeature";
import { RemeliDiagram } from "@/components/work/RemeliDiagram";
import { AgentPipeline } from "@/components/work/AgentPipeline";
import { ResearchSection } from "@/components/research/ResearchSection";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { LeadershipSection } from "@/components/leadership/LeadershipSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { projects } from "@/content/projects";
export default function Page() { return <main id="main"><Hero/><section id="work" className="work-section section-space" aria-label="Selected projects"><Container><ProjectFeature project={projects[0]}><RemeliDiagram href={`/work/${projects[0].slug}`}/></ProjectFeature><ProjectFeature project={projects[1]} reverse><AgentPipeline compact href={`/work/${projects[1].slug}`}/></ProjectFeature></Container></section><ResearchSection/><ExperienceTimeline/><LeadershipSection/><AboutSection/><ContactSection/></main>; }


