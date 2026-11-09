"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";
import styles from "./KangkongBreadShowcase.module.css";

interface KangkongBreadShowcaseProps {
  themeColor?: string;
}

export default function KangkongBreadShowcase({
  themeColor = "#2E7D32",
}: KangkongBreadShowcaseProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const lightboxImages = [
    {
      src: "/images/projects/kangkong-bread/poster.jpg",
      title: "Kangkong Bread — Social Media Promotional Poster",
      caption:
        "Official promotional poster designed for Quezon City University's NSTP Green Bazaar (1st Year). Featuring freshly baked kangkong bread photography, organic typography, ₱50 value badge, and custom mascot pre-order call-to-action.",
    },
  ];

  return (
    <div className={styles.showcaseContainer}>
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
        <div className={styles.imageWrapper}>
          <Image
            src="/images/projects/kangkong-bread/poster.jpg"
            alt="Kangkong Bread — NSTP Green Bazaar Promotional Poster"
            width={1024}
            height={1024}
            className={styles.image}
            priority
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
          Official Promotional Collateral
        </span>
        <p className={styles.captionText}>
          High-conversion social media campaign asset conceptualized and designed for the collegiate NSTP Green Bazaar enterprise.
        </p>
      </div>

      {/* Campaign Specifications */}
      <div className={styles.specsGrid}>
        <div className={styles.specCard}>
          <span className={styles.specLabel}>Channel</span>
          <span className={styles.specValue}>Facebook / Instagram</span>
        </div>
        <div className={styles.specCard}>
          <span className={styles.specLabel}>Format</span>
          <span className={styles.specValue}>1:1 Square (1024×1024)</span>
        </div>
        <div className={styles.specCard}>
          <span className={styles.specLabel}>Campus Event</span>
          <span className={styles.specValue}>NSTP Green Bazaar</span>
        </div>
        <div className={styles.specCard}>
          <span className={styles.specLabel}>Target Audience</span>
          <span className={styles.specValue}>Students & Faculty</span>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        images={lightboxImages}
        currentIndex={0}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </div>
  );
}
