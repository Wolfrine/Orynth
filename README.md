# Orynth
Organic Rhythm for Growth - Your study tracker app

## Deployment

This repository uses a GitHub Actions workflow to deploy the Angular project to
Firebase Hosting. Pushes to the `main` branch run the workflow in
`.github/workflows/firebase-hosting.yml`, which builds the project from the
`Orynth` directory and deploys it using the service account defined in
`secrets.FIREBASE_SERVICE_ACCOUNT`.

The workflow uses Node.js 22.x to satisfy Angular CLI requirements. Ensure your
local environment also runs Node.js 20.19 or later when building the project
locally.
