import Image from "next/image";
import Link from "next/link";
import { reader } from "@/lib/reader";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import HeroAnimation from "@/components/HeroAnimation";
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

    // If no featured projects, just get the latest 2
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
    // CMS not initialized yet
  }

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero} id="hero">
        <div className={`container ${styles.heroInner}`}>
          <HeroAnimation />

          <div className={styles.heroContent}>
            <span className={styles.heroLabel} data-hero="label">
              UI/UX Designer
            </span>

            <h1 className={styles.heroTitle} data-hero="title">
              <span>Crafting</span>
              <span className={styles.heroTitleAccent}>
                Digital Experiences
              </span>
              <span>That Resonate</span>
            </h1>

            <p className={styles.heroDescription} data-hero="description">
              Hi, I&apos;m Emilita — a UI/UX designer passionate about creating
              intuitive, elegant interfaces that bridge the gap between user
              needs and business goals.
            </p>

            <div className={styles.heroCTA} data-hero="cta">
              <Link href="/work" className="btn btn--primary">
                View My Work
              </Link>
              <a
                href="mailto:cristobalemilita@gmail.com"
                className="btn btn--outline"
              >
                Get in Touch
              </a>
            </div>
          </div>

          <div className={styles.heroVisual} data-hero="visual">
            <div className={styles.heroImageWrapper}>
              <Image
                src="/images/hero.jpg"
                alt="UI/UX Design composition"
                fill
                sizes="(max-width: 1024px) 360px, 480px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div
              className={`${styles.heroDecor} ${styles.heroDecor1}`}
              data-hero="decor1"
            />
            <div
              className={`${styles.heroDecor} ${styles.heroDecor2}`}
              data-hero="decor2"
            />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className={`${styles.featured} section`} id="featured-work">
          <div className="container">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-label">Selected Work</span>
                <h2 className="section-title">Recent Projects</h2>
                <p className="section-description">
                  A curated collection of my latest UI/UX design work across mobile applications and web dashboard platforms.
                </p>
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
                      project.coverImage ||
                      (project.slug === "buswatch"
                        ? "/images/projects/buswatch/live-tracking.png"
                        : "/images/projects/verae/orders.png")
                    }
                  />
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <div className={styles.viewAll}>
                <Link href="/work" className="btn btn--ghost">
                  View all projects →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* About Teaser */}
      <section className={styles.aboutTeaser} id="about-teaser">
        <div className={`container ${styles.aboutInner}`}>
          <ScrollReveal direction="left">
            <div className={styles.aboutContent}>
              <span className="section-label">About Me</span>
              <h2>Designing with purpose, building with precision</h2>
              <p>
                With a keen eye for detail and a user-first approach, I create
                digital experiences that are not only beautiful but also
                functional and accessible. Every pixel has a purpose.
              </p>
              <Link href="/about" className="btn btn--primary">
                Learn More About Me
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>2+</div>
                <div className={styles.statLabel}>Featured Case Studies</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>UI/UX</div>
                <div className={styles.statLabel}>Specialization</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>Client Commitment</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
