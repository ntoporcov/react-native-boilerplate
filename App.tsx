import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { extendTheme, NativeBaseProvider } from 'native-base';

import 'react-native-url-polyfill/auto';

import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { RootTabNavigator } from './navigators/NavigatorImplementations';

import * as Font from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';

import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const queryClient = new QueryClient();

// const shouldUseEmulator = true;
// if (__DEV__ && shouldUseEmulator) {
//   firestore().useEmulator('localhost', 8080);
//   functions().useEmulator('localhost', 5001);
//   auth().useEmulator('http://127.0.0.1:9099');
//   storage().useEmulator('localhost', 9199);
// }

// Define the config
const config = {
  useSystemColorMode: true,
  initialColorMode: 'dark',
};

LogBox.ignoreLogs([
  'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
  "No native splash screen registered for given view controller. Call 'SplashScreen.show' for given view controller first.",
  'Did not receive response to shouldStartLoad in time, defaulting to YES',
]);

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

function AppRoot() {
  // Load any resources or data that you need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await cacheFonts([Ionicons.font]);
      } catch (e) {}
    }

    loadResourcesAndDataAsync();
  }, []);

  const customTheme = extendTheme({
    config,
    // colors: {
    //   primary: {
    //     '50': '#fff4ff',
    //     '100': '#ffd2fd',
    //     '200': '#ffa8fc',
    //     '300': '#ff68f9',
    //     '400': '#ff2af7',
    //     '500': '#dd10d5',
    //     '600': '#bb0db5',
    //     '700': '#980b92',
    //     '800': '#81097d',
    //     '900': '#5f075c',
    //   },
    // },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar />
      <NativeBaseProvider theme={customTheme}>
        <NavigationContainer>
          <RootTabNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}

export default AppRoot;
