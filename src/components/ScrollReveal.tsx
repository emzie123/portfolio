"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "scale";
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className = "",
  as: Tag = "div",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getInitialProps = () => {
    switch (direction) {
      case "up":
        return { y: 50, opacity: 0 };
      case "left":
        return { x: -50, opacity: 0 };
      case "right":
        return { x: 50, opacity: 0 };
      case "scale":
        return { scale: 0.95, opacity: 0 };
      default:
        return { y: 50, opacity: 0 };
    }
  };

  const getAnimateProps = () => {
    switch (direction) {
      case "up":
        return { y: 0, opacity: 1 };
      case "left":
        return { x: 0, opacity: 1 };
      case "right":
        return { x: 0, opacity: 1 };
      case "scale":
        return { scale: 1, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      gsap.set(el, getInitialProps());

      gsap.to(el, {
        ...getAnimateProps(),
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef, dependencies: [direction, delay, duration] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
