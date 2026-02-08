# Frontend Guide

This guide explains how the frontend works: React, CSS, JavaScript, and how data flows from the backend. It's written for people with a C background.

---

## What Is a Frontend?

The **frontend** is what runs in the user's browser. It:

- Renders the UI (buttons, text, images).
- Handles user input (clicks, typing).
- Fetches data from the backend and displays it.
- Updates the screen when data changes.

This project uses **React**—a library that builds the UI from reusable **components** and keeps the view in sync with data (**state**).

---

## Folder Structure

```
frontend/
├── public/
│   └── index.html       # Single HTML file – React mounts into it
├── src/
│   ├── index.js         # Entry point: renders the React app
│   ├── index.css        # Global styles
│   ├── App.jsx          # Root component: routes and layout
│   ├── api/             # Functions that call the backend
│   │   └── movies.js    # fetchPopularMovies, fetchMovieById, etc.
│   ├── components/      # Reusable UI building blocks
│   │   ├── MovieCard.jsx
│   │   ├── MovieCard.module.css
│   │   ├── Navbar.jsx
│   │   └── Navbar.module.css
│   ├── pages/           # Full-page views (one per route)
│   │   ├── HomePage.jsx
│   │   ├── HomePage.module.css
│   │   ├── MovieDetailPage.jsx
│   │   └── ...
│   ├── styles/          # Shared CSS variables
│   │   ├── colors.css
│   │   ├── spacing.css
│   │   └── typography.css
│   └── data/            # Mock/static data (optional)
│       └── mockMovies.js
└── package.json
```

**Why this structure?** `components` = reusable pieces. `pages` = full screens. `api` = all backend calls in one place. `styles` = shared variables.

---

## Writing React Logic

### Components and props

A **component** is a function that returns what to show on screen. **Props** are inputs passed from the parent, like function parameters.

```javascript
const MovieCard = ({ movie }) => {
  return (
    <div>
      <p>{movie.title}</p>
    </div>
  );
};

// Usage: <MovieCard movie={someMovie} />
```

- `{ movie }` = destructure the prop from the object; same as `props.movie`.
- The return value is **JSX**. Curly braces `{ }` run JavaScript inside it.

### JSX when writing logic

| JSX | What it does |
|-----|--------------|
| `{movie.title}` | Insert a variable |
| `{movies.map(m => <Card key={m.id} movie={m} />)}` | Loop and render; `key` must be unique |
| `{loading && <p>Loading...</p>}` | Show only if `loading` is true |
| `{error ? <p>Error</p> : <p>OK</p>}` | Ternary: show one or the other |
| `className={styles.card}` | Use `className`, not `class` |
| `onClick={() => setCount(c => c + 1)}` | Event handler; wrap in arrow function |

### State and when to use it

**State** = data that changes. When you call the setter, React re-renders.

```javascript
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

- Use state for anything that changes and should update the UI.
- Never modify state directly: `movies.push(x)` is wrong. Use `setMovies([...movies, x])` or `setMovies(prev => [...prev, x])`.
- For objects: `setUser({ ...user, name: "New" })` to update one field.

### useEffect: fetching and side effects

Run code when the component mounts or when something changes:

```javascript
useEffect(() => {
  setLoading(true);
  fetchPopularMovies()
    .then((data) => {
      setMovies(data);
      setError(null);
    })
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
}, []);
```

- `[]` = run once when the component mounts.
- `[id]` = run when `id` changes (e.g. when navigating to a different movie).
- Always handle errors: `.catch()` or try/catch with async/await.

### Event handlers

```javascript
const handleClick = () => {
  setCount((prev) => prev + 1);
};

const handleSubmit = (e) => {
  e.preventDefault();  // Stop form from reloading the page
  doSomething();
};

// In JSX:
<button onClick={handleClick}>Click</button>
<form onSubmit={handleSubmit}>...</form>
```

- Pass a function, not a call: `onClick={handleClick}` not `onClick={handleClick()}`.
- For inline logic: `onClick={() => doSomething(id)}`.

### Conditional rendering patterns

```javascript
// Show loading, error, or content
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;
return <div>{/* actual content */}</div>;

