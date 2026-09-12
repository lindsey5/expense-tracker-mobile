import { TouchableOpacity, Text } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

type TabProps = {
  onPress?: () => void;
  isActive: boolean;
  label: string;
};

export default function Tab({ onPress, isActive = false, label }: TabProps) {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-full px-4 py-2.5"
      style={{
        backgroundColor: isActive ? colors.tint : colors.soft,
        borderWidth: isActive ? 0 : 1,
        borderColor: isActive ? 'transparent' : colors.border,
      }}
    >
      <Text
        className="text-sm font-semibold"
        style={{
          color: isActive ? '#FFFFFF' : colors.text,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}