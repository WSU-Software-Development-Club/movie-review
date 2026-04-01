/**
 * Navbar — guided outline. Add search input or link to /search.
 */
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <img 
            src="https://placehold.co/40x40/png" 
            alt="Logo" 
            className={styles.image} 
          />
          <Link to="/" className={styles.logo}>
            Movie Review
          </Link>



          <ul className={styles.links}>
            <li>
             <Link to="/">Popular</Link>
            </li>
            <li>
             <Link to="/">Trending</Link>
            </li>
            <li>
             <Link to="/">Movies</Link>
            </li>
            <li>
             <Link to="/">TV Shows</Link>
            </li>
          </ul>

        </div>
        <ul className={styles.links}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;