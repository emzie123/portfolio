"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContact } from "./ContactModal";
import styles from "./Header.module.css";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const { openContact } = useContact();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
        id="site-header"
      >
        <div className={styles.headerInner}>
          <div className={styles.navContainer}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoDot} />
              Emilita Cristobal
            </Link>

            <nav className={styles.nav}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${
                    pathname === link.href ? styles.active : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={openContact}
                className={styles.navActionBtn}
                type="button"
              >
                Get in touch
              </button>
            </nav>

            <button
              className={`${styles.menuButton} ${menuOpen ? styles.open : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              id="menu-toggle"
              type="button"
            >
              <span className={styles.menuLine} />
              <span className={styles.menuLine} />
              <span className={styles.menuLine} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <nav
        className={`${styles.mobileNav} ${menuOpen ? styles.open : ""}`}
        id="mobile-nav"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.mobileNavLink}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={() => {
            setMenuOpen(false);
            openContact();
          }}
          className={styles.navActionBtn}
          style={{ width: "100%", padding: "0.75rem", marginTop: "0.5rem" }}
          type="button"
        >
          Get in touch
        </button>
      </nav>
    </>
  );
}
