import { motion } from 'framer-motion';
import profile from '../../data/profile';
import styles from './Hero.module.css';

export default function Hero() {
  const { personal } = profile;

  return (
    <section id="hero" className={styles.hero}>
      {personal.heroBackgroundUrl && (
        <div
          className={styles.bgImage}
          style={{ backgroundImage: `url(${personal.heroBackgroundUrl})` }}
        />
      )}
      <div className={styles.overlay} />

      <div className={`container ${styles.inner}`}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {personal.avatarUrl && (
            <motion.div
              className={styles.avatarWrapper}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src={personal.avatarUrl}
                alt={personal.name}
                className={styles.avatar}
              />
            </motion.div>
          )}

          <p className={styles.greeting}>你好，我是</p>
          <h1 className={styles.name}>{personal.name}</h1>
          <p className={styles.title}>{personal.title}</p>
          <p className={styles.tagline}>{personal.tagline}</p>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              📧 {personal.email}
            </span>
            <span className={styles.metaItem}>
              📱 {personal.phone}
            </span>
            <span className={styles.metaItem}>
              📍 {personal.cities.join(' / ')}
            </span>
            <span className={styles.metaItem}>
              💰 {personal.salary}
            </span>
          </div>

          <div className={styles.buttons}>
            <a href="#projects" className={styles.btnPrimary}>
              查看项目经历
            </a>
            <a href="#contact" className={styles.btnSecondary}>
              联系我
            </a>
          </div>
        </motion.div>

        {!personal.heroBackgroundUrl && (
          <div className={styles.bgDecoration}>
            <div className={styles.circle1} />
            <div className={styles.circle2} />
            <div className={styles.circle3} />
          </div>
        )}
      </div>
    </section>
  );
}
