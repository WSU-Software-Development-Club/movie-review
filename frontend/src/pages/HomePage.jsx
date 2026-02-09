/**
 * Home page — outline only. TODO: Add movie grid, search, filters.
 */
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Home</h1>
      </div>
      <div className={styles.content}>
        {/* TODO: Movie grid or list will go here */}
        <div className={styles.placeholder}>Content area</div>
      </div>
    </div>
  );
};

export default HomePage;
