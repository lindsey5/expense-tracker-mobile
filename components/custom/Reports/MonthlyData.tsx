import { Colors } from "@/constants/theme";
import Card from "@/components/ui/Card";
import { schemas } from "@/lib/api/openapi";
import { BarChart3, TrendingDown, TrendingUp } from "lucide-react-native";
import { useMemo, useState } from "react";
import { View, Text, useColorScheme, LayoutChangeEvent } from "react-native";
import z from "zod";
import { BarChart } from "react-native-gifted-charts";

type MonthlyDataProps = {
  monthlyData: z.infer<typeof schemas.GetMonthlyTransactionsResponseDto>[];
  isLoading: boolean;
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Change to match your app's currency
const CURRENCY = "₱";
const INCOME_COLOR = "#22C55E";
const NEGATIVE_COLOR = "#EF4444";

const BAR_WIDTH = 12;
const INNER_GAP = 4;
const GROUP_WIDTH = BAR_WIDTH * 2 + INNER_GAP;
const Y_AXIS_WIDTH = 34;
const CHART_HEIGHT = 150;

const compact = (value: number) => {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `${+(value / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${+(value / 1_000).toFixed(1)}k`;
  return `${Math.round(value)}`;
};

const money = (value: number) =>
  `${value < 0 ? "-" : ""}${CURRENCY}${Math.abs(value).toLocaleString(
    undefined,
    { maximumFractionDigits: 0 },
  )}`;

function StatTile({
  label,
  amount,
  dotColor,
  borderColor,
  backgroundColor,
  textColor,
  mutedColor,
}: {
  label: string;
  amount: number;
  dotColor: string;
  borderColor: string;
  backgroundColor: string;
  textColor: string;
  mutedColor: string;
}) {
  return (
    <View
      className="flex-1 rounded-2xl px-3.5 py-3"
      style={{ backgroundColor, borderWidth: 1, borderColor }}
    >
      <View className="flex-row items-center">
        <View
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
        <Text className="ml-2 text-xs" style={{ color: mutedColor }}>
          {label}
        </Text>
      </View>

      <Text
        className="mt-1.5 text-base font-bold"
        style={{ color: textColor }}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {money(amount)}
      </Text>
    </View>
  );
}

export default function MonthlyData({
  isLoading,
  monthlyData,
}: MonthlyDataProps) {
  const colorScheme = useColorScheme() === "dark" ? "dark" : "light";
  const colors = Colors[colorScheme];

  const chartData = useMemo(() => {
    return monthlyData.flatMap((item) => {
      const monthLabel = MONTHS[Number(item.month) - 1] ?? "";

      return [
        {
          value: Number(item.income),
          label: monthLabel,
          frontColor: "#22C55E",
          spacing: 3,
          labelTextStyle: {
            color: colors.icon,
            fontSize: 10,
            width: 30,
            textAlign: "center" as const,
          },
        },
        {
          value: Number(item.expense),
          frontColor: colors.tint,
          spacing: 25,
        },
      },
      {
        value: Number(item.expense),
        frontColor: colors.tint,
        spacing: gap,
      },
    ]);

    return { chartData: data, groupGap: gap, maxValue: highest * 1.15 || 100 };
  }, [monthlyData, chartWidth, colors.icon, colors.tint]);

  return (
    <Card className="mt-5">
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <View>
          <Text
            className="text-lg font-bold"
            style={{ color: colors.text }}
          >
            Monthly Trend
          </Text>
          <Text
            className="mt-1 text-xs"
            style={{ color: colors.icon }}
          >
            Income vs expenses
          </Text>
        </View>
        <BarChart3 size={21} color={colors.tint} />
      </View>

      {/* Chart */}
      <View className="mt-6 min-w-full">
        {isLoading ? (
          <View className="h-[180px] items-center justify-center">
            <Text style={{ color: colors.icon }}>
              Loading...
            </Text>
          </View>
        ) : monthlyData.length === 0 ? (
          <View className="h-[180px] items-center justify-center">
            <Text style={{ color: colors.icon }}>
              No transaction data
            </Text>
          </View>
        ) : (
          <BarChart
            data={chartData}
            height={150}
            barWidth={10}
            initialSpacing={10}
            endSpacing={10}
            roundedTop
            hideRules={false}
            rulesColor={colors.border}
            rulesType="solid"
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
        <View className="flex-row items-center">
          <View className="h-2.5 w-2.5 rounded-full bg-green-500" />
          <Text
            className="ml-2 text-xs"
            style={{ color: colors.icon }}
          >
            Income
          </Text>
        </View>

        <View className="flex-row items-center">
          <View
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: colors.tint }}
          />
          <Text
            className="ml-2 text-xs"
            style={{ color: colors.icon }}
          >
            <Text
              className="text-sm font-semibold"
              style={{ color: colors.text }}
            >
              No transactions yet
            </Text>
            <Text
              className="mt-1 text-center text-xs"
              style={{ color: colors.icon }}
            >
              Add an income or expense to see your monthly trend.
            </Text>
          </View>
        ) : (
          chartWidth > 0 && (
            <BarChart
              data={chartData}
              width={chartWidth - Y_AXIS_WIDTH - 8}
              height={CHART_HEIGHT}
              maxValue={maxValue}
              noOfSections={4}
              barWidth={BAR_WIDTH}
              spacing={groupGap}
              initialSpacing={10}
              endSpacing={4}
              barBorderTopLeftRadius={6}
              barBorderTopRightRadius={6}
              rulesType="dashed"
              dashWidth={4}
              dashGap={5}
              rulesColor={colors.border}
              yAxisThickness={0}
              xAxisThickness={1}
              xAxisColor={colors.border}
              yAxisLabelWidth={Y_AXIS_WIDTH}
              formatYLabel={(label: string) => compact(Number(label))}
              yAxisTextStyle={{ color: colors.icon, fontSize: 10 }}
              isAnimated
              animationDuration={500}
              disablePress
              disableScroll
            />
          )
        )}
      </View>
    </Card>
  );
}