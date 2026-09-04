# Metro Transit Rider Portal

A complete Vite + React + TypeScript application based on the supplied Metro Transit rider recruitment page.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173. Vite proxies `/api/*` requests to the local Express server at http://localhost:8787.

## Production build

```bash
npm run build
npm start
```

The Express server serves `dist/` and handles `POST /api/apply-rider`.

## Application storage

Local submissions are saved to `server/data/applications.json`. This is intentionally simple for a self-contained starter project. For production, replace it with a database and add authentication/admin tooling.

## Important production notes

- Add rate limiting and bot protection before a public launch.
- Store sensitive applicant data in a proper database with restricted access.
- Add privacy/consent text appropriate to your jurisdiction.
- Configure transactional email if you want applicant/HR notifications.
"# metrotransitriders" 
"# metrotransitriders" 
