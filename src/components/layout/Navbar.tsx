import { useState, useEffect, useMemo } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { SECTION_IDS } from '../../types';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import ThemeToggle from '../ui/ThemeToggle';
import styles from './Navbar.module.css';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionIds = useMemo(() => SECTION_IDS.map((s) => s.id), []);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navInner}`}>
        <a href="#hero" className={styles.logo} onClick={closeMenu}>
          杨志科
        </a>

        <ul className={`${styles.links} ${isOpen ? styles.open : ''}`}>
          {SECTION_IDS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`${styles.link} ${activeId === section.id ? styles.active : ''}`}
                onClick={closeMenu}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            className={styles.hamburger}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={isOpen}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && <div className={styles.overlay} onClick={closeMenu} />}
    </nav>
  );
}
