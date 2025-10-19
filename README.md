# ElevenSpark

ElevenSpark is an 11+ maths and English vocabulary practice platform for UK learners. The project is optimised for the Firebase
free tier, delivers adaptive practice using seeded question templates, and keeps families informed with confidence-first
messaging.

## Features

- Next.js 14 (App Router) with TypeScript and Tailwind CSS.
- Firebase Hosting, Firestore, Authentication, and Cloud Functions.
- Lemon Squeezy subscription integration with webhook processing.
- Deterministic question generators (25 maths templates, 8 English tasks, 261 vocabulary entries).
- Adaptive ELO updates for maths and SM-2 spaced repetition for vocabulary.
- Dashboards for students and parents, PDF export helper, and lightweight admin tools.
- SEO-friendly marketing pages with JSON-LD schema and markdown-powered blog.
- WCAG 2.2 AA styles, reduced motion support, and confidence-building copy.

## Getting started

1. **Clone and install**

   ```bash
   npm install
   ```

2. **Create a Firebase project**

   - Enable Authentication (email/password and Google providers).
   - Enable Firestore in production mode and deploy the security rules/indexes from this repo.
   - Enable Hosting and Cloud Functions.

3. **Configure environment variables**

   Copy `.env.example` to `.env.local` and fill values:

   - Firebase web config values for the client SDK.
   - `FIREBASE_ADMIN_CREDENTIALS` – JSON string of a service account for local admin use.
   - Lemon Squeezy hosted checkout URLs and webhook secret.
   - Optional `NEXT_PUBLIC_GA_ID` for Google Analytics.

4. **Run locally**

   ```bash
   npm run dev
   ```

   The app runs at `http://localhost:3000`.

5. **Testing**

   ```bash
   npm test
   ```

6. **Deploy**

   Build the Next.js app and deploy via Firebase:

   ```bash
   npm run build
   (cd firebase/functions && npm install && npm run build)
   firebase deploy
   ```

   Hosting rewrites direct all traffic to the `nextServer` Cloud Function, which serves the built Next.js application. Firestore
   rules and indexes are deployed from the repository files.

## Project structure

```
app/              # App Router routes (marketing, dashboards, practice, API)
components/       # Accessible UI components
content/blog/     # Markdown blog posts for SEO
firebase/         # Firebase client/admin init and Cloud Functions
lib/              # Utilities (auth, RNG, ELO, SRS, generators, PDFs)
public/           # Static assets
scripts/          # Seeding helpers (extend as needed)
styles/           # Tailwind and global styles
```

## Data & security

- Firestore collections match the schema defined in the product brief.
- Security rules enforce parent/child boundaries and admin-only management.
- Lemon Squeezy webhook validates HMAC signatures before updating subscription status.

## Accessibility & compliance

- Colour palette meets contrast requirements with visible focus styles.
- Components honour `prefers-reduced-motion`.
- Privacy, terms, and accessibility statements outline GDPR handling and support contact details.

## Notes

- The project includes placeholder data for dashboards; connect API routes to Firestore to populate live statistics.
- For low-cost email updates, integrate Firebase email templates or MailerLite using weekly summaries.
- The seeded question generators output both questions and worked explanations to reinforce learning.

We focus on building confidence and mastery — never promising exam passes.
