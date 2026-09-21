import { LinearGradient } from 'expo-linear-gradient';
import {
  ImageBackground,
  StyleProp,
  ViewStyle,
  useColorScheme,
} from 'react-native';

type GradientImageCardProps = {
  children: React.ReactNode;
  width?: number;
  height?: number;
  padding?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
};

export default function GradientCard({
  children,
  width,
  height,
  padding = 18,
  borderRadius = 16,
  style,
}: GradientImageCardProps) {
  const colorScheme =
    useColorScheme() === 'dark' ? 'dark' : 'light';

  return (
    <ImageBackground
      source={require('@/assets/logo.png')}
      resizeMode="cover"
      imageStyle={{
        borderRadius,
      }}
      style={[
        {
          width,
          height,
          borderRadius,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <LinearGradient
        colors={
          colorScheme === 'dark'
            ? [
                'rgba(109, 40, 217, 0.95)',
                'rgba(49, 18, 86, 0.92)',
              ]
            : [
                'rgba(109, 40, 217, 0.92)',
                'rgba(139, 92, 246, 0.82)',
              ]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flex: 1,
          padding,
          borderRadius,
        }}
      >
        {children}
      </LinearGradient>
    </ImageBackground>
  );
}