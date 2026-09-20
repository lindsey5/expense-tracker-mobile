import Card from '@/components/ui/Card';
import { Colors } from '@/constants/theme';
import { formatCurrency } from '@/utils/utils';
import { Text, useColorScheme, View } from 'react-native';

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
      <View className="mt-1 flex-row gap-3">
        <SummarySkeleton />
        <SummarySkeleton />
      </View>
    );
  }

  return (
    <View className="mt-1 flex-row gap-3">
      {/* Income */}
      <Card className="flex-1" variant='surfaceTint'>
        <Text
          className="mb-3 text-xs font-semibold"
          style={{ color: colors.icon }}
        >
          Income
        </Text>

        <Text
          className="text-xl font-bold tracking-tight"
          style={{ color: colors.text }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {formatCurrency(totalIncome)}
        </Text>

        {incomeHasPreviousMonth && (
          <Text
            className="mt-2 text-[10px] font-medium"
            style={{
              color: incomeChange >= 0 ? '#16A34A' : '#DC2626',
            }}
            numberOfLines={1}
          >
            {incomeChange >= 0 ? '+' : ''}
            {incomeChange}% vs last month
          </Text>
        )}
      </Card>

      {/* Expenses */}
      <Card className="flex-1" variant='surfaceTint'>
        <Text
          className="mb-3 text-xs font-semibold"
          style={{ color: colors.icon }}
        >
          Expenses
        </Text>

        <Text
          className="text-xl font-bold tracking-tight"
          style={{ color: colors.text }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {formatCurrency(totalExpenses)}
        </Text>

        {expenseHasPreviousMonth && (
          <Text
            className="mt-2 text-[10px] font-medium"
            style={{
              color: expenseChange <= 0 ? '#16A34A' : '#DC2626',
            }}
            numberOfLines={1}
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
    <Card className="flex-1 rounded-[24px] border p-4">
      <View
        className="mb-3 h-3 w-14 rounded-full"
        style={{ backgroundColor: colors.border }}
      />

      <View
        className="h-8 w-28 max-w-full rounded-lg"
        style={{ backgroundColor: colors.border }}
      />

      <View
        className="mt-3 h-3 w-24 max-w-full rounded-full"
        style={{ backgroundColor: colors.border }}
      />
    </Card>
  );
}