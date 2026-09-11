import '../global.css';
import 'react-native-reanimated';

import { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { Slot } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from '@/components/Toast';
import { Colors } from '@/constants/theme';

export default function RootLayout() {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];
    
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
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1"
                style={{ backgroundColor: colors.background }}
            >
                <Slot />
            </KeyboardAvoidingView>
        </QueryClientProvider>
    );
}