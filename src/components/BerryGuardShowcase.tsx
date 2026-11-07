"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";
import styles from "./BerryGuardShowcase.module.css";

interface BerryGuardShowcaseProps {
  themeColor?: string;
}

const items = [
  {
    id: "logo-cover",
    title: "Brand Logo (Cover)",
    badge: "Cover Image",
    src: "/images/projects/berryguard/logo.png",
    width: 520,
    height: 520,
    caption:
      "Official BerryGuard brand mark and identity design — illustrated hero strawberry with playful circular typography, IoT signal waves, and circuit-textured lettering.",
  },
  {
    id: "app-mockup",
    title: "IoT App & System Mockup",
    badge: "Companion App Mockup",
    src: "/images/projects/berryguard/mockup.png",
    width: 880,
    height: 660,
    caption:
      "BerryGuard companion mobile app showcase — real-time container fleet telemetry monitoring optimal humidity, spoilage gas (ppm), and battery reserve.",
  },
];

export default function BerryGuardShowcase({
  themeColor = "#C0392B",
}: BerryGuardShowcaseProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activeItem = items[activeIdx];

  const lightboxImages = items.map((item) => ({
    src: item.src,
    title: item.title,
    caption: item.caption,
  }));

  return (
    <div className={styles.showcaseContainer}>
      {/* Tab Switcher */}
      <div className={styles.tabContainer}>
        <div className={styles.tabList}>
          {items.map((item, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ""}`}
                style={
                  isActive
                    ? {
                        backgroundColor: "var(--color-surface-hover)",
                        color: "var(--color-text-primary)",
                        borderColor: themeColor,
                      }
                    : {
                        color: "var(--color-text-secondary)",
                      }
                }
              >
                <span
                  className={styles.tabDot}
                  style={{
                    backgroundColor: isActive ? themeColor : "var(--color-text-tertiary)",
                  }}
                />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Image Frame */}
      <div
        className={styles.imageCard}
        onClick={() => setIsLightboxOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsLightboxOpen(true);
          }
        }}
        title="Click to inspect in full resolution"
      >
        <div
          className={styles.imageWrapper}
          style={{
            maxWidth: activeIdx === 0 ? "500px" : "840px",
          }}
        >
          <Image
            key={activeItem.id}
            src={activeItem.src}
            alt={activeItem.title}
            width={activeItem.width}
            height={activeItem.height}
            className={styles.image}
            priority
            style={{ objectFit: "contain" }}
          />

          <div className={styles.expandOverlay}>
            <span className={styles.expandBadge}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              Click to Expand
            </span>
          </div>
        </div>
      </div>

      {/* Caption & Info */}
      <div className={styles.captionBar}>
        <span className={styles.captionBadge} style={{ color: themeColor }}>
          {activeItem.badge}
        </span>
        <p className={styles.captionText}>{activeItem.caption}</p>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        images={lightboxImages}
        currentIndex={activeIdx}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(newIdx) => setActiveIdx(newIdx)}
      />
    </div>
  );
}
