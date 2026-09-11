import { useRouter } from 'expo-router';
import { BarChart3, Bell, ChartNoAxesColumnIncreasing, Home, LogOut, Menu, Settings, Wallet, WalletCards } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import Sidebar from '../ui/Sidebar';
import { useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
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
            label: 'Notifications',
            pathname: '/notifications',
            icon: <Bell size={21} color={colors.icon} />,
            onPress: () => router.push('/notifications'),
        },
        {
            label: 'Settings',
            pathname: '/settings',
            icon: <Settings size={21} color={colors.icon} />,
            onPress: () => router.push('/settings'),
        },
        {
            label: 'Log out',
            pathname: '',
            icon: <LogOut size={21} color="#EF4444" />,
            onPress: logout,
            danger: true,
        },
    ], [])

    return (
        <>
        <TouchableOpacity
            onPress={() => setSidebarOpen(true)}
            className="absolute right-5 top-14 z-40 rounded-xl p-2"
            style={{ backgroundColor: colors.card }}
        >
            <Menu size={24} color={colors.text} />
        </TouchableOpacity>

        <Sidebar
            items={sidebarItems}
            onClose={() => setSidebarOpen(false)}
            visible={sidebarOpen}
            logo={<Wallet size={26} color={colors.text} strokeWidth={1.5} />}
            title="Gastador"
        />
        </>
    );
}