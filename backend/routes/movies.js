const express = require("express");
const router = express.Router();
const {
  getPopularMovies,
  searchMovies,
  getMovieById,
} = require("../services/movies");

router.get("/", getPopularMovies);
router.get("/search", searchMovies);
router.get("/:id", getMovieById);

module.exports = router;
