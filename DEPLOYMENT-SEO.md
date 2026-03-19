# Deployment & SEO Checklist for AnchorStackTech

Use this guide when deploying your site and making it discoverable in search engines.

---

## 1. Environment Variables (Before Deploy)

Add these to your hosting provider (Vercel, Netlify, etc.):

| Variable | Value | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` | Your live domain (no trailing slash). Used for sitemap, robots.txt, canonical URLs, and Open Graph. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | (from Google Search Console) | Optional. Meta tag for verifying site ownership. |

**Important:** Use `https://` and your actual domain (e.g. `https://www.anchorstacktech.com` or `https://anchorstacktech.com`).

---

## 2. Google Search Console (Submit Your Site)

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property: enter your domain (e.g. `https://yourdomain.com`)
3. Verify ownership:
   - **Option A:** Add the HTML meta tag. Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to the `content` value (e.g. `abc123xyz`)
   - **Option B:** DNS verification (add a TXT record to your domain)
4. After verification, submit your sitemap: `https://yourdomain.com/sitemap.xml`
5. Request indexing for your homepage: URL Inspection → Enter URL → Request Indexing

---

## 3. Bing Webmaster Tools (Optional but Recommended)

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site and verify ownership
3. Submit sitemap: `https://yourdomain.com/sitemap.xml`

---

## 4. SEO Features Already Implemented

| Feature | Status |
|---------|--------|
| `robots.txt` | `/robots.txt` – allows all crawlers, directs to sitemap |
| `sitemap.xml` | `/sitemap.xml` – all pages, services, work projects |
| Canonical URLs | Dynamic per page (prevents duplicate content) |
| Meta title & description | Per page, keyword-rich |
| Open Graph (Facebook, LinkedIn) | For social sharing |
| Twitter Card | For Twitter sharing |
| JSON-LD (Organization + WebSite) | Rich results in Google |
| Admin page | `noindex, nofollow` (not indexed) |

---

## 5. After Deployment – Verify

- [ ] Visit `https://yourdomain.com/robots.txt` – should show your domain in Sitemap line
- [ ] Visit `https://yourdomain.com/sitemap.xml` – should list all URLs
- [ ] View page source on homepage – check `<link rel="canonical">` and meta tags
- [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

---

## 6. How People Find Your Site

1. **Search engines** – Google, Bing index your site. Use Search Console to monitor.
2. **Direct traffic** – Share your URL (yourdomain.com)
3. **Social media** – Share links; Open Graph shows correct previews
4. **Backlinks** – Other sites linking to you improve rankings
5. **Content** – Blog, services, and work pages target keywords

---

## 7. Domain Setup (If Using Custom Domain)

- Point your domain’s A record or CNAME to your host’s IP
- Ensure SSL/HTTPS is enabled (most hosts do this automatically)
- Prefer `www` or non-www consistently – set `NEXT_PUBLIC_SITE_URL` to match

---

## 8. Ongoing SEO Tips

- Add new content (blog posts, case studies) regularly
- Keep meta descriptions under 160 characters
- Use descriptive alt text on images
- Monitor Search Console for errors and indexing status
