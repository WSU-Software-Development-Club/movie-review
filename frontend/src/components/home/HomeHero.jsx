import { Link } from "react-router-dom";
import { tmdbPosterUrl, tmdbBackdropUrl } from "../../utils/tmdbPosterUrl.js";
import { formatRatingDisplay } from "../../utils/movieDisplay.js";
import styles from "./HomeHero.module.css";

/**
 * @param {object|null|undefined} featuredMovie - Featured list item (poster fills the hero backdrop)
 * @param {boolean} loading - Initial home lists loading
 * @param {string|number|null|undefined} featuredDbRating - App/DB score when backend supports it
 * @param {{ genres?: string[], year?: string|null, runtime?: string|null }} featuredMeta - From movie detail API
 * @param {boolean} featuredMetaLoading - Detail fetch in flight (genres / runtime)
 * @param {string} [featuredOverview] - Prefer TMDB detail overview when loaded
 * @param {string|null|undefined} featuredBackdropPath - TMDB widescreen backdrop_path (detail or list)
 */

const HomeHero = ({
  featuredMovie = null,
  featuredBackdropPath = null,
  loading = false,
  featuredDbRating = null,
  featuredMeta = { genres: [], year: null, runtime: null },
  featuredMetaLoading = false,
  featuredOverview = "",
}) => {
  const title = featuredMovie?.title ?? null;
  const overview = featuredOverview?.trim() || featuredMovie?.overview?.trim() || "";
  const detailPath = featuredMovie?.id != null ? `/movie/${featuredMovie.id}` : "/search";

  const widescreenUrl = featuredBackdropPath
    ? tmdbBackdropUrl(featuredBackdropPath, "w1280")
    : null;
  const posterOnlyUrl = featuredMovie?.poster_path
    ? tmdbPosterUrl(featuredMovie.poster_path, "w780")
    : null;
  const backdropUrl = widescreenUrl ?? posterOnlyUrl;
  const usePortraitPoster = !widescreenUrl && Boolean(posterOnlyUrl);

  const scoreText = formatRatingDisplay(featuredDbRating);
  const scoreAriaLabel =
    scoreText === "N/A" ? "Score not available yet" : `Score ${scoreText}`;

  const showInitialMetaSkeleton = loading;
  const showPartialMetaSkeleton =
    !loading && Boolean(featuredMovie) && featuredMetaLoading;

  const genreList = featuredMeta.genres ?? [];

  return (
    <section className={styles.hero} aria-labelledby="home-hero-heading">
      <div className={styles.backdrop} aria-hidden>
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt=""
            className={`${styles.backdropImage}${usePortraitPoster ? ` ${styles.backdropImagePortrait}` : ""}`}
          />
        ) : (
          <div className={styles.backdropPlaceholder} />
        )}
        <div className={styles.darken} />
        <div className={styles.gradients} />
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Featured</p>

          {loading ? (
            <>
              <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
              <div className={`${styles.skeletonLine} ${styles.skeletonLineMid}`} />
              <div className={`${styles.skeletonLine} ${styles.skeletonLineMid}`} />
            </>
          ) : (
            <>
              <h1 id="home-hero-heading" className={styles.headline}>
                {title ?? "—"}
              </h1>
              <p className={styles.description}>
                {overview || "Description will appear when a featured title is available from your feed."}
              </p>
            </>
          )}

          <div className={styles.metaRow}>
            {!loading && (
              <span className={styles.scoreBadge} aria-label={scoreAriaLabel}>
                {scoreText}
              </span>
            )}
            {loading && <span className={styles.scoreBadgeSkeleton} aria-hidden />}
            <ul className={styles.pills}>
              {showInitialMetaSkeleton && (
                <>
                  <li className={`${styles.pillSkeleton} ${styles.pillSkeletonYear}`} aria-hidden />
                  <li className={`${styles.pillSkeleton} ${styles.pillSkeletonRuntime}`} aria-hidden />
                  <li className={`${styles.pillSkeleton} ${styles.pillSkeletonGenre}`} aria-hidden />
                  <li className={`${styles.pillSkeleton} ${styles.pillSkeletonGenre}`} aria-hidden />
                </>
              )}
              {!loading && !featuredMovie && (
                <>
                  <li className={styles.pill}>—</li>
                  <li className={styles.pill}>—</li>
                </>
              )}
              {showPartialMetaSkeleton && (
                <>
                  <li className={styles.pill}>{featuredMeta.year ?? "—"}</li>
                  <li className={`${styles.pillSkeleton} ${styles.pillSkeletonRuntime}`} aria-hidden />
                  <li className={`${styles.pillSkeleton} ${styles.pillSkeletonGenre}`} aria-hidden />
                  <li className={`${styles.pillSkeleton} ${styles.pillSkeletonGenre}`} aria-hidden />
                </>
              )}
              {!loading && featuredMovie && !featuredMetaLoading && (
                <>
                  <li className={styles.pill}>{featuredMeta.year ?? "—"}</li>
                  <li className={styles.pill}>{featuredMeta.runtime ?? "—"}</li>
                  {genreList.map((name, index) => (
                    <li key={`${name}-${index}`} className={styles.pill}>
                      {name}
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className={styles.ctas}>
            <Link className={styles.ctaPrimary} to="/search">
              Find movies
            </Link>
            <Link className={styles.ctaSecondary} to={detailPath}>
              {featuredMovie?.id != null ? "View details" : "Browse"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
