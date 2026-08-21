import Link from "next/link";
import Image from "next/image";
import TiltCard from "./TiltCard";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  slug: string;
  title: string;
  summary: string;
  category: string;
  year: string;
  coverImage: string;
}

export default function ProjectCard({
  slug,
  title,
  summary,
  category,
  year,
  coverImage,
}: ProjectCardProps) {
  return (
    <TiltCard>
      <Link href={`/work/${slug}`} className={styles.card} id={`project-${slug}`}>
        <div className={styles.imageWrapper}>
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.image}
          />
          <div className={styles.overlay}>
            <span className={styles.overlayText}>
              View Case Study
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.meta}>
            <span className={styles.category}>{category}</span>
            <span className={styles.dot} />
            <span className={styles.year}>{year}</span>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.summary}>{summary}</p>
        </div>
      </Link>
    </TiltCard>
  );
}
