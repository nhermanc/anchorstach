# IONOS Deploy Now — static site folder

## One folder for hosting

After a successful build, **everything IONOS should publish** is in the **`deploy/`** folder (HTML, JS, CSS, images copied from `public/`, etc.).

## Commands

```bash
npm run build:deploy
```

This will:

1. Generate `public/sitemap.xml` and `public/robots.txt` from `app/company-data.ts`
2. Run `next build`
3. Run `next export -o deploy` → static files in **`deploy/`**

## IONOS GitHub Actions

In your workflow (build step), use:

```yaml
run: |
  npm ci
  npm run build:deploy
```

Set the **publish / deployment folder** to:

```text
deploy
```

(Not `public` — that name is reserved for Next.js source assets.)

## `.deploy-now/config.yaml`

The **deploy-to-ionos** step requires a valid config with a top-level **`version`** (e.g. `1.0`) and a **`deploy:`** block. This repo includes:

- **`.deploy-now/config.yaml`** — used by many **deploy-to-ionos** workflows
- **`.deploy-now/anchorstach/config.yaml`** — if your workflow’s `config-file` points here (v2-style)

Commit and push both if your IONOS project references them.

## Environment variable

Optional: set `NEXT_PUBLIC_SITE_URL` in IONOS build env so sitemap URLs match your live domain.

## Notes

- **API routes** (`/api/contact`, etc.) are **not** included in a static export. The contact form needs another backend (e.g. Formspree) if you rely only on static hosting.
- Standard **`npm run build`** still only creates `.next/` (for `next start` or Node hosting). Use **`npm run build:deploy`** for IONOS static hosting.

---

## `artifact-action` (upload step)

Your workflow must upload the **static output folder**, not the repo root.

| Input | Use this | Avoid |
|--------|-----------|--------|
| **`folder`** | `deploy` | `./` — uploads source, `package.json`, etc., not the site |
| **`config-file`** | `.deploy-now/anchorstach/config.yaml` | Missing file in GitHub → can break upload |

Example (after `npm run build:deploy` in the same job):

```yaml
- uses: ionos-deploy-now/artifact-action@v1
  with:
    api-key: ${{ secrets.IONOS_API_KEY }}
    service-host: api-us.ionos.space   # or the host shown in your IONOS workflow
    project-id: ${{ secrets.IONOS_PROJECT_ID }}
    branch-id: ${{ secrets.IONOS_BRANCH_ID }}
    version: ${{ github.sha }}
    folder: deploy
    config-file: .deploy-now/anchorstach/config.yaml
    action: upload
```

Commit **`.deploy-now/anchorstach/config.yaml`** (this repo includes it).

### If upload fails with **404**

1. **Region:** Project in **EU** may need a different `service-host` than `api-us.ionos.space`. Copy the host from the workflow IONOS generated in the dashboard.
2. **IDs:** Re-copy **project-id** and **branch-id** from Deploy Now → project → GitHub integration (recreated projects get new IDs).
3. **Branch:** `branch-id` must match the **branch** this workflow runs for (e.g. `main` vs staging).
4. **`folder`:** Must exist and be non-empty — run **`npm run build:deploy`** so **`deploy/`** is created before the upload step.

### `DEPLOYMENT_FOLDER` env

Set this in the **build** step to match where the static site is produced (conceptually `deploy`). The **artifact** step’s **`folder: deploy`** must match that output directory name.

### Next.js 11 + `next export` + `next/image`

`next export` only checks that `images.loader !== 'default'`. **`images.unoptimized: true` alone does not fix that in Next 11.** This repo sets **`loader: 'akamai'`** and **`path: '/'`** so export succeeds; image URLs look like `/path/to.jpg?imwidth=…` (static hosts ignore the extra query).
