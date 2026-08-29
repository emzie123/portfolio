"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";
import styles from "./DeviceFrame.module.css";

export interface ScreenItem {
  id: string;
  title: string;
  src: string;
  caption?: string;
}

interface DeviceFrameProps {
  type: "phone" | "desktop";
  screens: ScreenItem[];
  projectName: string;
  themeColor?: string;
}

export default function DeviceFrame({
  type,
  screens,
  projectName,
  themeColor = "#A855F7",
}: DeviceFrameProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Tab scrolling & dragging state
  const tabListRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = useCallback(() => {
    const el = tabListRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [checkScrollability]);

  // Smooth scroll left / right on chevron click
  const scrollTabs = (direction: "left" | "right") => {
    if (!tabListRef.current) return;
    const scrollAmount = 240;
    tabListRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Center active tab smoothly
  const handleSelectTab = (idx: number) => {
    setActiveIdx(idx);
    const el = tabListRef.current;
    if (!el) return;
    const buttons = el.querySelectorAll("button");
    const activeBtn = buttons[idx];
    if (activeBtn) {
      const containerWidth = el.offsetWidth;
      const btnLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.offsetWidth;
      el.scrollTo({
        left: btnLeft - containerWidth / 2 + btnWidth / 2,
        behavior: "smooth",
      });
    }
  };

  // Mouse Drag to Scroll handlers
  const onMouseDown = (e: React.MouseEvent) => {
    const el = tabListRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const el = tabListRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // Drag sensitivity
    el.scrollLeft = scrollLeftRef.current - walk;
    checkScrollability();
  };

  const onMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    checkScrollability();
  };

  if (!screens || screens.length === 0) return null;

  const activeScreen = screens[activeIdx];

  return (
    <div className={styles.deviceShowcase}>
      {/* Interactive Segmented Control Tabs with Drag-to-Scroll & Navigation Arrows */}
      <div className={styles.tabContainer}>
        {canScrollLeft && (
          <button
            className={`${styles.tabArrow} ${styles.tabArrowLeft}`}
            onClick={() => scrollTabs("left")}
            aria-label="Scroll tabs left"
            type="button"
          >
            ‹
          </button>
        )}

        <div
          ref={tabListRef}
          className={styles.tabList}
          onScroll={checkScrollability}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
        >
          {screens.map((screen, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={screen.id}
                className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ""}`}
                onClick={() => handleSelectTab(idx)}
                type="button"
                style={{
                  borderColor: isActive ? themeColor : "transparent",
                  color: isActive ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
                }}
              >
                <span
                  className={styles.tabDot}
                  style={{ backgroundColor: isActive ? themeColor : "rgba(168, 85, 247, 0.3)" }}
                />
                {screen.title}
              </button>
            );
          })}
        </div>

        {canScrollRight && (
          <button
            className={`${styles.tabArrow} ${styles.tabArrowRight}`}
            onClick={() => scrollTabs("right")}
            aria-label="Scroll tabs right"
            type="button"
          >
            ›
          </button>
        )}
      </div>

      {/* Showcase Display Area */}
      <div className={styles.frameWrapper}>
        {type === "phone" ? (
          /* Phone Showcase — Direct Clean Presentation with Floating Elevation */
          <div
            className={styles.phoneMockupContainer}
            onClick={() => setIsLightboxOpen(true)}
            title="Click to view full size"
          >
            <div className={styles.phoneImageWrapper}>
              <Image
                src={activeScreen.src}
                alt={`${projectName} - ${activeScreen.title}`}
                fill
                style={{ objectFit: "contain" }}
                priority
                sizes="(max-width: 768px) 320px, 420px"
              />
              <div className={styles.expandOverlay}>
                <span className={styles.expandBadge}>
                  <svg
                    width="16"
                    height="16"
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
                  Click to Expand High-Res View
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Desktop / Laptop Browser Frame */
          <div
            className={styles.desktopFrame}
            onClick={() => setIsLightboxOpen(true)}
            title="Click to view full size"
          >
            <div className={styles.browserHeader}>
              <div className={styles.trafficLights}>
                <span className={`${styles.dot} ${styles.dotRed}`} />
                <span className={`${styles.dot} ${styles.dotYellow}`} />
                <span className={`${styles.dot} ${styles.dotGreen}`} />
              </div>
              <div className={styles.urlBar}>
                <span className={styles.lockIcon}>🔒</span>
                <span className={styles.urlText}>verae.ph/admin/{activeScreen.id}</span>
              </div>
            </div>
            <div className={styles.desktopScreen}>
              <div className={styles.desktopImageContainer}>
                <Image
                  src={activeScreen.src}
                  alt={`${projectName} - ${activeScreen.title}`}
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                  sizes="(max-width: 1200px) 100vw, 1100px"
                />
              </div>
              <div className={styles.expandOverlay}>
                <span className={styles.expandBadge}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 3 21 3 21 3 15" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                  Click to Expand High-Res View
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Screen Caption */}
      {activeScreen.caption && (
        <div className={styles.captionBox}>
          <p className={styles.captionText}>{activeScreen.caption}</p>
        </div>
      )}

      {/* Lightbox Modal */}
      <Lightbox
        images={screens}
        currentIndex={activeIdx}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(idx) => setActiveIdx(idx)}
      />
    </div>
  );
}
