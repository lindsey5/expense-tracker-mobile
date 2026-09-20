import {
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import DateFilter from '@/components/custom/DateFilter';
import Tabs from '@/components/ui/Tabs';
import useGetBudgets, {
  GetBudgetsQueryParams,
} from '@/hooks/budget/use-get-budgets.hook';
import useGetMonthlyBudgets, {
  GetMonthlyBudgetsQueryParams,
} from '@/hooks/budget/use-get-monthly-budget.hook';
import { useQuery } from '@/hooks/useQuery';
import BudgetList from '@/components/custom/Budget/BudgetList';
import CreateBudget from '@/components/custom/Budget/CreateBudget';
import BudgetSummary from '@/components/custom/Budget/BudgetSummary';
import { useState } from 'react';

type BudgetStatus = NonNullable<
  GetBudgetsQueryParams['status']
>;

type BudgetFilter = BudgetStatus | 'all';

type StatusFilter = {
  label: string;
  value: BudgetFilter;
};

const STATUS_FILTERS: StatusFilter[] = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'On Track',
    value: 'ON_TRACK',
  },
  {
    label: 'Warning',
    value: 'WARNING',
  },
  {
    label: 'Exceeded',
    value: 'EXCEEDED',
  },
];

export default function Budgets() {
  const colorScheme =
    useColorScheme() === 'dark' ? 'dark' : 'light';

  const colors = Colors[colorScheme];

  const [filter, setFilter] =
    useState<BudgetFilter>('all');

  const { query, pushQuery } =
    useQuery<GetBudgetsQueryParams>();

  const {
    data: getBudgetsData,
    isLoading: isGetBudgetsLoading,
    refetch: getBudgetsRefetch,
  } = useGetBudgets(query);

  const monthlyBudgetParams: GetMonthlyBudgetsQueryParams = {
    month:
      query.month !== undefined
        ? Number(query.month)
        : undefined,
    year:
      query.year !== undefined
        ? Number(query.year)
        : undefined,
  };

  const {
    data: getMonthlyBudgetData,
    isLoading: isGetMonthlyBudgetLoading,
    refetch: getMonthBudgetRefetch,
  } = useGetMonthlyBudgets(monthlyBudgetParams);

  const setStatus = (value: BudgetFilter) => {
    setFilter(value);

    pushQuery({
      status:
        value === 'all'
          ? undefined
          : value,
    });
  };

  const handleRefresh = () => {
    void getBudgetsRefetch();
    void getMonthBudgetRefetch();
  }

  const onSuccess = () => void handleRefresh();

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor: colors.background,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 110,
        }}
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
        <View className="px-5">
          <View className="mb-6">
            <Text
              className="text-[30px] font-bold tracking-tight"
              style={{ color: colors.text }}
            >
              Budgets
            </Text>

            <Text
              className="mt-1 text-sm"
              style={{ color: colors.icon }}
            >
              Manage your monthly spending
            </Text>
          </View>

          <DateFilter url="/budget/months" />

          <BudgetSummary
            isLoading={isGetMonthlyBudgetLoading}
            data={getMonthlyBudgetData}
          />

          <View>
            <Tabs
              activeTab={filter}
              setActiveTab={(value) =>
                setStatus(value as BudgetFilter)
              }
              tabs={STATUS_FILTERS}
            />
          </View>

          <View className="mb-3 flex-row items-center justify-between">
            <View>
              <Text
                className="text-lg font-bold"
                style={{ color: colors.text }}
              >
                Budgets By Category
              </Text>

              <Text
                className="mt-1 text-xs"
                style={{ color: colors.icon }}
              >
                {getBudgetsData?.budgets.length ?? 0}{' '}
                budget
                {getBudgetsData?.budgets.length !== 1
                  ? 's'
                  : ''}
              </Text>
            </View>

            <CreateBudget onSuccess={onSuccess} />
          </View>

          <BudgetList
            budgets={getBudgetsData?.budgets ?? []}
            isLoading={isGetBudgetsLoading}
          />
        </View>
      </ScrollView>
    </View>
  );
}