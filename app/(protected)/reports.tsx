import { useMemo } from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import DateFilter from '@/components/custom/DateFilter';
import useGetIncomes from '@/hooks/transaction/use-get-incomes.hook';
import useGetExpenses from '@/hooks/transaction/use-get-expenses.hook';
import FinancialOverview from '@/components/custom/Reports/FinancialOverview';
import { useQuery } from '@/hooks/useQuery';
import useGetBudgets, { GetBudgetsQueryParams } from '@/hooks/budget/use-get-budgets.hook';
import SpendingSummary from '@/components/custom/Reports/SpendingSummary';
import useGetMonthlyTransactions from '@/hooks/transaction/use-get-monthly-transaction.hook';
import MonthlyData from '@/components/custom/Reports/MonthlyData';

export default function Reports() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];
  const { query } = useQuery<GetBudgetsQueryParams>();

  const { data: getBudgetsData, isLoading: isGetBudgetsLoading, refetch: getBudgetsRefetch } = useGetBudgets(query);
  const { data: expensesData, isLoading: isExpensesLoading, refetch: expenseRefetch } = useGetExpenses({});
  const { data: incomesData, isLoading: isIncomesLoading, refetch: incomeRefetch } = useGetIncomes({});
  const { data: monthlyData, isLoading: isMonthlyDataLoading, refetch: monthlyDataRefetch } = useGetMonthlyTransactions();

  const totalExpenses = useMemo(() => expensesData?.amount || 0, [expensesData]);
  const totalIncome = useMemo(() => incomesData?.amount || 0, [incomesData]);

  const handleRefresh = () => {
    getBudgetsRefetch();
    expenseRefetch();
    incomeRefetch();
    monthlyDataRefetch();
  }

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={
              isGetBudgetsLoading || isGetBudgetsLoading
            }
            onRefresh={handleRefresh}
            tintColor={colors.tint}
          />
        }
      >
        <View className="px-5 pt-14">
          {/* Header */}
          <View className="mb-6">
            <Text
              className="text-2xl font-bold"
              style={{ color: colors.text }}
            >
              Reports
            </Text>

            <Text
              className="mt-1 text-sm"
              style={{ color: colors.icon }}
            >
              Understand your finances
            </Text>
          </View>

          {/* Month Selector */}
          <DateFilter url='/budget/months'/>

          {/* Financial Overview */}
          <FinancialOverview 
            isLoading={isExpensesLoading || isIncomesLoading} 
            totalExpenses={totalExpenses} 
            totalIncome={totalIncome}
          />

          {/* Monthly Trend */}
          <MonthlyData 
            isLoading={isMonthlyDataLoading}
            monthlyData={monthlyData ?? []}
          />

          <SpendingSummary 
            budgets={getBudgetsData?.budgets ?? []}
            totalExpenses={totalExpenses}
            isLoading={isGetBudgetsLoading}
          />

          {/* Report Footer */}
          <View className="mt-6 items-center">
            <Text
              className="text-xs"
              style={{ color: colors.icon }}
            >
              Report generated for 
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}