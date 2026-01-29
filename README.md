# LifeListPro

LifeListPro is an Angular application packaged as a native mobile app using Capacitor.  
It supports Android and iOS builds and uses Capawesome Cloud Live Updates for demo, beta, and production deployments.

---

## Prerequisites

### General Requirements
- Node.js (LTS recommended)
- npm
- Git
- Angular CLI

    npm install -g @angular/cli

---

### Android Requirements
- Android Studio
- Android SDK + Platform Tools
- Android Emulator or physical device
- Java JDK (managed by Android Studio)

---

### iOS Requirements (macOS only)
- macOS
- Xcode (latest stable)
- Xcode Command Line Tools

    xcode-select --install

- CocoaPods

    sudo gem install cocoapods

---

## Installation

Install all project dependencies from the project root.

    npm install

This installs all required Node packages defined in `package.json`.

---

## Running the App (Web)

Start the Angular development server.

    npm run start

Script definition:

    ng serve --host 0.0.0.0 --port 4200

This serves the app locally at:

    http://localhost:4200

---

## Building the App

Create a production build of the Angular application.

    npm run build

Script definition:

    ng build

Build output location:

    dist/lifelistpro/browser

This output directory is used by:
- Capacitor native builds
- Capawesome Live Updates uploads

---

## Capacitor Native Setup

### Sync Android Project

    npm run sync:android

Script definition:

    npx cap sync android

What this does:
- Copies the web build into the Android project
- Syncs Capacitor plugins and configuration

---

### Open Android Project

    npm run open:android

Script definition:

    npx cap open android

This opens the Android project in Android Studio for running, debugging, and signing.

---

### Sync iOS Project (macOS only)

    npm run sync:ios

Script definition:

    npx cap sync ios

What this does:
- Copies the web build into the iOS project
- Syncs Capacitor plugins and configuration
- Runs CocoaPods install when required

---

### Open iOS Project (macOS only)

    npm run open:ios

Script definition:

    npx cap open ios

This opens the project in Xcode for simulator/device runs and App Store builds.

---

## Capawesome Cloud Live Updates

### Login to Capawesome CLI

    npm run cap:login

Script definition:

    npx @capawesome/cli login

This authenticates your machine with Capawesome Cloud.

---

### List Live Update Channels

    npm run list:channels

Script definition:

    npx @capawesome/cli apps:liveupdates:channels --app-id a6042cc3-81a9-432a-887e-0540f292a861

This lists all configured Live Update channels for the app.

---

## Upload Live Updates

All Live Update commands automatically:
- Run a production build
- Upload the contents of:

    dist/lifelistpro/browser

---

### Upload to Demo Channel

    npm run live:update:demo

Script definition:

    npm run build && npx @capawesome/cli apps:liveupdates:upload --app-id a6042cc3-81a9-432a-887e-0540f292a861 --channel demo --path dist/lifelistpro/browser

---

### Upload to Beta Channel

    npm run live:update:beta

Script definition:

    npm run build && npx @capawesome/cli apps:liveupdates:upload --app-id a6042cc3-81a9-432a-887e-0540f292a861 --channel beta --path dist/lifelistpro/browser

---

### Upload to Production Channel

    npm run live:update:production

Script definition:

    npm run build && npx @capawesome/cli apps:liveupdates:upload --app-id a6042cc3-81a9-432a-887e-0540f292a861 --channel production --path dist/lifelistpro/browser

---

## Recommended First-Time Setup Order

1. Install dependencies
    ```bash
    npm install
    ```
2. Run locally in browser
    ```bash
    npm run start
    ```
3. Build web assets
    ```bash
    npm run build
    ```
4. Sync and open native projects

Android:
    ```bash
    npm run sync:android
    npm run open:android
    ```

iOS (macOS only):

    ```bash
    npm run sync:ios
    npm run open:ios
    ```

5. Authenticate Capawesome and verify channels
    ```bash
    npm run cap:login
    npm run list:channels
    ```

6. Upload Live Updates as needed
    
    ```bash
    npm run live:update:demo
    npm run live:update:beta
    npm run live:update:production
    ```

---


## Capacitor Configuration Example

LifeListPro uses a standard Capacitor configuration file to define app identity, build output, Live Updates, and local development behavior.

The configuration file is typically located at:

    capacitor.config.ts

### Example Configuration

    ```typescript
    import type { CapacitorConfig } from '@capacitor/cli';

    const config: CapacitorConfig = {
      appId: 'com.judsondesigns.lifelistpro',
      appName: 'LifelistPro',
      webDir: 'dist/lifelistpro/browser',
      plugins: {
        LiveUpdate: {
          appId: 'a6042cc3-81a9-432a-887e-0540f292a861',
          defaultChannel: 'demo',
          autoUpdateStrategy: 'background',
        },
      },
      server: {
        url: 'http://10.0.2.2:4200',
        cleartext: true,
      },
    };

    export default config;
    ```

### Configuration Breakdown

- appId  
  The unique application identifier used by Android and iOS.

- appName  
  The display name of the application on the device.

- webDir  
  The directory containing the compiled Angular web assets.  
  This must match the Angular build output path.

- plugins.LiveUpdate.appId  
  The Capawesome Cloud application ID used for Live Updates.

- plugins.LiveUpdate.defaultChannel  
  The channel the app listens to by default (demo, beta, or production).

- plugins.LiveUpdate.autoUpdateStrategy  
  Controls how updates are applied.  
  `background` downloads updates silently and applies them on next launch.

- server.url  
  Used for local development to point the native app to a running Angular dev server.  
  `10.0.2.2` is the Android emulator alias for localhost.

- server.cleartext  
  Allows HTTP traffic during local development.

### Notes

- The `server` section should typically be removed or commented out for production builds.
- The `webDir` must always match the output path used in Live Update uploads:

    dist/lifelistpro/browser

---
