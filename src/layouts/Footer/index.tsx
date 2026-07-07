import styles from './index.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <span>© {new Date().getFullYear()} Gather</span>
    <span className={styles.divider}>·</span>
    <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">京ICP备2024050962号-1</a>
  </footer>
);

export default Footer;
