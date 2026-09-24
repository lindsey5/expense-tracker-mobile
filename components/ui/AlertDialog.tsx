import { ReactNode } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AlertTriangle, X } from 'lucide-react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { cn } from '@/utils/utils';

type AlertDialogVariant = 'default' | 'destructive';

type AlertDialogProps = {
  visible: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: AlertDialogVariant;
  isLoading?: boolean;
  children?: ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function AlertDialog({
  visible,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  isLoading = false,
  children,
  onCancel,
  onConfirm,
}: AlertDialogProps) {
  const colorScheme =
    useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  const isDestructive = variant === 'destructive';
  const confirmColor = isDestructive ? '#DC2626' : colors.tint;
  const iconBackground = isDestructive
    ? colorScheme === 'dark'
      ? '#3F2024'
      : '#FEE2E2'
    : colors.surfaceTint;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="flex-1 items-center justify-center px-5">
        <Pressable
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0,0,0,0.70)' }}
          onPress={isLoading ? undefined : onCancel}
        />

        <View
          className="w-full max-w-[420px] rounded-[24px] border p-5"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <View className="flex-row items-start justify-between">
            <View
              className="h-11 w-11 items-center justify-center rounded-2xl"
              style={{ backgroundColor: iconBackground }}
            >
              <AlertTriangle size={22} color={confirmColor} />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onCancel}
              disabled={isLoading}
              className="h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: colors.soft }}
            >
              <X size={18} color={colors.icon} />
            </TouchableOpacity>
          </View>

          <Text
            className="mt-4 text-xl font-bold"
            style={{ color: colors.text }}
          >
            {title}
          </Text>

          {description ? (
            <Text
              className="mt-2 text-sm leading-5"
              style={{ color: colors.icon }}
            >
              {description}
            </Text>
          ) : null}

          {children ? <View className="mt-4">{children}</View> : null}

          <View className="mt-6 flex-row gap-3">
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onCancel}
              disabled={isLoading}
              className="flex-1 items-center justify-center rounded-2xl border px-3 py-3.5"
              style={{
                backgroundColor: colors.input,
                borderColor: colors.border,
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              <Text
                className="text-sm font-bold"
                style={{ color: colors.text }}
              >
                {cancelText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onConfirm}
              disabled={isLoading}
              className={cn(
                'flex-1 flex-row items-center justify-center rounded-2xl px-3 py-3.5',
                isLoading && 'opacity-80',
              )}
              style={{ backgroundColor: confirmColor }}
            >
              {isLoading ? (
                <ActivityIndicator
                  size="small"
                  color="#FFFFFF"
                  className="mr-2"
                />
              ) : null}

              <Text className="text-sm font-bold text-white">
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
