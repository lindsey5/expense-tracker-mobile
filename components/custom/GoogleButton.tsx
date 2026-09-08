import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface GoogleButtonProps extends TouchableOpacityProps {
    children?: React.ReactNode;
}

export default function GoogleButton({
    children = 'Continue with Google',
    ...props
}: GoogleButtonProps) {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    return (
        <TouchableOpacity
            {...props}
            className="h-[52px] flex-row items-center justify-center rounded-xl border"
            style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
            }}
        >
            {/* Google G */}
            <View className="mr-3 items-center justify-center">
                <Text className="text-xl font-bold" style={{ color: colors.text }}>G</Text>
            </View>

            <Text
                className="text-base font-semibold"
                style={{ color: colors.text }}
            >
                {children}
            </Text>
        </TouchableOpacity>
    );
}