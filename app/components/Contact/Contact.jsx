'use client';

import { contactInfo } from '../../data/portfolio';
import styles from './Contact.module.css';

function ContactIcon({ name }) {
  const icons = {
    email: <path d="M4.5 7.5h15v9h-15zM5.5 8.5 12 13l6.5-4.5" />,
    phone: <path d="M7.5 4.5 10 4l1.5 4-1.8 1.1a10.5 10.5 0 0 0 5.2 5.2l1.1-1.8 4 1.5-.5 2.5c-.2 1-1 1.7-2 1.7A13.8 13.8 0 0 1 3.8 6.5c0-1 .7-1.8 1.7-2Z" />,
    location: <path d="M12 21s6-5.2 6-10A6 6 0 0 0 6 11c0 4.8 6 10 6 10ZM12 13.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" />,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {icons[name] || <path d="M12 4v16M4 12h16" />}
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') || 'No name';
    const email = formData.get('email') || 'No email';
    const subject = formData.get('subject') || 'Portfolio message';
    const message = formData.get('message') || '';
    const whatsappMessage = `Hello Wael,

Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}`;

    window.open(`https://wa.me/963984194546?text=${encodeURIComponent(whatsappMessage)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={styles.contactWrapper} id="contact">
      <div className={styles.contact}>
        <div className={styles.container}>
          <div className={styles.infoSide}>
            <div className={styles.header}>
              <span className={styles.badge}><span></span> Share your ideas</span>
              <h2>Let&apos;s build something <span>remarkable</span></h2>
              <p>
                Tell me briefly what you have in mind. I&apos;ll get back fast and help
                shape it into a premium, high-performance experience.
              </p>
            </div>

            <div className={styles.contactMeta}>
              {contactInfo
                .filter((item) => item.icon === 'email' || item.icon === 'phone')
                .map((item) => {
                  const url = item.icon === 'email'
                    ? `mailto:${item.text}`
                    : `tel:${item.text.replace(/\D/g, '')}`;

                  return (
                    <a
                      key={item.title}
                      className={styles.contactLink}
                      href={url}
                    >
                      <article>
                        <span className={styles.icon}><ContactIcon name={item.icon} /></span>
                        <div>
                          <strong>{item.title}</strong>
                          <p>{item.text}</p>
                        </div>
                      </article>
                    </a>
                  );
                })}
            </div>
          </div>

          <div className={styles.formSide}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <label>
                  <span>Name</span>
                  <input type="text" name="name" placeholder="Your name" aria-label="Your name" required />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" placeholder="Your email" aria-label="Your email" required />
                </label>
              </div>
              <label>
                <span>Subject</span>
                <input type="text" name="subject" placeholder="e.g., Landing page for new product" aria-label="Subject" required />
              </label>
              <label>
                <span>Message</span>
                <textarea rows="4" name="message" placeholder="Share the idea, goals, timeline, and any refs you like..." aria-label="Message" required />
              </label>
              <button type="submit">Send Message <ArrowIcon /></button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}


