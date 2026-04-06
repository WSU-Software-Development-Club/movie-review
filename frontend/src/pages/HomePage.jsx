import { useState, useEffect } from "react";
import styles from "./HomePage.module.css";
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchMovieById,
} from "../api/movies.js";
import { fetchHomeReviews } from "../api/reviews.js";
import { tmdbPosterUrl } from "../utils/tmdbPosterUrl.js";
import HomeHero from "../components/home/HomeHero.jsx";
import MovieCarouselSection from "../components/home/MovieCarouselSection.jsx";
import HomeReviewCard from "../components/home/HomeReviewCard.jsx";
import SiteFooter from "../components/SiteFooter.jsx";

/**
 * @param {object[]} list
 * @returns {object|null}
 */
function pickRandomMovie(list) {
  if (!list?.length) return null;
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

function formatYear(releaseDate) {
  if (!releaseDate) return null;
  const y = new Date(releaseDate).getFullYear();
  return Number.isFinite(y) ? String(y) : null;
}

/**
 * @param {number|null|undefined} minutes
 * @returns {string|null}
 */
function formatRuntime(minutes) {
  if (minutes == null || minutes < 1 || Number.isNaN(Number(minutes))) {
    return null;
  }
  const m = Math.round(Number(minutes));
  const h = Math.floor(m / 60);
  const rest = m % 60;
  if (h === 0) return `${rest}m`;
  if (rest === 0) return `${h}h`;
  return `${h}h ${rest}m`;
}

/**
 * @param {object|null|undefined} detail - TMDB movie detail
 * @param {object|null|undefined} listItem - list row fallback
 * @returns {{ genres: string[], year: string|null, runtime: string|null }}
 */
function buildFeaturedMeta(detail, listItem) {
  const year =
    formatYear(detail?.release_date) ?? formatYear(listItem?.release_date);
  const genres =
    detail?.genres?.length > 0
      ? detail.genres.map((g) => g.name).filter(Boolean)
      : [];
  const runtime = formatRuntime(detail?.runtime);
  return {
    genres,
    year: year ?? null,
    runtime: runtime ?? null,
  };
}

/**
 * Maps a future API review record to HomeReviewCard props.
 * @param {object} r
 */
function reviewToCardProps(r) {
  const posterUrl =
    r.posterUrl ??
    (r.poster_path ? tmdbPosterUrl(r.poster_path, "w185") : null);
  return {
    posterUrl,
    avatarUrl: r.avatarUrl ?? r.avatar_url ?? null,
    reviewerName: r.reviewerName ?? r.author ?? r.userName ?? "",
    rating: r.rating ?? r.score,
    movieTitle: r.movieTitle ?? r.movie_title ?? "",
    text: r.text ?? r.body ?? "",
  };
}

const HomePage = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [featuredDetail, setFeaturedDetail] = useState(null);
  const [featuredDetailLoading, setFeaturedDetailLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      fetchNowPlayingMovies(),
      fetchPopularMovies(),
      fetchTopRatedMovies(),
      fetchUpcomingMovies(),
    ])
      .then(([np, pop, tr, up]) => {
        if (cancelled) return;
        setNowPlaying(np ?? []);
        setPopular(pop ?? []);
        setTopRated(tr ?? []);
        setUpcoming(up ?? []);
        setFeaturedMovie(pickRandomMovie(np ?? []));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!featuredMovie?.id) {
      setFeaturedDetail(null);
      setFeaturedDetailLoading(false);
      return;
    }
    let cancelled = false;
    setFeaturedDetailLoading(true);
    setFeaturedDetail(null);
    fetchMovieById(featuredMovie.id)
      .then((movie) => {
        if (!cancelled) setFeaturedDetail(movie ?? null);
      })
      .catch(() => {
        if (!cancelled) setFeaturedDetail(null);
      })
      .finally(() => {
        if (!cancelled) setFeaturedDetailLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [featuredMovie?.id]);

  useEffect(() => {
    fetchHomeReviews()
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch(() => setReviews([]));
  }, []);

  const featuredMeta = buildFeaturedMeta(featuredDetail, featuredMovie);
  const featuredOverview =
    featuredDetail?.overview?.trim() || featuredMovie?.overview?.trim() || "";

  return (
    <div className={styles.page}>
      <HomeHero
        featuredMovie={featuredMovie}
        featuredBackdropPath={
          featuredDetail?.backdrop_path ?? featuredMovie?.backdrop_path ?? null
        }
        loading={loading}
        featuredMeta={featuredMeta}
        featuredMetaLoading={featuredDetailLoading}
        featuredOverview={featuredOverview}
      />

      <div className={styles.carousels}>
        <MovieCarouselSection
          title="Now Playing"
          sectionId="now-playing"
          movies={nowPlaying}
          loading={loading}
        />
        <MovieCarouselSection
          title="Popular"
          sectionId="popular"
          movies={popular}
          loading={loading}
        />
        <MovieCarouselSection
          title="Top Rated"
          sectionId="top-rated"
          movies={topRated}
          loading={loading}
        />
        <MovieCarouselSection
          title="Upcoming"
          sectionId="upcoming"
          movies={upcoming}
          loading={loading}
        />
      </div>

      <section
        className={styles.reviewsSection}
        aria-labelledby="recent-reviews-heading"
      >
        <h2 id="recent-reviews-heading" className={styles.reviewsTitle}>
          Recent reviews
        </h2>
        {reviews.length === 0 ? (
          <p className={styles.emptyReviews}>No reviews to show yet.</p>
        ) : (
          <div className={styles.reviewGrid}>
            {reviews.map((r, index) => (
              <HomeReviewCard
                key={r.id ?? `review-${index}`}
                {...reviewToCardProps(r)}
              />
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
};

export default HomePage;
