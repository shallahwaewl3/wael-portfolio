"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  // ===== أرقام وروابط ثابتة =====
  const WHATSAPP_NUM = "+963 984194546"; // بدون علامة +
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUM.replace(/\D/g, '')}`;
  const DISPLAY_PHONE = "+963 984194546";

  const MAPS_URL = "https://maps.app.goo.gl/C9LohprtoTcKDFMf7?g_st=aw";

  // === شبكات التواصل (بدون Gmail) ===
  const socials = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/waelshalah/",
      brand: "instagram",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zm5.75-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/wael shallah ",
      brand: "facebook",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.2V12h2.2V9.7c0-2.2 1.3-3.4 3.3-3.4.95 0 1.94.17 1.94.17v2.13H14.8c-1.22 0-1.6.76-1.6 1.54V12h2.72l-.43 2.9h-2.3v7A10 10 0 0 0 22 12z" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: WHATSAPP_URL,
      brand: "whatsapp",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.5 3.5A10.5 10.5 0 0 0 3.8 17.7L3 21l3.4-.9A10.5 10.5 0 1 0 20.5 3.5zM12 20a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm4.77-5.23c-.26-.13-1.52-.75-1.76-.84-.24-.09-.42-.13-.6.13-.18.26-.69.84-.85 1.02-.16.18-.31.2-.57.07-.26-.13-1.09-.4-2.07-1.28-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.47.13-.16.17-.27.26-.45.09-.18.04-.34-.02-.47-.06-.13-.6-1.45-.82-1.98-.22-.53-.44-.46-.6-.47l-.51-.01c-.17 0-.45.06-.69.34s-.9.88-.9 2.14c0 1.26.93 2.47 1.06 2.64.13.18 1.83 2.79 4.49 3.91.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.07 1.52-.62 1.74-1.22.22-.6.22-1.12.15-1.23-.07-.11-.24-.18-.5-.31z" />
        </svg>
      ),
    },
  ];

  // === أرقام التواصل (كلاهما يفتح واتساب) ===
  const contacts = [
    { label: "Main", number: DISPLAY_PHONE, href: WHATSAPP_URL },
    { label: "Sales", number: DISPLAY_PHONE, href: WHATSAPP_URL },
  ];

  // === تحريك الشعار والصورة على الديسكتوب فقط ===
  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const waveRef = useRef(null);

  useEffect(() => {
    const footerEl = footerRef.current;
    const brandEl = brandRef.current;
    const waveEl = waveRef.current;
    if (!footerEl || !brandEl || !waveEl) return;

    const mq = window.matchMedia("(min-width: 1024px)");
    let observer = null;
    let timerId = null;

    const add = () => {
      // أولاً: تظهر الموجة
      waveEl.classList.add(styles.inview);

      // بعد لحظة تظهر الكلمة Codenza
      timerId = window.setTimeout(() => {
        brandEl.classList.add(styles.inview);
      }, 220); // تأخير بسيط بعد الموجة (أبطأ إحساساً)
    };

    const remove = () => {
      window.clearTimeout(timerId);
      brandEl.classList.remove(styles.inview);
      waveEl.classList.remove(styles.inview);
    };

    function setup() {
      if (observer) {
        observer.disconnect();
        observer = null;
      }

      // إذا كانت الشاشة أصغر من 1024px (موبايل وتابلت بجميع مقاساته)
      if (!mq.matches) {
        waveEl.classList.add(styles.inview);
        brandEl.classList.add(styles.inview);
        // إزالة تأثير الـ transform الذي قد يخفي العناصر في التابلت
        waveEl.style.transform = "none";
        brandEl.style.transform = "none";
        return;
      } else {
        // إعادة تعيين الـ inline styles عند العودة لشاشات الديسكتوب
        waveEl.style.transform = "";
        brandEl.style.transform = "";
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!mq.matches) return;
          if (entry.isIntersecting) add();
          else remove();
        },
        { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
      );
      observer.observe(footerEl);
    }

    setup();
    const onChange = () => setup();
    mq.addEventListener?.("change", onChange);
    window.addEventListener("resize", onChange);

    return () => {
      observer?.disconnect();
      mq.removeEventListener?.("change", onChange);
      window.removeEventListener("resize", onChange);
      window.clearTimeout(timerId);
    };
  }, []);

  return (
    // اتجاه ثابت LTR للفوتر
    <footer ref={footerRef} className={styles.footer} dir="ltr">
      <div className={styles.content}>
        {/* يسار: الشعار الكبير */}
        <div className={styles.left}>
          <h2
  id="contact-us"
  ref={brandRef}
  className={`${styles.brand} ${styles.brandReveal}`}
  aria-label="Codenza"
>
  <span className={styles.brandTop}><span className={styles.brandC}>W</span>ael</span>
  <span className={styles.brandBottom}>shallah</span>
</h2>

        </div>

        {/* الكتلة اليمنى */}
        <div className={styles.rightPinned}>
          {/* Contact */}
          <div className={`${styles.col} ${styles.contactCol}`}>
            <h3 className={styles.colTitle}>Contact</h3>
            <ul className={styles.contactList}>
              {contacts.map((c) => (
                <li key={c.label} className={styles.contactItem}>
                  <a
                    className={styles.telLink}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${c.label} WhatsApp`}
                    title={`${c.label} WhatsApp`}
                  >
                    <span className={styles.phoneIcon} aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.07 22 2 13.93 2 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.2 2.2z" />
                      </svg>
                    </span>
                    <span className={styles.telNumber}>{c.number}</span>
                  </a>
                </li>
              ))}

              {/* العنوان → خرائط جوجل */}
              <li className={styles.contactItem}>
                <a
                  className={styles.telLink}
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open location on Google Maps"
                  title="Open location on Google Maps"
                >
                  <span
                    className={`${styles.phoneIcon} ${styles.addrIcon}`}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                    </svg>
                  </span>
                  <span className={styles.itemText}>Damascus / Mhagren</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Follow us */}
          <div className={`${styles.col} ${styles.socialCol}`}>
            <h3 className={styles.colTitle}>Follow us</h3>
            <ul className={styles.socialIcons}>
              {socials.map((s, idx) => (
                <li key={`${s.label}-${idx}`} className={styles.socialItem}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconButton}
                    data-brand={s.brand}
                    aria-label={s.label}
                    title={s.label}
                  >
                    <span className={styles.icon}>{s.icon}</span>
                    <span className={styles.badge} aria-hidden="true">
                      {s.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* موجة الخلفية */}
      <div
        ref={waveRef}
        className={`${styles.waveWrap} ${styles.waveReveal}`}
        aria-hidden="true"
      >
        <Image
          src="/image/footer.png"
          alt="Footer wave background"
          fill
          priority
          sizes="100vw"
          className={styles.waveImg}
        />
      </div>
    </footer>
  );
}
