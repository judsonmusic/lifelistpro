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
