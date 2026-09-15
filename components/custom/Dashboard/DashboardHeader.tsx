import { Colors } from "@/constants/theme";
import { useAuthStore } from "@/lib/store/authStore";
import { useColorScheme } from "react-native";
import { View, Text } from "react-native";

export default function DashboardHeader() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  const { user } = useAuthStore();

  return (
    <View className="mb-5">
      <Text className="text-sm" style={{ color: colors.icon }}>
        Welcome back
      </Text>

      <Text
        className="mt-1 text-[30px] font-bold tracking-tight"
        style={{ color: colors.text }}
      >
        {user?.firstName}
      </Text>
    </View>
  );
}