import Image from "next/image";
import Link from "next/link";
import { reader } from "@/lib/reader";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import HeroAnimation from "@/components/HeroAnimation";
import ContactButton from "@/components/ContactButton";
import styles from "./home.module.css";

export default async function HomePage() {
  let featuredProjects: Array<{
    slug: string;
    title: string;
    summary: string;
    category: string;
    year: string;
    coverImage: string | null;
  }> = [];

  try {
    const allProjects = await reader.collections.projects.all();
    featuredProjects = allProjects
      .filter((p) => p.entry.featured)
      .sort((a, b) => (a.entry.sortOrder ?? 0) - (b.entry.sortOrder ?? 0))
      .slice(0, 2)
      .map((p) => ({
        slug: p.slug,
        title: p.entry.title,
        summary: p.entry.summary,
        category: p.entry.category,
        year: p.entry.year,
        coverImage: p.entry.coverImage,
      }));

    if (featuredProjects.length === 0) {
      featuredProjects = allProjects.slice(0, 2).map((p) => ({
        slug: p.slug,
        title: p.entry.title,
        summary: p.entry.summary,
        category: p.entry.category,
        year: p.entry.year,
        coverImage: p.entry.coverImage,
      }));
    }
  } catch {
    // CMS fallback
  }

  return (
    <>
      {/* Apple Keynote Hero */}
      <section className={styles.hero} id="hero">
        <div className={`container ${styles.heroInner}`}>
          <HeroAnimation />

          <div className={styles.heroContent}>
            <div className={styles.heroBadge} data-hero="label">
              <span className={styles.heroBadgeDot} />
              <span>UI/UX Designer & Product Thinker</span>
            </div>

            <h1 className={styles.heroTitle} data-hero="title">
              <span>Designing digital experiences that feel</span>
              <span className={styles.heroTitleGradient}>second nature.</span>
            </h1>

            <p className={styles.heroDescription} data-hero="description">
              Hi, I&apos;m Emilita — crafting human-centered mobile ecosystems,
              high-density web dashboards, and luxury e-commerce platforms with
              meticulous attention to information architecture.
            </p>

            <div className={styles.heroCTA} data-hero="cta">
              <Link href="/work" className="btn btn--primary">
                Explore Case Studies
              </Link>
              <ContactButton className="btn btn--outline">
                Get in Touch
              </ContactButton>
            </div>
          </div>

          <div className={styles.heroVisual} data-hero="visual">
            <div className={styles.heroVisualCard}>
              <div className={styles.heroImageWrapper}>
                <Image
                  src="/images/profile.png"
                  alt="Emilita D. Cristobal — UI/UX Designer"
                  fill
                  sizes="(max-width: 1024px) 380px, 440px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div>
            <div className={styles.heroDecorGlow} />
          </div>
        </div>
      </section>

      {/* Featured Bento Projects */}
      {featuredProjects.length > 0 && (
        <section className={styles.featured} id="featured-work">
          <div className="container">
            <ScrollReveal>
              <div className={styles.featuredHeader}>
                <div>
                  <span className="section-label">Selected Work</span>
                  <h2 className="section-title">Crafted with Precision</h2>
                  <p className="section-description">
                    Deep dives into end-to-end product design, interface systems, and user journeys.
                  </p>
                </div>
                <Link href="/work" className={styles.viewAllLink}>
                  All Projects →
                </Link>
              </div>
            </ScrollReveal>

            <div className={styles.featuredGrid}>
              {featuredProjects.map((project, i) => (
                <ScrollReveal key={project.slug} delay={i * 0.15}>
                  <ProjectCard
                    slug={project.slug}
                    title={project.title}
                    summary={project.summary}
                    category={project.category}
                    year={project.year}
                    coverImage={
                      project.slug === "buswatch"
                        ? "/images/projects/buswatch/live-tracking.png"
                        : "/images/projects/verae/orders-ledger.png"
                    }
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cupertino Bento Stats & Philosophy */}
      <section className={styles.aboutTeaser} id="about-teaser">
        <div className={`container ${styles.aboutInner}`}>
          <ScrollReveal direction="left">
            <div className={styles.aboutContent}>
              <span className="section-label">Design Philosophy</span>
              <h2>Form follows clarity. Every pixel serves a purpose.</h2>
              <p>
                Great design isn&apos;t just what it looks like — it&apos;s how seamlessly it works.
                I bridge user empathy with business precision to build products that are intuitive,
                delightful, and effortless to navigate.
              </p>
              <Link href="/about" className="btn btn--primary">
                More About Emilita →
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>Figma Design Systems</div>
                <p className={styles.statDesc}>
                  Scalable component tokens, responsive auto-layouts, and interactive prototypes.
                </p>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statNumber}>2+</div>
                <div className={styles.statLabel}>Featured Ecosystems</div>
                <p className={styles.statDesc}>
                  Real-time mobile tracking and luxury web dashboard platforms.
                </p>
              </div>

              <div className={`${styles.statCard} ${styles.statCardWide}`}>
                <div className={styles.statNumber}>End-to-End</div>
                <div className={styles.statLabel}>Human-Centered Methodology</div>
                <p className={styles.statDesc}>
                  User research, information architecture, wireframing, high-fidelity UI, and developer collaboration.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
