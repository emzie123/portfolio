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
  coverImage?: string | null;
}

export default function ProjectCard({
  slug,
  title,
  summary,
  category,
  year,
  coverImage,
}: ProjectCardProps) {
  const fallbackImage =
    slug === "buswatch"
      ? "/images/projects/buswatch/live-tracking.png"
      : "/images/projects/verae/orders-ledger.png";

  const imageSrc = coverImage || fallbackImage;

  return (
    <Link href={`/work/${slug}`} className={styles.cardWrapper}>
      <TiltCard maxTilt={5}>
        <article className={styles.card}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageInner}>
              <Image
                src={imageSrc}
                alt={title}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
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

            <div className={styles.actionRow}>
              <span className={styles.viewText}>
                View Case Study <span className={styles.arrowIcon}>→</span>
              </span>
            </div>
          </div>
        </article>
      </TiltCard>
    </Link>
  );
}
