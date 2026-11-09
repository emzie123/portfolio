"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import styles from "./Lightbox.module.css";

interface LightboxProps {
  images: Array<{ src: string; title?: string; caption?: string }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset zoom when navigating
  useEffect(() => {
    setZoom(1);
  }, [currentIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        onNavigate?.((currentIndex + 1) % images.length);
      if (e.key === "ArrowLeft")
        onNavigate?.((currentIndex - 1 + images.length) % images.length);
    },
    [isOpen, currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || images.length === 0 || !mounted) return null;

  const currentImage = images[currentIndex] || images[0];

  const content = (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Expanded Image Lightbox"
    >
      <div
        className={styles.lightboxContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls */}
        <div className={styles.topBar}>
          <div className={styles.imageInfo}>
            <span className={styles.imageTitle}>
              {currentImage.title || "Expanded Screen"}
            </span>
            <span className={styles.imageCounter}>
              {currentIndex + 1} of {images.length}
            </span>
          </div>

          <div className={styles.controlButtons}>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => setZoom((z) => (z === 1 ? 1.5 : 1))}
              title={zoom === 1 ? "Zoom In" : "Reset Zoom"}
              aria-label="Toggle Zoom"
            >
              {zoom === 1 ? (
                <svg
                  width="18"
                  height="18"
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
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              )}
            </button>

            <button
              type="button"
              className={styles.iconBtn}
              onClick={onClose}
              title="Close (Esc)"
              aria-label="Close Lightbox"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Flexible Main Image Stage */}
        <div className={styles.imageStage}>
          {images.length > 1 && (
            <button
              type="button"
              className={`${styles.navBtn} ${styles.prevBtn}`}
              onClick={() =>
                onNavigate?.(
                  (currentIndex - 1 + images.length) % images.length
                )
              }
              aria-label="Previous screen"
            >
              ‹
            </button>
          )}

          <div
            className={styles.imageWrapper}
            style={{
              transform: `scale(${zoom})`,
              cursor: zoom > 1 ? "zoom-out" : "zoom-in",
            }}
            onClick={() => setZoom((z) => (z === 1 ? 1.5 : 1))}
            title={zoom === 1 ? "Click to Zoom In" : "Click to Reset"}
          >
            <Image
              src={currentImage.src}
              alt={currentImage.title || "Full View"}
              fill
              className={styles.mainImage}
              style={{ objectFit: "contain" }}
              priority
              sizes="100vw"
            />
          </div>

          {images.length > 1 && (
            <button
              type="button"
              className={`${styles.navBtn} ${styles.nextBtn}`}
              onClick={() =>
                onNavigate?.((currentIndex + 1) % images.length)
              }
              aria-label="Next screen"
            >
              ›
            </button>
          )}
        </div>

        {/* Bottom Bar: Caption & Thumbnails */}
        <div className={styles.bottomBar}>
          {currentImage.caption && (
            <p className={styles.caption}>{currentImage.caption}</p>
          )}

          {images.length > 1 && (
            <div className={styles.thumbnailRow}>
              {images.map((img, idx) => (
                <button
                  key={img.src + idx}
                  type="button"
                  className={`${styles.thumbBtn} ${
                    idx === currentIndex ? styles.thumbActive : ""
                  }`}
                  onClick={() => onNavigate?.(idx)}
                  title={img.title || `Screen ${idx + 1}`}
                >
                  <Image
                    src={img.src}
                    alt={img.title || ""}
                    width={44}
                    height={44}
                    style={{ objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
