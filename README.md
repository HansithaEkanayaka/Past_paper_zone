# PastPaperZone

**PastPaperZone** is a full-stack past-exam-paper platform built for Sri Lankan O/L and A/L students, live at [pastpaperzone.lk](https://pastpaperzone.lk). It centralizes past papers and marking schemes by subject, year, and medium, with a multilingual UI (Sinhala / English / Tamil), user accounts, an admin dashboard, and a Telegram bot integration for discovering and delivering papers directly in chat.

## Features

- 🔎 **Browse & search** past papers by level, subject, year, and medium (Sinhala/English/Tamil), with question paper + marking scheme downloads
- 🌐 **Full i18n support** (si/en/ta) via `next-intl`, with locale-aware routing throughout
- 👤 **Accounts & profiles** — email/password and Google sign-in via Supabase Auth, avatar upload, saved/bookmarked papers
- 🔖 **Save & discover** — bookmark papers to a personal list, view weekly trending papers based on real activity
- 🖥️ **Admin dashboard** — secure, session-protected paper upload/management, analytics (views, downloads, Telegram link deliveries, top requested papers), and paper-report handling
- 🔒 **Watermarking** — uploaded PDFs are automatically watermarked with a branded header/footer and center logo, each with live link annotations back to the site
- 🤖 **Telegram bot** — a private in-chat flow (level → subject → year → medium → paper/marking scheme) to fetch papers, automatic branded channel announcements on new uploads, and automatic discussion-group replies to paper requests, with English/Sinhala/Tamil language detection
- ✉️ **Contact / feedback / missing-paper request forms**, all routed to email via Resend/Web3Forms
- 🍪 **Cookie preferences**, disclaimer, privacy, and terms pages
- ⏱️ **Study tools** — a built-in Pomodoro timer for study sessions
- ☁️ Deployed on **Cloudflare Workers** (via OpenNext), with file storage on **Cloudflare R2** and data/auth on **Supabase (Postgres)**

## Tech Stack

**Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, next-intl
**Backend:** Next.js API routes, Supabase (Postgres + Auth + Storage), Cloudflare R2
**Integrations:** Telegram Bot API, Resend / Web3Forms (email), Google OAuth, pdf-lib (PDF watermarking)
**Deployment:** Cloudflare Workers via OpenNext (`@opennextjs/cloudflare`)

## Getting Started

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.local.example` to `.env.local` and fill in your own Supabase, Cloudflare R2, Telegram, and email provider credentials.
3. Run the SQL migrations in `supabase_setup.sql` (and any additional `supabase_migration_*.sql` files) in your Supabase project's SQL Editor.
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000).

### Deploying

The project deploys to Cloudflare Workers via OpenNext:
```bash
npm run deploy
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/        # Localized pages (home, subject, papers, profile, admin, etc.)
│   └── api/              # API routes (auth, admin, papers, telegram, saved-papers, etc.)
├── components/            # Reusable UI components
├── context/               # Auth & theme context providers
├── i18n/                  # next-intl routing & request config
├── lib/                   # Supabase clients, R2, email, watermarking, Telegram helpers
└── messages/              # en.json / si.json / ta.json translations
```

## License

This project is private/unlicensed. All rights reserved.