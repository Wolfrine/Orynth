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

## Sample React UI

A React implementation of the same flows lives under `sample/react-ui`. The
folder was cloned from the public
[learn-spark-mobile-flow](https://github.com/Wolfrine/learn-spark-mobile-flow)
repository. The `.git` directory was removed so it can be tracked as part of
this repository.

The React app mirrors the Angular features but stores data locally instead of
using Firebase. You can run it with:

```bash
cd sample/react-ui
npm install
npm run dev
```

### Differences from the Angular UI

- **Board and Class** – In React, the selection persists to `localStorage`.
  The Angular version saves this information in Firestore when editing your
  profile.
- **Profile Page** – The React profile page reads and writes all details from
  `localStorage`, whereas the Angular page syncs them with Firestore.

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

