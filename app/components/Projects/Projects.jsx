'use client';

import { useEffect, useRef } from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import { projects } from '../../data/portfolio';
import styles from './Projects.module.css';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function ProjectVideo({ project }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !project.video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
    };
  }, [project.video]);

  return (
    <div className={styles.mockupFrame}>
      {/* Sharp Browser Header */}
      <div className={styles.mockupHeader}>
        <div className={styles.mockupDots}>
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
        </div>
        <div className={styles.mockupUrl}>
          <svg viewBox="0 0 24 24" className={styles.lockIcon} aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <span>https://{project.title.toLowerCase().replace(/\s+/g, '')}.dev</span>
        </div>
        <div className={styles.mockupBadge}>PROD</div>
      </div>

      {/* Video Content */}
      <div className={styles.videoContainer}>
        {project.video ? (
          <video
            ref={videoRef}
            className={styles.projectVideo}
            src={project.video}
            loop
            playsInline
            muted
            preload="metadata"
          />
        ) : (
          <div className={styles.videoFallback}>
            <span>Realistic Interface Preview</span>
            <strong>{project.title}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        <SectionTitle
          eyebrow="02 / PORTFOLIO"
          title="Featured Case Studies & Systems"
        />

        <div className={styles.list}>
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`${styles.card} ${index % 2 === 1 ? styles.cardReversed : ''}`}
            >
              {/* Visual Mockup Preview */}
              <div className={styles.visualSide}>
                <ProjectVideo project={project} />
              </div>

              {/* Editorial Content Side */}
              <div className={styles.contentSide}>
                <div className={styles.projectMeta}>
                  <span className={styles.projectIndex}>0{index + 1}</span>
                  <span className={styles.projectCategory}>PRODUCTION SYSTEM</span>
                </div>

                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectText}>{project.text}</p>

                {/* Modules / Sections */}
                <div className={styles.sectionsRow}>
                  <span className={styles.modulesLabel}>Key Architecture:</span>
                  <div className={styles.modulesList}>
                    {project.sections.map((section) => (
                      <span key={section} className={styles.moduleTag}>{section}</span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div className={styles.tagRow}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                <div className={styles.actions}>
                  <a href="#contact" className={styles.actionBtn}>
                    <span>Inspect Project</span>
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
