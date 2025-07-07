This repository contains an Angular project under the `Orynth` directory.
When making changes to any Angular files or configuration, **always run**:

```
npm run build
```

If the build fails, fix the issue before committing.
Report the result of the build in the Testing section of your pull request message.

Firestore reads and writes must target a document path with an **even number of segments**. The main user document lives at `Users/{uid}`. Store all related data (basic info, profile details and syllabus progress) inside that document as nested objects:

```
Users/{uid}
  info
  profile
  progress
```
Avoid paths like `Users/{uid}/profile` which omit the final segment and produce `Invalid document reference` errors.

## Screen Flow

1. Onboarding – onboarding
2. Board & Class Selection – board-class-selection
3. Subject Selection / Home – subject-list
4. Chapter Tracker (Chapter List + Confidence) – chapter-tracker
5. Dashboard – dashboard
6. Profile – profile-page

## Components
- BottomNavComponent
- ButtonComponent
- CardComponent
- ChipComponent
- FirebaseTestComponent
- HeaderComponent
- LoginUpgradeModalComponent
- ProgressBarComponent
- SubjectProgressRingComponent
- UnsyncedNoticeComponent

## Services
- AppStateService
- AuthService
- SyllabusService
- ProgressService

## Sitemap
- `/onboarding` – onboarding
- `/board-class-selection` – choose board and class
- `/subject-list` – list subjects
- `/chapter-tracker` – chapter progress per subject
- `/dashboard` – overview statistics
- `/profile` – profile editing
- `/login` – sign in with Google

## User Journeys
1. **First visit**: the root component creates an anonymous session and routes to `/onboarding`.
2. **Start tracking**: from onboarding the user selects their board and class. On save they land on `/subject-list`.
3. **Studying**: selecting a subject opens `/chapter-tracker` where progress is recorded.
4. **Tracking progress**: `/dashboard` shows overall stats based on chapter updates.
5. **Profile management**: `/profile` allows editing saved board, class, and personal info.
6. **Login upgrade**: `/login` upgrades the anonymous account to Google so progress syncs online.

## Codex Audit Log

Phase 1 Feature Status:
- Landing / Onboarding: Partial – anonymous login works but UID isn't saved
- Board + Class Selection: Partial – selection UI works but values aren't stored
- Subject List Page: Partial – shows hard-coded subjects; no Firestore data
- Chapter Tracker Page: Partial – status/confidence chips static; no updates
- Dashboard Page: Partial – stats are dummy placeholders only
- Auth Layer: Done – anonymous auth + offline persistence enabled

### Recent Updates

- Board and class choices are now saved to `Users/{uid}.profile` when the user starts learning so they can be restored on future visits.
- Subject list page reads the saved board and class if the in-memory state is empty to ensure the correct syllabus always loads.
- Chapter tracker pushes progress for **all** subjects whenever any chapter is updated, keeping offline edits in sync.
