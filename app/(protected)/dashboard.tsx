import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  Bell,
  ChevronRight,
  Plus,
  Wallet,
} from 'lucide-react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

const mockData = {
  balance: 24580.5,
  income: 35000,
  expenses: 10419.5,
  budget: 15000,
  budgetUsed: 69.46,
  wallets: [
    {
      id: 1,
      name: 'BPI Savings',
      type: 'Bank Account',
      number: '•••• 4821',
      balance: 12500.5,
    },
    {
      id: 2,
      name: 'GCash',
      type: 'E-Wallet',
      number: '•••• 7392',
      balance: 4380,
    },
    {
      id: 3,
      name: 'Cash',
      type: 'Cash',
      number: 'Personal',
      balance: 5200,
    },
    {
      id: 4,
      name: 'Maya',
      type: 'E-Wallet',
      number: '•••• 2145',
      balance: 2500,
    },
  ],
  transactions: [
    {
      id: 1,
      title: 'Grocery Shopping',
      category: 'Food',
      amount: -1250,
      date: 'Today',
    },
    {
      id: 2,
      title: 'Salary',
      category: 'Income',
      amount: 35000,
      date: 'Sep 10',
    },
    {
      id: 3,
      title: 'Grab Ride',
      category: 'Transportation',
      amount: -320,
      date: 'Sep 10',
    },
    {
      id: 4,
      title: 'Netflix',
      category: 'Entertainment',
      amount: -549,
      date: 'Sep 9',
    },
  ],
  categories: [
    { name: 'Food', amount: 4250, percentage: 41 },
    { name: 'Transportation', amount: 2180, percentage: 21 },
    { name: 'Bills', amount: 1990, percentage: 19 },
    { name: 'Entertainment', amount: 1200, percentage: 12 },
    { name: 'Others', amount: 799.5, percentage: 7 },
  ],
};

