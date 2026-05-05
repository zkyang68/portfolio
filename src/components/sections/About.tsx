import { motion } from 'framer-motion';
import profile from '../../data/profile';
import SectionTitle from '../ui/SectionTitle';
import styles from './About.module.css';

export default function About() {
  const { about } = profile;

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionTitle title="关于我" subtitle="了解我的背景与优势" />

        <motion.div
          className={styles.grid}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.text}>
            {about.paragraphs.map((p, i) => (
              <p key={i} className={styles.paragraph}>{p}</p>
            ))}
          </div>

          <div className={styles.highlights}>
            <h3 className={styles.highlightsTitle}>核心优势</h3>
            <div className={styles.highlightList}>
              {about.highlights.map((h) => (
                <span key={h} className={styles.highlightTag}>{h}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
