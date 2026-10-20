# MIDID_4J

React + Vite frontend application.

## Local development

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

Build output is generated in `dist/`.

## Hosting (GitHub Pages)

This repository is configured to auto-deploy to GitHub Pages from `main` using `.github/workflows/deploy.yml`.

### Deployment flow

- Trigger: push to `main` (or manual workflow dispatch)
- Install command: `npm ci`
- Build command: `npm run build`
- Publish directory: `dist`

### Environment variables

If needed, add these repository secrets in GitHub:

- `VITE_GEMINI_API_KEY`
- `VITE_OPENROUTER_API_KEY`

### Enable Pages

1. Open repository **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` to trigger deployment.

### Custom domain (optional)

In **Settings → Pages**, set a custom domain and enable HTTPS after DNS is configured.
