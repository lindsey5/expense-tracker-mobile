import { Platform } from 'react-native';

const tintColorLight = '#7C3AED';
const tintColorDark = '#A78BFA';

export const Colors = {
  light: {
    text: '#18181B',
    background: '#FFFFFF',
    tint: tintColorLight,
    icon: '#71717A',
    tabIconDefault: '#71717A',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#F4F4F5',
    background: '#18181B',
    tint: tintColorDark,
    icon: '#A1A1AA',
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
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});