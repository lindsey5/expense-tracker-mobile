import { View, Text, useColorScheme } from "react-native"
import { WalletIcon } from "lucide-react-native"
import { Colors } from "@/constants/theme";
import { formatCurrency } from "@/utils/utils";
import useGetTotalBalance from "@/hooks/wallet/use-get-total-balance.hook";

export default function TotalBalance() {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];
    
    const { data } = useGetTotalBalance();

    return (
        <View
            className="mb-6 rounded-[26px] border p-5"
            style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.05,
                shadowRadius: 16,
                elevation: 2,
            }}
        >
            <View className="mb-4 flex-row items-center gap-2">
                <View className="rounded-xl p-2.5" style={{ backgroundColor: colors.softTint }}>
                    <WalletIcon size={20} color={colors.tint} />
                </View>
                <Text className="text-sm font-medium" style={{ color: colors.icon }}>
                    Total Balance
                </Text>
            </View>

            <Text className="text-[34px] font-bold tracking-tight" style={{ color: colors.text }}>
            {formatCurrency(data?.totalBalance || 0)}
            </Text>

            <Text className="mt-2 text-sm" style={{ color: colors.icon }}>
            Across {data?.totalWallets ?? 0} wallets
            </Text>
        </View>
    )
}