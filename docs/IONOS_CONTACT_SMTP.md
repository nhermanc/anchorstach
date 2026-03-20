# Contact form + SMTP (IONOS static site)

The **`deploy/`** folder has **no** server.

**No Node host?** Use [Web3Forms](https://web3forms.com): create a free access key, set **`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`** when you run **`npm run build:deploy`**, then redeploy **`deploy/`**. No FormSubmit “activation” email required.

To use **SMTP** for Contact / Hire Us (your own API in front of IONOS mail):

## 1. Run the contact API (Node)

On a host with Node (IONOS VPS, separate app, etc.):

```bash
npm ci
export SMTP_HOST=smtp.ionos.com
export SMTP_PORT=587
export SMTP_USER=hello@anchorstacktech.com
export SMTP_PASS='your-mailbox-password'
export SMTP_FROM=hello@anchorstacktech.com
export CONTACT_MAIL_TO=hello@anchorstacktech.com
export CONTACT_ALLOWED_ORIGINS=https://anchorstacktech.com,https://www.anchorstacktech.com
export PORT=8787
npm run contact-smtp-api
```

Put HTTPS in front (reverse proxy) so the public URL is e.g. `https://contact-api.yourdomain.com`.

## 2. Build the static site

In the **static** build environment (same repo, `npm run build:deploy`):

```bash
export NEXT_PUBLIC_CONTACT_API_BASE_URL=https://contact-api.yourdomain.com
# Do not set NEXT_PUBLIC_CONTACT_STATIC_ONLY
npm run build:deploy
```

Upload **`deploy/`** to IONOS as usual.

## 3. Local development

`.env.local`:

```bash
SMTP_HOST=...
SMTP_USER=hello@anchorstacktech.com
SMTP_PASS=...
SMTP_FROM=hello@anchorstacktech.com
NEXT_PUBLIC_USE_NODE_CONTACT_API=1
```

Then **`npm run dev`** — forms POST to **`/api/contact`** on localhost.
