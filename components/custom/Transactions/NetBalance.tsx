import Card from "@/components/ui/Card";
import { Colors } from "@/constants/theme";
import { formatCurrency } from "@/utils/utils";
import { Wallet } from "lucide-react-native";
import { View, Text } from "react-native";
import { useColorScheme } from "react-native";

export default function NetBalance() {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    const balance = 300000;

    return (
        <Card
            variant="surfaceTint"
            className="mt-3 flex-row items-center justify-between rounded-2xl p-4"
        >
            <View className="flex-row items-center">
                <View
                    className="rounded-xl p-2.5"
                    style={{
                        backgroundColor: colors.surfaceTint
                    }}
                >
                <Wallet size={19} color={colors.tint} />
                </View>

                <View className="ml-3">
                <Text
                    className="text-xs"
                    style={{ color: colors.icon }}
                >
                    Net Balance
                </Text>

                <Text
                    className="mt-0.5 text-base font-bold"
                    style={{ color: colors.text }}
                >
                    {formatCurrency(balance)}
                </Text>
                </View>
            </View>

            <Text
                className="text-xs font-semibold"
                style={{ color: colors.tint }}
            >
                September 2026
            </Text>
            
        </Card>
    )
}