# Jacob Candelaria Dev Portfolio

Personal portfolio site for showcasing my background, experience, and projects. This repo is tailored to my own workflow and infrastructure and is not intended to be reproduced or deployed in other environments.

## What lives here

- **Home**: tech stack cards with a filter toggle (backend/frontend/data).
- **Experience**: timeline-style work history.
- **Projects**: currently in maintenance mode.
- **About**: long-form background and interests.
- **Contact**: a validated contact form that sends emails and issues confirmations.

## Key features

- Next.js App Router site with a simple multi-page layout.
- Contact form protected by Cloudflare Turnstile.
- Email delivery via Resend with a confirmation email to the sender.
- Maintenance mode toggle for the homepage and projects page.
- Content stored in JSON where it makes sense (e.g. about and experience data).

## Tech stack

- Next.js 16 + React 19
- TypeScript + CSS Modules
- Resend (email delivery)
- Cloudflare Turnstile (bot protection)
- Vercel Speed Insights

## Content/data sources

- About text: `src/data/about_me.json`
- Experience history: `src/data/experience.json`

## Environment configuration (personal)

These are required for my own deployment and local testing:

- `RESEND_API_KEY`
- `MY_EMAIL`
- `CF_TURNSTILE_SECRET_KEY`
- `NEXT_PUBLIC_CF_SITE_KEY`
- `MAINTENANCE` (set to `true` to show maintenance views)

## Notes

This project is intentionally personalized (branding, copy, data, and infra choices). If you are exploring the codebase, treat it as a reference rather than a template.
