# CLAUDE.md — Bring A Traylor

## Project

Single-page landing site for Bring A Traylor, a family-owned mechanic service in Woodstock/Marietta, GA. React + Vite + Tailwind, deployed on Vercel with a serverless lead-capture API using Resend.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build (outputs to `dist/`)
- `npm run preview` — Preview production build locally

## Architecture

Single-page app, no routing. Sections stack vertically: Hero → CTACards → RepairForm → CarFinderForm → StoryBanner → Footer. All components are in `src/components/`. The Vercel serverless function lives at `api/send-lead.js`.

## Spec Sync Rule

**Always update `BringATraylor_ProductSpec_v1.2.md` when making changes to the codebase.** The spec is the source of truth for what the site does. When you add, remove, or modify any feature, section, form field, API behavior, design token, or file structure:

1. Make the code change.
2. Update the relevant section(s) in `BringATraylor_ProductSpec_v1.2.md`.
3. Add a row to the **Changelog** table at the bottom of the spec with the version bump and a summary of what changed.
4. Commit both the code and spec changes together.

If the spec filename changes (e.g., version bump to v1.3), update this CLAUDE.md to reference the new filename.

## Style

- Tailwind utility classes, no custom CSS beyond `index.css` directives
- Brand colors defined in `tailwind.config.js` under `theme.extend.colors.brand`
- Inter font via Google Fonts (loaded in `index.html`)
- Mobile-first responsive design (single column → md: grid)

## Environment

- `RESEND_API_KEY` — Required for the `/api/send-lead` serverless function. Set in Vercel dashboard for production, `.env.local` for local testing.
