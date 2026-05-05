import { motion } from 'framer-motion';
import styles from './TimelineItem.module.css';

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  description: string[];
  tags?: string[];
  isLeft: boolean;
}

export default function TimelineItem({ title, subtitle, date, description, tags, isLeft }: TimelineItemProps) {
  return (
    <motion.div
      className={`${styles.item} ${isLeft ? styles.left : styles.right}`}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.dot} />
      <div className={styles.card}>
        <span className={styles.date}>{date}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
        <ul className={styles.desc}>
          {description.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
