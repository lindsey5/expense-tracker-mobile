import { Redirect, Slot } from 'expo-router';
import { useAuthStore } from '@/lib/store/authStore';
import { useColorScheme, View } from 'react-native';
import UserSidebar from '@/components/custom/UserSidebar';
import { Colors } from '@/constants/theme';

export default function ProtectedLayout() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  if (!accessToken) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <View pointerEvents="none" className="absolute inset-0 overflow-hidden" style={{ backgroundColor: colors.background }}>
        <View
          className="absolute -left-20 top-10 h-72 w-72 rounded-full opacity-60"
          style={{ backgroundColor: colors.surfaceTint }}
        />
        <View
          className="absolute right-[-60px] top-28 h-80 w-80 rounded-full opacity-50"
          style={{ backgroundColor: colors.softTint }}
        />
        <View
          className="absolute bottom-[-90px] left-1/4 h-96 w-96 rounded-full opacity-40"
          style={{ backgroundColor: colors.surfaceTint }}
        />
        <View
          className="absolute inset-x-4 top-0 h-40 rounded-b-[36px]"
          style={{ backgroundColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.28)' }}
        />
      </View>

      <UserSidebar />
      <Slot />
    </View>
  );
}
