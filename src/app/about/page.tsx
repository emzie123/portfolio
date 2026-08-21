import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Emilita D. Cristobal — a UI/UX Designer passionate about creating thoughtful, elegant digital experiences.",
};

const skills = [
  {
    icon: "🎨",
    name: "UI Design",
    desc: "Crafting pixel-perfect interfaces with attention to hierarchy, spacing, and visual consistency.",
  },
  {
    icon: "🧠",
    name: "UX Research",
    desc: "Understanding user needs through research, personas, and journey mapping.",
  },
  {
    icon: "📱",
    name: "Mobile Design",
    desc: "Designing intuitive mobile experiences for iOS and Android platforms.",
  },
  {
    icon: "🖥️",
    name: "Web Design",
    desc: "Creating responsive, accessible web interfaces that look great on every device.",
  },
  {
    icon: "✏️",
    name: "Prototyping",
    desc: "Building interactive prototypes to validate design decisions early.",
  },
  {
    icon: "🎯",
    name: "Design Systems",
    desc: "Creating scalable component libraries and design tokens for consistency.",
  },
];

const approach = [
  {
    title: "Research & Discover",
    desc: "Every project starts with understanding — the users, the business, and the problem space. I dive deep into research to uncover insights that drive meaningful design decisions.",
  },
  {
    title: "Design & Iterate",
    desc: "From wireframes to high-fidelity mockups, I explore multiple directions and refine through iteration. Each design choice is intentional and purposeful.",
  },
  {
    title: "Deliver & Refine",
    desc: "I work closely with stakeholders to ensure pixel-perfect delivery. Post-launch, I analyze performance and iterate to continuously improve the experience.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero / Bio */}
      <section className={styles.aboutHero} id="about-hero">
        <div className={`container ${styles.aboutHeroInner}`}>
          <ScrollReveal direction="left">
            <div className={styles.aboutImageWrapper}>
              <div className={styles.aboutPlaceholder}>E</div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div>
              <span className="section-label">About Me</span>
              <h1 className={styles.aboutName}>Emilita D. Cristobal</h1>
              <span className={styles.aboutRole}>UI/UX Designer</span>
              <p className={styles.aboutBio}>
                I&apos;m a UI/UX designer who believes that great design is
                invisible — it simply works. My approach combines aesthetic
                sensibility with user-centered thinking to create digital
                experiences that are both beautiful and functional.
              </p>
              <p className={styles.aboutBio}>
                I&apos;m passionate about the intersection of design and
                technology, always exploring new tools and techniques to push the
                boundaries of what&apos;s possible in digital product design.
              </p>

              <div className={styles.aboutContact}>
                <a
                  href="mailto:cristobalemilita@gmail.com"
                  className="btn btn--primary"
                >
                  Say Hello
                </a>
                <a href="/work" className="btn btn--outline">
                  View Work
                </a>
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
              <h2 className="section-title">Skills & Tools</h2>
              <p className="section-description">
                The tools and disciplines I use to bring ideas to life.
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
              <span className="section-label">Process</span>
              <h2 className="section-title">My Approach</h2>
              <p className="section-description">
                A structured yet flexible methodology that delivers results.
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
              Let&apos;s create something great together
            </h2>
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
