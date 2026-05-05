import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import profile from '../../data/profile';
import SectionTitle from '../ui/SectionTitle';
import styles from './Contact.module.css';

export default function Contact() {
  const { personal } = profile;

  const contactItems = [
    { icon: <FiMail size={22} />, label: '邮箱', value: personal.email, href: `mailto:${personal.email}` },
    { icon: <FiPhone size={22} />, label: '电话', value: personal.phone, href: `tel:${personal.phone}` },
    { icon: <FiMapPin size={22} />, label: '期望城市', value: personal.cities.join(' / '), href: undefined },
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionTitle title="联系方式" subtitle="期待与您沟通" />

        <motion.div
          className={styles.grid}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {contactItems.map((item) => {
            const content = (
              <div className={styles.card}>
                <div className={styles.icon}>{item.icon}</div>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.value}>{item.value}</span>
              </div>
            );

            if (item.href) {
              return (
                <a key={item.label} href={item.href} className={styles.cardLink}>
                  {content}
                </a>
              );
            }
            return <div key={item.label}>{content}</div>;
          })}
        </motion.div>
      </div>
    </section>
  );
}
