# First-time Render setup (contact form)

After you **push** this repo, the static site already points at:

`https://anchorstacktech-contact-api.onrender.com/api/submit-inquiry`

That only works after the matching **Render Web Service** exists.

## Option A — Blueprint (fastest)

1. [Render Dashboard](https://dashboard.render.com/) → **New** → **Blueprint**.
2. Connect this GitHub repo.
3. Render reads **`render.yaml`** and creates **`anchorstacktech-contact-api`** from **`servers/contact-submit`**.
4. When prompted, add **`RECAPTCHA_SECRET_KEY`** (Google reCAPTCHA **secret** for your site keys).
5. Wait for deploy; check **`https://anchorstacktech-contact-api.onrender.com/health`** → `ok`.

## Option B — Manual Web Service

Create a **Web Service** with:

- **Name:** `anchorstacktech-contact-api` (must match the URL in **`next.config.js`**)
- **Root directory:** `servers/contact-submit`
- **Build:** `echo skip`
- **Start:** `node server.mjs`
- **Env:** `SITE_URL=https://anchorstacktech.com`, `RECAPTCHA_SECRET_KEY=…`, optional `NODE_VERSION=22`

If Render forces a **different** hostname (name taken), copy the URL they show and either:

- set **`NEXT_PUBLIC_CONTACT_SUBMIT_API_URL`** in your static build env to `https://<that-host>/api/submit-inquiry`, **or**
- change **`DEFAULT_CONTACT_SUBMIT_API_URL`** in **`next.config.js`** to match.

## Then

Push / redeploy your **static** site (IONOS). No extra GitHub secret is required for the default URL.
