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

## Environment variable

Optional: set `NEXT_PUBLIC_SITE_URL` in IONOS build env so sitemap URLs match your live domain.

## Notes

- **API routes** (`/api/contact`, etc.) are **not** included in a static export. The contact form needs another backend (e.g. Formspree) if you rely only on static hosting.
- Standard **`npm run build`** still only creates `.next/` (for `next start` or Node hosting). Use **`npm run build:deploy`** for IONOS static hosting.
