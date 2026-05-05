import styles from './Footer.module.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} 杨志科. All rights reserved.
        </p>
        <button className={styles.backTop} onClick={scrollToTop}>
          返回顶部 &uarr;
        </button>
      </div>
    </footer>
  );
}
