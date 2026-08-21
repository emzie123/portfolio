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
      {/* Interactive Tabs */}
      <div className={styles.tabContainer}>
        <div className={styles.tabList}>
          {screens.map((screen, idx) => (
            <button
              key={screen.id}
              className={`${styles.tabBtn} ${idx === activeIdx ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveIdx(idx)}
              style={{
                borderColor: idx === activeIdx ? themeColor : "transparent",
                color: idx === activeIdx ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
              }}
            >
              <span className={styles.tabDot} style={{ backgroundColor: idx === activeIdx ? themeColor : "#CBD5E1" }} />
              {screen.title}
            </button>
          ))}
        </div>
      </div>

      {/* Device Frame */}
      <div className={styles.frameWrapper}>
        {type === "phone" ? (
          /* Phone Frame */
          <div className={styles.phoneFrame} onClick={() => setIsLightboxOpen(true)}>
            <div className={styles.phoneSpeaker} />
            <div className={styles.phoneCamera} />
            <div className={styles.phoneScreen}>
              <div className={styles.screenImageContainer}>
                <Image
                  src={activeScreen.src}
                  alt={`${projectName} - ${activeScreen.title}`}
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                  sizes="(max-width: 768px) 300px, 380px"
                />
              </div>
              <div className={styles.expandOverlay}>
                <span>🔍 Click to Expand</span>
              </div>
            </div>
          </div>
        ) : (
          /* Desktop / Laptop Browser Frame */
          <div className={styles.desktopFrame} onClick={() => setIsLightboxOpen(true)}>
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
                <span>🔍 Click to Expand High-Resolution View</span>
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
