import profile from '../../data/profile';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';
import styles from './Projects.module.css';

export default function Projects() {
  const { projects } = profile;

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionTitle title="项目经历" subtitle="重点项目与成果展示" />

        <div className={styles.grid}>
          {projects.map((proj, i) => (
            <ProjectCard
              key={proj.title}
              title={proj.title}
              role={proj.role}
              duration={proj.duration}
              description={proj.description}
              achievements={proj.achievements}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
