"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { stats } from "../../data/portfolio";
import styles from "./Hero.module.css";

function AnimatedStat({ end, suffix = "" }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frameId;
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setValue(Math.round(end * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [end]);

  return (
    <span className={styles.statNum}>
      {value}
      <span className={styles.statPlus}>{suffix}</span>
    </span>
  );
}

const WAEL_CODE_LINES = [
  { prefix: "const Engineer = {" },
  { indent: true, key: "name", val: '"Wael Al Shallah",' },
  { indent: true, key: "stack", val: '["Next.js", "React", "TS"],' },
  { indent: true, key: "focus", val: '"Modern Front-End",' },
  { indent: true, key: "vitalsScore", val: "100" },
  { prefix: "};" }
];

function TerminalCodeCard() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= WAEL_CODE_LINES.length) return;

    const line = WAEL_CODE_LINES[currentLineIndex];
    const fullText = line.prefix || `${line.key}: ${line.val}`;

    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, 28);
      return () => clearTimeout(timeout);
    } else {
      const lineTimeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, 160);
      return () => clearTimeout(lineTimeout);
    }
  }, [currentLineIndex, charIndex]);

  return (
    <div className={styles.codeCard}>
      <div className={styles.codeHeader}>
        <div className={styles.codeDots}>
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
        </div>
        <div className={styles.codeTitle}>nexus-architecture.tsx</div>
        <div className={styles.codePerf}>⚡ 99.9% Perf</div>
      </div>

      <div className={styles.codeBody}>
        <pre className={styles.codeSnippet}>
          <code>
            {WAEL_CODE_LINES.map((line, idx) => {
              if (idx > currentLineIndex) return null;

              const isCurrentLine = idx === currentLineIndex;
              const fullLineText = line.prefix || `${line.key}: ${line.val}`;
              const visibleText = isCurrentLine ? fullLineText.slice(0, charIndex) : fullLineText;

              if (line.prefix) {
                return (
                  <span key={idx}>
                    {idx === 0 ? (
                      <>
                        <span className={styles.cKeyword}>
                          {visibleText.slice(0, Math.min(visibleText.length, 5))}
                        </span>
                        {visibleText.length > 5 && " "}
                        <span className={styles.cFunction}>
                          {visibleText.slice(6, Math.min(visibleText.length, 14))}
                        </span>
                        {visibleText.slice(14)}
                      </>
                    ) : (
                      <span>{visibleText}</span>
                    )}
                    {isCurrentLine && <span className={styles.typingCursor} />}
                    {!isCurrentLine && idx === WAEL_CODE_LINES.length - 1 && (
                      <span className={styles.typingCursor} />
                    )}
                    {"\n"}
                  </span>
                );
              }

              const keyPart = `${line.key}: `;
              const keySlice = visibleText.slice(0, Math.min(visibleText.length, keyPart.length));
              const valSlice = visibleText.length > keyPart.length ? visibleText.slice(keyPart.length) : "";

              return (
                <span key={idx}>
                  {"  "}
                  <span>{keySlice}</span>
                  <span className={line.key === "vitalsScore" ? styles.cNumber : styles.cString}>
                    {valSlice}
                  </span>
                  {isCurrentLine && <span className={styles.typingCursor} />}
                  {"\n"}
                </span>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}

const PHRASES = [
  "Jounier Front-End Specialist",
  "Next.js & React Architect",
  "High-Performance Web Systems",
  "Creative UI/UX Engineer"
];

export default function Hero() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [fadeState, setFadeState] = useState(true);

  // Rotating headline phrase
  useEffect(() => {
    const timer = setInterval(() => {
      setFadeState(false);
      setTimeout(() => {
        setPhraseIdx((prev) => (prev + 1) % PHRASES.length);
        setFadeState(true);
      }, 280);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero} id="home">
      <div className={styles.container}>

        {/* LEFT COLUMN: All text content, buttons, stats, and socials */}
        <div className={styles.leftCol}>
          {/* Massive Display Headline */}
          <div className={`${styles.headerBlock} ${styles.anim1}`}>
            <h1 className={styles.headline}>
              WAEL AL SHALLAH
              <span className={styles.headlineSub}>
                <span className={`${styles.phraseText} ${fadeState ? styles.phraseIn : styles.phraseOut}`}>
                  {PHRASES[phraseIdx]}
                </span>
              </span>
            </h1>
          </div>

          <p className={`${styles.description} ${styles.anim2}`}>
            Specializing in high-performance front-end architecture, building scalable,
            accessible, and visually captivating web applications with Next.js, React, and TypeScript.
          </p>

          {/* Front-End Specialty Indicators */}
          <div className={`${styles.techPillsRow} ${styles.anim3}`}>
            <div className={styles.techPill}>
              <svg viewBox="0 0 24 24" className={styles.pillIcon} aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M9 15V9l6 6V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <span>Next.js 14</span>
            </div>
            <div className={styles.techPill}>
              <svg viewBox="0 0 24 24" className={styles.pillIcon} aria-hidden="true">
                <circle cx="12" cy="12" r="2" fill="currentColor" />
                <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
                <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" stroke="currentColor" strokeWidth="1.8" fill="none" />
                <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" stroke="currentColor" strokeWidth="1.8" fill="none" />
              </svg>
              <span>React 18</span>
            </div>
            <div className={styles.techPill}>
              <span className={styles.tsMono}>TS</span>
              <span>TypeScript</span>
            </div>
            <div className={styles.techPill}>
              <svg viewBox="0 0 24 24" className={styles.pillIcon} aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <span>UI/UX Systems</span>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className={`${styles.ctaGroup} ${styles.anim4}`}>
            <a href="#projects" className={styles.btnPrimary}>
              <span>View Selected Work</span>
              <svg viewBox="0 0 24 24" className={styles.btnIcon} aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </a>

            <a href="/cv/wael_shallah_cv.pdf" download="wael_shallah_cv.pdf" className={styles.btnSecondary}>
              <span>Download CV</span>
              <svg viewBox="0 0 24 24" className={styles.btnIcon} aria-hidden="true">
                <path d="M12 4v12M6 10l6 6 6-6M4 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </a>
          </div>

          {/* 1. Statistics Row */}
          <div className={`${styles.statsRow} ${styles.anim5}`}>
            {stats.map((stat, idx) => {
              const match = stat.value.match(/^(\d+)(.*)$/);
              const endVal = match ? parseInt(match[1], 10) : 0;
              const suffixVal = match ? match[2] : "";
              return (
                <div key={idx} className={styles.statBox}>
                  <div className={styles.statNumber}>
                    <AnimatedStat end={endVal} suffix={suffixVal} />
                  </div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* 2. Redesigned Social Media Icons */}
          <div className={`${styles.socialsRow} ${styles.anim6}`}>
            <a href="https://github.com/shallahwaewl3" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="GitHub" title="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" fill="currentColor" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/wael-shalah25" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="LinkedIn" title="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" fill="currentColor" />
              </svg>
            </a>
            <a href="https://x.com/waels76872?s=11" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Twitter" title="Twitter / X">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
              </svg>
            </a>
            <a href="mailto:waelshalah1@gmail.com" className={styles.socialBtn} aria-label="Email" title="Email Wael">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" strokeWidth="2" />
                <polyline points="22,6 12,13 2,6" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Profile Photo & Code Editor Window (Pure GPU CSS 3D layer) */}
        <div className={styles.rightCol}>
          {/* Prominent Profile Photo Card */}
          <div className={styles.portraitCard}>
            <div className={styles.portraitImageWrap}>
              <Image
                src="/image/wael sh.webp"
                alt="Wael Al Shallah - Senior Creative Engineer"
                width={460}
                height={540}
                priority
                className={styles.portraitImg}
              />
            </div>

            <div className={styles.portraitBadge}>
              <span className={styles.portraitDot} />
              <div className={styles.portraitInfo}>
                <strong>Wael Al Shallah</strong>
                <span>Senior Creative Front-End Specialist</span>
              </div>
              <span className={styles.verifiedTag}>VERIFIED</span>
            </div>
          </div>

          {/* Overlapping Sharp Code & Dashboard Canvas with Typing Animation */}
          <TerminalCodeCard />
        </div>

      </div>
    </section>
  );
}
