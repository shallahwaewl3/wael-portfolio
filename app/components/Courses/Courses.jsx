'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import SectionTitle from '../SectionTitle/SectionTitle';
import { courses } from '../../data/portfolio';
import styles from './Courses.module.css';

export default function Courses() {
  const [missingImages, setMissingImages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);

  // Close lightbox on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  // مراقبة العناصر بالـ IntersectionObserver لعمل حركة النزول من فوق لتحت بكل ديسكتوب بشكل رائع
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          } else {
            // سحب التأثير عند الخروج ليتم إعادة النزول عند التقليب والعودة مجدداً
            entry.target.classList.remove(styles.visible);
          }
        });
      },
      {
        root: gridRef.current,
        threshold: 0.1, // يبدأ التأثير بمجرد ملامسة طرف الكرت للشاشة
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // دالة التقليب الذكي عبر الأسهم بالديسكتوب
  const handleScroll = (direction) => {
    if (gridRef.current) {
      const { scrollLeft, clientWidth } = gridRef.current;
      // القفز بمسافة العرض الكاملة لعرض الوجبة التالية من المربعات الكبيرة
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      
      gridRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={styles.courses} id="courses">
      <SectionTitle eyebrow="Certificates" title="Courses I Completed" />

      {/* أزرار الأسهم: مخصصة للديسكتوب فقط وتختفي تلقائياً بالـ Media Queries على التابلت والموبايل */}
      <button 
        className={`${styles.arrow} ${styles.arrowLeft}`} 
        onClick={() => handleScroll('left')}
        aria-label="Previous items"
      >
        <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
      </button>

      <button 
        className={`${styles.arrow} ${styles.arrowRight}`} 
        onClick={() => handleScroll('right')}
        aria-label="Next items"
      >
        <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
      </button>

      {/* حاوية شبكة المربعات الكبيرة */}
      <div className={styles.grid} ref={gridRef}>
        {courses.map((course, index) => {
          const imageMissing = missingImages[course.image];

          return (
            <article
              className={styles.card}
              key={course.title}
              ref={(el) => (cardRefs.current[index] = el)}
              // السطر التالي يضمن نزول متتالي ومنظم جداً للكروت (Staggered Animation Effect)
              style={{ transitionDelay: `${(index % 3) * 50}ms` }}
            >
              {/* الصورة في الأعلى */}
              <div 
                className={styles.certificate}
                onContextMenu={(e) => e.preventDefault()}
              >
                {course.image && !imageMissing ? (
                  <Image
                    src={course.image}
                    alt={`${course.title} certificate`}
                    width={400}
                    height={258}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.certificateImg}
                    draggable={false}
                    onError={() => setMissingImages((current) => ({ ...current, [course.image]: true }))}
                    onClick={() => setSelectedImage({ src: course.image, alt: `${course.title} certificate` })}
                  />
                ) : (
                  <div className={styles.certificateFallback}>
                    <span className={styles.certSeal}>✓</span>
                    <span className={styles.certLabel}>Completed</span>
                  </div>
                )}
              </div>

              {/* محتوى النصوص والمعلومات تحت الصورة مباشرة */}
              <div className={styles.content}>
                <span className={styles.provider}>{course.provider}</span>
                <h3>{course.title}</h3>
                <p>{course.text}</p>
                
                <div className={styles.cardActions}>
                  <span className={styles.badge}>{course.level}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className={styles.lightbox} 
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className={styles.closeButton} 
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            &times;
          </button>
          <div 
            className={styles.lightboxContent} 
            onClick={(e) => e.stopPropagation()}
          >
            <Image 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              width={1200}
              height={800}
              className={styles.lightboxImg}
            />
          </div>
        </div>
      )}
    </section>
  );
}
