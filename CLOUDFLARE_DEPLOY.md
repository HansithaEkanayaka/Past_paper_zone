# PastPaperZone – Cloudflare Workers deployment

This project uses OpenNext + Cloudflare Workers and an R2 binding named `PAST_PAPERS_BUCKET`.

## R2
The Worker binding points to the existing bucket:

- Binding: `PAST_PAPERS_BUCKET`
- Bucket: `past-papers`

The application uses the R2 binding in production. The AWS S3-compatible client is only a fallback for local development when the binding is unavailable.

## Required Cloudflare variables/secrets
Set these in the Worker environment:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (required by admin analytics, paper reports and saved papers)
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `WEB3FORMS_ACCESS_KEY` (required if you want Contact / Feedback / Paper Request emails)

If you use the local S3 fallback, also set `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, and `R2_BUCKET_NAME`.

## Deploy

```bash
npm install
npm run deploy
```

Do not upload or commit `.env.local` containing real credentials.

## Paper access rule
Past-paper preview and download are protected twice:

1. The UI asks the visitor to log in before opening preview/download.
2. `/api/paper` verifies the Supabase session server-side and returns `401` when the visitor is not logged in.

A/L and O/L timetable downloads remain public.


## Supabase setup

Before deploying the new analytics/report/saved-paper changes:

1. Open Supabase Dashboard -> SQL Editor.
2. Run `supabase_setup.sql` from this project.
3. In Supabase Authentication, confirm your email/login settings are configured as expected.
4. Never expose `SUPABASE_SERVICE_ROLE_KEY` in client-side code or `NEXT_PUBLIC_*` variables.

## Cloudflare secret setup

The `.env.local` file is only for local development. Production Worker secrets must be configured separately.

For example:

```bash
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
npx wrangler secret put WEB3FORMS_ACCESS_KEY
```

Then deploy again:

```bash
npm run deploy
```

After deployment, test:
- Admin -> Analytics
- Admin -> Reported Papers
- Contact form
- Feedback form
- Paper Request
- Save / Saved Papers
