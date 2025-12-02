# Nova Financial

This is a Vite + React project. The repository is ready to be pushed to GitHub and deployed to Vercel.

Quick, one-shot instructions:

1. Initialize git, commit and push to a new GitHub repository

```
cd "c:\Users\test\Desktop\nova-financial (2)"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

2. Deploy to Vercel (recommended: connect your GitHub repo to Vercel)

- Go to https://vercel.com/new and import the repository you just pushed.
- Vercel will auto-detect the project as a Vite app. Use the defaults:
  - Build Command: `npm run build`
  - Output Directory: `dist`

Alternative: deploy from your machine using the Vercel CLI

# Nova Financial

Nova Financial is a single-page application (SPA) built with React and Vite. It shows financial tools and dashboards for portfolio analysis, market data, and planning.

This repository contains the full source and a production-ready build setup.

Run locally: install dependencies and run `npm run dev`. Open `http://localhost:3000/`.

Build for production: `npm run build` (outputs to `dist`).

Deploy: the project is ready for deployment on Vercel (uses `vercel.json`).
