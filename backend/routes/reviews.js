const express = require("express");
const router = express.Router();

// Placeholder: return empty list until you add movie reviews
router.get("/", (req, res) => {
  res.json([]);
});

module.exports = router;
