
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface AuthButtonProps extends TouchableOpacityProps {
    title: string;
}

export default function AuthButton({
    title,
    ...props
}: AuthButtonProps) {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    return (
        <TouchableOpacity
            {...props}
            className="py-4 px-2 items-center justify-center rounded-xl"
            style={{ backgroundColor: colors.tint }}
        >
            <Text className="text-base font-bold text-white">
                {title}
            </Text>
        </TouchableOpacity>
    );
}