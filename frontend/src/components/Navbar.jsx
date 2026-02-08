/**
 * Navbar component - appears at the top of every page.
 *
 * To use: Import this in App.jsx and add it above <Routes> so it shows on all pages.
 * Example: import Navbar from "./components/Navbar.jsx";
 *
 *
 */
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo or site name - change the text or wrap in a Link to home */}
        <Link to="/" className={styles.logo}>
          Movie Review
        </Link>

        <ul className={styles.links}>
          {/* Add more links here as you build features */}
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* Example: <li><Link to="/profile">Profile</Link></li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
