This repository contains an Angular project under the `Orynth` directory.
When making changes to any Angular files or configuration, **always run**:

```
npm run build
```

If the build fails, fix the issue before committing.
Report the result of the build in the Testing section of your pull request message.

## Codex Audit Log

Phase 1 Feature Status:
- Landing / Onboarding: Partial – anonymous login works but UID isn't saved
- Board + Class Selection: Partial – selection UI works but values aren't stored
- Subject List Page: Partial – shows hard-coded subjects; no Firestore data
- Chapter Tracker Page: Partial – status/confidence chips static; no updates
- Dashboard Page: Partial – stats are dummy placeholders only
- Auth Layer: Done – anonymous auth + offline persistence enabled

