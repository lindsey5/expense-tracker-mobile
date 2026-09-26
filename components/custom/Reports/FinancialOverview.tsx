import { View, Text } from "react-native"
import { CircleDollarSign } from "lucide-react-native"
import { formatCurrency } from "@/utils/utils"
import { useMemo } from "react";
import GradientCard from "@/components/ui/GradientCard";

type FinancialOverviewProps = {
    totalIncome: number;
    totalExpenses: number;
    isLoading: boolean;
}

function FinancialOverviewSkeleton() {
    return (
        <GradientCard>
            <View className="flex-row items-center">
                <View className="h-11 w-11 items-center justify-center rounded-2xl bg-white/20" />

                <View className="ml-3 flex-1">
                    <View className="h-3 w-20 rounded-full bg-white/20" />
                    <View className="mt-2 h-8 w-32 rounded-lg bg-white/20" />
                </View>
            </View>

            <View className="mt-6 flex-row">
                <View className="mr-3 flex-1">
                    <View className="h-3 w-12 rounded-full bg-white/20" />
                    <View className="mt-2 h-5 w-full rounded-lg bg-white/20" />
                </View>

                <View className="mr-3 flex-1">
                    <View className="h-3 w-16 rounded-full bg-white/20" />
                    <View className="mt-2 h-5 w-full rounded-lg bg-white/20" />
                </View>

                <View className="flex-1">
                    <View className="h-3 w-20 rounded-full bg-white/20" />
                    <View className="mt-2 h-5 w-full rounded-lg bg-white/20" />
                </View>
            </View>
        </GradientCard>
    );
}

export default function FinancialOverview({
    isLoading,
    totalExpenses,
    totalIncome
} : FinancialOverviewProps) {
    const netSavings = useMemo(() => totalIncome - totalExpenses, [totalExpenses, totalIncome]);
    const savingsRate = useMemo(() =>  (netSavings / totalIncome) * 100, [totalExpenses, totalIncome]);

    if (isLoading) {
        return <FinancialOverviewSkeleton />;
    }

    return (
            <GradientCard>
                <View className="flex-row items-center">
                    <View className="h-11 w-11 items-center justify-center rounded-2xl bg-white/20">
                    <CircleDollarSign
                        size={22}
                        color="#FFFFFF"
                    />
                    </View>

                    <View className="ml-3">
                    <Text className="text-sm text-white/70">
                        Net Savings
                    </Text>

                    <Text className="text-2xl font-bold text-white">
                        {formatCurrency(netSavings)}
                    </Text>
                    </View>
                </View>

                <View className="mt-6 flex-row">
                    <View className="flex-1">
                    <Text className="text-xs text-white/60">
                        Income
                    </Text>

                    <Text className="mt-1 text-base font-bold text-white">
                        {formatCurrency(totalIncome)}
                    </Text>
                    </View>

                    <View className="flex-1">
                    <Text className="text-xs text-white/60">
                        Expenses
                    </Text>

                    <Text className="mt-1 text-base font-bold text-white">
                        {formatCurrency(totalExpenses)}
                    </Text>
                    </View>

                    <View className="flex-1">
                    <Text className="text-xs text-white/60">
                        Savings Rate
                    </Text>

                    <Text className="mt-1 text-base font-bold text-white">
                        {savingsRate.toFixed(0)}%
                    </Text>
                    </View>
                </View>
            </GradientCard>
    )
}