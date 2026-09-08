import { useState } from 'react';
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface InputFieldProps extends TextInputProps {
  label: string;
  type?: 'text' | 'email' | 'password';
}

export default function InputField({
    label,
    type = 'text',
    ...props
}: InputFieldProps) {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';

    return (
        <View className="mb-5">
            {/* Label */}
            <Text
                className="mb-2 text-sm font-semibold"
                style={{ color: colors.text }}
            >
                {label}
            </Text>

            {/* Input */}
            <View
                className="h-[52px] flex-row items-center rounded-xl border"
                style={{
                borderColor: colors.border,
                backgroundColor: colors.input,
                }}
            >
                <TextInput
                    {...props}
                    secureTextEntry={isPassword && !showPassword}
                    placeholderTextColor={colors.placeholder}
                    className="h-full flex-1 px-4 text-base"
                    style={{
                        color: colors.text,
                    }}
                />

                {/* Password Toggle */}
                {isPassword && (
                <TouchableOpacity
                    onPress={() => setShowPassword((prev) => !prev)}
                    className="h-full w-12 items-center justify-center"
                    activeOpacity={0.7}
                >
                    {showPassword ? (
                        <EyeOff
                            size={20}
                            color={colors.icon}
                            strokeWidth={2}
                        />
                        ) : (
                        <Eye
                            size={20}
                            color={colors.icon}
                            strokeWidth={2}
                        />
                    )}
                </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
