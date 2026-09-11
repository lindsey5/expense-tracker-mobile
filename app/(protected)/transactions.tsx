import { useMemo, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  Wallet,
} from 'lucide-react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

const mockTransactions = [
  {
    id: '1',
    title: 'Salary',
    description: 'Monthly salary',
    category: 'Salary',
    wallet: 'BPI Savings',
    amount: 35000,
    date: 'Sep 10',
    type: 'income',
  },
  {
    id: '2',
    title: 'Grocery Shopping',
    description: 'Weekly groceries',
    category: 'Groceries',
    wallet: 'GCash',
    amount: -1250,
    date: 'Sep 10',
    type: 'expense',
  },
  {
    id: '3',
    title: 'Grab Ride',
    description: 'Transportation',
    category: 'Transportation',
    wallet: 'Maya',
    amount: -320,
    date: 'Sep 10',
    type: 'expense',
  },
  {
    id: '4',
    title: 'Netflix',
    description: 'Monthly subscription',
    category: 'Subscriptions',
    wallet: 'BPI Savings',
    amount: -549,
    date: 'Sep 9',
    type: 'expense',
  },
  {
    id: '5',
    title: 'Freelance Project',
    description: 'Website project',
    category: 'Freelance',
    wallet: 'BPI Savings',
    amount: 8500,
    date: 'Sep 8',
    type: 'income',
  },
  {
    id: '6',
    title: 'Electric Bill',
    description: 'Monthly electricity',
    category: 'Bills',
    wallet: 'BPI Savings',
    amount: -1850,
    date: 'Sep 7',
    type: 'expense',
  },
  {
    id: '7',
    title: 'Coffee',
    description: 'Coffee shop',
    category: 'Food',
    wallet: 'Cash',
    amount: -180,
    date: 'Sep 6',
    type: 'expense',
  },
  {
    id: '8',
    title: 'Online Shopping',
    description: 'Personal items',
    category: 'Shopping',
    wallet: 'GCash',
    amount: -2200,
    date: 'Sep 5',
    type: 'expense',
  },
];

const filters = ['All', 'Income', 'Expenses'];

