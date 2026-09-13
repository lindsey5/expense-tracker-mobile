import InputField from "@/components/ui/InputField";
import { Colors } from "@/constants/theme";
import { Modal, Pressable, useColorScheme, View, Text, TouchableOpacity, ScrollView } from "react-native";
import {
  Banknote,
  Building2,
  Check,
  CreditCard,
  Ellipsis,
  WalletCards,
  X,
} from 'lucide-react-native';
import { WalletType } from "@/types/wallet.type";
import z from "zod";
import { schemas } from "@/lib/api/openapi";
import { WalletFormData, WalletSchema } from "@/schemas/wallet.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";

type Wallet = z.infer<typeof schemas.WalletDto>;

type WalletModalProps = {
    visible: boolean;
    onClose: () => void;
    wallet?: Wallet;
}

const walletOptions = [
    {
        label: 'Cash',
        value: 'CASH' as WalletType,
        icon: Banknote,
    },
    {
        label: 'Bank',
        value: 'BANK' as WalletType,
        icon: Building2,
    },
    {
        label: 'E-Wallet',
        value: 'E_WALLET' as WalletType,
        icon: WalletCards,
    },
    {
        label: 'Credit Card',
        value: 'CREDIT_CARD' as WalletType,
        icon: CreditCard
    },
    {
        label: 'Other',
        value: 'OTHER' as WalletType,
        icon: Ellipsis,
    },
];


export default function WalletModal({
    onClose,
    visible,
    wallet
} : WalletModalProps) {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    const { handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<WalletFormData>({
        resolver: zodResolver(WalletSchema),
        defaultValues: {
            balance: 0,
            name: '',
            type: '',
        }
    });

    const onSubmit = (data: WalletFormData) => {
        
    }
    
    const handleClose = () => {
        reset({
            balance: 0,
            name: '',
            type: ''
        });
        onClose();
    }
    
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={handleClose}
        >
            <Pressable
                className="flex-1 justify-end bg-black/50"
                onPress={handleClose}
            >
                <Pressable
                    className="max-h-[90%] rounded-t-3xl p-5"
                    style={{ backgroundColor: colors.background }}
                >
                    <View className="mb-5 flex-row items-center justify-between">
                        <Text
                            className="text-xl font-bold"
                            style={{ color: colors.text }}
                        >
                            Add Wallet
                        </Text>

                        <TouchableOpacity
                            onPress={handleClose}
                            className="rounded-full p-2"
                            style={{ backgroundColor: colors.card }}
                        >
                            <X size={22} color={colors.icon} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        contentContainerClassName="gap-4"
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <InputField 
                            label="Wallet Name"
                            placeholder="e.g GCash"
                        />

                        <View className="gap-2">
                            <Text
                                className="text-sm font-medium"
                                style={{ color: colors.text }}
                            >
                            Wallet Type
                            </Text>
                            <View className="flex flex-row gap-2 flex-wrap">
                                {walletOptions.map((option) => {
                                    const Icon = option.icon;
                                    const selected = watch('type') === option.value;

                                    return (
                                        <TouchableOpacity
                                            key={option.value}
                                            onPress={() => setValue('type', option.value)}
                                            className="flex-row items-center rounded-xl border p-3"
                                            style={{
                                            backgroundColor: selected
                                                ? colors.surfaceTint[0]
                                                : colors.input,
                                            borderColor: selected
                                                ? colors.tint
                                                : colors.border,
                                            }}
                                        >
                                            <Icon
                                                size={20}
                                                color={selected ? colors.tint : colors.icon}
                                            />

                                            <Text
                                            className="ml-3 flex-1 text-sm font-medium"
                                            style={{
                                                color: selected ? colors.tint : colors.text,
                                            }}
                                            >
                                            {option.label}
                                            </Text>

                                            {selected && (
                                            <Check size={20} color={colors.tint} />
                                            )}
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                        <InputField 
                            label="Initial Balance (Optional)"
                            placeholder="0.00"
                            keyboardType="number-pad"
                           textContentType="oneTimeCode"
                        />
                        <Button
                            className="mt-5"
                            title={wallet ? "Update" : "Create"}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </ScrollView>

                </Pressable>

            </Pressable>

        </Modal>
    )
}