import { useRouter } from 'expo-router';
import { BarChart3, Home, LogOut, Menu, Settings, Wallet } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import Sidebar from '../ui/Sidebar';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '@/lib/store/authStore';

export default function UserSidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    const sidebarItems = [
        {
            label: 'Dashboard',
            pathname: '/dashboard',
            icon: <Home size={21} color={colors.icon} />,
            onPress: () => router.push('/dashboard'),
        },
        {
            label: 'Expenses',
            pathname: '/expenses',
            icon: <Wallet size={21} color={colors.icon} />,
            onPress: () => router.push('/expenses'),
        },
        {
            label: 'Reports',
            pathname: '/reports',
            icon: <BarChart3 size={21} color={colors.icon} />,
            onPress: () => router.push('/reports'),
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
    ];

    return (
        <>
        <TouchableOpacity
            onPress={() => setSidebarOpen(true)}
            className="absolute left-5 top-14 z-40 rounded-xl p-2"
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