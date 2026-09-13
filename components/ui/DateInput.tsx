import { Colors } from '@/constants/theme';
import { CalendarDays } from 'lucide-react-native';
import { useState } from 'react';
import {
  Platform,
  Pressable,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type DateInputProps = {
  label?: string;
  value?: Date;
  onChange: (date: Date) => void;
  error?: string;
  placeholder?: string;
};

export default function DateInput({
  label,
  value,
  onChange,
  error,
  placeholder = 'Select date',
}: DateInputProps) {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];
    const [showPicker, setShowPicker] = useState(false);

    const handleChange = (
        event: any,
        selectedDate?: Date,
    ) => {
        setShowPicker(false);

        if (selectedDate) {
        onChange(selectedDate);
        }
    };

    return (
        <View>
            {label && (
                <Text
                    className="mb-2 text-sm font-medium"
                    style={{ color: colors.text }}
                >
                {label}
                </Text>
            )}

            <Pressable
                onPress={() => setShowPicker(true)}
                className="h-12 flex-row items-center justify-between rounded-xl px-4"
                style={{
                    backgroundColor: colors.input,
                    borderWidth: 1,
                    borderColor: error ? '#EF4444' : colors.border,
                }}
            >
                <Text
                    className="text-sm"
                    style={{
                        color: value ? colors.text : colors.placeholder,
                    }}
                >
                {value
                    ? value.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })
                    : placeholder}
                </Text>

                <CalendarDays
                    size={20}
                    color={error ? '#EF4444' : colors.icon}
                />
            </Pressable>

            {error && (
                <Text
                    className="mt-1.5 text-xs"
                    style={{ color: '#EF4444' }}
                >
                {error}
                </Text>
            )}

            {showPicker && (
                <DateTimePicker
                    value={value ?? new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onValueChange={handleChange}
                    maximumDate={new Date()}
                />
            )}
        </View>
    );
}