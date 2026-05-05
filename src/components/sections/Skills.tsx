import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import profile from '../../data/profile';
import SectionTitle from '../ui/SectionTitle';
import SkillBar from '../ui/SkillBar';
import styles from './Skills.module.css';

function SkillCategory({ category, items, index }: {
  category: string;
  items: { name: string; level: number }[];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={styles.category}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <h3 className={styles.categoryTitle}>{category}</h3>
      {items.map((skill) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          level={skill.level}
          inView={inView}
        />
      ))}
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="container">
        <SectionTitle title="核心技能" subtitle="专业技能与技术栈" />

        <div className={styles.grid}>
          {profile.skills.map((cat, i) => (
            <SkillCategory
              key={cat.category}
              category={cat.category}
              items={cat.items}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
