# IONOS Deployment Fix

## npm ci Error

If you see: `npm ci can only install with an existing package-lock.json`

### Fix 1: Commit package-lock.json (Recommended)

```bash
git add package-lock.json
git commit -m "Add package-lock.json for IONOS deployment"
git push
```

### Fix 2: Use npm install instead of npm ci

If package-lock.json is already committed but the error persists, edit your workflow:

1. Go to `.github/workflows/` in your repo
2. Open `deploy-now.yaml` (v1) or `[project-name]-build.yaml` (v2)
3. Find the line: `npm ci`
4. Change it to: `npm install`
5. Commit and push

## Next.js Static Export

If DEPLOYMENT_FOLDER is `out`, ensure your build produces static files. For Next.js 11, add to your build script in package.json:

```json
"build": "node --openssl-legacy-provider ./node_modules/next/dist/bin/next build && next export"
```

And add to `next.config.js`:
```js
output: 'export'
```

(Note: `output: 'export'` requires Next.js 13+. For Next.js 11, use `next export` after build.)
