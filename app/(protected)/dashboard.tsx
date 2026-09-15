import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  ChevronRight,
  Plus,
} from 'lucide-react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { formatCurrency } from '@/utils/utils';
import useGetExpenses from '@/hooks/transaction/use-get-expenses.hook';
import useGetIncomes from '@/hooks/transaction/use-get-incomes.hook';
import useGetTotalBalance from '@/hooks/wallet/use-get-total-balance.hook';
import DashboardHeader from '@/components/custom/Dashboard/DashboardHeader';
import BalanceCard from '@/components/custom/Dashboard/BalanceCard';
import WalletCard from '@/components/custom/Dashboard/WalletCard';
import useGetWallets from '@/hooks/wallet/use-get-wallets.hook';
import ActionButtons from '@/components/custom/Dashboard/ActionButtons';
import { useRouter } from 'expo-router';

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
  const router = useRouter();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  const { data: totalBalanceData, isLoading: totalBalanceLoading, refetch: totalBalanceRefetch } = useGetTotalBalance();
  const { data: walletData, isLoading: isWalletLoading, refetch: walletRefetch } = useGetWallets();

  const { data: expensesData, isLoading: isExpensesLoading, refetch: expenseRefetch } = useGetExpenses({});
  const { data: incomesData, isLoading: isIncomesLoading, refetch: incomeRefetch } = useGetIncomes({});

  const isBalanceCardLoading = totalBalanceLoading || isExpensesLoading || isIncomesLoading;

  const handleRefresh = () => {
    totalBalanceRefetch();
    expenseRefetch();
    incomeRefetch();
    walletRefetch();
  }

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isBalanceCardLoading}
            onRefresh={handleRefresh}
            tintColor={colors.tint}
          />
        }
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingTop: 58,
          paddingBottom: 40,
        }}
      >
        <DashboardHeader />
        <BalanceCard 
          expenses={expensesData?.amount ?? 0}
          incomes={incomesData?.amount ?? 0}
          totalBalance={totalBalanceData?.totalBalance ?? 0}
          isLoading={isBalanceCardLoading}
        />

        <WalletCard wallets={walletData?.wallets ?? []} isLoading={isWalletLoading}/>
        <ActionButtons refresh={handleRefresh}/>

        <View className="mt-7">
          <View className="mb-3 flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-bold" style={{ color: colors.text }}>
                Monthly Budget
              </Text>
              <Text className="mt-1 text-xs" style={{ color: colors.icon }}>
                September 2026
              </Text>
            </View>

            <TouchableOpacity className="flex-row items-center" onPress={() => router.push('/wallets')}>
              <Text className="mr-1 text-sm font-semibold" style={{ color: colors.tint }}>
                Manage
              </Text>
              <ChevronRight size={16} color={colors.tint} />
            </TouchableOpacity>
          </View>

          <View
            className="rounded-[24px] border p-5"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.04,
              shadowRadius: 12,
              elevation: 2,
            }}
          >
            <View className="flex-row items-end justify-between">
              <View>
                <Text className="text-[30px] font-bold tracking-tight" style={{ color: colors.text }}>
                  {formatCurrency(mockData.expenses)}
                </Text>
                <Text className="mt-1 text-xs" style={{ color: colors.icon }}>
                  of {formatCurrency(mockData.budget)} used
                </Text>
              </View>

              <Text className="text-lg font-bold" style={{ color: colors.tint }}>
                {mockData.budgetUsed}%
              </Text>
            </View>

            <View className="mt-4 h-2.5 overflow-hidden rounded-full" style={{ backgroundColor: colors.soft }}>
              <View className="h-full rounded-full" style={{ width: `${mockData.budgetUsed}%`, backgroundColor: colors.tint }} />
            </View>

            <View className="mt-3 flex-row justify-between">
              <Text className="text-xs" style={{ color: colors.icon }}>
                ₱4,580.50 remaining
              </Text>
              <Text className="text-xs" style={{ color: colors.icon }}>
                69.46% used
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-7">
          <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <BarChart3 size={18} color={colors.tint} />
              <Text className="ml-2 text-lg font-bold" style={{ color: colors.text }}>
                Spending
              </Text>
            </View>

            <TouchableOpacity className="flex-row items-center">
              <Text className="mr-1 text-sm font-semibold" style={{ color: colors.tint }}>
                Details
              </Text>
              <ChevronRight size={16} color={colors.tint} />
            </TouchableOpacity>
          </View>

          <View
            className="rounded-[24px] border p-5"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
            }}
          >
            {mockData.categories.map((category, index) => (
              <View key={category.name} className={index === 0 ? '' : 'mt-5'}>
                <View className="mb-2 flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="mr-2 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors.tint }} />
                    <Text className="text-sm font-medium" style={{ color: colors.text }}>
                      {category.name}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <Text className="mr-2 text-xs" style={{ color: colors.icon }}>
                      {category.percentage}%
                    </Text>
                    <Text className="text-sm font-semibold" style={{ color: colors.text }}>
                      {formatCurrency(category.amount)}
                    </Text>
                  </View>
                </View>

                <View className="h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: colors.soft }}>
                  <View className="h-full rounded-full" style={{ width: `${category.percentage}%`, backgroundColor: colors.tint }} />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-7">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-bold" style={{ color: colors.text }}>
              Recent Transactions
            </Text>

            <TouchableOpacity className="flex-row items-center">
              <Text className="mr-1 text-sm font-semibold" style={{ color: colors.tint }}>
                See all
              </Text>
              <ChevronRight size={16} color={colors.tint} />
            </TouchableOpacity>
          </View>

          <View
            className="overflow-hidden rounded-[24px] border"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
            }}
          >
            {mockData.transactions.map((transaction, index) => {
              const isIncome = transaction.amount > 0;

              return (
                <TouchableOpacity
                  key={transaction.id}
                  activeOpacity={0.8}
                  className="flex-row items-center px-4 py-4"
                  style={{
                    borderBottomWidth: index === mockData.transactions.length - 1 ? 0 : 1,
                    borderBottomColor: colors.border,
                  }}
                >
                  <View
                    className="h-11 w-11 items-center justify-center rounded-2xl"
                    style={{
                      backgroundColor: isIncome ? '#DCFCE7' : '#FEE2E2',
                    }}
                  >
                    {isIncome ? (
                      <ArrowDownLeft size={19} color="#16A34A" />
                    ) : (
                      <ArrowUpRight size={19} color="#DC2626" />
                    )}
                  </View>

                  <View className="ml-3 flex-1">
                    <Text className="text-sm font-semibold" style={{ color: colors.text }}>
                      {transaction.title}
                    </Text>
                    <Text className="mt-1 text-xs" style={{ color: colors.icon }}>
                      {transaction.category} · {transaction.date}
                    </Text>
                  </View>

                  <Text className="text-sm font-bold" style={{ color: isIncome ? '#16A34A' : colors.text }}>
                    {isIncome ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <TouchableOpacity
          className="mt-6 flex-row items-center justify-center rounded-2xl py-4"
          style={{ backgroundColor: colors.tint, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 14, elevation: 4 }}
        >
          <Plus size={20} color="#FFFFFF" />
          <Text className="ml-2 font-bold text-white">Add Transaction</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}