import styles from './Heading.module.css';

export const Heading: React.FC<{}> = ({ children }) => (
  <h1 className={styles.heading}>{children}</h1>
);
