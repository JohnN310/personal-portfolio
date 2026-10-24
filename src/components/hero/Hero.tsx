import { Container, ActionLink } from "@/components/ui";
import { FluidParticles } from "./FluidParticles";
export function Hero() {
  return <section id="intro" className="hero"><FluidParticles /><Container className="hero-content">
    <div className="hero-heading">
      <p className="eyebrow hero-eyebrow"><span className="status-dot"/> JOHN NGUYEN / SOFTWARE + AI</p>
      <h1>I solve problems.</h1>
      <p className="hero-intro">Engineer, researcher, and co-founder of Remeli.</p>
      <div className="hero-actions"><ActionLink href="#work" variant="primary">Explore work</ActionLink></div>
    </div>

  </Container></section>;
}

