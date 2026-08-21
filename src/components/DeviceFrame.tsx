"use client";

import { useState } from "react";
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
  themeColor = "#2563EB",
}: DeviceFrameProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!screens || screens.length === 0) return null;

  const activeScreen = screens[activeIdx];

  return (
    <div className={styles.deviceShowcase}>
      {/* Interactive Segmented Control Tabs */}
      <div className={styles.tabContainer}>
        <div className={styles.tabList}>
          {screens.map((screen, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={screen.id}
                className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveIdx(idx)}
                style={{
                  borderColor: isActive ? themeColor : "transparent",
                  color: isActive ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
                }}
              >
                <span
                  className={styles.tabDot}
                  style={{ backgroundColor: isActive ? themeColor : "#CBD5E1" }}
                />
                {screen.title}
              </button>
            );
          })}
        </div>
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
