import Skeleton from "@/components/ui/Skeleton";
import { Colors } from "@/constants/theme";
import { GetRecentTransactionsResponse } from "@/hooks/transaction/use-get-recent-transaction.hook";
import { formatCurrency, formatDateOnly } from "@/utils/utils";
import { useRouter } from "expo-router";
import { ArrowDownLeft, ArrowUpRight, ChevronRight } from "lucide-react-native";
import { View, TouchableOpacity, Text, useColorScheme } from "react-native";

type RecentTransactionsProps = {
    recentTransactions: GetRecentTransactionsResponse;
    isLoading: boolean;
};

function RecentTransactionsSkeleton() {
    const colorScheme = useColorScheme() === "dark" ? "dark" : "light";
    const colors = Colors[colorScheme];

    return (
        <View className="mt-7">
            {/* Header */}
            <View className="mb-3 flex-row items-center justify-between">
                <Text
                    className="text-lg font-bold"
                    style={{ color: colors.text }}
                >
                    Recent Transactions
                </Text>

                <View className="flex-row items-center">
                    <Skeleton
                        width={45}
                        height={14}
                        className="rounded-md"
                    />
                    <ChevronRight size={16} color={colors.border} />
                </View>
            </View>

            {/* Card */}
            <View
                className="overflow-hidden rounded-[24px] border"
                style={{
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                }}
            >
                {[1, 2, 3, 4, 5].map((item, index) => (
                    <View
                        key={item}
                        className="flex-row items-center px-4 py-4"
                        style={{
                            borderBottomWidth: index === 4 ? 0 : 1,
                            borderBottomColor: colors.border,
                        }}
                    >
                        {/* Icon */}
                        <Skeleton
                            width={44}
                            height={44}
                            className="rounded-2xl"
                        />

                        {/* Transaction details */}
                        <View className="ml-3 flex-1">
                            <Skeleton
                                width={120}
                                height={14}
                                className="rounded-md"
                            />

                            <Skeleton
                                width={105}
                                height={10}
                                className="mt-2 rounded-full"
                            />
                        </View>

                        {/* Amount */}
                        <Skeleton
                            width={75}
                            height={14}
                            className="rounded-md"
                        />
                    </View>
                ))}
            </View>
        </View>
    );
}

export default function RecentTransactions({
    isLoading,
    recentTransactions,
}: RecentTransactionsProps) {
    const router = useRouter();

    const colorScheme = useColorScheme() === "dark" ? "dark" : "light";

    const colors = Colors[colorScheme];

    if (isLoading) {
        return <RecentTransactionsSkeleton />;
    }

    return (
        <View className="mt-7">
            <View className="mb-3 flex-row items-center justify-between">
                <Text
                    className="text-lg font-bold"
                    style={{ color: colors.text }}
                >
                    Recent Transactions
                </Text>

                <TouchableOpacity className="flex-row items-center" onPress={() => router.push('/transactions')}>
                    <Text
                        className="mr-1 text-sm font-semibold"
                        style={{ color: colors.tint }}
                    >
                        See all
                    </Text>

                    <ChevronRight size={16} color={colors.tint} />
                </TouchableOpacity>
            </View>

            <View
                className="overflow-hidden rounded-[24px] border"
                style={{
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                }}
            >
                {recentTransactions.map((transaction, index) => {
                    const isIncome = transaction.amount > 0;

                    return (
                        <TouchableOpacity
                            key={transaction.id}
                            activeOpacity={0.8}
                            className="flex-row items-center px-4 py-4"
                            style={{
                                borderBottomWidth:
                                    index === recentTransactions.length - 1
                                        ? 0
                                        : 1,
                                borderBottomColor: colors.border,
                            }}
                        >
                            <View
                                className="h-11 w-11 items-center justify-center rounded-2xl"
                                style={{
                                    backgroundColor: isIncome
                                        ? "#DCFCE7"
                                        : "#FEE2E2",
                                }}
                            >
                                {isIncome ? (
                                    <ArrowDownLeft
                                        size={19}
                                        color="#16A34A"
                                    />
                                ) : (
                                    <ArrowUpRight
                                        size={19}
                                        color="#DC2626"
                                    />
                                )}
                            </View>

                            <View className="ml-3 flex-1">
                                <Text
                                    className="text-sm font-semibold"
                                    style={{ color: colors.text }}
                                >
                                    {transaction.title}
                                </Text>

                                <Text
                                    className="mt-1 text-xs"
                                    style={{ color: colors.icon }}
                                >
                                    {transaction.category} · {formatDateOnly(transaction.date)}
                                </Text>
                            </View>

                            <Text
                                className="text-sm font-bold"
                                style={{
                                    color: isIncome
                                        ? "#16A34A"
                                        : colors.text,
                                }}
                            >
                                {isIncome ? "+" : "-"}
                                {formatCurrency(
                                    Math.abs(transaction.amount)
                                )}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}