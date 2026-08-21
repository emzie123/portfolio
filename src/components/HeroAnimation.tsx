"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate label
      tl.from("[data-hero='label']", {
        y: 20,
        opacity: 0,
        duration: 0.6,
      });

      // Animate title words
      tl.from(
        "[data-hero='title'] > *",
        {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
        },
        "-=0.3"
      );

      // Animate description
      tl.from(
        "[data-hero='description']",
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.4"
      );

      // Animate CTA buttons
      tl.from(
        "[data-hero='cta'] > *",
        {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
        },
        "-=0.3"
      );

      // Animate hero visual
      tl.from(
        "[data-hero='visual']",
        {
          scale: 0.9,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.8"
      );

      // Floating animation for decorative elements
      gsap.to("[data-hero='decor1']", {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("[data-hero='decor2']", {
        y: 15,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });
    },
    { scope: containerRef }
  );

  return <div ref={containerRef} style={{ display: "contents" }} />;
}
