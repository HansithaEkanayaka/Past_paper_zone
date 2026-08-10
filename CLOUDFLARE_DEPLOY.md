# Cloudflare deployment checklist

This project is a Next.js 16 app deployed with OpenNext to Cloudflare Workers.

## 1. Cloudflare environment variables

Set these in the **Workers & Pages → your Worker → Settings → Variables and Secrets** area for the **production runtime**. If using Workers Builds, also make sure build-time variables/secrets are configured where Cloudflare asks for them.

Required R2 values:

- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET_NAME`

Also configure the existing application variables:

- `NEXT_PUBLIC_R2_PUBLIC_URL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `WEB3FORMS_ACCESS_KEY`

Do not commit `.env.local` or real secrets. The supplied project now contains only `.env.example`.

## 2. Build/deploy

The project uses OpenNext. The package scripts are:

```bash
npm run build:worker
npm run deploy
```

If using Cloudflare Workers Builds, use the equivalent OpenNext build/deploy configuration for your setup.

## 3. R2 object layout

Past papers must use:

```text
papers/<subjectId>/<year>/<medium>/paper.pdf
papers/<subjectId>/<year>/<medium>/marking.pdf
```

Examples:

```text
papers/ol-maths/2024/sinhala/paper.pdf
papers/ol-maths/2024/sinhala/marking.pdf
```

Timetables must use:

```text
timetables/al/<filename>.pdf
timetables/ol/<filename>.pdf
```

The bucket name is **not** part of the object key.

## 4. What was fixed

- Removed the custom request-handler object from the R2 S3 client; the official AWS SDK/R2 configuration is used.
- Added R2 configuration validation.
- Added pagination to the Hero statistics endpoint, so counts do not stop at 1000 files.
- Added `force-dynamic` and `no-store` to storage APIs so counts/downloads are not served from stale cached responses.
- Improved storage errors so a broken R2 configuration is not falsely reported as “timetable not released”.
- Added pagination for timetable listing.
- Updated the Worker compatibility date to one that supports `process.env` runtime variables.
