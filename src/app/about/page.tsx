import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import ContactButton from "@/components/ContactButton";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About — Emilita D. Cristobal",
  description:
    "Learn about Emilita D. Cristobal — a UI/UX Designer passionate about crafting intuitive, high-impact digital experiences.",
};

const skills = [
  {
    icon: "🎨",
    name: "Interface Design & Prototyping",
    desc: "Crafting pixel-perfect, accessible interfaces with Figma, interactive flows, and cohesive design token architectures.",
  },
  {
    icon: "🧠",
    name: "UX Research & Information Architecture",
    desc: "Conducting user interviews, journey mapping, and usability audits to uncover actionable insights and frictionless user paths.",
  },
  {
    icon: "📱",
    name: "Mobile Ecosystem Design",
    desc: "Architecting touch-friendly mobile products for iOS and Android with strict adherence to Apple HIG and Material Design.",
  },
  {
    icon: "🖥️",
    name: "SaaS & High-Density Dashboards",
    desc: "Structuring complex data tables, e-commerce back-offices, and multi-tier management workflows.",
  },
  {
    icon: "🎯",
    name: "Design Systems & Token Libraries",
    desc: "Building scalable auto-layout components, variant sets, and documented token guidelines for seamless developer hand-off.",
  },
  {
    icon: "⚡",
    name: "Interaction & Micro-Animations",
    desc: "Designing tactile state transitions, gestures, and celebratory moments that elevate product engagement.",
  },
];

const approach = [
  {
    step: "Phase 01",
    title: "Research & Problem Discovery",
    desc: "I begin by deeply understanding user behavior, business KPIs, and technical constraints. Through stakeholder interviews, competitor benchmarking, and journey maps, I uncover the core problems to solve.",
  },
  {
    step: "Phase 02",
    title: "Wireframing & Rapid Iteration",
    desc: "Moving from low-fidelity architecture to interactive high-fidelity prototypes. Every design choice—from typography scale to color contrast—is purposeful, tested, and refined through usability feedback.",
  },
  {
    step: "Phase 03",
    title: "Design Systems & Production Hand-off",
    desc: "Delivering fully documented design tokens, component variants, and interactive states to engineering teams, ensuring flawless fidelity from Figma canvas to production code.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero / Bio */}
      <section className={styles.aboutHero} id="about-hero">
        <div className={`container ${styles.aboutHeroInner}`}>
          <ScrollReveal direction="left">
            <TiltCard maxTilt={5}>
              <div className={styles.aboutImageWrapper}>
                <Image
                  src="/images/profile.png"
                  alt="Emilita D. Cristobal — UI/UX Designer"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  sizes="(max-width: 1024px) 360px, 420px"
                />
                <div className={styles.statusBadge}>
                  <span className={styles.statusDot} />
                  <span>Available for UI/UX Roles</span>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div>
              <span className="section-label">About Emilita</span>
              <h1 className={styles.aboutName}>Emilita D. Cristobal</h1>
              <span className={styles.aboutRole}>Senior UI/UX Designer</span>
              <p className={styles.aboutBio}>
                Hi, I&apos;m Emilita — a UI/UX designer passionate about designing
                interfaces that feel effortless, intuitive, and visually elevated.
                My work centers on solving complex operational and consumer problems
                through clean information hierarchy and human-centered design.
              </p>
              <p className={styles.aboutBio}>
                From real-time transit tracking systems like <strong>BusWatch</strong> to luxury
                e-commerce dashboard architectures like <strong>Verae</strong>, I combine strategic
                research with pixel-level precision to build products people love using.
              </p>

              <div className={styles.aboutContact}>
                <ContactButton className="btn btn--primary">
                  Say Hello
                </ContactButton>
                <Link href="/work" className="btn btn--outline">
                  View Case Studies
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Skills (Apple Bento Grid) */}
      <section className={styles.skills} id="skills">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="section-label">Capabilities</span>
              <h2 className="section-title">Skills & Disciplines</h2>
              <p className="section-description">
                The technical expertise, design frameworks, and tools I use to deliver end-to-end digital products.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.skillsGrid}>
            {skills.map((skill, i) => (
              <ScrollReveal key={skill.name} delay={i * 0.06}>
                <div className={styles.skillCard}>
                  <div className={styles.skillIcon}>{skill.icon}</div>
                  <h3 className={styles.skillName}>{skill.name}</h3>
                  <p className={styles.skillDesc}>{skill.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Design Approach */}
      <section className={styles.approach} id="approach">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="section-label">Methodology</span>
              <h2 className="section-title">My Design Approach</h2>
              <p className="section-description">
                A structured, user-validated framework engineered for clarity, speed, and cross-functional collaboration.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.approachGrid}>
            {approach.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className={styles.approachCard}>
                  <span className={styles.approachStepPill}>{item.step}</span>
                  <h3 className={styles.approachTitle}>{item.title}</h3>
                  <p className={styles.approachDesc}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={styles.contact} id="contact">
        <div className="container">
          <ScrollReveal>
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title">
              Let&apos;s collaborate on your next product
            </h2>
            <p className="section-description" style={{ margin: "0 auto" }}>
              I&apos;m currently open to full-time UI/UX design opportunities, freelance projects, and creative collaborations.
            </p>
            <ContactButton
              className={styles.contactEmail}
              style={{
                display: "inline-block",
                marginTop: "1.5rem",
                cursor: "pointer",
              }}
            >
              cristobalemilita@gmail.com
            </ContactButton>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
