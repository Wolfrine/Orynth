This repository contains an Angular project under the `Orynth` directory.
When making changes to any Angular files or configuration, **always run**:

```
npm run build
```

If the build fails, fix the issue before committing.
Report the result of the build in the Testing section of your pull request message.

Firestore reads and writes must target a document path with an **even number of
segments**. The main user document lives at `Users/{uid}`. Store all related
data (basic info, profile details and syllabus progress) inside that document as
nested objects:

```
Users/{uid}
  info
  profile
  progress
```
Avoid paths like `Users/{uid}/profile` which omit the final segment and produce
`Invalid document reference` errors.

## Screen Flow

1. Onboarding – onboarding
2. Board & Class Selection – board-class-selection
3. Subject Selection / Home – subject-list
4. Chapter Tracker (Chapter List + Confidence) – chapter-tracker
5. Dashboard – dashboard
6. Profile – profile-page

## Codex Audit Log

Phase 1 Feature Status:
- Landing / Onboarding: Partial – anonymous login works but UID isn't saved
- Board + Class Selection: Partial – selection UI works but values aren't stored
- Subject List Page: Partial – shows hard-coded subjects; no Firestore data
- Chapter Tracker Page: Partial – status/confidence chips static; no updates
- Dashboard Page: Partial – stats are dummy placeholders only
- Auth Layer: Done – anonymous auth + offline persistence enabled

