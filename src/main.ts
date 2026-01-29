import { bootstrapApplication } from '@angular/platform-browser';
import { LiveUpdate } from '@capawesome/capacitor-live-update';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Capacitor Live Update (safe import)
bootstrapApplication(AppComponent, {
  ...appConfig,
})
  .then(async () => {
    // Tell Capacitor the app booted successfully
    // Prevents rollback of the current web bundle
    try {
      await LiveUpdate.ready();
      console.log('[LiveUpdate] ready()');
    } catch {
      // Web / dev mode — ignore
    }
  })
  .catch((err) => console.error(err));
