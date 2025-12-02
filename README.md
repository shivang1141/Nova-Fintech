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

A Vite + React single-page app (SPA) ready to push to GitHub and deploy to Vercel.

Quick start (PowerShell)

1) Install dependencies and run locally

```powershell
cd "c:\Users\test\Desktop\nova-financial (2)"
npm install
npm run dev
```

Open the app at `http://localhost:3000/`.

2) Commit and push to GitHub

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

3) Deploy to Vercel (recommended)

- Go to https://vercel.com/new and import the GitHub repository you pushed.
- Vercel will detect a Vite app. Use the defaults or set:
   - Build Command: `npm run build`
   - Output Directory: `dist`

Alternative: use the Vercel CLI from your machine

```powershell
npm i -g vercel
vercel login
vercel --prod
```

Files included for deployment

- `vercel.json` — instructs Vercel to build and serve the `dist` folder and enables SPA routing.
- `.github/workflows/ci.yml` — optional CI that runs `npm ci` and `npm run build` on push/PR.

Environment variables

- Do not commit `.env` files. Add any secrets via the Vercel dashboard (Project → Settings → Environment Variables).

Troubleshooting

- If the preview URL doesn't load, run `npm run build` locally and check the `dist` output.
- To stop the local dev server, press `Ctrl+C` in the terminal running `npm run dev`.

If you'd like, I can create the GitHub repository and push the code for you (I will need a GitHub token), or I can run a Vercel CLI deploy — tell me which and I'll proceed.
