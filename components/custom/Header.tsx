import { View, Text, useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

type HeaderProps = {
    title: string;
    description: string;
};

export default function Header({ description, title }: HeaderProps) {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    return (
        <View className="mb-6">
            <View className="mb-3 flex-row items-center justify-between">
                <View className="flex-1">
                <Text className="text-[30px] font-bold tracking-tight" style={{ color: colors.text }}>
                    {title}
                </Text>

                <Text className="mt-1 text-sm" style={{ color: colors.icon }}>
                    {description}
                </Text>
                </View>
            </View>
        </View>
    );
}