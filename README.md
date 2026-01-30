# Movie Review App

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
- The frontend talks to the backend automatically; you don’t need to open port 3001 in the browser unless you’re testing the API (e.g. http://localhost:3001/api/health).

---

## 6. Install Node.js (optional)

If you might run the app without Docker, install Node.js so you have `npm` and `node` available.

- **Download:** [https://nodejs.org](https://nodejs.org)
- Choose the **LTS** version.
- Run the installer and follow the prompts. Restart your terminal (or computer) if needed.
- Check: open a terminal and run `node --version` and `npm --version`; you should see version numbers.
