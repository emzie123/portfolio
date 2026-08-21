"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import styles from "./Lightbox.module.css";

interface LightboxProps {
  images: Array<{ src: string; title?: string; caption?: string }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const [zoom, setZoom] = useState(1);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % images.length);
      if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + images.length) % images.length);
    },
    [isOpen, currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.lightboxContainer} onClick={(e) => e.stopPropagation()}>
        {/* Top Controls */}
        <div className={styles.topBar}>
          <div className={styles.imageInfo}>
            <span className={styles.imageTitle}>{currentImage.title || "UI Screen"}</span>
            <span className={styles.imageCounter}>
              {currentIndex + 1} of {images.length}
            </span>
          </div>
          <div className={styles.controlButtons}>
            <button
              className={styles.iconBtn}
              onClick={() => setZoom((z) => (z === 1 ? 1.5 : 1))}
              title={zoom === 1 ? "Zoom in" : "Zoom out"}
              aria-label="Toggle zoom"
            >
              {zoom === 1 ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              )}
            </button>
            <button className={styles.iconBtn} onClick={onClose} title="Close (Esc)" aria-label="Close lightbox">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Image View */}
        <div className={styles.imageStage}>
          <button
            className={`${styles.navBtn} ${styles.prevBtn}`}
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div
            className={styles.imageWrapper}
            style={{ transform: `scale(${zoom})`, cursor: zoom > 1 ? "grab" : "default" }}
          >
            <Image
              src={currentImage.src}
              alt={currentImage.title || "Full UI View"}
              fill
              style={{ objectFit: "contain" }}
              priority
              sizes="90vw"
            />
          </div>

          <button
            className={`${styles.navBtn} ${styles.nextBtn}`}
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            aria-label="Next image"
          >
            ›
          </button>
        </div>

        {/* Caption */}
        {currentImage.caption && <p className={styles.caption}>{currentImage.caption}</p>}

        {/* Thumbnails Row */}
        <div className={styles.thumbnailRow}>
          {images.map((img, idx) => (
            <button
              key={img.src + idx}
              className={`${styles.thumbBtn} ${idx === currentIndex ? styles.thumbActive : ""}`}
              onClick={() => onNavigate(idx)}
            >
              <Image src={img.src} alt={img.title || ""} width={48} height={48} style={{ objectFit: "cover" }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
