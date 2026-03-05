/**
 * Search results page — outline only.
 * TODO: Read query from URL (useSearchParams), add state and useEffect to call searchMovies(q),
 * then show loading, error, or results grid. Requires searchMovies() in api/movies.js to be implemented.
 */
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard.jsx";
import { searchMovies } from "../api/movies.js";
import styles from "./SearchPage.module.css";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  // TODO: Add state for results, loading, error; useEffect that calls searchMovies(query) when query changes
  const results = [];
  const loading = false;
  const error = null;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          Search {query ? `for "${query}"` : ""}
        </h1>
      </div>
      <div className={styles.content}>
        {loading && <p className={styles.placeholder}>Loading...</p>}
        {error && <p className={styles.error}>Error: {error}</p>}
        {!loading && !error && results.length === 0 && (
          <div className={styles.placeholder}>
            {query
              ? "No results. Implement search (state + useEffect + searchMovies)."
              : "Enter a search query in the URL (?q=...)"}
          </div>
        )}
        {!loading && !error && results.length > 0 && (
          <div className={styles.grid}>
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
