import { Link } from "react-router-dom";
import styles from "./SiteFooter.module.css";

const SiteFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>Movie Review</p>
        <p className={styles.copy}>© {year} WSU Software Development Club</p>
        <nav className={styles.navWrap} aria-label="Footer">
          <ul className={styles.nav}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/login">Log in</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default SiteFooter;
