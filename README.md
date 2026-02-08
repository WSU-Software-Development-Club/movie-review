# Movie Review App

**Guides:**
[Contribution](guides/contribution-guide.md)
[Backend](guides/backend-guide.md)
[Frontend](guides/frontend-guide.md)

---

## What you need

To run this project locally you need:

1. **Docker Desktop** – runs the app in containers (frontend and backend).
2. **Git** – to clone the repository.

**Node.js** is optional; you only need it if you want to run the app without Docker (e.g. `npm run dev` in `frontend/` and `backend/`). For the steps below we use Docker only.

---

## 1. Install Docker Desktop

Docker Desktop gives you Docker Engine and Docker Compose so you can run the app with one command.

- **Download:** [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
- Install and start Docker Desktop. On first launch it may ask for permission to enable WSL 2 or the Hyper-V backend; accept if prompted.
- Wait until Docker Desktop is fully started (whale icon in the system tray, no “starting” message).
- Check: open a terminal and run `docker --version` and `docker compose version`; you should see version numbers.

---

## 2. Install Git

Git is used to clone the repository to your machine.

- **Download:** [https://git-scm.com/downloads](https://git-scm.com/downloads)
- Choose the installer for your operating system and run it. Use the default options if unsure.
- Check: open a terminal and run `git --version`; you should see a version number.

---

## 3. Clone the repository

Open a terminal and navigate to a directory you want this project in. Recommended to clone onto your desktop folder:

```bash
git clone https://github.com/WSU-Software-Development-Club/movie-review.git
cd movie-review
```

You now have the project in the `movie-review` folder.

---

## 4. Run the project with Docker

We use the **development** Compose file so the app runs with **hot reload** (code changes apply without rebuilding).

In the project root (the folder that contains `docker-compose.dev.yml`), run:

```bash
docker compose -f docker-compose.dev.yml up --build
```

- The first time, Docker will build the frontend and backend images and then start the containers. This can take a few minutes.
- When you see the backend and frontend logs running (e.g. “Backend running on…” and Vite dev server ready), the app is up.

To stop the app: press **Ctrl+Z** in that terminal. To remove the containers: `docker compose -f docker-compose.dev.yml down`.

---

## 5. Access the app (ports)

Once the app is running:

| What              | URL                   | Port |
| ----------------- | --------------------- | ---- |
| **Frontend (UI)** | http://localhost:5001 | 5001 |
| **Backend (API)** | http://localhost:3001 | 3001 |

- Open a browser and go to **http://localhost:5001** to use the movie review app.
- Open **http://localhost:3001** to see the backend response

---

## 6. Get a TMDB API key

The app uses [The Movie Database (TMDB)](https://www.themoviedb.org/) for movie data. You need a free API key.

1. Go to [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup) and create an account.
2. In your account settings, go to **API** in the left sidebar.
3. Request an API key (choose "Developer" and fill in the short form).
4. Copy your **API Key (v3 auth)**.
5. Create a `.env` file in the `backend/` folder with: `TMDB_API_KEY="your_api_key_here"`.
6. Restart Docker if the app is already running.

---

## 7. Postman (for testing the API)

[Postman](https://www.postman.com/downloads/) lets you send requests to your backend API without using the frontend.

- **Download:** [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
- Install and open Postman.
- Create a new request and set the URL to `http://localhost:3001/movies` (or another backend route). Send a GET request to test.

---
