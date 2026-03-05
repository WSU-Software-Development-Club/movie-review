/**
 * Login page — outline only. Implement the form and wire to api/auth.js (see issue).
 */
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Log in</h1>
      </div>
      <div className={styles.content}>
        {/* TODO: Add login form and wire submit to api/auth.js */}
      </div>
    </div>
  );
};

export default LoginPage;
