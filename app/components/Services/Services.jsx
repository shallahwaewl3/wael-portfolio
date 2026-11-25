'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import LineIcon from '../LineIcon/LineIcon';
import SectionTitle from '../SectionTitle/SectionTitle';
import { services } from '../../data/portfolio';
import styles from './Services.module.css';

function ChevronIcon({ direction }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.btnArrow}>
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export default function Services() {
  const [flippedCard, setFlippedCard] = useState(null);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const tabletQuery = window.matchMedia('(max-width: 1024px)');
    const mobileQuery = window.matchMedia('(max-width: 680px)');

    const updateItemsPerPage = () => {
      if (mobileQuery.matches) {
        setItemsPerPage(1);
      } else if (tabletQuery.matches) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
      setPage(0);
      setFlippedCard(null);
    };

    updateItemsPerPage();
    tabletQuery.addEventListener('change', updateItemsPerPage);
    mobileQuery.addEventListener('change', updateItemsPerPage);

    return () => {
      tabletQuery.removeEventListener('change', updateItemsPerPage);
      mobileQuery.removeEventListener('change', updateItemsPerPage);
    };
  }, []);

  // Build clean balanced pages
  const pages = useMemo(() => {
    const result = [];
    for (let i = 0; i < services.length; i += itemsPerPage) {
      // For the last page on desktop, if fewer than itemsPerPage, grab the last itemsPerPage items so it's always full
      if (i + itemsPerPage > services.length && i > 0) {
        result.push(services.slice(services.length - itemsPerPage));
      } else {
        result.push(services.slice(i, i + itemsPerPage));
      }
    }
    return result;
  }, [itemsPerPage]);

  const totalPages = pages.length;

  const handlePrev = () => {
    setPage((prev) => Math.max(0, prev - 1));
    setFlippedCard(null);
  };

  const handleNext = () => {
    setPage((prev) => Math.min(totalPages - 1, prev + 1));
    setFlippedCard(null);
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 40;

    if (diffX > threshold && page < totalPages - 1) {
      handleNext();
    } else if (diffX < -threshold && page > 0) {
      handlePrev();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section className={styles.services} id="services">
      <SectionTitle eyebrow="What I Do" title="Services I Provide" />

      <div className={styles.carouselContainer}>
        {/* Desktop Left Navigation Arrow (Positioned well outside) */}
        {totalPages > 1 && (
          <button
            className={`${styles.arrow} ${styles.arrowLeft} ${page === 0 ? styles.arrowDisabled : ''}`}
            type="button"
            aria-label="Previous services"
            onClick={handlePrev}
            disabled={page === 0}
          >
            <ChevronIcon direction="left" />
          </button>
        )}

        {/* Continuous Hardware-Accelerated Sliding Track Window */}
        <div 
          className={styles.sliderWindow}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className={styles.sliderTrack}
            style={{ 
              transform: `translate3d(-${page * 100}%, 0, 0)` 
            }}
          >
            {pages.map((pageServices, pageIdx) => (
              <div 
                className={styles.slidePage} 
                key={`page-${pageIdx}-${itemsPerPage}`}
              >
                {pageServices.map((service, cardIdx) => {
                  const isFlipped = flippedCard === `${pageIdx}-${service.title}`;
                  const globalIdx = services.findIndex((s) => s.title === service.title) + 1;

                  return (
                    <article 
                      className={`${styles.card} ${isFlipped ? styles.isFlipped : ''}`}
                      key={`${service.title}-${pageIdx}`}
                    >
                      <button
                        className={styles.cardFlip}
                        type="button"
                        aria-label={`${service.title} details`}
                        aria-pressed={isFlipped}
                        onClick={() => setFlippedCard(isFlipped ? null : `${pageIdx}-${service.title}`)}
                      >
                        {/* Front Face */}
                        <span className={`${styles.face} ${styles.front}`}>
                          <span className={styles.cardGlowTop} />
                          
                          <span className={styles.topRow}>
                            <span className={styles.iconBox}>
                              <LineIcon name={service.icon} />
                            </span>
                            <span className={styles.serviceIndex}>0{globalIdx}</span>
                          </span>

                          <span className={styles.contentBlock}>
                            <strong className={styles.cardTitle}>{service.title}</strong>
                            <span className={styles.cardText}>{service.text}</span>
                          </span>

                          <span className={styles.cardAction}>
                            <span>Explore Overview</span>
                            <ArrowIcon />
                          </span>
                        </span>

                        {/* Back Face */}
                        <span className={`${styles.face} ${styles.back}`}>
                          <span className={styles.backTopRow}>
                            <strong className={styles.backLabel}>{service.title}</strong>
                            <span className={styles.backBadge}>DETAILS</span>
                          </span>

                          <span className={styles.backText}>{service.details}</span>

                          <span className={styles.cardAction}>
                            <span>Flip to Summary</span>
                            <ArrowIcon />
                          </span>
                        </span>
                      </button>
                    </article>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Right Navigation Arrow (Positioned well outside) */}
        {totalPages > 1 && (
          <button
            className={`${styles.arrow} ${styles.arrowRight} ${page >= totalPages - 1 ? styles.arrowDisabled : ''}`}
            type="button"
            aria-label="Next services"
            onClick={handleNext}
            disabled={page >= totalPages - 1}
          >
            <ChevronIcon direction="right" />
          </button>
        )}
      </div>

      {/* Pagination Indicators */}
      {totalPages > 1 && (
        <div className={styles.dots} aria-label="Services pages">
          {pages.map((_, index) => (
            <button
              className={`${styles.dot} ${page === index ? styles.activeDot : ''}`}
              type="button"
              aria-label={`Go to services slide ${index + 1}`}
              aria-current={page === index}
              key={index}
              onClick={() => {
                setPage(index);
                setFlippedCard(null);
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
