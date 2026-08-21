import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
          <a
            href="mailto:cristobalemilita@gmail.com"
            className={styles.footerLink}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
