const express = require("express");
const router = express.Router();
const {
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
  getMovieById,
} = require("../services/movies");

router.get("/now_playing", getNowPlayingMovies);
router.get("/popular", getPopularMovies);
router.get("/top_rated", getTopRatedMovies);
router.get("/upcoming", getUpcomingMovies);
router.get("/search", searchMovies);
router.get("/:id", getMovieById);

module.exports = router;
