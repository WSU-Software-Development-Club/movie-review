import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import MovieDetailPage from "./pages/MovieDetailPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {
  return (
    <Router>
      <div className="app-layout">
        <header className="app-header">
          <Navbar />
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
