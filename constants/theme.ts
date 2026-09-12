import { Platform } from 'react-native';

const tintColorLight = '#7C3AED';
const tintColorDark = '#A78BFA';

export const Colors = {
  light: {
    // Main
    text: '#18181B',
    background: '#FFFFFF',
    tint: tintColorLight,

    // UI
    icon: '#71717A',
    border: '#D4D4D8',
    input: '#FAFAFA',
    card: '#FFFFFF',
    placeholder: '#A1A1AA',
    surfaceTint: '#F3E8FF',

    // Button
    buttonText: '#FFFFFF',

    // Tabs
    tabIconDefault: '#71717A',
    tabIconSelected: tintColorLight,
  },

  dark: {
    // Main
    text: '#F4F4F5',
    background: '#18181B',
    tint: tintColorDark,

    // UI
    icon: '#A1A1AA',
    border: '#3F3F46',
    input: '#27272A',
    card: '#27272A',
    placeholder: '#71717A',
    surfaceTint: '#2E2148',
    
    // Button
    buttonText: '#FFFFFF',

    // Tabs
    tabIconDefault: '#A1A1AA',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },

  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },

  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono:
      "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});