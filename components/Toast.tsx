import { useEffect } from 'react';
import {
  CheckCircle2,
  Info,
  XCircle,
} from 'lucide-react-native';
import { Text, View } from 'react-native';

import { useToastStore } from '@/lib/store/toastStore';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function Toast() {
    const {
        visible,
        message,
        type,
        hideToast,
    } = useToastStore();

    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    useEffect(() => {
        if (!visible) return;

        const timer = setTimeout(hideToast, 3000);

        return () => clearTimeout(timer);
    }, [visible, message, hideToast]);

    if (!visible) return null;

    const Icon =
        type === 'success'
        ? CheckCircle2
        : type === 'error'
            ? XCircle
            : Info;

    const iconColor =
        type === 'success'
        ? '#22C55E'
        : type === 'error'
            ? '#EF4444'
            : '#3B82F6';

    return (
        <View
            className="absolute left-5 right-5 top-14 z-50 flex-row items-center rounded-xl px-4 py-3"
            style={{
                backgroundColor: colors.input,
                borderWidth: 1,
                borderColor: colors.border,
                elevation: 5,
                shadowColor: '#000',
                shadowOpacity: 0.15,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
            }}
        >
            <Icon size={20} color={iconColor} />

            <Text
                className="ml-3 flex-1 text-sm font-medium"
                style={{ color: colors.text }}
            >
                {message}
            </Text>
        </View>
    );
}