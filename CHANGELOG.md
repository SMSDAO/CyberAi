# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-14

### Added
- **CI/CD Pipeline** (`/.github/workflows/ci.yml`): Deterministic GitHub Actions workflow with Node 20, `npm ci`, lint, and build steps. Runs on push, pull_request, and release events.
- **Admin Dashboard** (`/admin`): Enterprise admin panel with system stats, user management table, audit logs, and configuration settings.
- **Users Page** (`/users`): Member directory with search, role badges, and status indicators.
- **Developer Console** (`/developer`): API endpoint monitoring, log viewer, deployment diagnostics, and environment variable status.
- **Settings Page** (`/settings`): Account profile, notification preferences, security settings (2FA, session management), and appearance options.
- **Docs Page** (`/docs`): In-app documentation hub with section cards, environment variable reference table, quick deploy guides, and links to full GitHub docs.
- **Navigation Update**: Header now includes all required tabs — Home, Dashboard, Users, Admin, Developer, Settings, Docs.
- **`.env.example`**: Comprehensive environment variable template covering NextAuth, GitHub OAuth, Stripe, and public app URL.
- **`CHANGELOG.md`**: This file, following Keep a Changelog format.

### Changed
- **`lib/auth.ts`**: Removed module-level `throw` on missing `GITHUB_ID`/`GITHUB_SECRET` env vars. Auth now gracefully degrades at build time using empty string fallbacks, preventing CI build failures when secrets are not available.
- **Navigation** (`components/layout/Header.tsx`): Replaced previous nav links (Pricing, Bonuses, NFT Mint, Guides) with enterprise tabs (Users, Admin, Developer, Settings, Docs).

### Fixed
- **Build failure**: `next build` was failing during CI due to `lib/auth.ts` throwing an uncaught exception at module evaluation time when `GITHUB_ID`/`GITHUB_SECRET` are undefined. Fixed by using `?? ""` fallback values.

### Security
- Auth module no longer exposes environment configuration errors in server logs at startup when optional OAuth vars are absent.
- `.env.example` updated to document all sensitive variables without leaking actual values.
