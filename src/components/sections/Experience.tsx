import profile from '../../data/profile';
import SectionTitle from '../ui/SectionTitle';
import TimelineItem from '../ui/TimelineItem';
import styles from './Experience.module.css';

export default function Experience() {
  const { experience } = profile;

  function formatDate(start: string, end?: string): string {
    const fmt = (d: string) => {
      const [y, m] = d.split('-');
      return `${y}年${parseInt(m)}月`;
    };
    return `${fmt(start)} - ${end ? fmt(end) : '至今'}`;
  }

  return (
    <section id="experience" className="section" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="container">
        <SectionTitle title="工作经历" subtitle="职业生涯发展轨迹" />

        <div className={styles.timeline}>
          {experience.map((job, i) => (
            <TimelineItem
              key={`${job.company}-${job.startDate}`}
              title={job.role}
              subtitle={job.company}
              date={formatDate(job.startDate, job.endDate)}
              description={job.description}
              tags={job.technologies}
              isLeft={i % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
