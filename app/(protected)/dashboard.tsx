import { RefreshControl, ScrollView, View } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import useGetExpenses from '@/hooks/transaction/use-get-expenses.hook';
import useGetIncomes from '@/hooks/transaction/use-get-incomes.hook';
import useGetTotalBalance from '@/hooks/wallet/use-get-total-balance.hook';
import DashboardHeader from '@/components/custom/Dashboard/DashboardHeader';
import BalanceCard from '@/components/custom/Dashboard/BalanceCard';
import WalletCard from '@/components/custom/Dashboard/WalletCard';
import useGetWallets from '@/hooks/wallet/use-get-wallets.hook';
import ActionButtons from '@/components/custom/Dashboard/ActionButtons';
import useGetBudgets from '@/hooks/budget/use-get-budgets.hook';
import SpendingDetails from '@/components/custom/Dashboard/SpendingDetails';
import useGetRecentTransactions from '@/hooks/transaction/use-get-recent-transaction.hook';
import RecentTransactions from '@/components/custom/Dashboard/RecentTransactions';

export default function Dashboard() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  const { data: totalBalanceData, isLoading: totalBalanceLoading, refetch: totalBalanceRefetch } = useGetTotalBalance();
  const { data: walletData, isLoading: isWalletLoading, refetch: walletRefetch } = useGetWallets();

  const { data: expensesData, isLoading: isExpensesLoading, refetch: expenseRefetch } = useGetExpenses({});
  const { data: incomesData, isLoading: isIncomesLoading, refetch: incomeRefetch } = useGetIncomes({});

  const { data: budgetsData, isLoading: isBudgetsLoading, refetch: budgetsRefetch } = useGetBudgets({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });

  const { data: recentTransactionsData, isLoading: isRecentTransactionsLoading, refetch: recentTransactionsRefetch } = useGetRecentTransactions();

  const isBalanceCardLoading = totalBalanceLoading || isExpensesLoading || isIncomesLoading;

  const handleRefresh = () => {
    totalBalanceRefetch();
    expenseRefetch();
    incomeRefetch();
    walletRefetch();
    budgetsRefetch();
    recentTransactionsRefetch();
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
        <SpendingDetails budgets={budgetsData?.budgets ?? []} isLoading={isBudgetsLoading} />

        <RecentTransactions isLoading={isRecentTransactionsLoading} recentTransactions={recentTransactionsData ?? []}/>
      </ScrollView>
    </View>
  );
}