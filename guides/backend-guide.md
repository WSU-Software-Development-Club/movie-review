# Backend Guide

This guide explains how the backend works, how routes and the Express framework fit together, and how to test your API with Postman.

---

## What Is a Backend?

In a full-stack app:

- **Frontend** = what the user sees (browser, UI, React).
- **Backend** = a server that runs on a machine and responds to requests. It does work the browser can't do: talk to databases, call external APIs (like TMDB), keep secrets (API keys), etc.

Your backend listens on a port (e.g. 3001). When the frontend or a tool like Postman sends a request to `http://localhost:3001/movies`, the backend handles it and sends back data (usually JSON).

---

## Folder Structure

```
backend/
├── index.js          # Entry point: starts the server, connects routes
├── package.json      # Dependencies - the loaded libraries
├── .env              # Secrets (API keys) – you create this, doesn't get commited
├── .env.example      # Template for .env – safe to commit
├── routes/           # URL paths → handler functions
│   └── movies.js     # All /movies/* routes
└── services/         # Business logic (fetch from TMDB, process data)
    └── movies.js     # Movie-related logic
```

**Why separate routes and services?** Routes decide *which* URL does what. Services contain the actual logic (fetching, transforming data). This keeps the code organized and easier to test.

---

## Javascript vs. C

| C | JavaScript |
|---|------------|
| `int x = 5;` | `const x = 5;` or `let x = 5;` |
| `void foo(int a)` | `function foo(a) { }` |
| `return 0;` | `return value;` (no exit codes) |
| `#include` | `require("./file")` or `import x from "file"` |
| No `async` | `async function` and `await` for slow operations |

- **`const`** = variable that doesn't change.
- **`let`** = variable that can change.
- **`module.exports`** = like exposing a function so other files can `require` it.

---

## JSON Basics

**JSON** (JavaScript Object Notation) is a text format for sending data. APIs use it for request and response bodies.

### Syntax

- **Objects** – `{ "key": "value" }` (keys must be in double quotes)
- **Arrays** – `[ "a", "b", "c" ]` or `[ { "id": 1 }, { "id": 2 } ]`
- **Values** – strings `"text"`, numbers `42`, booleans `true`/`false`, `null`

```json
{
  "movies": [
    { "id": 550, "title": "Fight Club", "release_date": "1999-10-14" }
  ]
}
```

### In the backend

- **Sending:** `res.json({ movies: [] })` – converts a JavaScript object to JSON and sends it.
- **Receiving:** `app.use(express.json())` parses incoming JSON into `req.body`. Without it, `req.body` is empty for POST requests with a JSON body.

---

## Writing Backend Logic

**Express** is the framework. You define routes (URL → function) and handlers (the logic that runs).

### Route structure in this project

In `index.js`, `app.use("/movies", moviesRouter)` mounts all movie routes under `/movies`.

In `routes/movies.js`:

```javascript
router.get("/", getPopularMovies);      // GET /movies
router.get("/search", searchMovies);    // GET /movies/search
router.get("/:id", getMovieById);       // GET /movies/:id
```

To add a new route: import the handler from services, then add a line: `router.get("/path", handlerName)`.

### HTTP methods

| Method | Typical use |
|--------|-------------|
| GET | Read data |
| POST | Create something |
| PUT/PATCH | Update |
| DELETE | Remove |

### Reading request data

| Source | How to access |
|--------|---------------|
| Query params `?q=batman` | `req.query.q` |
| URL params `/movies/:id` | `req.params.id` |
| JSON body | `req.body` (need `app.use(express.json())`) |

### Sending responses

```javascript
res.json({ movies: [] });                    // 200 + JSON
res.status(404).json({ error: "Not found" }); // 404 + JSON
res.send("plain text");                      // 200 + text
```

### Writing a route handler

Handlers receive `(req, res)`. They read from `req`, do work, then call `res.json()` or `res.send()`.

```javascript
async function getMovieById(req, res) {
  const id = req.params.id;
  const movie = await fetchFromTMDB(id);  // your logic
  if (!movie) {
    return res.status(404).json({ movie: null });
  }
  res.json({ movie });
}
```

- Use `async` if you call `await` (e.g. fetch, database).
- Always send exactly one response. Don't send after a `return` that already sent.

### Writing service logic (fetching external APIs)

Services live in `services/`. They do the real work; routes just call them and send the result.

```javascript
// services/movies.js
const TMDB_BASE = "https://api.themoviedb.org/3";

async function getPopularMovies(req, res) {
  try {
    const url = `${TMDB_BASE}/movie/popular?api_key=${process.env.TMDB_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json({ movies: data.results });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
}
```

- Use `process.env.TMDB_API_KEY` for secrets; never hardcode them.
- `fetch` returns a Promise; `await` it to get the response.
- `response.json()` parses the body.
- Wrap async logic in try/catch and send an error response on failure.

### Handling POST requests (when you add them)

```javascript
// routes/reviews.js
router.post("/", createReview);

// services/reviews.js
async function createReview(req, res) {
  const { movieId, rating, text } = req.body;
  if (!movieId || !rating) {
    return res.status(400).json({ error: "movieId and rating required" });
  }
  // Save to DB, etc.
  res.status(201).json({ review: { id: 1, movieId, rating, text } });
}
```

- Validate `req.body` before using it.
- Return 400 for bad input, 201 for successful creation.

---

## Testing with Postman

Postman lets you send HTTP requests to your backend without using the frontend.

### Setup

1. Install Postman: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
2. Start the backend (e.g. with Docker or `npm run dev` in `backend/`).
3. Confirm the backend is running at `http://localhost:3001`.

### Sending a GET request

1. Open Postman.
2. Create a new request (+ or New → HTTP Request).
3. Set method to **GET**.
4. Enter URL: `http://localhost:3001/movies`
5. Click **Send**.

You should see the JSON response in the body.

### Testing other routes

| URL | Method | What it does |
|-----|--------|--------------|
| `http://localhost:3001/` | GET | Health check ("Backend active") |
| `http://localhost:3001/movies` | GET | List popular movies |
| `http://localhost:3001/movies/search?q=batman` | GET | Search movies |
| `http://localhost:3001/movies/550` | GET | Get movie by ID (550 = Fight Club) |

### Sending a POST request (when you add one)

1. Set method to **POST**.
2. URL: `http://localhost:3001/reviews` (example).
3. Body → **raw** → **JSON**.
4. Type: `{ "movieId": 550, "rating": 5 }`
5. Click **Send**.

---

## Testing with curl (optional)

`curl` is a command-line tool. Good for quick checks.

```bash
# GET /movies
curl http://localhost:3001/movies

# GET /movies/search?q=batman
curl "http://localhost:3001/movies/search?q=batman"

# GET /movies/550
curl http://localhost:3001/movies/550
```

---

## Flow Summary

1. Client (browser or Postman) sends `GET http://localhost:3001/movies`.
2. Express matches the URL to the route in `routes/movies.js`.
3. The route calls a handler (e.g. `getPopularMovies` from `services/movies.js`).
4. The handler fetches data (e.g. from TMDB), builds JSON, and calls `res.json(...)`.
5. The client receives the JSON.

---

## Quick Reference

| File | Purpose |
|------|---------|
| `index.js` | Start server, mount routes, middleware |
| `routes/movies.js` | Map URLs to handler functions |
| `services/movies.js` | Fetch from TMDB, format data, return JSON |
