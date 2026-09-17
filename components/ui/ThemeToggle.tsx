import { Moon, Sun } from 'lucide-react-native';
import { TouchableOpacity, useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';
import { useThemeStore } from '@/lib/store/themeStore';

export default function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const deviceTheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const activeTheme = theme === 'system' ? deviceTheme : theme;
  const colors = Colors[activeTheme];

  return (
    <TouchableOpacity
      accessibilityLabel={`Switch to ${activeTheme === 'dark' ? 'light' : 'dark'} mode`}
      accessibilityRole="button"
      onPress={toggleTheme}
      className="h-11 w-11 items-center justify-center rounded-2xl border"
      style={{
        backgroundColor: colors.card,
        borderColor: colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 2,
      }}
    >
      {activeTheme === 'dark' ? (
        <Sun size={20} color={colors.text} />
      ) : (
        <Moon size={20} color={colors.text} />
      )}
    </TouchableOpacity>
  );
}