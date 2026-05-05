import styles from './SkillBar.module.css';

interface SkillBarProps {
  name: string;
  level: number;
  inView: boolean;
}

export default function SkillBar({ name, level, inView }: SkillBarProps) {
  return (
    <div className={styles.skill}>
      <div className={styles.header}>
        <span className={styles.name}>{name}</span>
        <span className={styles.level}>{level}%</span>
      </div>
      <div className={styles.bar}>
        <div
          className={styles.fill}
          style={{ width: inView ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
}
