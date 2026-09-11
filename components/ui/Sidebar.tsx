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
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : -width,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible, translateX]);

  const backdropOpacity = translateX.interpolate({
    inputRange: [-width, 0],
    outputRange: [0, 0.4],
    extrapolate: 'clamp',
  });

  const firstDangerIndex = items.findIndex((item) => item.danger);

  return (
    <View pointerEvents={visible ? 'auto' : 'none'} className="absolute inset-0 z-50">
      <Animated.View className="absolute inset-0 bg-black" style={{ opacity: backdropOpacity }}>
        <Pressable className="absolute inset-0" onPress={onClose} />
      </Animated.View>

      <Animated.View
        className="h-full w-[70vw] px-5 pt-14"
        style={{
          backgroundColor: colors.card,
          transform: [{ translateX }],
          shadowColor: '#000',
          shadowOffset: { width: 4, height: 0 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 16,
        }}
      >
        <View className="mb-10 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            {logo}
            <Text className="text-xl font-bold" style={{ color: colors.text }}>
              {title}
            </Text>
          </View>

          <TouchableOpacity onPress={onClose} hitSlop={8}>
            <X size={24} color={colors.icon} />
          </TouchableOpacity>
        </View>

        <View className="gap-1">
          {items.map((item, index) => {
            const isActive = pathname === item.pathname;
            const activeColor = colors.tint;

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
                  activeOpacity={0.7}
                  className="flex-row items-center gap-4 rounded-xl px-4 py-3.5"
                  style={{
                    backgroundColor: isActive
                      ? colorScheme === 'dark'
                        ? '#3B2A5A'
                        : '#F3E8FF'
                      : 'transparent',
                  }}
                >
                  {item.icon && (
                    <View>
                      {isActive && !item.danger
                        ? <View>{item.icon}</View>
                        : item.icon}
                    </View>
                  )}

                  <Text
                    className="text-[15px] font-medium"
                    style={{
                      color: item.danger
                        ? '#EF4444'
                        : isActive
                          ? activeColor
                          : colors.icon,
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