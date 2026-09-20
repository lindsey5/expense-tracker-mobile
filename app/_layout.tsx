import '../global.css';
import 'react-native-reanimated';

import { useEffect } from 'react';
import {
  Appearance,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';
import { Slot } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import Toast from '@/components/Toast';
import { Colors } from '@/constants/theme';
import { useThemeStore } from '@/lib/store/themeStore';

const queryClient = new QueryClient();

export default function RootLayout() {
  const theme = useThemeStore((state) => state.theme);

  const deviceTheme =
    useColorScheme() === 'dark' ? 'dark' : 'light';

  const activeTheme =
    theme === 'system' ? deviceTheme : theme;

  const colors = Colors[activeTheme];

  useEffect(() => {
    if (Platform.OS !== 'web') {
      Appearance.setColorScheme(
        theme === 'system' ? 'unspecified' : theme,
      );
    }
  }, [theme]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      void NavigationBar.setVisibilityAsync('hidden');
    }

    return () => {
      if (Platform.OS === 'android') {
        void NavigationBar.setVisibilityAsync('visible');
      }
    };
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView
          className="flex-1 py-3"
          style={{
            backgroundColor: colors.background,
          }}
          edges={['top', 'left', 'right']}
        >
          <KeyboardAvoidingView
            behavior={
              Platform.OS === 'ios' ? 'padding' : undefined
            }
            className="flex-1"
            style={{
              backgroundColor: colors.background,
            }}
          >
            <Slot />

            <Toast />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}