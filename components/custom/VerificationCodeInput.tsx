import { useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface VerificationCodeInputProps {
  length?: number;
  value: string;
  onChange: (code: string) => void;
  onComplete?: (code: string) => void;
  error?: string;
  autoFocus?: boolean;
}

const ERROR_COLOR = '#EF4444';

export default function VerificationCodeInput({
    length = 6,
    value,
    onChange,
    onComplete,
    error,
    autoFocus = true,
}: VerificationCodeInputProps) {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);

    const digits = Array.from({ length }, (_, i) => value[i] ?? '');
    const activeIndex = Math.min(value.length, length - 1);

    const handleChangeText = (text: string) => {
        const cleaned = text.replace(/[^0-9]/g, '').slice(0, length);

        onChange(cleaned);

        if (cleaned.length === length) {
        onComplete?.(cleaned);
        }
    };

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <View className="mb-5">
        <Pressable onPress={focusInput}>
            <View className="flex-row justify-between">
            {digits.map((digit, index) => {
                const isActiveBox =
                isFocused && index === activeIndex;

                const borderColor = error
                ? ERROR_COLOR
                : isActiveBox
                    ? colors.tint
                    : colors.border;

                return (
                <View
                    key={index}
                    className="h-14 w-12 items-center justify-center rounded-xl border"
                    style={{
                    borderColor,
                    borderWidth: isActiveBox || error ? 2 : 1,
                    backgroundColor: colors.input,
                    }}
                >
                    <Text
                    className="text-xl font-semibold"
                    style={{ color: colors.text }}
                    >
                    {digit}
                    </Text>
                </View>
                );
            })}
            </View>
        </Pressable>

        <TextInput
            ref={inputRef}
            value={value}
            onChangeText={handleChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            autoFocus={autoFocus}
            maxLength={length}
            caretHidden
            style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 56,
            opacity: 0,
            }}
        />

        {error && (
            <Text
            className="mt-2 text-xs"
            style={{ color: ERROR_COLOR }}
            >
            {error}
            </Text>
        )}
        </View>
    );
}