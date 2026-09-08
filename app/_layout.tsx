import '../global.css';
import 'react-native-reanimated';

import { useEffect } from 'react';
import { Platform } from 'react-native';
import { Slot } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
    }

    return () => {
      if (Platform.OS === 'android') {
        NavigationBar.setVisibilityAsync('visible');
      }
    };
  }, []);

  return <Slot />;
}