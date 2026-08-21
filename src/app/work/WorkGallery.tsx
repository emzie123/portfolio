"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./work.module.css";

interface Project {
  slug: string;
  title: string;
  summary: string;
  category: string;
  year: string;
  coverImage: string | null;
}

const categories = ["All", "Web Design", "Mobile Design", "UI Mockup"];

export default function WorkGallery({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <div className={styles.filterBar} id="category-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`tag ${activeCategory === cat ? "tag--active" : ""}`}
            onClick={() => setActiveCategory(cat)}
            id={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.projectGrid}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.1}>
              <ProjectCard
                slug={project.slug}
                title={project.title}
                summary={project.summary}
                category={project.category}
                year={project.year}
                coverImage={
                  project.coverImage || "/images/projects/fintech-dashboard.jpg"
                }
              />
            </ScrollReveal>
          ))
        ) : (
          <div className={styles.emptyState}>
            <h3>No projects yet</h3>
            <p>
              Check back soon — new work is on the way. You can also add
              projects via the{" "}
              <a href="/keystatic" style={{ color: "var(--color-accent)" }}>
                CMS dashboard
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </>
  );
}
