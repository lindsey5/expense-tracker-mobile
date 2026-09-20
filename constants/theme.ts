import { Platform } from 'react-native';

// Gastador brand colors
const tintColorLight = '#6D28D9';
const tintColorDark = '#8B5CF6';

const accentColorLight = '#8B5CF6';
const accentColorDark = '#A78BFA';

export const Colors = {
  light: {
    // Main
    text: '#18181B',
    background: '#F7F5FF',
    tint: tintColorLight,
    accent: accentColorLight,

    // UI
    icon: '#71717A',
    border: '#E7E2F3',
    input: '#FFFFFF',
    card: '#FFFFFF',
    placeholder: '#A1A1AA',

    // Surfaces
    surfaceTint: '#F3E8FF',
    panel: '#FAF8FF',
    soft: '#F4F4F5',
    softTint: '#F1EAFE',
    skeleton: '#E4E4E7',

    // Button
    buttonText: '#FFFFFF',

    // Tabs
    tabIconDefault: '#71717A',
    tabIconSelected: tintColorLight,
  },

  dark: {
    // Main
    text: '#F8F7FC',
    background: '#0B0712',
    tint: tintColorDark,
    accent: accentColorDark,

    // UI
    icon: '#9B97A3',
    border: '#292231',
    input: '#15101D',
    card: '#1C1229',
    placeholder: '#716B79',

    // Surfaces
    surfaceTint: '#1C1229',
    panel: '#100B17',
    soft: '#1B1720',
    softTint: '#241633',
    skeleton: '#29232F',

    // Button
    buttonText: '#FFFFFF',

    // Tabs
    tabIconDefault: '#77717F',
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