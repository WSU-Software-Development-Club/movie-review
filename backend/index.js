const express = require("express");
const cors = require("cors");
const reviewsRouter = require("./routes/reviews");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ["http://localhost:5001", "http://localhost"] }));
app.use(express.json());

app.use("/api/reviews", reviewsRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
