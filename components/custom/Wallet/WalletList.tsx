import { Colors } from '@/constants/theme';
import { Wallet } from '@/types/wallet.type';
import { formatCurrency } from '@/utils/utils';
import {
    Banknote,
    Building2,
    CreditCard,
    Ellipsis,
    MoreVertical,
    WalletCards,
} from 'lucide-react-native';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export const walletIcons = {
    CASH: Banknote,
    BANK: Building2,
    E_WALLET: WalletCards,
    CREDIT_CARD: CreditCard,
    OTHER: Ellipsis,
};

export default function WalletList({
    handleEdit,
    wallets
} : { 
    handleEdit: (wallet: Wallet) => void;
    wallets: Wallet[];
}) {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    if (!wallets.length) {
        return (
        <View
            className="items-center justify-center rounded-[22px] border px-6 py-10"
            style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
            }}
        >
            <WalletCards size={40} color={colors.icon} />
            <Text
                className="mt-3 text-base font-semibold"
                style={{ color: colors.text }}
            >
            No wallets found
            </Text>
            <Text
                className="mt-1 text-center text-sm"
                style={{ color: colors.icon }}
            >
            Add a wallet to start tracking your balance.
            </Text>
        </View>
        );
    }

    return (
        <View className="gap-3">
        {wallets.map((wallet) => {
            const Icon = walletIcons[wallet.type];
            const isNegative = wallet.balance < 0;

            return (
                <TouchableOpacity
                    key={wallet.id}
                    activeOpacity={0.8}
                    className="flex-row items-center rounded-[22px] border p-4"
                    style={{
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                    }}
                    onPress={() => handleEdit(wallet)}
                >
                    <View
                        className="mr-4 rounded-2xl p-3"
                        style={{
                            backgroundColor: colors.softTint,
                        }}
                    >
                        <Icon size={22} color={colors.tint} />
                    </View>

                    <View className="flex-1">
                        <Text
                            className="text-base font-semibold"
                            style={{ color: colors.text }}
                        >
                            {wallet.name}
                        </Text>
                        <Text
                            className="mt-1 text-xs"
                            style={{ color: colors.icon }}
                        >
                            {wallet.type.replace('_', ' ')}
                        </Text>
                    </View>

                    <View className="items-center flex-row gap-3">
                        <Text
                            className="text-base font-bold"
                            style={{
                            color: isNegative ? '#DC2626' : colors.text,
                            }}
                        >
                            {formatCurrency(wallet.balance)}
                        </Text>
                        <MoreVertical size={18} color={colors.icon} />
                    </View>
                </TouchableOpacity>
            );
        })}
        </View>
    );
}