// Or inline:
{loading && <Spinner />}
{movies.length === 0 && <p>No results</p>}
{movies.map(m => <Card key={m.id} movie={m} />)}
```

### Passing data down, calling parents up

- **Props down:** Parent passes data to child: `<MovieCard movie={movie} />`.
- **Callbacks up:** Parent passes a function; child calls it: `<SearchBar onSearch={setQuery} />`. The child can't change parent state directly, so the parent gives it a way to report back.

---

## How Data Fetching Works

- **`api/movies.js`** – functions that call `http://localhost:3001/movies`, etc.
- **Pages** – call those functions in `useEffect` and store the result in state.

### Example flow

1. `HomePage` mounts.
2. `useEffect` runs and calls `fetchPopularMovies()`.
3. `fetchPopularMovies` sends `GET http://localhost:3001/movies` to the backend.
4. Backend returns JSON `{ movies: [...] }`.
5. The API function returns the data.
6. `setMovies(data)` updates state.
7. React re-renders. The page shows the movies.

### The fetch API (JavaScript)

```javascript
async function fetchPopularMovies() {
  const response = await fetch("http://localhost:3001/movies");
  const data = await response.json();
  return data.movies;
}
```

- `fetch(url)` – sends an HTTP request. Returns a Promise.
- `await` – waits for the Promise to finish (like blocking until the request completes).
- `response.json()` – parses the response body as JSON.

### Async / await

- In C, a blocking call blocks the whole program.
- In JavaScript, `await` only pauses the current function. The browser stays responsive.
- `async function` = a function that can use `await`.

---

## How CSS Works

### Global vs component styles

- **`index.css`** – global styles (body, #root, resets).
- **`*.module.css`** – scoped to a component. Class names become unique so they don't clash.

### Using CSS modules

```javascript
import styles from "./MovieCard.module.css";

// In JSX:
<div className={styles.card}>
```

In the CSS file:

```css
.card {
  border-radius: 8px;
  padding: 16px;
}
```

React turns `styles.card` into something like `MovieCard_card_abc123`, so it won't conflict with other `.card` classes.

### CSS variables (this project)

Shared values live in `styles/`:

```css
/* colors.css */
--color-bg: #1a1a1a;
--color-text: #f5f5f5;
--color-primary: #e50914;

/* spacing.css */
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
```

Use them:

```css
.myBox {
  padding: var(--spacing-md);
  color: var(--color-text);
}
```

### Basic CSS concepts

| Concept  | Example                                                |
| -------- | ------------------------------------------------------ |
| Selector | `.card` targets elements with `class="card"`           |
| Property | `color: red;`                                          |
| Flexbox  | `display: flex;` – arrange children in a row or column |
| Grid     | `display: grid;` – arrange in rows and columns         |

---

## Routing (changing pages)

React Router lets you show different components for different URLs:

```javascript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/movie/:id" element={<MovieDetailPage />} />
  <Route path="/profile" element={<ProfilePage />} />
</Routes>
```

- `/` → HomePage
- `/movie/123` → MovieDetailPage (with `id = 123`)
- `/profile` → ProfilePage

### Navigating

Use `Link` instead of `<a>` so the page doesn't fully reload:

```javascript
<Link to="/movie/123">View Movie</Link>
```

### Getting URL params

```javascript
const { id } = useParams(); // From /movie/:id
```

---

## Flow Summary

1. User opens `http://localhost:5001`.
2. React loads `App`, which renders `HomePage` for `/`.
3. `HomePage` uses `useEffect` to call `fetchPopularMovies()`.
4. `fetchPopularMovies` requests `http://localhost:3001/movies`.
5. Backend returns JSON. Frontend stores it in state.
6. React re-renders. `HomePage` shows `MovieCard` for each movie.
7. User clicks a movie. `Link` navigates to `/movie/123`.
8. `MovieDetailPage` mounts, fetches movie 123, displays it.

---

## Quick Reference

| File / Folder  | Purpose                            |
| -------------- | ---------------------------------- |
| `index.js`     | Renders the app into the DOM       |
| `App.jsx`      | Routes and top-level layout        |
| `api/*.js`     | Functions that call the backend    |
| `components/`  | Reusable UI pieces                 |
| `pages/`       | Full-page views (one per route)    |
| `*.module.css` | Styles scoped to a component       |
| `styles/*.css` | Shared variables (colors, spacing) |
