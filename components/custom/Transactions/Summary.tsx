import Card from "@/components/ui/Card";
import { Colors } from "@/constants/theme";
import { formatCurrency } from "@/utils/utils";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react-native";
import { View, Text, useColorScheme } from "react-native"


export default function Summary() {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    const totalIncome = 100000;
    const totalExpenses = 10000;

    return (
        <View className="flex-row gap-3">
            <Card>
                <View className="mb-3 flex-row items-center">
                <View className="rounded-full bg-green-100 p-2">
                    <ArrowDownLeft size={15} color="#16A34A" />
                </View>

                <Text
                    className="ml-2 text-xs"
                    style={{ color: colors.icon }}
                >
                    Income
                </Text>
                </View>

                <Text
                    className="text-lg font-bold"
                    style={{ color: colors.text }}
                >
                {formatCurrency(totalIncome)}
                </Text>
            </Card>

            <Card>
                <View className="mb-3 flex-row items-center">
                <View className="rounded-full bg-red-100 p-2">
                    <ArrowUpRight size={15} color="#DC2626" />
                </View>

                <Text
                    className="ml-2 text-xs"
                    style={{ color: colors.icon }}
                >
                    Expenses
                </Text>
                </View>

                <Text
                    className="text-lg font-bold"
                    style={{ color: colors.text }}
                >
                {formatCurrency(totalExpenses)}
                </Text>
            </Card>
        </View>
    )
}