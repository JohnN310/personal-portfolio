import { leadership } from "@/content/experience";
import { Container, SectionIntro } from "@/components/ui";

export function LeadershipSection() {
  return <section id="leadership" className="leadership-section section-space">
    <Container>
      <div className="section-heading-row"><SectionIntro title="Leadership Experience"/></div>
      <div className="timeline">
        {leadership.map(item => <details className="experience-entry" key={item.organization}>
          <summary>
            <span className="company-mark leadership-mark" aria-hidden="true">{item.mark}</span>
            <span className="experience-identity"><strong>{item.organization}</strong><span>{item.role}</span></span>
            <span className="experience-date">{item.date}</span>
            <span className="experience-plus" aria-hidden="true">+</span>
          </summary>
          <div className="experience-detail"><p>{item.detail}</p></div>
        </details>)}
      </div>
    </Container>
  </section>;
}
