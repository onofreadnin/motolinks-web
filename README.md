# MotoLinks Web

This repository contains the React/Vite website for MotoLinks. It provides public pages required for Google Play Console compliance, plus an admin dashboard for launch metrics, app bug reports, and moderation reports.

## Admin setup

Create `.env` from `.env.example` and set:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Admin login uses Supabase email/password auth and requires the signed-in user's `profiles.is_admin` value to be `true`. Do not add a service-role key to this web app.

Before using the moderation report page, apply the mobile migration:

```
motolink-mobile/supabase/migrations/20260526_02_admin_web_reports.sql
```

Admin routes:

- `/admin/login`
- `/admin`
- `/admin/bugs`
- `/admin/reports`

## Building locally

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Build for production:

```
npm run build
```

Deploy the contents of the `dist` directory to Cloudflare Pages. Make sure to include the `public/_redirects` file so that direct route access works correctly.
