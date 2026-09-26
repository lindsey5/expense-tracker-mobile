import { Colors } from "@/constants/theme";
import { schemas } from "@/lib/api/openapi";
import { BarChart3 } from "lucide-react-native";
import { useMemo } from "react";
import { View, Text, useColorScheme } from "react-native";
import z from "zod";
import { BarChart } from "react-native-gifted-charts";

type MonthlyDataProps = {
  monthlyData: z.infer<
    typeof schemas.GetMonthlyTransactionsResponseDto
  >[];
  isLoading: boolean;
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MonthlyData({
  isLoading,
  monthlyData,
}: MonthlyDataProps) {
  const colorScheme = useColorScheme() === "dark" ? "dark" : "light";

  const colors = Colors[colorScheme];

  const chartData = useMemo(() => {
    return monthlyData.flatMap((item) => {
      const monthLabel =
        MONTHS[Number(item.month) - 1] ?? "";

      return [
        // Income
        {
          value: Number(item.income),
          label: monthLabel,
          frontColor: "#22C55E",

          // Small gap between income and expense
          spacing: 3,

          labelTextStyle: {
            color: colors.icon,
            fontSize: 10,
            width: 30,
            textAlign: "center" as const,
          },
        },

        // Expense
        {
          value: Number(item.expense),
          frontColor: colors.tint,

          // Large gap before the next month
          spacing: 25,
        },
      ];
    });
  }, [monthlyData, colors]);

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
            Monthly Trend
          </Text>

          <Text
            className="mt-1 text-xs"
            style={{
              color: colors.icon,
            }}
          >
            Income vs expenses
          </Text>
        </View>

        <BarChart3
          size={21}
          color={colors.tint}
        />
      </View>

      {/* Chart */}
      <View className="mt-6">
        {isLoading ? (
          <View className="h-[180px] items-center justify-center">
            <Text
              style={{
                color: colors.icon,
              }}
            >
              Loading...
            </Text>
          </View>
        ) : monthlyData.length === 0 ? (
          <View className="h-[180px] items-center justify-center">
            <Text
              style={{
                color: colors.icon,
              }}
            >
              No transaction data
            </Text>
          </View>
        ) : (
          <BarChart
            data={chartData}
            height={150}
            barWidth={10}

            // Space before the first month
            initialSpacing={10}

            // Space after the last month
            endSpacing={10}

            roundedTop
            hideRules

            yAxisThickness={0}
            xAxisThickness={0}

            yAxisTextStyle={{
              color: colors.icon,
              fontSize: 9,
            }}

            xAxisLabelTextStyle={{
              color: colors.icon,
              fontSize: 10,
            }}

            noOfSections={4}

            isAnimated
            animationDuration={500}

            disablePress
          />
        )}
      </View>

      {/* Legend */}
      <View className="mt-5 flex-row gap-5">
        {/* Income */}
        <View className="flex-row items-center">
          <View className="h-2.5 w-2.5 rounded-full bg-green-500" />

          <Text
            className="ml-2 text-xs"
            style={{
              color: colors.icon,
            }}
          >
            Income
          </Text>
        </View>

        {/* Expenses */}
        <View className="flex-row items-center">
          <View
            className="h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor: colors.tint,
            }}
          />

          <Text
            className="ml-2 text-xs"
            style={{
              color: colors.icon,
            }}
          >
            Expenses
          </Text>
        </View>
      </View>
    </View>
  );
}