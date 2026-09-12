import { Redirect, Slot } from 'expo-router';
import { View } from 'react-native';
import { useAuthStore } from '@/lib/store/authStore';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function UnprotectedLayout() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  if (accessToken) {
    return <Redirect href="/dashboard" />;
  }

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <View pointerEvents="none" className="absolute inset-0 overflow-hidden" style={{ backgroundColor: colors.background }}>
        <View
          className="absolute -left-16 top-12 h-72 w-72 rounded-full opacity-70"
          style={{ backgroundColor: colors.surfaceTint }}
        />
        <View
          className="absolute right-[-60px] top-20 h-80 w-80 rounded-full opacity-60"
          style={{ backgroundColor: colors.softTint }}
        />
        <View
          className="absolute bottom-[-80px] left-1/4 h-96 w-96 rounded-full opacity-50"
          style={{ backgroundColor: colors.surfaceTint }}
        />
      </View>

      <Slot />
    </View>
  );
}