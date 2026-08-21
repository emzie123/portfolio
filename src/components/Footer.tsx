"use client";

import Link from "next/link";
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
          <Link href="/work" className={styles.footerLink}>
            Work
          </Link>
          <Link href="/about" className={styles.footerLink}>
            About
          </Link>
          <button
            onClick={openContact}
            className={styles.footerEmailBtn}
            type="button"
          >
            cristobalemilita@gmail.com
          </button>
        </div>
      </div>
    </footer>
  );
}
