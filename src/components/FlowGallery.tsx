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

  return (
    <div className={styles.flowSection}>
      <div className={styles.header}>
        <span className={styles.sectionBadge}>Interactive Flow</span>
        <h3 className={styles.flowTitle}>{title}</h3>
        {subtitle && <p className={styles.flowSubtitle}>{subtitle}</p>}
      </div>

      <div className={styles.carouselTrack}>
        {steps.map((step, idx) => (
          <div
            key={step.step + idx}
            className={`${styles.flowCard} ${idx === activeIdx ? styles.cardActive : ""}`}
            onClick={() => {
              setActiveIdx(idx);
              setIsLightboxOpen(true);
            }}
          >
            <div
              className={`${styles.imageContainer} ${
                aspectRatio === "phone" ? styles.imagePhone : styles.imageDesktop
              }`}
            >
              <Image
                src={step.src}
                alt={step.title}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 260px, 320px"
              />
              <div className={styles.hoverZoomBadge}>
                <span>Zoom</span>
              </div>
            </div>

            <div className={styles.cardContent}>
              <span className={styles.stepNumber}>{step.step}</span>
              <h4 className={styles.cardTitle}>{step.title}</h4>
              <p className={styles.cardDesc}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        images={lightboxImages}
        currentIndex={activeIdx}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(idx) => setActiveIdx(idx)}
      />
    </div>
  );
}
