import { View, Text, useColorScheme } from "react-native";
import { formatCurrency } from "@/utils/utils";
import { Colors } from "@/constants/theme";
import { AlertTriangle, PieChart, Wallet } from "lucide-react-native";
import { Budget } from "@/types/budget.type";
import { getBudgetStatus } from "../Budget/BudgetList";

type SpendingSummaryProps = {
    totalExpenses: number;
    budgets: Budget[];
    isLoading?: boolean;
};

function SpendingSummarySkeleton() {
    const colorScheme =
        useColorScheme() === "dark" ? "dark" : "light";

    const colors = Colors[colorScheme];

    return (
        <View
            className="mt-5 rounded-3xl border p-5"
            style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
            }}
        >
            {/* Header */}
            <View className="flex-row items-center justify-between">
                <View>
                    <View
                        className="h-5 w-36 rounded-full"
                        style={{
                            backgroundColor: colors.soft,
                        }}
                    />

                    <View
                        className="mt-2 h-3 w-28 rounded-full"
                        style={{
                            backgroundColor: colors.soft,
                        }}
                    />
                </View>

                <View
                    className="h-9 w-9 rounded-xl"
                    style={{
                        backgroundColor: colors.soft,
                    }}
                />
            </View>

            {/* Spending Circle */}
            <View className="mt-6 items-center">
                <View
                    className="h-44 w-44 items-center justify-center rounded-full"
                    style={{
                        borderWidth: 25,
                        borderColor: colors.soft,
                    }}
                >
                    {/* Total amount */}
                    <View
                        className="h-5 w-24 rounded-full"
                        style={{
                            backgroundColor: colors.soft,
                        }}
                    />

                    {/* Total spent */}
                    <View
                        className="mt-2 h-3 w-16 rounded-full"
                        style={{
                            backgroundColor: colors.soft,
                        }}
                    />
                </View>
            </View>

            {/* Budget Cards */}
            <View className="mt-7 gap-4">
                {[0, 1, 2].map((item) => (
                    <View
                        key={item}
                        className="rounded-[24px] border p-4"
                        style={{
                            backgroundColor: colors.card,
                            borderColor: colors.border,
                        }}
                    >
                        {/* Card Header */}
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center">
                                {/* Icon */}
                                <View
                                    className="h-11 w-11 rounded-2xl"
                                    style={{
                                        backgroundColor: colors.soft,
                                    }}
                                />

                                {/* Category + Amount */}
                                <View className="ml-3">
                                    <View
                                        className="h-4 w-24 rounded-full"
                                        style={{
                                            backgroundColor: colors.soft,
                                        }}
                                    />

                                    <View
                                        className="mt-2 h-3 w-32 rounded-full"
                                        style={{
                                            backgroundColor: colors.soft,
                                        }}
                                    />
                                </View>
                            </View>

                            {/* Status */}
                            <View
                                className="h-6 w-16 rounded-full"
                                style={{
                                    backgroundColor: colors.soft,
                                }}
                            />
                        </View>

                        {/* Progress */}
                        <View className="mt-5">
                            <View
                                className="h-2.5 w-full overflow-hidden rounded-full"
                                style={{
                                    backgroundColor: colors.soft,
                                }}
                            >
                                <View
                                    className="h-full w-[60%] rounded-full"
                                    style={{
                                        backgroundColor: colors.border,
                                    }}
                                />
                            </View>

                            {/* Percentage + Remaining */}
                            <View className="mt-2 flex-row items-center justify-between">
                                <View
                                    className="h-3 w-16 rounded-full"
                                    style={{
                                        backgroundColor: colors.soft,
                                    }}
                                />

                                <View
                                    className="h-3 w-20 rounded-full"
                                    style={{
                                        backgroundColor: colors.soft,
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}

export default function SpendingSummary({
    budgets,
    totalExpenses,
    isLoading = false,
}: SpendingSummaryProps) {
    const colorScheme =
        useColorScheme() === "dark" ? "dark" : "light";

    const colors = Colors[colorScheme];

    if (isLoading) {
        return <SpendingSummarySkeleton />;
    }

    return (
        <View
            className="mt-5 rounded-3xl border p-5"
            style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
            }}
        >
            {/* Header */}
            <View className="flex-row items-center justify-between">
                <View>
                    <Text
                        className="text-lg font-bold"
                        style={{
                            color: colors.text,
                        }}
                    >
                        Spending Breakdown
                    </Text>

                    <Text
                        className="mt-1 text-xs"
                        style={{
                            color: colors.icon,
                        }}
                    >
                        Where your money goes
                    </Text>
                </View>

                <PieChart
                    size={22}
                    color={colors.tint}
                />
            </View>

            {/* Spending Circle */}
            <View className="mt-6 items-center">
                <View
                    className="h-44 w-44 items-center justify-center rounded-full"
                    style={{
                        borderWidth: 25,
                        borderColor: colors.tint,
                    }}
                >
                    <Text
                        className="text-xl font-bold"
                        style={{
                            color: colors.text,
                        }}
                    >
                        {formatCurrency(totalExpenses)}
                    </Text>

                    <Text
                        className="mt-1 text-xs"
                        style={{
                            color: colors.icon,
                        }}
                    >
                        Total spent
                    </Text>
                </View>
            </View>

            {/* Budget List */}
            <View className="mt-7 gap-4">
                {budgets.map((budget) => {
                    const status = getBudgetStatus(budget);

                    const budgetColor =
                        typeof budget.color === "string" &&
                        budget.color
                            ? budget.color
                            : "#8B5CF6";

                    const progressColor: string =
                        budget.percentage >= 100
                            ? "#EF4444"
                            : budget.percentage >= 80
                              ? "#F59E0B"
                              : budgetColor;

                    return (
                        <View
                            key={budget.id}
                            className="rounded-[24px] border p-4"
                            style={{
                                backgroundColor: colors.card,
                                borderColor: colors.border,
                            }}
                        >
                            {/* Budget Header */}
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    <View
                                        className="h-11 w-11 items-center justify-center rounded-2xl"
                                        style={{
                                            backgroundColor: `${budgetColor}20`,
                                        }}
                                    >
                                        <Wallet
                                            size={20}
                                            color={colors.accent}
                                        />
                                    </View>

                                    <View className="ml-3">
                                        <Text
                                            className="font-bold"
                                            style={{
                                                color: colors.text,
                                            }}
                                        >
                                            {budget.category}
                                        </Text>

                                        <Text
                                            className="mt-1 text-xs"
                                            style={{
                                                color: colors.icon,
                                            }}
                                        >
                                            {formatCurrency(
                                                budget.spent,
                                            )}{" "}
                                            of{" "}
                                            {formatCurrency(
                                                budget.amount,
                                            )}
                                        </Text>
                                    </View>
                                </View>

                                {/* Status */}
                                <View
                                    className="rounded-full px-2.5 py-1"
                                    style={{
                                        backgroundColor:
                                            status.background,
                                    }}
                                >
                                    <Text
                                        className="text-[10px] font-bold"
                                        style={{
                                            color: status.text,
                                        }}
                                    >
                                        {status.label}
                                    </Text>
                                </View>
                            </View>

                            {/* Progress */}
                            <View className="mt-5">
                                <View
                                    className="h-2.5 overflow-hidden rounded-full"
                                    style={{
                                        backgroundColor:
                                            colors.soft,
                                    }}
                                >
                                    <View
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${Math.min(
                                                budget.percentage,
                                                100,
                                            )}%`,
                                            backgroundColor:
                                                progressColor,
                                        }}
                                    />
                                </View>

                                <View className="mt-2 flex-row items-center justify-between">
                                    <Text
                                        className="text-xs"
                                        style={{
                                            color: colors.icon,
                                        }}
                                    >
                                        {budget.percentage.toFixed(
                                            0,
                                        )}
                                        % used
                                    </Text>

                                    <Text
                                        className="text-xs font-semibold"
                                        style={{
                                            color:
                                                budget.remaining < 0
                                                    ? "#DC2626"
                                                    : colors.text,
                                        }}
                                    >
                                        {budget.remaining >= 0
                                            ? `${formatCurrency(
                                                  budget.remaining,
                                              )} left`
                                            : `${formatCurrency(
                                                  Math.abs(
                                                      budget.remaining,
                                                  ),
                                              )} over`}
                                    </Text>
                                </View>
                            </View>

                            {/* Warning */}
                            {budget.percentage >= 80 && (
                                <View
                                    className="mt-4 flex-row items-center rounded-xl px-3 py-2.5"
                                    style={{
                                        backgroundColor:
                                            budget.percentage >= 100
                                                ? "#FEF2F2"
                                                : "#FFFBEB",
                                    }}
                                >
                                    <AlertTriangle
                                        size={15}
                                        color={
                                            budget.percentage >=
                                            100
                                                ? "#DC2626"
                                                : "#D97706"
                                        }
                                    />

                                    <Text
                                        className="ml-2 flex-1 text-xs"
                                        style={{
                                            color:
                                                budget.percentage >=
                                                100
                                                    ? "#B91C1C"
                                                    : "#B45309",
                                        }}
                                    >
                                        {budget.percentage >= 100
                                            ? "You have exceeded this budget."
                                            : "You are close to reaching this budget."}
                                    </Text>
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>
        </View>
    );
}