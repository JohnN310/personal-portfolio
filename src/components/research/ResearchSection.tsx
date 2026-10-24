import { projects } from "@/content/projects";
import { ActionLink, Container, SectionIntro, StoryDisclosure } from "@/components/ui";
import { FraudChart } from "@/components/demos/FraudChart";
import { MalwareWalkthrough } from "@/components/demos/MalwareWalkthrough";
import styles from "./ResearchSection.module.css";

export function ResearchSection() {
  return <section id="research" className="research-section section-space">
    <Container>
      <div className="section-heading-row">
        <SectionIntro eyebrow="2" title="Research Experience"/>
      </div>
      <div className={`research-grid ${styles.grid}`}>
        {projects.filter(project => project.slug === "fraud-detection" || project.slug === "malware-research").map((project, index) => <article className={`research-feature ${styles.feature}`} key={project.slug}>
          {index === 1 ? (
            <MalwareWalkthrough compact/>
          ) : (
            <FraudChart compact/>
          )}
          <div className={`research-copy ${styles.copy}`}>
            <p className="eyebrow">{project.category}</p>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <div className="research-stat">
              <strong>{project.metrics[1].value}</strong>
              <span>{project.metrics[1].label}<small>{project.metrics[1].qualifier}</small></span>
            </div>
            <StoryDisclosure title="Method and evidence"><p>{project.challenge}</p><p>{project.outcome}</p></StoryDisclosure>
            <ActionLink href={`/work/${project.slug}`}>Explore the research</ActionLink>
          </div>
        </article>)}
      </div>
    </Container>
  </section>;
}
