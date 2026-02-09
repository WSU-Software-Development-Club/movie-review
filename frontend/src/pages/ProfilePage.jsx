/**
 * Profile page — outline only. TODO: User info, reviews, preferences.
 */
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Profile</h1>
      </div>
      <div className={styles.content}>
        {/* TODO: User info section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Section</h2>
          <div className={styles.placeholder}>Content area</div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
