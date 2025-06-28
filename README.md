# Orynth
Organic Rhythm for Growth - Your study tracker app

## Deployment

This repository uses a GitHub Actions workflow to deploy the Angular project to Firebase Hosting. The project targets Angular CLI v20, which requires Node.js v20 or newer.
Pushes to the `main` branch run the workflow in `.github/workflows/firebase-hosting.yml`, which
builds the project from the `Orynth` directory and deploys it using the service account defined in
`secrets.FIREBASE_SERVICE_ACCOUNT`.


Lovable repo is present under sample folder