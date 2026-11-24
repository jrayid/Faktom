# Fakom deployment guide

## Deploy to Vercel

1. Push this repository to GitHub. Do not commit `.env.local` or any real API keys.
2. Create a Vercel account, choose **Add New Project**, import the GitHub repository, and deploy with the detected Next.js settings.
3. Create a Neon project on its free plan. Copy the connection string from the Neon dashboard for `DATABASE_URL`. The app creates the `submissions` table on its first database-backed request; `db/schema.sql` is also available to run manually.
4. Create a Resend account. Add and verify the domain you will send from, then create an API key.
5. In Cloudflare Turnstile, create a free managed widget for the production domain and copy its site key and secret key.
6. In Vercel, open **Project Settings → Environment Variables**. Add the production values below, then redeploy so they are available to the server and build.
7. Add the custom domain in Vercel and follow its DNS instructions. Wait for the domain status to become valid and confirm HTTPS/SSL is active before testing forms.
8. Complete the post-deployment checklist below.

## Environment variables

| Name | Where to get it | Example / guidance |
|---|---|---|
| `DATABASE_URL` | Neon dashboard → Connect | `postgresql://user:password@host.neon.tech/database?sslmode=require` |
| `RESEND_API_KEY` | Resend → API Keys | `re_...`; keep it server-side. |
| `CONTACT_TO_EMAIL` | Fakom team | `fakomintlservicesltd@gmail.com` |
| `CONTACT_FROM_EMAIL` | A sender address on the domain verified in Resend | `Fakom International <noreply@yourdomain.com>` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile widget | Public site key for the production domain. |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile widget | Secret key; never use a `NEXT_PUBLIC_` prefix. |
| `SITE_URL` | Your live website domain | `https://www.yourdomain.com` (no trailing slash required). |
| `CLIENT_IP_HEADER` | Vercel request headers | `x-forwarded-for`. Vercel overwrites this header with the public client IP. On another host, trust a forwarding header only if that host's proxy overwrites it; trusting a client-controlled header lets callers spoof IPs and bypass rate limits or misstate the IP sent to Turnstile. |
| `CONTACT_SUBMISSIONS_PATH` | Only for a host with a durable mounted filesystem | Optional absolute path, such as `/mnt/data/submissions.jsonl`. Leave unset on Vercel; its function filesystem is not durable. Neon is the production storage path. |

`CONTACT_SUBMISSIONS_PATH` is optional and should not be set on Vercel. The Vercel `x-forwarded-for` behavior is documented in [Vercel's request-header reference](https://vercel.com/docs/headers/request-headers).

## Post-deployment checklist

- Submit a valid quote request and a valid vendor enquiry.
- Confirm each submission reaches the team inbox and the visitor auto-reply arrives.
- Confirm each submission appears in the Neon `submissions` table with status `new`.
- Visit `/sitemap.xml` and `/robots.txt` on the live domain.
- Run Lighthouse on a mobile viewport and review performance and accessibility results.
- Submit the live sitemap URL to Google Search Console.

For local testing without Neon or Turnstile keys, run `npm run dev`. Development submissions append to `data/submissions.jsonl`; email is logged in test mode.
