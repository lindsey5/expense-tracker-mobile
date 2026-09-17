import { useRouter } from 'expo-router';
import { BarChart3, ChartNoAxesColumnIncreasing, Home, LogOut, Menu, Wallet, WalletCards } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import Sidebar from '../ui/Sidebar';
import ThemeToggle from '../ui/ThemeToggle';
import { useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '@/lib/store/authStore';

export default function UserSidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    const sidebarItems = useMemo(() => [
        {
            label: 'Dashboard',
            pathname: '/dashboard',
            icon: <Home size={21} color={colors.icon} />,
            onPress: () => router.push('/dashboard'),
        },
        {
            label: 'Wallets',
            pathname: '/wallets',
            icon: <WalletCards size={21} color={colors.icon} />,
            onPress: () => router.push('/wallets'),
        },
        {
            label: 'Transactions',
            pathname: '/transactions',
            icon: <Wallet size={21} color={colors.icon} />,
            onPress: () => router.push('/transactions'),
        },
        {
            label: 'Budgets',
            pathname: '/budgets',
            icon: <ChartNoAxesColumnIncreasing size={21} color={colors.icon} />,
            onPress: () => router.push('/budgets'),
        },
        {
            label: 'Reports',
            pathname: '/reports',
            icon: <BarChart3 size={21} color={colors.icon} />,
            onPress: () => router.push('/reports'),
        },
        {
            label: 'Log out',
            pathname: '',
            icon: <LogOut size={21} color="#EF4444" />,
            onPress: logout,
            danger: true,
        },
    ], [colors.icon, colors, logout, router])

    return (
        <>
        <View className="absolute right-5 top-14 z-40 flex-row gap-2">
            <ThemeToggle />
            <TouchableOpacity
                accessibilityLabel="Open navigation menu"
                accessibilityRole="button"
                onPress={() => setSidebarOpen(true)}
                className="h-11 w-11 items-center justify-center rounded-2xl border"
                style={{
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.06,
                    shadowRadius: 12,
                    elevation: 2,
                }}
            >
                <Menu size={24} color={colors.text} />
            </TouchableOpacity>
        </View>

        <Sidebar
            items={sidebarItems}
            onClose={() => setSidebarOpen(false)}
            visible={sidebarOpen}
            logo={<Wallet size={26} color={colors.text} strokeWidth={1.5} />}
            title="Expense Tracker"
        />
        </>
    );
}