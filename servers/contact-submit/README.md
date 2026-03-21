# Contact submit API (reCAPTCHA + Web3Forms)

Tiny **Node 18+** HTTP server — **no Next.js**. Use this when the marketing site is **static** (e.g. IONOS `next export`) and the contact form needs **server-side reCAPTCHA** + **Web3Forms**.

The static site must set **`NEXT_PUBLIC_CONTACT_SUBMIT_API_URL`** to your public API URL, for example:

`https://YOUR-SERVICE.onrender.com/api/submit-inquiry`

---

## Deploy on Render (recommended)

### 1. Create the Web Service

1. In [Render Dashboard](https://dashboard.render.com/) → **New +** → **Web Service**.
2. Connect your **GitHub** repository (same repo as the main site).
3. Configure:

   | Setting | Value |
   |--------|--------|
   | **Name** | e.g. `anchorstack-contact-submit` |
   | **Region** | Closest to your users |
   | **Branch** | `main` (or your production branch) |
   | **Root Directory** | `servers/contact-submit` |
   | **Runtime** | **Node** |
   | **Build Command** | `echo "skip"` *(no npm dependencies to install)* |
   | **Start Command** | `node server.mjs` |
   | **Instance type** | **Free** is fine (see note below) |

4. Under **Advanced** → set **Health Check Path** to **`/health`**.

### 2. Environment variables

In the service → **Environment** → add:

| Key | Value |
|-----|--------|
| **`RECAPTCHA_SECRET_KEY`** | Your Google reCAPTCHA **secret** (mark as **Secret** in Render) |
| **`SITE_URL`** | Your live marketing site, e.g. `https://anchorstacktech.com` *(CORS also allows `www` on the same domain)* |
| **`WEB3FORMS_ACCESS_KEY`** | Optional; if omitted, the default from `lib/web3forms-access-key.ts` in the main repo is used |

Optional: **`CONTACT_ALLOWED_ORIGINS`** — comma-separated list if you need extra origins (e.g. IONOS preview URLs on another domain). If unset, CORS allows **`SITE_URL`** plus **www/apex** and **subdomains of the same site** (e.g. `www` vs non-`www`). **Redeploy** this service after changing CORS env vars.

**Node version:** If Render defaults to an old Node, add **`NODE_VERSION`** = `22` (or `20`) in Environment.

### 3. Deploy and wire the static site

1. **Create Web Service** → wait for the first deploy.
2. Copy your service URL, e.g. `https://anchorstack-contact-submit.onrender.com`.
3. On **IONOS** (or wherever you run `npm run build:deploy`), set:

   ```bash
   NEXT_PUBLIC_CONTACT_SUBMIT_API_URL=https://anchorstack-contact-submit.onrender.com/api/submit-inquiry
   ```

   Use your **exact** hostname, **HTTPS**, path **`/api/submit-inquiry`**, **no trailing slash**.

4. Rebuild and redeploy the **static** site so the new URL is in the JS bundle.

### Free tier note

Render’s **free** web services **sleep after idle**; the first request after sleep can take **~30–60 seconds** (cold start). Upgrading to a paid instance removes sleep if that matters for contact forms.

---

## Environment variables (reference)

| Variable | Required | Description |
|----------|----------|-------------|
| `RECAPTCHA_SECRET_KEY` | **Yes** | Google reCAPTCHA **secret** |
| `SITE_URL` or `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site URL → **CORS** (apex + `www`) |
| `CONTACT_ALLOWED_ORIGINS` | Optional | Overrides CORS list (comma-separated) |
| `WEB3FORMS_ACCESS_KEY` | Optional | Defaults to main repo’s Web3Forms key |
| `PORT` | Optional | Render sets this automatically; default `3000` locally |

---

## Other hosts (optional)

### Railway

New project → deploy from GitHub → **Root Directory** `servers/contact-submit` → set the same env vars → use the Railway public URL + `/api/submit-inquiry` for `NEXT_PUBLIC_CONTACT_SUBMIT_API_URL`.

### Docker (any VPS)

```bash
cd servers/contact-submit
docker build -t contact-submit .
docker run -e RECAPTCHA_SECRET_KEY=... -e SITE_URL=https://www.yourdomain.com -p 3000:3000 contact-submit
```

Put HTTPS in front (Caddy, nginx, or your host’s load balancer).

---

## Health check

`GET /health` → **200** with body `ok`

---

## Main site

See **`docs/RECAPTCHA_CONTACT_API.md`** for how this fits with IONOS static builds and `NEXT_PUBLIC_SITE_URL`.
