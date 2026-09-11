import { Redirect, Slot } from "expo-router";
import { useAuthStore } from "@/lib/store/authStore";
import { useColorScheme, View } from "react-native";
import UserSidebar from "@/components/custom/UserSidebar";
import { Colors } from "@/constants/theme";

export default function ProtectedLayout() {
    const accessToken = useAuthStore((state) => state.accessToken);
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];
    
    if (!accessToken) {
        return <Redirect href="/" />;
    }

    return (
        <View className="flex-1" style={{ backgroundColor: colors.background }}>
            <UserSidebar />
            <Slot />
        </View>
    );
}