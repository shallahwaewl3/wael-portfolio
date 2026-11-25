import styles from './SectionTitle.module.css';

export default function SectionTitle({ eyebrow, title }) {
  return (
    <div className={styles.title}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}
