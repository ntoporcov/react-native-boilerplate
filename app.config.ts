import { ExpoConfig, ConfigContext } from 'expo/config';

module.exports = (context: ConfigContext): ExpoConfig => {
  const isPROD = process.env.PROD === 'true';

  return {
    name: 'APP_NAME_HERE',
    slug: 'APP_SLUG_HERE',
    version: '1.0.0',
    orientation: 'portrait',
    icon: `./assets/icon${isPROD ? '' : '-dev'}.png`,
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: false,
      // usesAppleSignIn: true,
      bundleIdentifier: 'APP_BUNDLE_HERE',
      googleServicesFile: `./GoogleService-Info${isPROD ? '-prod' : ''}.plist`,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      // 'expo-apple-authentication',
      // 'sentry-expo',
      // '@react-native-firebase/app',
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
    ],
    // For uploading sourcemap to sentry
    // hooks: {
    //   postPublish: [
    //     {
    //       file: 'sentry-expo/upload-sourcemaps',
    //       config: {
    //         organization: '',
    //         project: '',
    //         authToken: '',
    //       },
    //     },
    //   ],
    // },
  };
};
