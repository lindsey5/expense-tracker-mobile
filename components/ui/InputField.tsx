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
  error?: string;
}

const ERROR_COLOR = '#EF4444';

export default function InputField({
  label,
  type = 'text',
  error,
  ...props
}: InputFieldProps) {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const isEmail = type === 'email';

  const typeDefaults: Partial<TextInputProps> = isPassword
    ? {
        autoCapitalize: 'none',
        autoCorrect: false,
        autoComplete: 'password',
        textContentType: 'password',
      }
    : isEmail
      ? {
          autoCapitalize: 'none',
          autoCorrect: false,
          keyboardType: 'email-address',
          autoComplete: 'email',
          textContentType: 'emailAddress',
        }
      : {
          autoCapitalize: 'sentences',
          autoCorrect: true,
        };

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
        className="h-[54px] flex-row items-center rounded-2xl border"
        style={{
          borderColor: error ? ERROR_COLOR : colors.border,
          backgroundColor: colors.input,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <TextInput
          {...typeDefaults}
          {...props}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor={colors.placeholder}
          className="h-full flex-1 pl-4"
          style={[
            { color: colors.text, fontSize: 16 },
            !isPassword && { paddingRight: 16 },
          ]}
        />

        {/* Password Toggle */}
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            className="h-full w-12 items-center justify-center"
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {showPassword ? (
              <EyeOff size={20} color={colors.icon} strokeWidth={2} />
            ) : (
              <Eye size={20} color={colors.icon} strokeWidth={2} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Error */}
      {error && (
        <Text className="mt-1 text-xs" style={{ color: ERROR_COLOR }}>
          {error}
        </Text>
      )}
    </View>
  );
}