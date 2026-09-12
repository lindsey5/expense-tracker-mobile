import { useEffect, useRef } from 'react';
import { usePathname } from 'expo-router';
import { Animated, Dimensions, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { X } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

const { width } = Dimensions.get('window');

type SidebarItem = {
  label: string;
  pathname: string;
  icon?: React.ReactNode;
  onPress: () => void;
  danger?: boolean;
};

type SidebarProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  logo?: React.ReactNode;
  items: SidebarItem[];
};

export default function Sidebar({
  visible,
  onClose,
  title = 'Menu',
  logo,
  items,
}: SidebarProps) {
  const pathname = usePathname();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];
  const translateX = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : width,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible, translateX]);

  const backdropOpacity = translateX.interpolate({
    inputRange: [0, width],
    outputRange: [0.4, 0],
    extrapolate: 'clamp',
  });

  const firstDangerIndex = items.findIndex((item) => item.danger);

  return (
    <View pointerEvents={visible ? 'auto' : 'none'} className="absolute inset-0 z-50">
      <Animated.View
        className="absolute inset-0 bg-black"
        style={{ opacity: backdropOpacity }}
      >
        <Pressable className="absolute inset-0" onPress={onClose} />
      </Animated.View>

      <Animated.View
        className="absolute right-0 h-full w-[72vw] px-5 pt-14"
        style={{
          backgroundColor: colors.card,
          transform: [{ translateX }],
          shadowColor: '#000',
          shadowOffset: { width: -4, height: 0 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 16,
        }}
      >
        <View className="mb-8 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: colors.softTint }}>
              {logo}
            </View>
            <Text className="text-xl font-bold" style={{ color: colors.text }}>
              {title}
            </Text>
          </View>

          <TouchableOpacity onPress={onClose} hitSlop={8} className="h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: colors.soft }}>
            <X size={20} color={colors.icon} />
          </TouchableOpacity>
        </View>

        <View className="gap-1">
          {items.map((item, index) => {
            const isActive = pathname === item.pathname;

            return (
              <View key={item.label}>
                {index === firstDangerIndex && index > 0 && (
                  <View className="my-2 h-px" style={{ backgroundColor: colors.border }} />
                )}

                <TouchableOpacity
                  onPress={() => {
                    item.onPress();
                    onClose();
                  }}
                  activeOpacity={0.8}
                  className="flex-row items-center gap-4 rounded-[18px] px-4 py-3.5"
                  style={{
                    backgroundColor: isActive ? colors.softTint : 'transparent',
                  }}
                >
                  <View className="h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: isActive ? colors.soft : colors.soft }}>
                    {item.icon}
                  </View>

                  <Text
                    className="text-[15px] font-medium"
                    style={{
                      color: item.danger ? '#EF4444' : isActive ? colors.tint : colors.text,
                    }}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
}