export default function Dashboard() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  const formatCurrency = (amount: number) =>
    `₱${amount.toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

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
          paddingBottom: 40,
        }}
      >
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text className="text-sm" style={{ color: colors.icon }}>
              Welcome back
            </Text>

            <Text
              className="mt-1 text-2xl font-bold"
              style={{ color: colors.text }}
            >
              Lindsey 👋
            </Text>
          </View>

          <TouchableOpacity
            className="h-11 w-11 items-center justify-center rounded-full"
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Bell size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Balance Hero */}
        <View
          className="overflow-hidden rounded-3xl p-6"
          style={{ backgroundColor: colors.tint }}
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm text-white/70">
                Total Balance
              </Text>

              <Text className="mt-2 text-3xl font-bold text-white">
                {formatCurrency(mockData.balance)}
              </Text>
            </View>

            <View className="rounded-2xl bg-white/15 p-3">
              <Wallet size={25} color="#FFFFFF" />
            </View>
          </View>

          <View className="mt-6 flex-row">
            {/* Income */}
            <View className="flex-1">
              <View className="flex-row items-center">
                <View className="mr-2 rounded-full bg-white/15 p-1.5">
                  <ArrowDownLeft size={13} color="#FFFFFF" />
                </View>

                <Text className="text-xs text-white/70">
                  Income
                </Text>
              </View>

              <Text className="mt-2 text-base font-bold text-white">
                {formatCurrency(mockData.income)}
              </Text>
            </View>

            <View className="w-px bg-white/20" />

            {/* Expenses */}
            <View className="flex-1 pl-5">
              <View className="flex-row items-center">
                <View className="mr-2 rounded-full bg-white/15 p-1.5">
                  <ArrowUpRight size={13} color="#FFFFFF" />
                </View>

                <Text className="text-xs text-white/70">
                  Expenses
                </Text>
              </View>

              <Text className="mt-2 text-base font-bold text-white">
                {formatCurrency(mockData.expenses)}
              </Text>
            </View>
          </View>
        </View>

        {/* Wallets */}
        <View className="mt-7">
          <View className="mb-3 flex-row items-center justify-between">
            <Text
              className="text-lg font-bold"
              style={{ color: colors.text }}
            >
              My Wallets
            </Text>

            <TouchableOpacity className="flex-row items-center">
              <Text
                className="mr-1 text-sm font-semibold"
                style={{ color: colors.tint }}
              >
                Manage
              </Text>

              <ChevronRight size={16} color={colors.tint} />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={300}
            decelerationRate="fast"
            contentContainerStyle={{ gap: 12 }}
          >
            {mockData.wallets.map((wallet) => (
              <TouchableOpacity
                key={wallet.id}
                activeOpacity={0.9}
                className="h-44 w-[288px] justify-between rounded-3xl p-5"
                style={{ backgroundColor: colors.tint }}
              >
                <View className="flex-row items-start justify-between">
                  <View>
                    <Text className="text-xs font-medium text-white/70">
                      {wallet.type}
                    </Text>

                    <Text className="mt-1 text-lg font-bold text-white">
                      {wallet.name}
                    </Text>
                  </View>

                  <View className="rounded-xl bg-white/15 p-2.5">
                    <Wallet size={20} color="#FFFFFF" />
                  </View>
                </View>

                <View>
                  <Text className="text-xs text-white/60">
                    {wallet.number}
                  </Text>

                  <Text className="mt-1 text-2xl font-bold text-white">
                    {formatCurrency(wallet.balance)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Wallet Pagination */}
          <View className="mt-3 flex-row justify-center gap-1.5">
            <View
              className="h-1.5 w-5 rounded-full"
              style={{ backgroundColor: colors.tint }}
            />

            <View
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: colors.border }}
            />

            <View
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: colors.border }}
            />

            <View
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: colors.border }}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mt-5 flex-row gap-3">
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center rounded-2xl py-3.5"
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Plus size={18} color={colors.tint} />

            <Text
              className="ml-2 text-sm font-semibold"
              style={{ color: colors.text }}
            >
              Add Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center rounded-2xl py-3.5"
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <ArrowDownLeft size={18} color={colors.tint} />

            <Text
              className="ml-2 text-sm font-semibold"
              style={{ color: colors.text }}
            >
              Add Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* Monthly Budget */}
        <View className="mt-7">
          <View className="mb-3 flex-row items-center justify-between">
            <View>
              <Text
                className="text-lg font-bold"
                style={{ color: colors.text }}
              >
                Monthly Budget
              </Text>

              <Text
                className="mt-1 text-xs"
                style={{ color: colors.icon }}
              >
                September 2026
              </Text>
            </View>

            <TouchableOpacity className="flex-row items-center">
              <Text
                className="mr-1 text-sm font-semibold"
                style={{ color: colors.tint }}
              >
                Manage
              </Text>

              <ChevronRight size={16} color={colors.tint} />
            </TouchableOpacity>
          </View>

          <View
            className="rounded-2xl p-5"
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View className="flex-row items-end justify-between">
              <View>
                <Text
                  className="text-2xl font-bold"
                  style={{ color: colors.text }}
                >
                  {formatCurrency(mockData.expenses)}
                </Text>

                <Text
                  className="mt-1 text-xs"
                  style={{ color: colors.icon }}
                >
                  of {formatCurrency(mockData.budget)} used
                </Text>
              </View>

              <Text
                className="text-lg font-bold"
                style={{ color: colors.tint }}
              >
                {mockData.budgetUsed}%
              </Text>
            </View>

            <View
              className="mt-4 h-2.5 overflow-hidden rounded-full"
              style={{ backgroundColor: colors.input }}
            >
              <View
                className="h-full rounded-full"
                style={{
                  width: `${mockData.budgetUsed}%`,
                  backgroundColor: colors.tint,
                }}
              />
            </View>

            <View className="mt-3 flex-row justify-between">
              <Text
                className="text-xs"
                style={{ color: colors.icon }}
              >
                ₱4,580.50 remaining
              </Text>

              <Text
                className="text-xs"
                style={{ color: colors.icon }}
              >
                69.46% used
              </Text>
            </View>
          </View>
        </View>

        {/* Spending */}
        <View className="mt-7">
          <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <BarChart3 size={19} color={colors.tint} />

              <Text
                className="ml-2 text-lg font-bold"
                style={{ color: colors.text }}
              >
                Spending
              </Text>
            </View>

            <TouchableOpacity className="flex-row items-center">
              <Text
                className="mr-1 text-sm font-semibold"
                style={{ color: colors.tint }}
              >
                Details
              </Text>

              <ChevronRight size={16} color={colors.tint} />
            </TouchableOpacity>
          </View>

          <View
            className="rounded-2xl p-5"
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            {mockData.categories.map((category, index) => (
              <View
                key={category.name}
                className={index === 0 ? '' : 'mt-5'}
              >
                <View className="mb-2 flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View
                      className="mr-2 h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: colors.tint }}
                    />

                    <Text
                      className="text-sm font-medium"
                      style={{ color: colors.text }}
                    >
                      {category.name}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <Text
                      className="mr-2 text-xs"
                      style={{ color: colors.icon }}
                    >
                      {category.percentage}%
                    </Text>

                    <Text
                      className="text-sm font-semibold"
                      style={{ color: colors.text }}
                    >
                      {formatCurrency(category.amount)}
                    </Text>
                  </View>
                </View>

                <View
                  className="h-1.5 overflow-hidden rounded-full"
                  style={{ backgroundColor: colors.input }}
                >
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${category.percentage}%`,
                      backgroundColor: colors.tint,
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View className="mt-7">
          <View className="mb-3 flex-row items-center justify-between">
            <Text
              className="text-lg font-bold"
              style={{ color: colors.text }}
            >
              Recent Transactions
            </Text>

            <TouchableOpacity className="flex-row items-center">
              <Text
                className="mr-1 text-sm font-semibold"
                style={{ color: colors.tint }}
              >
                See all
              </Text>

              <ChevronRight size={16} color={colors.tint} />
            </TouchableOpacity>
          </View>

          <View
            className="overflow-hidden rounded-2xl"
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            {mockData.transactions.map((transaction, index) => {
              const isIncome = transaction.amount > 0;

              return (
                <TouchableOpacity
                  key={transaction.id}
                  activeOpacity={0.7}
                  className="flex-row items-center px-4 py-4"
                  style={{
                    borderBottomWidth:
                      index === mockData.transactions.length - 1 ? 0 : 1,
                    borderBottomColor: colors.border,
                  }}
                >
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
                      <ArrowDownLeft size={19} color="#16A34A" />
                    ) : (
                      <ArrowUpRight size={19} color="#DC2626" />
                    )}
                  </View>

                  <View className="ml-3 flex-1">
                    <Text
                      className="text-sm font-semibold"
                      style={{ color: colors.text }}
                    >
                      {transaction.title}
                    </Text>

                    <Text
                      className="mt-1 text-xs"
                      style={{ color: colors.icon }}
                    >
                      {transaction.category} · {transaction.date}
                    </Text>
                  </View>

                  <Text
                    className="text-sm font-bold"
                    style={{
                      color: isIncome ? '#16A34A' : colors.text,
                    }}
                  >
                    {isIncome ? '+' : '-'}
                    {formatCurrency(Math.abs(transaction.amount))}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Add Transaction */}
        <TouchableOpacity
          className="mt-6 flex-row items-center justify-center rounded-2xl py-4"
          style={{ backgroundColor: colors.tint }}
        >
          <Plus size={20} color="#FFFFFF" />

          <Text className="ml-2 font-bold text-white">
            Add Transaction
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}