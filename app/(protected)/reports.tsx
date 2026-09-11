import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  Lightbulb,
  PieChart,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

const formatCurrency = (value: number) =>
  `₱${value.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const monthlyData = [
  { month: 'Apr', income: 38000, expenses: 24200 },
  { month: 'May', income: 42000, expenses: 27800 },
  { month: 'Jun', income: 40000, expenses: 25600 },
  { month: 'Jul', income: 45000, expenses: 29100 },
  { month: 'Aug', income: 43500, expenses: 27400 },
  { month: 'Sep', income: 43500, expenses: 15800 },
];

const categories = [
  {
    name: 'Food',
    amount: 3250,
    percentage: 24,
    color: '#F97316',
  },
  {
    name: 'Bills',
    amount: 4200,
    percentage: 31,
    color: '#EF4444',
  },
  {
    name: 'Shopping',
    amount: 3850,
    percentage: 28,
    color: '#A855F7',
  },
  {
    name: 'Transportation',
    amount: 1850,
    percentage: 14,
    color: '#3B82F6',
  },
  {
    name: 'Entertainment',
    amount: 950,
    percentage: 7,
    color: '#EC4899',
  },
];

const wallets = [
  {
    name: 'BPI Savings',
    type: 'Bank Account',
    balance: 12500.5,
    income: 43500,
    expenses: 11500,
  },
  {
    name: 'GCash',
    type: 'E-Wallet',
    balance: 4380,
    income: 2500,
    expenses: 6200,
  },
  {
    name: 'Cash',
    type: 'Cash',
    balance: 5200,
    income: 1500,
    expenses: 1800,
  },
  {
    name: 'Maya',
    type: 'E-Wallet',
    balance: 2500,
    income: 1000,
    expenses: 2100,
  },
];

const tabs = ['Overview', 'Spending', 'Wallets'];

export default function Reports() {
  const router = useRouter();
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedMonth, setSelectedMonth] = useState('September 2026');

  const currentMonth = monthlyData[monthlyData.length - 1];

  const totalIncome = currentMonth.income;
  const totalExpenses = currentMonth.expenses;
  const netSavings = totalIncome - totalExpenses;
  const savingsRate = (netSavings / totalIncome) * 100;

  const maxMonthlyValue = useMemo(
    () =>
      Math.max(
        ...monthlyData.flatMap((item) => [
          item.income,
          item.expenses,
        ]),
      ),
    [],
  );

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="px-5 pt-14">
          {/* Header */}
          <View className="mb-6 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Pressable
                onPress={() => router.back()}
                className="mr-3 h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: colors.input }}
              >
                <ArrowLeft size={21} color={colors.text} />
              </Pressable>

              <View>
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
            </View>

            <Pressable
              className="h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: colors.input }}
            >
              <BarChart3 size={20} color={colors.tint} />
            </Pressable>
          </View>

          {/* Month Selector */}
          <Pressable
            className="mb-5 flex-row items-center justify-between rounded-2xl border px-4 py-3.5"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
            }}
          >
            <View className="flex-row items-center">
              <CalendarDays size={19} color={colors.tint} />

              <Text
                className="ml-3 font-semibold"
                style={{ color: colors.text }}
              >
                {selectedMonth}
              </Text>
            </View>

            <ChevronDown size={19} color={colors.icon} />
          </Pressable>

          {/* Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {tabs.map((tab) => {
              const active = activeTab === tab;

              return (
                <Pressable
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className="rounded-full px-5 py-2.5"
                  style={{
                    backgroundColor: active
                      ? colors.tint
                      : colors.input,
                  }}
                >
                  <Text
                    className="text-sm font-semibold"
                    style={{
                      color: active ? '#FFFFFF' : colors.icon,
                    }}
                  >
                    {tab}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {activeTab === 'Overview' && (
            <>
              {/* Financial Overview */}
              <View
                className="mt-5 rounded-3xl p-5"
                style={{ backgroundColor: colors.tint }}
              >
                <View className="flex-row items-center">
                  <View className="h-11 w-11 items-center justify-center rounded-2xl bg-white/20">
                    <CircleDollarSign
                      size={22}
                      color="#FFFFFF"
                    />
                  </View>

                  <View className="ml-3">
                    <Text className="text-sm text-white/70">
                      Net Savings
                    </Text>

                    <Text className="text-2xl font-bold text-white">
                      {formatCurrency(netSavings)}
                    </Text>
                  </View>
                </View>

                <View className="mt-6 flex-row">
                  <View className="flex-1">
                    <Text className="text-xs text-white/60">
                      Income
                    </Text>

                    <Text className="mt-1 text-base font-bold text-white">
                      {formatCurrency(totalIncome)}
                    </Text>
                  </View>

                  <View className="flex-1">
                    <Text className="text-xs text-white/60">
                      Expenses
                    </Text>

                    <Text className="mt-1 text-base font-bold text-white">
                      {formatCurrency(totalExpenses)}
                    </Text>
                  </View>

                  <View className="flex-1">
                    <Text className="text-xs text-white/60">
                      Savings Rate
                    </Text>

                    <Text className="mt-1 text-base font-bold text-white">
                      {savingsRate.toFixed(0)}%
                    </Text>
                  </View>
                </View>
              </View>

              {/* Income / Expenses Cards */}
              <View className="mt-4 flex-row gap-3">
                <View
                  className="flex-1 rounded-2xl border p-4"
                  style={{
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  }}
                >
                  <View className="h-9 w-9 items-center justify-center rounded-xl bg-green-100">
                    <ArrowDownLeft size={18} color="#16A34A" />
                  </View>

                  <Text
                    className="mt-3 text-xs"
                    style={{ color: colors.icon }}
                  >
                    Total Income
                  </Text>

                  <Text
                    className="mt-1 text-lg font-bold"
                    style={{ color: colors.text }}
                  >
                    {formatCurrency(totalIncome)}
                  </Text>
                </View>

                <View
                  className="flex-1 rounded-2xl border p-4"
                  style={{
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  }}
                >
                  <View className="h-9 w-9 items-center justify-center rounded-xl bg-red-100">
                    <ArrowUpRight size={18} color="#DC2626" />
                  </View>

                  <Text
                    className="mt-3 text-xs"
                    style={{ color: colors.icon }}
                  >
                    Total Expenses
                  </Text>

                  <Text
                    className="mt-1 text-lg font-bold"
                    style={{ color: colors.text }}
                  >
                    {formatCurrency(totalExpenses)}
                  </Text>
                </View>
              </View>

              {/* Monthly Trend */}
              <View
                className="mt-5 rounded-3xl border p-5"
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                }}
              >
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

                <View className="mt-6 flex-row items-end justify-between">
                  {monthlyData.map((item) => {
                    const incomeHeight =
                      (item.income / maxMonthlyValue) * 125;

                    const expenseHeight =
                      (item.expenses / maxMonthlyValue) * 125;

                    return (
                      <View
                        key={item.month}
                        className="items-center"
                      >
                        <View className="h-[125px] flex-row items-end gap-1">
                          <View
                            className="w-3 rounded-t-md"
                            style={{
                              height: incomeHeight,
                              backgroundColor: '#22C55E',
                            }}
                          />

                          <View
                            className="w-3 rounded-t-md"
                            style={{
                              height: expenseHeight,
                              backgroundColor: colors.tint,
                            }}
                          />
                        </View>

                        <Text
                          className="mt-2 text-[10px]"
                          style={{ color: colors.icon }}
                        >
                          {item.month}
                        </Text>
                      </View>
                    );
                  })}
                </View>

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
                      Expenses
                    </Text>
                  </View>
                </View>
              </View>

              {/* Insights */}
              <View
                className="mt-5 rounded-3xl border p-5"
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                }}
              >
                <View className="flex-row items-center">
                  <View className="h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                    <Lightbulb size={19} color="#D97706" />
                  </View>

                  <Text
                    className="ml-3 text-lg font-bold"
                    style={{ color: colors.text }}
                  >
                    Financial Insights
                  </Text>
                </View>

                <View className="mt-5 gap-4">
                  <View className="flex-row">
                    <TrendingDown size={18} color="#16A34A" />

                    <Text
                      className="ml-3 flex-1 text-sm leading-5"
                      style={{ color: colors.icon }}
                    >
                      Your expenses are lower than your income this month.
                      Keep maintaining this positive cash flow.
                    </Text>
                  </View>

                  <View className="flex-row">
                    <TrendingUp size={18} color="#F97316" />

                    <Text
                      className="ml-3 flex-1 text-sm leading-5"
                      style={{ color: colors.icon }}
                    >
                      Bills and shopping are your biggest spending
                      categories this month.
                    </Text>
                  </View>

                  <View className="flex-row">
                    <CircleDollarSign size={18} color={colors.tint} />

                    <Text
                      className="ml-3 flex-1 text-sm leading-5"
                      style={{ color: colors.icon }}
                    >
                      You are saving approximately {savingsRate.toFixed(0)}%
                      of your income this month.
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}

          {activeTab === 'Spending' && (
            <>
              {/* Spending Summary */}
              <View
                className="mt-5 rounded-3xl border p-5"
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                }}
              >
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text
                      className="text-lg font-bold"
                      style={{ color: colors.text }}
                    >
                      Spending Breakdown
                    </Text>

                    <Text
                      className="mt-1 text-xs"
                      style={{ color: colors.icon }}
                    >
                      Where your money goes
                    </Text>
                  </View>

                  <PieChart size={22} color={colors.tint} />
                </View>

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
                      style={{ color: colors.text }}
                    >
                      {formatCurrency(totalExpenses)}
                    </Text>

                    <Text
                      className="mt-1 text-xs"
                      style={{ color: colors.icon }}
                    >
                      Total spent
                    </Text>
                  </View>
                </View>

                <View className="mt-7 gap-4">
                  {categories.map((category) => (
                    <View key={category.name}>
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                          <View
                            className="h-3 w-3 rounded-full"
                            style={{
                              backgroundColor: category.color,
                            }}
                          />

                          <Text
                            className="ml-3 text-sm font-medium"
                            style={{ color: colors.text }}
                          >
                            {category.name}
                          </Text>
                        </View>

                        <View className="items-end">
                          <Text
                            className="text-sm font-bold"
                            style={{ color: colors.text }}
                          >
                            {formatCurrency(category.amount)}
                          </Text>

                          <Text
                            className="text-[10px]"
                            style={{ color: colors.icon }}
                          >
                            {category.percentage}%
                          </Text>
                        </View>
                      </View>

                      <View
                        className="mt-2 h-2 overflow-hidden rounded-full"
                        style={{
                          backgroundColor: colors.input,
                        }}
                      >
                        <View
                          className="h-full rounded-full"
                          style={{
                            width: `${category.percentage}%`,
                            backgroundColor: category.color,
                          }}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}

          {activeTab === 'Wallets' && (
            <>
              <View className="mt-5 gap-3">
                {wallets.map((wallet) => {
                  const net =
                    wallet.income - wallet.expenses;

                  return (
                    <View
                      key={wallet.name}
                      className="rounded-3xl border p-5"
                      style={{
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                      }}
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                          <View
                            className="h-11 w-11 items-center justify-center rounded-2xl"
                            style={{
                              backgroundColor: '#EDE9FE',
                            }}
                          >
                            <Wallet
                              size={21}
                              color={colors.tint}
                            />
                          </View>

                          <View className="ml-3">
                            <Text
                              className="font-bold"
                              style={{ color: colors.text }}
                            >
                              {wallet.name}
                            </Text>

                            <Text
                              className="mt-1 text-xs"
                              style={{ color: colors.icon }}
                            >
                              {wallet.type}
                            </Text>
                          </View>
                        </View>

                        <Text
                          className="text-base font-bold"
                          style={{ color: colors.text }}
                        >
                          {formatCurrency(wallet.balance)}
                        </Text>
                      </View>

                      <View className="mt-5 flex-row">
                        <View className="flex-1">
                          <Text
                            className="text-xs"
                            style={{ color: colors.icon }}
                          >
                            Income
                          </Text>

                          <Text
                            className="mt-1 font-semibold text-green-600"
                          >
                            +{formatCurrency(wallet.income)}
                          </Text>
                        </View>

                        <View className="flex-1">
                          <Text
                            className="text-xs"
                            style={{ color: colors.icon }}
                          >
                            Expenses
                          </Text>

                          <Text
                            className="mt-1 font-semibold text-red-500"
                          >
                            -{formatCurrency(wallet.expenses)}
                          </Text>
                        </View>

                        <View className="flex-1">
                          <Text
                            className="text-xs"
                            style={{ color: colors.icon }}
                          >
                            Net
                          </Text>

                          <Text
                            className="mt-1 font-semibold"
                            style={{
                              color:
                                net >= 0
                                  ? '#16A34A'
                                  : '#DC2626',
                            }}
                          >
                            {net >= 0 ? '+' : '-'}
                            {formatCurrency(Math.abs(net))}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </>
          )}

          {/* Report Footer */}
          <View className="mt-6 items-center">
            <Text
              className="text-xs"
              style={{ color: colors.icon }}
            >
              Report generated for {selectedMonth}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}