import { Container, SectionIntro } from "@/components/ui";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  return <section id="about" className="about-section section-space">
    <Container className="about-grid">
      <div className={styles.art} aria-hidden="true">
        <svg viewBox="0 0 400 400" fill="none">
          <path d="M40 100H360M40 200H360M40 300H360M100 40V360M200 40V360M300 40V360" stroke="#1b2532" strokeWidth="1"/>
          <rect x="94" y="94" width="212" height="212" rx="36" transform="rotate(-12 200 200)" fill="#0b111b" stroke="#263b55"/>
          <rect x="94" y="94" width="212" height="212" rx="36" transform="rotate(8 200 200)" fill="#101c2b" stroke="#42648b"/>
          <path d="M135 158H179V218Q179 242 157 242Q135 242 135 224M213 242V158L265 242V158" stroke="#bdd6f5" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="100" cy="100" r="4" fill="#3186ff"/><circle cx="300" cy="300" r="4" fill="#00b95c"/>
        </svg>
      </div>
      <div className="about-copy">
        <SectionIntro eyebrow="4" title="About"/>
        <p>I’m John — engineer, AI researcher, and co-founder of Remeli.</p>
        <div className="education"><span className="education-mark" aria-hidden="true">GT</span><div><strong>Georgia Institute of Technology</strong><span>MS Computer Science</span><span>BS Computer Science</span></div></div>
      </div>
    </Container>
  </section>;
}
