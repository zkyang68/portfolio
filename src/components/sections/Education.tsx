import profile from '../../data/profile';
import SectionTitle from '../ui/SectionTitle';
import TimelineItem from '../ui/TimelineItem';
import styles from './Education.module.css';

export default function Education() {
  const { education } = profile;

  function formatDate(start: string, end: string): string {
    const fmt = (d: string) => {
      const [y, m] = d.split('-');
      return `${y}年${parseInt(m)}月`;
    };
    return `${fmt(start)} - ${fmt(end)}`;
  }

  return (
    <section id="education" className="section" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="container">
        <SectionTitle title="教育背景" subtitle="学术经历与专业基础" />

        <div className={styles.timeline}>
          {education.map((edu, i) => (
            <TimelineItem
              key={edu.institution}
              title={`${edu.field} · ${edu.degree}`}
              subtitle={edu.institution}
              date={formatDate(edu.startDate, edu.endDate)}
              description={edu.achievements || []}
              isLeft={i % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
