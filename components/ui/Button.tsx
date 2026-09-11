import {
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { cn } from '@/utils/utils';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline';
}

export default function Button({
    title,
    variant = 'primary',
    className,
    ...props
}: ButtonProps) {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    const variants = {
        primary: {
        backgroundColor: colors.tint,
        textColor: '#FFFFFF',
        },
        secondary: {
        backgroundColor: colors.input,
        textColor: colors.text,
        },
        outline: {
        backgroundColor: 'transparent',
        textColor: colors.text,
        },
    };

    const current = variants[variant];

    return (
        <TouchableOpacity
        {...props}
        className={cn(
            'items-center justify-center rounded-xl px-2 py-4',
            variant === 'outline' && 'border',
            className,
        )}
        style={{
            backgroundColor: current.backgroundColor,
            borderColor: variant === 'outline' ? colors.border : undefined,
        }}
        >
        <Text
                className="text-base font-bold"
                style={{ color: current.textColor }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}