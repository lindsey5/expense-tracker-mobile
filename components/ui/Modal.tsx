import { Colors } from '@/constants/theme';
import { X } from 'lucide-react-native';
import { ReactNode, createContext, useContext } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

type CustomModalContextType = {
  handleClose: () => void;
};

const CustomModalContext =
  createContext<CustomModalContextType | null>(null);

function useCustomModal() {
  const context = useContext(CustomModalContext);

  if (!context) {
    throw new Error(
      'CustomModal components must be used inside CustomModal',
    );
  }

  return context;
}

type CustomModalProps = {
  visible: boolean;
  handleClose: () => void;
  children: ReactNode;
};

function CustomModal({
  visible,
  handleClose,
  children,
}: CustomModalProps) {
  return (
    <CustomModalContext.Provider value={{ handleClose }}>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        {children}
      </Modal>
    </CustomModalContext.Provider>
  );
}

function CustomModalContent({
  children,
}: {
  children: ReactNode;
}) {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  return (
    <View className="flex-1 justify-end">
      <Pressable
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0,0,0,0.80)' }}
      />

      <View
        className="max-h-[90%] min-h-[300px] rounded-t-3xl"
        style={{ backgroundColor: colors.background }}
      >
        {children}
      </View>
    </View>
  );
}

function CustomModalHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { handleClose } = useCustomModal();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  return (
    <View className="flex-row items-center justify-between p-5">
      <View className="flex-1">{children}</View>

      <TouchableOpacity
        onPress={handleClose}
        className="ml-3 rounded-full p-2"
        style={{ backgroundColor: colors.card }}
      >
        <X size={22} color={colors.icon} />
      </TouchableOpacity>
    </View>
  );
}

function CustomModalTitle({
  children,
}: {
  children: ReactNode;
}) {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  return (
    <Text
      className="text-xl font-bold"
      style={{ color: colors.text }}
    >
      {children}
    </Text>
  );
}

function CustomModalBody({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ScrollView
      className="px-5"
      contentContainerClassName="gap-4 pb-5"
      showsVerticalScrollIndicator
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}

function CustomModalFooter({
  children,
}: {
  children: ReactNode;
}) {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  return (
    <View
      className="border-t px-5 py-8"
      style={{
        borderTopColor: colors.border,
        backgroundColor: colors.background,
      }}
    >
      {children}
    </View>
  );
}

function CustomModalClose({
  children,
}: {
  children: ReactNode;
}) {
  const { handleClose } = useCustomModal();

  return (
    <TouchableOpacity onPress={handleClose}>
      {children}
    </TouchableOpacity>
  );
}

export {
  CustomModal,
  CustomModalContent,
  CustomModalHeader,
  CustomModalTitle,
  CustomModalBody,
  CustomModalFooter,
  CustomModalClose,
};