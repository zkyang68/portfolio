import { motion } from 'framer-motion';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  title: string;
  role: string;
  duration: string;
  description: string[];
  achievements?: string;
  index: number;
}

export default function ProjectCard({ title, role, duration, description, achievements, index }: ProjectCardProps) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={styles.header}>
        <span className={styles.duration}>{duration}</span>
        <span className={styles.role}>{role}</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.desc}>
        {description.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
      {achievements && (
        <div className={styles.achievements}>
          <span className={styles.achievementsLabel}>核心成果：</span>
          {achievements}
        </div>
      )}
    </motion.div>
  );
}
