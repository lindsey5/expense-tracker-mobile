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

  const [chartWidth, setChartWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) =>
    setChartWidth(e.nativeEvent.layout.width);

  const { totalIncome, totalExpense, net } = useMemo(() => {
    const income = monthlyData.reduce((sum, m) => sum + Number(m.income), 0);
    const expense = monthlyData.reduce((sum, m) => sum + Number(m.expense), 0);
    return { totalIncome: income, totalExpense: expense, net: income - expense };
  }, [monthlyData]);

  const isPositive = net >= 0;
  const netColor = isPositive ? INCOME_COLOR : NEGATIVE_COLOR;
  const NetIcon = isPositive ? TrendingUp : TrendingDown;

  // Grouped bars: income and expense side by side, so each bar reads on its own
  const { chartData, groupGap, maxValue } = useMemo(() => {
    const count = monthlyData.length || 1;
    const available = Math.max(chartWidth - Y_AXIS_WIDTH - 12, 0);
    const gap = Math.max(10, Math.floor((available - count * GROUP_WIDTH) / count));

    const highest = monthlyData.reduce(
      (max, m) => Math.max(max, Number(m.income), Number(m.expense)),
      0,
    );

    const data = monthlyData.flatMap((item) => [
      {
        value: Number(item.income),
        frontColor: INCOME_COLOR,
        spacing: INNER_GAP,
        label: MONTHS[Number(item.month) - 1] ?? "",
        labelWidth: GROUP_WIDTH + 8,
        labelTextStyle: {
          color: colors.icon,
          fontSize: 10,
          textAlign: "center" as const,
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
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center">
          <View
            className="h-10 w-10 items-center justify-center rounded-xl"
            style={{ backgroundColor: colors.surfaceTint }}
          >
            <BarChart3 size={20} color={colors.tint} />
          </View>

          <View className="ml-3">
            <Text
              className="text-lg font-bold"
              style={{ color: colors.text }}
            >
              Monthly trend
            </Text>
            <Text className="text-xs" style={{ color: colors.icon }}>
              Income vs expenses
            </Text>
          </View>
        </View>

        {!isLoading && monthlyData.length > 0 && (
          <View
            className="flex-row items-center rounded-full px-2.5 py-1.5"
            style={{ backgroundColor: `${netColor}1F` }}
          >
            <NetIcon size={13} color={netColor} />
            <Text
              className="ml-1 text-xs font-semibold"
              style={{ color: netColor }}
            >
              {money(net)}
            </Text>
          </View>
        )}
      </View>

      {/* Totals double as the legend */}
      <View className="mt-5 flex-row gap-3">
        <StatTile
          label="Income"
          amount={totalIncome}
          dotColor={INCOME_COLOR}
          borderColor={colors.border}
          backgroundColor={colors.panel}
          textColor={colors.text}
          mutedColor={colors.icon}
        />
        <StatTile
          label="Expenses"
          amount={totalExpense}
          dotColor={colors.tint}
          borderColor={colors.border}
          backgroundColor={colors.panel}
          textColor={colors.text}
          mutedColor={colors.icon}
        />
      </View>

      {/* Chart */}
      <View className="mt-6" onLayout={onLayout}>
        {isLoading ? (
          <View
            className="items-center justify-center rounded-2xl"
            style={{
              height: CHART_HEIGHT + 30,
              backgroundColor: colors.skeleton,
              opacity: 0.5,
            }}
          >
            <Text style={{ color: colors.icon }}>Loading trend…</Text>
          </View>
        ) : monthlyData.length === 0 ? (
          <View
            className="items-center justify-center rounded-2xl px-6"
            style={{
              height: CHART_HEIGHT + 30,
              backgroundColor: colors.panel,
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: colors.border,
            }}
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