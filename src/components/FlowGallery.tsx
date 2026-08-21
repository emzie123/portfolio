"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";
import styles from "./FlowGallery.module.css";

export interface FlowStep {
  step: string;
  title: string;
  description: string;
  src: string;
}

interface FlowGalleryProps {
  steps: FlowStep[];
  title: string;
  subtitle?: string;
  aspectRatio?: "phone" | "desktop";
}

export default function FlowGallery({
  steps,
  title,
  subtitle,
  aspectRatio = "phone",
}: FlowGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const lightboxImages = steps.map((s) => ({
    src: s.src,
    title: `${s.step}: ${s.title}`,
    caption: s.description,
  }));

  const openLightboxAt = (idx: number) => {
    setActiveIdx(idx);
    setIsLightboxOpen(true);
  };

  return (
    <section className={styles.flowSection}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.sectionBadge}>Design Journey & Architecture</span>
        <h3 className={styles.flowTitle}>{title}</h3>
        {subtitle && <p className={styles.flowSubtitle}>{subtitle}</p>}
      </div>

      {/* Professional Responsive Grid (No Horizontal Scrollbars) */}
      <div className={styles.stepsGrid}>
        {steps.map((step, idx) => (
          <div
            key={step.step + idx}
            className={styles.stepCard}
            onClick={() => openLightboxAt(idx)}
            title="Click to view full size"
          >
            <div
              className={`${styles.imageWrapper} ${
                aspectRatio === "phone" ? styles.imagePhone : styles.imageDesktop
              }`}
            >
              <Image
                src={step.src}
                alt={step.title}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className={styles.zoomOverlay}>
                <span className={styles.zoomBadge}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                  Zoom
                </span>
              </div>
            </div>

            <div className={styles.cardInfo}>
              <div className={styles.stepPill}>{step.step}</div>
              <h4 className={styles.cardTitle}>{step.title}</h4>
              <p className={styles.cardDesc}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Lightbox */}
      <Lightbox
        images={lightboxImages}
        currentIndex={activeIdx}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(idx) => setActiveIdx(idx)}
      />
    </section>
  );
}
