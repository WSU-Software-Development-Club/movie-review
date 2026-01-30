import { useState, useEffect } from "react";

function App() {
  const [health, setHealth] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then(setHealth)
      .catch(() => setHealth({ status: "error" }));
  }, []);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then(setReviews)
      .catch(() => setReviews([]));
  }, []);

  return (
    <main style={{ padding: "2rem", maxWidth: "40rem", margin: "0 auto" }}>
      <h1>Movie Review App</h1>
      <p>This is a movie review app.</p>
      {health && (
        <p>
          Backend health: <strong>{health.status}</strong>
        </p>
      )}
      {Array.isArray(reviews) && (
        <p>Reviews from API: {reviews.length} (placeholder list)</p>
      )}
    </main>
  );
}

export default App;
