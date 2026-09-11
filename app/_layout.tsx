import '../global.css';
import 'react-native-reanimated';

import { useEffect } from 'react';
import { Platform } from 'react-native';
import { Slot } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from '@/components/Toast';

export default function RootLayout() {
    const queryClient = new QueryClient();

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

    return (
        <QueryClientProvider client={queryClient}>
            <Toast />
            <Slot />
        </QueryClientProvider>
    );
}