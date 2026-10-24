import { profile } from "@/content/profile";
import { Container, Arrow, SectionIntro } from "@/components/ui";
import { CopyEmailButton } from "./CopyEmailButton";
export function ContactSection() { return <section id="contact" className="contact-section"><Container><div className="contact-top"><SectionIntro eyebrow="5" title="Contact"/><span className="contact-spark" aria-hidden="true">✳</span></div><div className="contact-bottom"><div className="contact-email-group"><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<Arrow diagonal/></a><CopyEmailButton email={profile.email}/></div><div className="social-links"><a href={profile.github}>GitHub <Arrow diagonal/></a><a href={profile.linkedin}>LinkedIn <Arrow diagonal/></a></div></div></Container></section>; }
