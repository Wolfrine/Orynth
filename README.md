# Orynth
Organic Rhythm for Growth - Your study tracker app

## Deployment

This repository uses a GitHub Actions workflow to deploy the Angular project to Firebase Hosting. The project targets Angular CLI v20, which requires Node.js v20 or newer.
Pushes to the `main` branch run the workflow in `.github/workflows/firebase-hosting.yml`, which
builds the project from the `Orynth` directory and deploys it using the service account defined in
`secrets.FIREBASE_SERVICE_ACCOUNT`.

## Local setup

Before running Angular CLI commands such as `ng serve` or `npm run build`, install the project dependencies:

```bash
cd Orynth
npm ci
```

This installs `@angular/cli` locally so the `ng` command is available.

## Feature Audit: Phase 1

- **Landing / Onboarding – 🟡 Partial**
  - Anonymous login works and page routes to board/class selection
  - UID only logged to console, not stored in Firestore
- **Board + Class Selection – 🟡 Partial**
  - Board and class dropdowns function
  - Selected values are not persisted anywhere
- **Subject List Page – 🟡 Partial**
  - Renders a hard-coded list of subjects with progress bars
  - No Firestore data is loaded
- **Chapter Tracker Page – 🟡 Partial**
  - Displays chapter list with status/confidence chips
  - Chips are static; updates are not saved
- **Dashboard Page – 🟡 Partial**
  - Uses sample stats only; weakest topic is fixed text
- **Auth Layer – ✅ Done**
  - Anonymous login and IndexedDB persistence enabled

