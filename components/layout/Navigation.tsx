"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";

const NAV_LINKS = [
  { label: "Overview", href: "/", num: "00" },
  { label: "Photos", href: "/photos", num: "01" },
  { label: "Clips", href: "/clips", num: "02" },
  { label: "Politics", href: "/political-affiliation", num: "03" },
  { label: "Love Life", href: "/love-life", num: "04" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className={styles.navBar}>
      {/* Brand / Logo */}
      <Link href="/" className={styles.brand} aria-label="Return to Archive Home">
        <span className={styles.brandNum}>001</span>
        <span className={styles.brandSep}>//</span>
        <span className={styles.brandTitle}>IDOT ARCHIVE</span>
      </Link>

      {/* Nav Links */}
      <nav className={styles.navLinks} aria-label="Archive Navigation">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
            >
              <span className={styles.linkNum}>{link.num}</span>
              <span className={styles.linkLabel}>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Right Meta Tag */}
      <div className={styles.metaBox}>
        <span className={styles.metaDot} />
        <span className={styles.metaText}>SUBJECT: ROHAN</span>
      </div>
    </header>
  );
}
