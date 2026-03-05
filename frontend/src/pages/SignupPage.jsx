/**
 * Sign up page — outline only. Implement the form and wire to api/auth.js (see issue).
 */
import styles from "./SignupPage.module.css";

const SignupPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Sign up</h1>
      </div>
      <div className={styles.content}>
        {/* TODO: Add signup form and wire submit to api/auth.js */}
      </div>
    </div>
  );
};

export default SignupPage;
