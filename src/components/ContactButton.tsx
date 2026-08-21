"use client";

import React from "react";
import { useContact } from "./ContactModal";

interface ContactButtonProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function ContactButton({
  children = "Get in Touch",
  className = "btn btn--primary",
  style,
}: ContactButtonProps) {
  const { openContact } = useContact();

  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={openContact}
    >
      {children}
    </button>
  );
}
