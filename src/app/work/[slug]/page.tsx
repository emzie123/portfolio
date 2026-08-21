import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { reader } from "@/lib/reader";
import ScrollReveal from "@/components/ScrollReveal";
import MarkdocRenderer from "@/components/MarkdocRenderer";
import styles from "./caseStudy.module.css";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const projects = await reader.collections.projects.all();
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const project = await reader.collections.projects.read(slug);
    if (!project) return { title: "Project Not Found" };

    return {
      title: project.title,
      description: project.summary,
    };
  } catch {
    return { title: "Project Not Found" };
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;

  let project;
  let allSlugs: string[] = [];

  try {
    project = await reader.collections.projects.read(slug);
    const allProjects = await reader.collections.projects.all();
    allSlugs = allProjects.map((p) => p.slug);
  } catch {
    notFound();
  }

  if (!project) {
    notFound();
  }

  const currentIndex = allSlugs.indexOf(slug);
  const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const nextSlug =
    currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;

  // Render content from markdoc
  const contentDocument = await project.content();

  return (
    <article id={`case-study-${slug}`}>
      {/* Hero */}
      <section className={styles.caseHero}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.caseHeroInner}>
              <div className={styles.caseMeta}>
                <span className={styles.caseCategory}>{project.category}</span>
                <span className={styles.caseDot} />
                <span className={styles.caseYear}>{project.year}</span>
              </div>
              <h1 className={styles.caseTitle}>{project.title}</h1>
              <p className={styles.caseSummary}>{project.summary}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Cover Image */}
      <div className="container">
        <ScrollReveal direction="scale">
          {project.coverImage && (
            <div className={styles.caseCover}>
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}
        </ScrollReveal>

        {/* Info Bar */}
        <ScrollReveal>
          <div className={styles.infoBar}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Role</span>
              <span className={styles.infoValue}>{project.role}</span>
            </div>
            {project.client && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Client</span>
                <span className={styles.infoValue}>{project.client}</span>
              </div>
            )}
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Year</span>
              <span className={styles.infoValue}>{project.year}</span>
            </div>
            {project.techStack && project.techStack.length > 0 && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Tech Stack</span>
                <div className={styles.techTags}>
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {project.liveUrl && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Live Site</span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.liveLink}
                >
                  Visit ↗
                </a>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Content */}
        <ScrollReveal>
          <div className={styles.contentBody}>
            {contentDocument?.node && (
              <MarkdocRenderer node={contentDocument.node} />
            )}
          </div>
        </ScrollReveal>

        {/* Navigation */}
        <nav className={styles.caseNav}>
          {prevSlug ? (
            <Link href={`/work/${prevSlug}`} className={styles.caseNavLink}>
              <span className={styles.caseNavLabel}>← Previous</span>
              <span className={styles.caseNavTitle}>Previous Project</span>
            </Link>
          ) : (
            <div />
          )}
          {nextSlug ? (
            <Link
              href={`/work/${nextSlug}`}
              className={`${styles.caseNavLink} ${styles.caseNavRight}`}
            >
              <span className={styles.caseNavLabel}>Next →</span>
              <span className={styles.caseNavTitle}>Next Project</span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </article>
  );
}
