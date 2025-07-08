import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';
import { initializeAuth, indexedDBLocalPersistence, browserPopupRedirectResolver } from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager
} from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { environment } from '../environments/environment';

import { routes } from './app.routes';

let firestoreInstance: ReturnType<typeof initializeFirestore> | undefined;

function firestoreFactory() {
  if (firestoreInstance) {
    return firestoreInstance;
  }

  let app;
  try {
    app = getApp();
  } catch (e) {
    console.warn('No Firebase app instance found, initializing app.', e);
    app = initializeApp(environment.firebase);
  }

  try {
    firestoreInstance = initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
      })
    });
    console.log('Firestore initialized with IndexedDB persistence');
  } catch (err) {
    console.error('IndexedDB persistence failed, falling back to memory cache', err);
    firestoreInstance = initializeFirestore(app, {});
  }

  return firestoreInstance;
}



export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', { enabled: environment.production }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const app = getApp();
      return initializeAuth(app, {
        persistence: indexedDBLocalPersistence,
        popupRedirectResolver: browserPopupRedirectResolver
      });
    }),
    provideFirestore(() => firestoreFactory())
  ]
};