export default function Transactions() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const formatCurrency = (amount: number) =>
    `₱${Math.abs(amount).toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      const matchesSearch =
        transaction.title.toLowerCase().includes(search.toLowerCase()) ||
        transaction.category.toLowerCase().includes(search.toLowerCase()) ||
        transaction.wallet.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === 'All' ||
        (activeFilter === 'Income' && transaction.type === 'income') ||
        (activeFilter === 'Expenses' && transaction.type === 'expense');

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const totalIncome = mockTransactions
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = mockTransactions
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + Math.abs(item.amount), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingTop: 58,
          paddingBottom: 110,
        }}
      >
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text
              className="text-3xl font-bold"
              style={{ color: colors.text }}
            >
              Transactions
            </Text>

            <Text
              className="mt-1 text-sm"
              style={{ color: colors.icon }}
            >
              Track your income and expenses
            </Text>
          </View>

          <TouchableOpacity
            className="h-11 w-11 items-center justify-center rounded-full"
            style={{
              backgroundColor: colors.tint,
            }}
          >
            <Plus size={21} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Summary */}
        <View className="flex-row gap-3">
          <View
            className="flex-1 rounded-2xl p-4"
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View className="mb-3 flex-row items-center">
              <View className="rounded-full bg-green-100 p-2">
                <ArrowDownLeft size={15} color="#16A34A" />
              </View>

              <Text
                className="ml-2 text-xs"
                style={{ color: colors.icon }}
              >
                Income
              </Text>
            </View>

            <Text
              className="text-lg font-bold"
              style={{ color: colors.text }}
            >
              {formatCurrency(totalIncome)}
            </Text>
          </View>

          <View
            className="flex-1 rounded-2xl p-4"
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View className="mb-3 flex-row items-center">
              <View className="rounded-full bg-red-100 p-2">
                <ArrowUpRight size={15} color="#DC2626" />
              </View>

              <Text
                className="ml-2 text-xs"
                style={{ color: colors.icon }}
              >
                Expenses
              </Text>
            </View>

            <Text
              className="text-lg font-bold"
              style={{ color: colors.text }}
            >
              {formatCurrency(totalExpenses)}
            </Text>
          </View>
        </View>

        {/* Net Balance */}
        <View
          className="mt-3 flex-row items-center justify-between rounded-2xl p-4"
          style={{
            backgroundColor:
              colorScheme === 'dark' ? '#2E2148' : '#F3E8FF',
          }}
        >
          <View className="flex-row items-center">
            <View
              className="rounded-xl p-2.5"
              style={{
                backgroundColor:
                  colorScheme === 'dark' ? '#3B2A5A' : '#E9D5FF',
              }}
            >
              <Wallet size={19} color={colors.tint} />
            </View>

            <View className="ml-3">
              <Text
                className="text-xs"
                style={{ color: colors.icon }}
              >
                Net Balance
              </Text>

              <Text
                className="mt-0.5 text-base font-bold"
                style={{ color: colors.text }}
              >
                {formatCurrency(balance)}
              </Text>
            </View>
          </View>

          <Text
            className="text-xs font-semibold"
            style={{ color: colors.tint }}
          >
            September 2026
          </Text>
        </View>

        {/* Search */}
        <View
          className="mt-6 flex-row items-center rounded-2xl px-4"
          style={{
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Search size={19} color={colors.icon} />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search transactions..."
            placeholderTextColor={colors.placeholder}
            className="h-12 flex-1 px-3 text-sm"
            style={{ color: colors.text }}
          />

          <TouchableOpacity>
            <SlidersHorizontal size={19} color={colors.icon} />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <View className="mt-4 flex-row gap-2">
          {filters.map((filter) => {
            const active = activeFilter === filter;

            return (
              <TouchableOpacity
                key={filter}
                onPress={() => setActiveFilter(filter)}
                className="rounded-full px-5 py-2.5"
                style={{
                  backgroundColor: active
                    ? colors.tint
                    : colors.card,
                  borderWidth: active ? 0 : 1,
                  borderColor: colors.border,
                }}
              >
                <Text
                  className="text-sm font-semibold"
                  style={{
                    color: active ? '#FFFFFF' : colors.icon,
                  }}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Date Filter */}
        <TouchableOpacity
          className="mt-5 flex-row items-center justify-between rounded-2xl p-4"
          style={{
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View className="flex-row items-center">
            <CalendarDays size={19} color={colors.tint} />

            <View className="ml-3">
              <Text
                className="text-xs"
                style={{ color: colors.icon }}
              >
                Date range
              </Text>

              <Text
                className="mt-0.5 text-sm font-semibold"
                style={{ color: colors.text }}
              >
                September 1 – September 30, 2026
              </Text>
            </View>
          </View>

          <ChevronDown size={18} color={colors.icon} />
        </TouchableOpacity>

        {/* Transaction Header */}
        <View className="mb-3 mt-7 flex-row items-center justify-between">
          <Text
            className="text-lg font-bold"
            style={{ color: colors.text }}
          >
            All Transactions
          </Text>

          <View className="flex-row items-center">
            <Filter size={14} color={colors.icon} />

            <Text
              className="ml-1 text-xs"
              style={{ color: colors.icon }}
            >
              {filteredTransactions.length} records
            </Text>
          </View>
        </View>

        {/* Transactions */}
        <View
          className="overflow-hidden rounded-2xl"
          style={{
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          {filteredTransactions.length === 0 ? (
            <View className="items-center px-6 py-12">
              <Search size={30} color={colors.icon} />

              <Text
                className="mt-3 text-base font-semibold"
                style={{ color: colors.text }}
              >
                No transactions found
              </Text>

              <Text
                className="mt-1 text-center text-sm"
                style={{ color: colors.icon }}
              >
                Try changing your search or filter.
              </Text>
            </View>
          ) : (
            filteredTransactions.map((transaction, index) => {
              const isIncome = transaction.type === 'income';

              return (
                <TouchableOpacity
                  key={transaction.id}
                  activeOpacity={0.7}
                  className="flex-row items-center px-4 py-4"
                  style={{
                    borderBottomWidth:
                      index === filteredTransactions.length - 1 ? 0 : 1,
                    borderBottomColor: colors.border,
                  }}
                >
                  {/* Icon */}
                  <View
                    className="h-11 w-11 items-center justify-center rounded-2xl"
                    style={{
                      backgroundColor: isIncome
                        ? colorScheme === 'dark'
                          ? '#163A27'
                          : '#DCFCE7'
                        : colorScheme === 'dark'
                          ? '#3F2024'
                          : '#FEE2E2',
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

                  {/* Details */}
                  <View className="ml-3 flex-1">
                    <Text
                      className="text-sm font-semibold"
                      style={{ color: colors.text }}
                    >
                      {transaction.title}
                    </Text>

                    <View className="mt-1 flex-row items-center">
                      <Text
                        className="text-xs"
                        style={{ color: colors.icon }}
                      >
                        {transaction.category}
                      </Text>

                      <Text
                        className="mx-1 text-xs"
                        style={{ color: colors.border }}
                      >
                        •
                      </Text>

                      <Text
                        className="text-xs"
                        style={{ color: colors.icon }}
                      >
                        {transaction.wallet}
                      </Text>
                    </View>

                    <Text
                      className="mt-1 text-[11px]"
                      style={{ color: colors.icon }}
                    >
                      {transaction.date}
                    </Text>
                  </View>

                  {/* Amount */}
                  <View className="items-end">
                    <Text
                      className="text-sm font-bold"
                      style={{
                        color: isIncome
                          ? '#16A34A'
                          : colors.text,
                      }}
                    >
                      {isIncome ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </Text>

                    <Text
                      className="mt-1 text-[10px]"
                      style={{ color: colors.icon }}
                    >
                      {isIncome ? 'Income' : 'Expense'}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-5 flex-row items-center rounded-full px-5 py-4"
        style={{
          backgroundColor: colors.tint,
          elevation: 6,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
        }}
      >
        <Plus size={20} color="#FFFFFF" />

        <Text className="ml-2 font-bold text-white">
          Add Transaction
        </Text>
      </TouchableOpacity>
    </View>
  );
}