/**
 * Profile page - shows user info and preferences.
 *
 * To use: Add <Route path="/profile" element={<ProfilePage />} /> in App.jsx
 *
 */
import { Link } from "react-router-dom";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile</h1>

      <section className={styles.section}>
        <h2>Basic Info</h2>
        {/* TODO: Display user name, email, avatar, etc. */}
        <p className={styles.placeholder}>Your info goes here</p>
      </section>

      <section className={styles.section}>
        <h2>My Reviews</h2>
        {/* TODO: List the user's saved or submitted reviews */}
        <p className={styles.placeholder}>Your reviews go here</p>
      </section>
    </div>
  );
};

export default ProfilePage;
