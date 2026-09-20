// components/ui/separator.tsx

import { View, ViewProps } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface SeparatorProps extends ViewProps {
  orientation?: 'horizontal' | 'vertical';
}

export default function Separator({
  orientation = 'horizontal',
  style,
  ...props
}: SeparatorProps) {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: colors.border,
          ...(orientation === 'horizontal'
            ? {
                height: 1,
                width: '100%',
              }
            : {
                width: 1,
                height: '100%',
              }),
        },
        style,
      ]}
    />
  );
}