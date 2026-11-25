"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";

const LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Courses", href: "#courses" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Pure IntersectionObserver for active section detection - ZERO scroll event listeners, ZERO layout reflows
  useEffect(() => {
    const sectionIds = ["home", "about", "services", "courses", "projects", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-80px 0px -40% 0px",
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <a
          href="https://www.codenza.dev"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.logoBox}
          onClick={() => setOpen(false)}
          aria-label="Codenza Agency"
        >
          <Image 
            src="/image/logo.svg" 
            alt="Codenza Logo" 
            width={160} 
            height={48} 
            priority
            className={styles.logoImage} 
          />
        </a>

        <nav className={`${styles.navLinks} ${open ? styles.showMenu : ""}`} aria-label="Main Navigation">
          {LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`${styles.navLink} ${
                activeSection === link.href.slice(1) ? styles.active : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <a href="#contact" className={styles.talkBtn}>
          Let’s Talk
          <span>→</span>
        </a>

        <button
          type="button"
          className={`${styles.hamburger} ${
            open ? styles.activeHamburger : ""
          }`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}