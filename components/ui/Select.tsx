import { Colors } from '@/constants/theme';
import { Check, ChevronDown, X } from 'lucide-react-native';
import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  value?: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function Select({
  value,
  options,
  onChange,
  placeholder = 'Select option',
  className,
}: SelectProps) {
  const [visible, setVisible] = useState(false);
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  const selected = options.find((option) => option.value === value);

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        className={`h-12 flex-row items-center justify-between rounded-xl px-4 ${className ?? ''}`}
        style={{
          backgroundColor: colors.input,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text
          className="text-sm"
          style={{
            color: selected ? colors.text : colors.placeholder,
          }}
        >
          {selected?.label ?? placeholder}
        </Text>

        <ChevronDown size={20} color={colors.icon} />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          className="flex-1 justify-end bg-black/40"
          onPress={() => setVisible(false)}
        >
          <Pressable
            className="rounded-t-3xl p-5"
            style={{ backgroundColor: colors.card }}
          >
            <View className="mb-4 flex-row items-center justify-between">
              <Text
                className="text-lg font-bold"
                style={{ color: colors.text }}
              >
                Select option
              </Text>

              <TouchableOpacity onPress={() => setVisible(false)}>
                <X size={22} color={colors.icon} />
              </TouchableOpacity>
            </View>

            <ScrollView className="max-h-80">
              {options.map((option) => {
                const isSelected = option.value === value;

                return (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleSelect(option)}
                    className="flex-row items-center justify-between rounded-xl px-4 py-4"
                    style={{
                      backgroundColor: isSelected
                        ? colors.surfaceTint
                        : 'transparent',
                    }}
                  >
                    <Text
                      className="text-base"
                      style={{
                        color: isSelected ? colors.tint : colors.text,
                        fontWeight: isSelected ? '600' : '400',
                      }}
                    >
                      {option.label}
                    </Text>

                    {isSelected && (
                      <Check size={20} color={colors.tint} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}