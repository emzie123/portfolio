"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import styles from "./ContactModal.module.css";

interface ContactContextType {
  isOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
}

const ContactContext = createContext<ContactContextType>({
  isOpen: false,
  openContact: () => {},
  closeContact: () => {},
});

export const useContact = () => useContext(ContactContext);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const openContact = () => setIsOpen(true);
  const closeContact = () => setIsOpen(false);

  const email = "cristobalemilita@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContact();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <ContactContext.Provider value={{ isOpen, openContact, closeContact }}>
      {children}
      {isOpen && (
        <div className={styles.backdrop} onClick={closeContact}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={closeContact}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className={styles.header}>
              <div className={styles.avatarPill}>
                <span className={styles.statusDot} />
                <span>Available for UI/UX Opportunities</span>
              </div>
              <h3 className={styles.title}>Let&apos;s build something exceptional together</h3>
              <p className={styles.subtitle}>
                Feel free to reach out for product design roles, freelance collaborations, or design inquiries.
              </p>
            </div>

            <div className={styles.emailCard}>
              <div className={styles.emailLabel}>Direct Email Address</div>
              <div className={styles.emailRow}>
                <span className={styles.emailText}>{email}</span>
                <button
                  className={`${styles.copyBtn} ${copied ? styles.copied : ""}`}
                  onClick={handleCopy}
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy Email
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className={styles.actionGrid}>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Hello%20Emilita!%20-%20UI/UX%20Design%20Opportunity`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.gmailBtn}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                Compose in Gmail
              </a>

              <a
                href={`mailto:${email}`}
                className={styles.mailAppBtn}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Open Default Mail Client
              </a>
            </div>
          </div>
        </div>
      )}
    </ContactContext.Provider>
  );
}
