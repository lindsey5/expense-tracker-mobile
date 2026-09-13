import { Colors } from '@/constants/theme';
import { Check, ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  CustomModal,
  CustomModalBody,
  CustomModalContent,
  CustomModalHeader,
  CustomModalTitle,
} from './Modal';

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  label?: string;
  value?: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
};

export default function Select({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select option',
  error,
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
      <View>
        {label && (
          <Text
            className="mb-2 text-sm font-medium"
            style={{ color: colors.text }}
          >
            {label}
          </Text>
        )}

        <TouchableOpacity
          onPress={() => setVisible(true)}
          className={`h-12 flex-row items-center justify-between rounded-xl px-4 ${className ?? ''}`}
          style={{
            backgroundColor: colors.input,
            borderWidth: 1,
            borderColor: error ? '#EF4444' : colors.border,
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

          <ChevronDown size={20} color={error ? '#EF4444' : colors.icon} />
        </TouchableOpacity>

        {error && (
          <Text className="mt-1.5 text-xs" style={{ color: '#EF4444' }}>
            {error}
          </Text>
        )}
      </View>

      <CustomModal
        visible={visible}
        handleClose={() => setVisible(false)}
      >
        <CustomModalContent>
          <CustomModalHeader>
            <CustomModalTitle>{label ?? 'Select option'}</CustomModalTitle>
          </CustomModalHeader>

          <CustomModalBody>
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
          </CustomModalBody>
        </CustomModalContent>
      </CustomModal>
    </>
  );
}