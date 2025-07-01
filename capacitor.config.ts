import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.advogadoonline.app',
  appName: 'Advogado Online',
  webDir: 'out', // Este valor não será usado para deploy online, mas é um placeholder.
  server: {
    url: 'https://advogado-online-app.vercel.app', // 
    cleartext: false // <-- MUDE PARA 'false' se sua URL for HTTPS (RECOMENDADO PARA PRODUÇÃO)
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0A3D62',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0A3D62'
    },
    Keyboard: {
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true
    }
  }
};

export default config;