# Contribution Guide

This guide explains how to contribute to the Movie Review app. You'll learn how to claim an issue, create a branch, and submit your work with a pull request.

---

## 1. Claim an Issue

Before you start coding, you need to **claim** an issue so others know you're working on it.

1. Go to the project's **Issues** tab on GitHub.
2. Find an issue you want to work on (look for labels like "good first issue" or "help wanted").
3. **Assign** yourself to the issue

**Why?** Multiple people might pick the same task. Claiming it prevents duplicate work.

---

## 2. Create a Branch

Never work directly on `main`. Create a **branch**–a copy of the code where you can make changes without affecting everyone else.

### Branch naming

Use: **yourname_issuenumber**

### Steps

1. Make sure you're on `main` and it's up to date:

   ```bash
   git checkout main
   git pull origin main
   ```

2. Create and switch to a new branch:

   ```bash
   git checkout -b yourname_issue-description
   ```

   Example: `git checkout -b reidw_add-movie-search`

3. Confirm you're on your branch:
   ```bash
   git branch
   ```
   The active branch has an asterisk (\*) next to it.

---

## 3. Make Your Changes

1. Edit the code (frontend, backend, or both).
2. Save your files.
3. Test that the app still works (run with Docker or `npm run dev`).

---

## 4. Commit and Push

1. Stage your changes:

   ```bash
   git add .
   ```

2. Commit with a clear message:

   ```bash
   git commit -m "Add movie search to homepage"
   ```

3. Push your branch to GitHub:
   ```bash
   git push origin yourname_issue-description
   ```
   Example: `git push origin reidw_add-movie-search`

---

## 5. Open a Pull Request (PR)

A **pull request** asks the maintainers to review your changes and merge them into `main`.

1. Go to the project on GitHub.
2. You'll usually see a yellow banner: "Compare & pull request" for your branch. Click it.
3. Or: click **Pull requests** → **New pull request** → choose your branch.

4. Fill out the PR:
   - **Title:** Short description (e.g. "Add movie search to homepage").
   - **Description:** What you changed and why. Reference the issue: "Fixes #42".
   - **Base branch:** `main` (default).

5. Click **Create pull request**.

6. Wait for review. Maintainers may ask for changes. If they do, make edits on the same branch, commit, and push again.

---

## Summary

| Step | Action                                                                                                  |
| ---- | ------------------------------------------------------------------------------------------------------- |
| 1    | Claim an issue (comment on it)                                                                          |
| 2    | Create branch: `git checkout -b yourname_issue-description`                                             |
| 3    | Make and test your changes                                                                              |
| 4    | Commit and push: `git add .` → `git commit -m "message"` → `git push origin yourname_issue-description` |
| 5    | Open a pull request on GitHub                                                                           |
