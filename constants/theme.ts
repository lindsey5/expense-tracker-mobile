import { Platform } from 'react-native';

const tintColorLight = '#7C3AED';
const tintColorDark = '#A78BFA';

const accentColorLight = '#A855F7';
const accentColorDark = '#C084FC';

export const Colors = {
  light: {
    // Main
    text: '#18181B',
    background: '#F5F3FF',
    tint: tintColorLight,
    accent: accentColorLight,

    // UI
    icon: '#71717A',
    border: '#E4E4E7',
    input: '#FFFFFF',
    card: '#FFFFFF',
    placeholder: '#A1A1AA',
    surfaceTint: '#FFFFFF',
    panel: '#F8F7FF',
    soft: '#F4F4F5',
    softTint: '#F1E9FF',
    skeleton: '#E4E4E7',

    // Button
    buttonText: '#FFFFFF',

    // Tabs
    tabIconDefault: '#71717A',
    tabIconSelected: tintColorLight,
  },

  dark: {
    // Main
    text: '#F4F4F5',
    background: '#121216',
    tint: tintColorDark,
    accent: accentColorDark,

    // UI
    icon: '#A1A1AA',
    border: '#2C2C33',
    input: '#1D1D23',
    card: '#1A1A20',
    placeholder: '#71717A',
    surfaceTint: '#2E2148',
    panel: '#17171C',
    soft: '#202027',
    softTint: '#2A2142',
    skeleton: '#27272A',

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