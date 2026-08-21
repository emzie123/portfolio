"use client";

import { useContact } from "./ContactModal";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { openContact } = useContact();

  return (
    <footer className={styles.footer} id="site-footer">
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.footerLeft}>
          <span className={styles.footerName}>Emilita D. Cristobal</span>
          <span className={styles.footerCopy}>
            &copy; {currentYear} &mdash; Designed & Built with care
          </span>
        </div>

        <div className={styles.footerRight}>
          <button
            onClick={openContact}
            className={styles.footerLink}
            type="button"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              font: "inherit",
              padding: 0,
            }}
          >
            cristobalemilita@gmail.com
          </button>
        </div>
      </div>
    </footer>
  );
}
