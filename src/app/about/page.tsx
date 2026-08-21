import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Emilita D. Cristobal — a UI/UX Designer passionate about crafting intuitive, high-impact digital experiences.",
};

const skills = [
  {
    icon: "🎨",
    name: "UI Design & Prototyping",
    desc: "Crafting pixel-perfect, accessible interfaces with Figma, interactive flows, and cohesive design tokens.",
  },
  {
    icon: "🧠",
    name: "UX Research & Strategy",
    desc: "Conducting user interviews, journey mapping, and usability audits to uncover actionable insights.",
  },
  {
    icon: "📱",
    name: "Mobile App Design",
    desc: "Architecting touch-friendly mobile products for iOS and Android with strict adherence to HIG and Material 3.",
  },
  {
    icon: "🖥️",
    name: "Web & SaaS Dashboards",
    desc: "Structuring high-density data tables, e-commerce back-offices, and responsive multi-tier web platforms.",
  },
  {
    icon: "🎯",
    name: "Design Systems",
    desc: "Building scalable component libraries, auto-layout foundations, and variant architectures.",
  },
  {
    icon: "⚡",
    name: "Interaction & Micro-Animations",
    desc: "Designing state transitions, gestures, and celebratory moments that elevate user engagement.",
  },
];

const approach = [
  {
    title: "1. Research & Discovery",
    desc: "I begin by deeply understanding user behavior, business KPIs, and technical constraints. Through stakeholder interviews, competitor benchmarking, and journey maps, I uncover the core problems to solve.",
  },
  {
    title: "2. Wireframing & Iterative Design",
    desc: "Moving from low-fidelity sketches to interactive high-fidelity prototypes. Every design choice—from typography scale to color contrast—is purposeful, tested, and refined through usability feedback.",
  },
  {
    title: "3. Design System & Developer Hand-off",
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
            <TiltCard maxTilt={6}>
              <div className={styles.aboutImageWrapper}>
                <Image
                  src="/images/profile.jpg"
                  alt="Emilita D. Cristobal — UI/UX Designer"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  sizes="(max-width: 1024px) 320px, 420px"
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
              <span className="section-label">About Me</span>
              <h1 className={styles.aboutName}>Emilita D. Cristobal</h1>
              <span className={styles.aboutRole}>UI/UX Designer</span>
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
                <a
                  href="mailto:cristobalemilita@gmail.com"
                  className="btn btn--primary"
                >
                  Say Hello
                </a>
                <Link href="/work" className="btn btn--outline">
                  View Work
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Skills */}
      <section className={styles.skills} id="skills">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="section-label">Expertise</span>
              <h2 className="section-title">Skills & Disciplines</h2>
              <p className="section-description">
                The technical expertise, design frameworks, and tools I use to deliver end-to-end digital products.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.skillsGrid}>
            {skills.map((skill, i) => (
              <ScrollReveal key={skill.name} delay={i * 0.08}>
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
              <span className="section-label">Design Methodology</span>
              <h2 className="section-title">My Approach</h2>
              <p className="section-description">
                A structured, user-validated framework engineered for clarity, speed, and cross-functional collaboration.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.approachGrid}>
            {approach.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.15}>
                <div className={styles.approachCard}>
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
            <a
              href="mailto:cristobalemilita@gmail.com"
              className={styles.contactEmail}
            >
              cristobalemilita@gmail.com
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
