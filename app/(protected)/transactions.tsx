import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import Header from '@/components/custom/Header';
import Summary from '@/components/custom/Transaction/Summary';
import SearchField from '@/components/ui/SearchField';
import Tabs from '@/components/ui/Tabs';
import TransactionList from '@/components/custom/Transaction/TransactionList';
import { useQuery } from '@/hooks/useQuery';
import useGetTransactions, {
  GetTransactionsParams,
} from '@/hooks/transaction/use-get-transactions.hook';
import { useDebounce } from '@/hooks/useDebounce';
import {
  ExpenseCategories,
  IncomeCategories,
  TransactionCategories,
  TransactionTypeOptions,
} from '@/constants/transaction';
import Select from '@/components/ui/Select';
import CreateTransaction from '@/components/custom/Transaction/CreateTransaction';
import DateFilter from '@/components/custom/DateFilter';
import useGetExpenses from '@/hooks/transaction/use-get-expenses.hook';
import useGetIncomes from '@/hooks/transaction/use-get-incomes.hook';
import { MONTH_SHORT_MAP } from '@/constants/month';

const filters = [
  { label: 'All', value: 'all' },
  ...TransactionTypeOptions,
];

export default function Transactions() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const debouncedSearch = useDebounce(search);

  const { query, pushQuery } = useQuery<GetTransactionsParams>();

  const { data, isLoading, refetch } = useGetTransactions(query);

  const { month, year } = query;
  const dateQuery = { month, year };

  const {
    data: expensesData,
    isLoading: isExpensesLoading,
    refetch: expenseRefetch,
  } = useGetExpenses(dateQuery);

  const {
    data: incomesData,
    isLoading: isIncomesLoading,
    refetch: incomeRefetch,
  } = useGetIncomes(dateQuery);

  const isFirstRender = useRef(true);

  const setActiveType = (value: string) => {
    setSelectedType(value);

    pushQuery({
      type:
        value === 'all'
          ? undefined
          : (value as GetTransactionsParams['type']),
      category: undefined,
      page: 1,
    });

    setSelectedCategory('all');
  };

  const setCategory = (value: string) => {
    setSelectedCategory(value);

    pushQuery({
      category:
        value === 'all'
          ? undefined
          : (value as GetTransactionsParams['category']),
      page: 1,
    });
  };

  const categoryOptions = useMemo(() => {
    let categories = TransactionCategories;

    if (selectedType === 'EXPENSE') {
      categories = ExpenseCategories;
    }

    if (selectedType === 'INCOME') {
      categories = IncomeCategories;
    }

    return [
      { label: 'All', value: 'all' },
      ...categories.map((category) => ({
        label: category.replace(/_/g, ' '),
        value: category,
      })),
    ];
  }, [selectedType]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    pushQuery({
      search: debouncedSearch.trim() || undefined,
      page: 1,
    });
  }, [debouncedSearch]);

  useEffect(() => {
    setSelectedType(query.type ?? 'all');
    setSelectedCategory(query.category ?? 'all');
  }, [query.type, query.category]);

  useEffect(() => {
    if (
      selectedCategory !== 'all' &&
      !categoryOptions.some(
        (option) => option.value === selectedCategory,
      )
    ) {
      setSelectedCategory('all');

      pushQuery({
        category: undefined,
        page: 1,
      });
    }
  }, [selectedCategory, categoryOptions]);

  const handleRefresh = () => {
    refetch();
    expenseRefetch();
    incomeRefetch();
  };

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={
              isLoading ||
              isExpensesLoading ||
              isIncomesLoading
            }
            onRefresh={handleRefresh}
            tintColor={colors.tint}
          />
        }
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingTop: 58,
          paddingBottom: 110,
        }}
      >
        <Header
          title="Transactions"
          description="Track your income and expenses"
        />

        <DateFilter />

        <View className="mb-4 flex-row items-center justify-between">
          <Text
            className="text-base font-bold"
            style={{ color: colors.text }}
          >
            Overview
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            className="rounded-full border px-3 py-1.5"
            style={{
              backgroundColor: colors.soft,
              borderColor: colors.border,
            }}
          >
            <Text
              className="text-xs font-semibold"
              style={{ color: colors.tint }}
            >
              {query.year ?? new Date().getFullYear()}-
              {
                MONTH_SHORT_MAP[
                  (query.month ?? new Date().getMonth() + 1) as keyof typeof MONTH_SHORT_MAP
                ]
              }
            </Text>
          </TouchableOpacity>
        </View>

        <Summary
          isLoading={isExpensesLoading || isIncomesLoading}
          expenseChange={expensesData?.change ?? 0}
          incomeChange={incomesData?.change ?? 0}
          totalExpenses={expensesData?.amount ?? 0}
          totalIncome={incomesData?.amount ?? 0}
          expenseHasPreviousMonth={
            expensesData?.hasPreviousMonth ?? false
          }
          incomeHasPreviousMonth={
            incomesData?.hasPreviousMonth ?? false
          }
        />

        <View className="mb-3 mt-6 flex-row items-center justify-between">
          <Text
            className="text-base font-bold"
            style={{ color: colors.text }}
          >
            Activity
          </Text>

          <View
            className="rounded-full border px-2.5 py-1.5"
            style={{
              backgroundColor: colors.soft,
              borderColor: colors.border,
            }}
          >
            <Text
              className="text-[10px] font-semibold"
              style={{ color: colors.icon }}
            >
              {data?.transactions?.length ?? 0} entries
            </Text>
          </View>
        </View>

        <SearchField
          search={search}
          setSearch={setSearch}
          className="mt-0"
        />

        <View className="mt-5">
          <Tabs
            activeTab={selectedType}
            setActiveTab={setActiveType}
            tabs={filters}
          />
        </View>

        <View className="mb-3 mt-6 flex-row items-center justify-between">
          <Text
            className="text-lg font-bold"
            style={{ color: colors.text }}
          >
            All Transactions
          </Text>

          <Select
            placeholder="Select Category"
            value={selectedCategory}
            onChange={setCategory}
            options={categoryOptions}
            width="48%"
          />
        </View>

        {isLoading ? (
          <ActivityIndicator
            color={colors.text}
            size={30}
          />
        ) : (
          <TransactionList
            transactions={data?.transactions || []}
            page={data?.pagination.page}
            totalPages={data?.pagination.totalPages}
          />
        )}
      </ScrollView>

      <CreateTransaction refetch={handleRefresh} />
    </View>
  );
}