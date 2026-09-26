import InputField from "@/components/ui/InputField";
import { Colors } from "@/constants/theme";
import { useColorScheme, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import {
  Banknote,
  Building2,
  Check,
  CreditCard,
  Ellipsis,
  WalletCards,
} from 'lucide-react-native';
import { WalletType } from "@/types/wallet.type";
import z from "zod";
import { schemas } from "@/lib/api/openapi";
import { WalletFormData, WalletSchema } from "@/schemas/wallet.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import useCreateWallet from "@/hooks/wallet/use-create-wallet.hook";
import useUpdateWallet from "@/hooks/wallet/use-update-wallet.hook";
import Error from "../Error";
import { useEffect } from "react";
import { useErrorStore } from "@/lib/store/errorStore";
import { CustomModal, CustomModalBody, CustomModalContent, CustomModalHeader, CustomModalTitle } from "../../ui/Modal";

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

    const { clearError } = useErrorStore();

    const createWalletMutation = useCreateWallet();
    const updateWalletMutation = useUpdateWallet();

    const { handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<WalletFormData>({
        resolver: zodResolver(WalletSchema),
        defaultValues: {
            balance: 0,
            name: '',
            type: '',
        }
    });

    useEffect(() => {
        if(wallet) {
            reset({
                name: wallet.name,
                balance: wallet.balance,
                type: wallet.type
            })
        }
    }, [wallet])

    const onSubmit = async (data: WalletFormData) => {
        wallet ? await updateWalletMutation
            .mutateAsync({
                id: wallet.id,
                data: {
                    balance: data.balance,
                    name: data.name,
                    type: data.type as WalletType,
                }
            })
        : await createWalletMutation
            .mutateAsync({
                balance: data.balance,
                name: data.name,
                type: data.type as WalletType,
            })

        onClose();
    }
    
    const handleClose = () => {
        if(createWalletMutation.isPending || updateWalletMutation.isPending) return;

        reset({
            balance: 0,
            name: '',
            type: ''
        });
        onClose();
        clearError();
    }
    
    return (
        <CustomModal
            visible={visible}
            handleClose={handleClose}
        >
            <CustomModalContent>
                <CustomModalHeader>
                    <CustomModalTitle>{wallet ? "Update" : "Create"} Wallet</CustomModalTitle>
                </CustomModalHeader>
                <CustomModalBody>
                    <Error />
                    <InputField 
                        label="Wallet Name"
                        placeholder="e.g GCash"
                        value={watch('name')}
                        onChangeText={(text) => setValue('name', text)}
                        error={errors.name?.message}
                    />
                    <View className="gap-2">
                        <Text
                            className="text-sm font-medium"
                            style={{ color: colors.text }}
                        >
                            Wallet Type
                        </Text>

                        <View className="flex-row flex-wrap gap-2">
                            {walletOptions.map((option) => {
                            const Icon = option.icon;
                            const selected = watch('type') === option.value;

                            return (
                                <TouchableOpacity
                                    key={option.value}
                                    onPress={() => setValue('type', option.value)}
                                    className="min-h-[52px] flex-row items-center rounded-xl border p-3"
                                    style={{
                                        width: '48%',
                                        backgroundColor: selected
                                        ? colors.surfaceTint[0]
                                        : colors.input,
                                        borderColor: selected
                                        ? colors.tint
                                        : colors.border,
                                    }}
                                    activeOpacity={0.7}
                                >
                                    <Icon
                                        size={20}
                                        color={selected ? colors.tint : colors.icon}
                                    />

                                    <Text
                                        className="ml-2 flex-1 text-sm font-medium"
                                        numberOfLines={1}
                                        style={{
                                        color: selected ? colors.tint : colors.text,
                                        }}
                                    >
                                        {option.label}
                                    </Text>

                                    {selected && (
                                        <Check
                                        size={18}
                                        color={colors.tint}
                                        />
                                    )}
                                </TouchableOpacity>
                            );
                            })}
                        </View>

                        {errors.type && (
                            <Text
                                className="text-xs"
                                style={{ color: '#EF4444' }}
                            >
                            {errors.type.message}
                            </Text>
                        )}
                    </View>
                    <InputField 
                        label="Initial Balance (Optional)"
                        placeholder="0.00"
                        keyboardType="number-pad"
                        onChangeText={(text) => setValue('balance', Number(text))}
                        error={errors.balance?.message}
                    />
                    {(createWalletMutation.isPending || updateWalletMutation.isPending) ? (
                        <ActivityIndicator color={colors.text}/>
                    ) : (
                        <Button
                            className="mt-5"
                            title={wallet ? "Update" : "Create"}
                            onPress={handleSubmit(onSubmit)}
                        />
                    )}
                </CustomModalBody>
            </CustomModalContent>
        </CustomModal>
    )
}