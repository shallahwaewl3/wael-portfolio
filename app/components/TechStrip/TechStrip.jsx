'use client';

import { useEffect, useRef, useState } from 'react';
import { techStack } from '../../data/portfolio';
import styles from './TechStrip.module.css';

function TechIcon({ type }) {
  if (type === 'Next.js') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 5 55 18v28L32 59 9 46V18Z" />
        <text x="32" y="41">N</text>
      </svg>
    );
  }

  if (type === 'React') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="4" />
        <ellipse cx="32" cy="32" rx="25" ry="10" />
        <ellipse cx="32" cy="32" rx="25" ry="10" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="25" ry="10" transform="rotate(120 32 32)" />
      </svg>
    );
  }

  if (type === 'TypeScript') {
    return <span className={styles.tsIcon}>TS</span>;
  }

  if (type === 'Tailwind CSS') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M13 34c5-10 12-14 21-10 5 2 7 6 12 6 4 0 7-2 9-7-5 10-12 14-21 10-5-2-7-6-12-6-4 0-7 2-9 7Z" />
        <path d="M13 45c5-10 12-14 21-10 5 2 7 6 12 6 4 0 7-2 9-7-5 10-12 14-21 10-5-2-7-6-12-6-4 0-7 2-9 7Z" />
      </svg>
    );
  }

  if (type === 'Responsive Design') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="9" y="16" width="32" height="24" rx="2" />
        <rect x="39" y="27" width="15" height="23" rx="2" />
        <path d="M20 47h14M27 40v7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="29" cy="29" r="17" />
      <path d="m42 42 12 12M21 35v-7M29 35V22M37 35v-11" />
    </svg>
  );
}

export default function TechStrip() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.techStrip} ${isInView ? styles.inView : ''}`}
      id="about"
      aria-label="Technologies"
    >
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <linearGradient id="techIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d5ff" />
            <stop offset="100%" stopColor="#1687ff" />
          </linearGradient>
        </defs>
      </svg>
      <div className={styles.techTrack}>
        {techStack.map((tech, index) => (
          <article
            className={styles.techItem}
            key={tech.title}
            style={{ '--item-delay': `${index * 85}ms` }}
          >
            <div className={styles.orbit}>
              <span className={styles.ringOne}></span>
              <span className={styles.stars}></span>
              <div className={styles.iconCore}><TechIcon type={tech.title} /></div>
            </div>
            <strong>{tech.title}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
