import { Colors } from '@/constants/theme';
import { DimensionValue, useColorScheme, View, ViewProps } from 'react-native';

type SkeletonProps = ViewProps & {
  width?: DimensionValue;
  height?: number;
};

export default function Skeleton({
  width = '100%',
  height = 16,
  className = '',
  style,
  ...props
}: SkeletonProps) {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    return (
        <View
            {...props}
            className={`rounded-md ${className}`}
            style={[
                {
                width,
                height,
                backgroundColor: colors.skeleton,
                },
                style,
            ]}
        />
    );
}