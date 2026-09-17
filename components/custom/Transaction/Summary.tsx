import Card from '@/components/ui/Card';
import { Colors } from '@/constants/theme';
import { formatCurrency } from '@/utils/utils';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react-native';
import { View, Text, useColorScheme } from 'react-native';

type SummaryProps = {
  totalIncome: number;
  incomeChange: number;
  totalExpenses: number;
  expenseChange: number;
  incomeHasPreviousMonth: boolean;
  expenseHasPreviousMonth: boolean;
  isLoading: boolean;
};

export default function Summary({
  expenseChange,
  incomeChange,
  totalExpenses,
  totalIncome,
  isLoading,
  expenseHasPreviousMonth,
  incomeHasPreviousMonth,
}: SummaryProps) {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  if (isLoading) {
    return (
      <View className="mt-1 gap-3">
        <SummarySkeleton />
        <SummarySkeleton />
      </View>
    );
  }

  return (
    <View className="mt-1 gap-3">
      <Card className="rounded-[24px] border p-4">
        <View className="mb-4 flex-row items-center">
          <View className="h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100">
            <ArrowDownLeft size={16} color="#16A34A" />
          </View>

          <Text
            className="ml-3 text-xs font-semibold"
            style={{ color: colors.icon }}
          >
            Income
          </Text>
        </View>

        <Text
          className="text-[26px] font-bold tracking-tight"
          style={{ color: colors.text }}
        >
          {formatCurrency(totalIncome)}
        </Text>

        {incomeHasPreviousMonth && (
          <Text
            className="mt-2 text-[10px] font-medium"
            style={{
              color: incomeChange >= 0 ? '#16A34A' : '#DC2626',
            }}
          >
            {incomeChange >= 0 ? '+' : ''}
            {incomeChange}% vs last month
          </Text>
        )}
      </Card>

      <Card className="rounded-[24px] border p-4">
        <View className="mb-4 flex-row items-center">
          <View className="h-10 w-10 items-center justify-center rounded-2xl bg-rose-100">
            <ArrowUpRight size={16} color="#DC2626" />
          </View>

          <Text
            className="ml-3 text-xs font-semibold"
            style={{ color: colors.icon }}
          >
            Expenses
          </Text>
        </View>

        <Text
          className="text-[26px] font-bold tracking-tight"
          style={{ color: colors.text }}
        >
          {formatCurrency(totalExpenses)}
        </Text>

        {expenseHasPreviousMonth && (
          <Text
            className="mt-2 text-[10px] font-medium"
            style={{
              color: expenseChange <= 0 ? '#16A34A' : '#DC2626',
            }}
          >
            {expenseChange >= 0 ? '+' : ''}
            {expenseChange}% vs last month
          </Text>
        )}
      </Card>
    </View>
  );
}

function SummarySkeleton() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  return (
    <Card className="rounded-[24px] border p-4">
      <View className="mb-4 flex-row items-center">
        <View
          className="h-10 w-10 rounded-2xl"
          style={{ backgroundColor: colors.border }}
        />

        <View
          className="ml-3 h-3 w-12 rounded-full"
          style={{ backgroundColor: colors.border }}
        />
      </View>

      <View
        className="h-8 w-28 rounded-lg"
        style={{ backgroundColor: colors.border }}
      />

      <View
        className="mt-3 h-3 w-24 rounded-full"
        style={{ backgroundColor: colors.border }}
      />
    </Card>
  );
}