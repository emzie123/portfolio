import type { Metadata } from "next";
import { reader } from "@/lib/reader";
import ScrollReveal from "@/components/ScrollReveal";
import WorkGallery from "./WorkGallery";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore the UI/UX design portfolio of Emilita D. Cristobal — featuring web design, mobile design, and UI mockup projects.",
};

export default async function WorkPage() {
  let projects: Array<{
    slug: string;
    title: string;
    summary: string;
    category: string;
    year: string;
    coverImage: string | null;
  }> = [];

  try {
    const allProjects = await reader.collections.projects.all();
    projects = allProjects
      .sort((a, b) => (a.entry.sortOrder ?? 0) - (b.entry.sortOrder ?? 0))
      .map((p) => ({
        slug: p.slug,
        title: p.entry.title,
        summary: p.entry.summary,
        category: p.entry.category,
        year: p.entry.year,
        coverImage: p.entry.coverImage,
      }));
  } catch {
    // CMS not initialized yet
  }

  return (
    <section className="section" id="work-page">
      <div className="container">
        <ScrollReveal>
          <div className={styles.pageHeader}>
            <span className="section-label">Portfolio</span>
            <h1 className={styles.pageTitle}>My Work</h1>
            <p className={styles.pageDescription}>
              A curated selection of UI/UX projects spanning web, mobile, and
              product design.
            </p>
          </div>
        </ScrollReveal>

        <WorkGallery projects={projects} />
      </div>
    </section>
  );
}
