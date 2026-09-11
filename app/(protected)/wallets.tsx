import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Banknote,
  ChevronRight,
  CreditCard,
  MoreVertical,
  Plus,
  Wallet as WalletIcon,
  Smartphone,
} from 'lucide-react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

const mockWallets = [
  {
    id: '1',
    name: 'Cash',
    type: 'CASH',
    balance: 5200,
    icon: Banknote,
  },
  {
    id: '2',
    name: 'BPI Savings',
    type: 'BANK',
    balance: 12500.5,
    icon: Banknote,
  },
  {
    id: '3',
    name: 'GCash',
    type: 'E_WALLET',
    balance: 4380,
    icon: Smartphone,
  },
  {
    id: '4',
    name: 'Maya',
    type: 'E_WALLET',
    balance: 2500,
    icon: Smartphone,
  },
  {
    id: '5',
    name: 'BDO Credit Card',
    type: 'CREDIT_CARD',
    balance: -1250,
    icon: CreditCard,
  },
];

const recentActivity = [
  {
    id: '1',
    title: 'Salary',
    wallet: 'BPI Savings',
    amount: 35000,
    type: 'income',
  },
  {
    id: '2',
    title: 'Grocery Shopping',
    wallet: 'GCash',
    amount: -1250,
    type: 'expense',
  },
  {
    id: '3',
    title: 'Grab Ride',
    wallet: 'Maya',
    amount: -320,
    type: 'expense',
  },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount);

export default function Wallets() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  const totalBalance = mockWallets.reduce(
    (total, wallet) => total + wallet.balance,
    0
  );

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-7 flex-row items-center justify-between">
        <View>
          <Text className="text-3xl font-bold" style={{ color: colors.text }}>
            Wallets
          </Text>
          <Text className="mt-1 text-sm" style={{ color: colors.icon }}>
            Manage your money accounts
          </Text>
        </View>

        <TouchableOpacity
          className="rounded-xl p-3"
          style={{ backgroundColor: colors.tint }}
        >
          <Plus size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View
        className="mb-6 rounded-2xl p-5"
        style={{ backgroundColor: colors.tint }}
      >
        <View className="mb-4 flex-row items-center gap-2">
          <WalletIcon size={20} color="#FFFFFF" />
          <Text className="text-sm font-medium text-white">
            Total Balance
          </Text>
        </View>

        <Text className="text-3xl font-bold text-white">
          {formatCurrency(totalBalance)}
        </Text>

        <Text className="mt-2 text-sm text-white/70">
          Across {mockWallets.length} wallets
        </Text>
      </View>

      <View className="mb-7">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-lg font-bold" style={{ color: colors.text }}>
            My Wallets
          </Text>
          <TouchableOpacity>
            <Text className="text-sm font-medium" style={{ color: colors.tint }}>
              Add wallet
            </Text>
          </TouchableOpacity>
        </View>

        <View className="gap-3">
          {mockWallets.map((wallet) => {
            const Icon = wallet.icon;
            const isNegative = wallet.balance < 0;

            return (
              <TouchableOpacity
                key={wallet.id}
                activeOpacity={0.7}
                className="flex-row items-center rounded-2xl p-4"
                style={{
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <View
                  className="mr-4 rounded-xl p-3"
                  style={{
                    backgroundColor:
                      colorScheme === 'dark' ? '#3B2A5A' : '#F3E8FF',
                  }}
                >
                  <Icon size={22} color={colors.tint} />
                </View>

                <View className="flex-1">
                  <Text
                    className="text-base font-semibold"
                    style={{ color: colors.text }}
                  >
                    {wallet.name}
                  </Text>
                  <Text
                    className="mt-1 text-xs"
                    style={{ color: colors.icon }}
                  >
                    {wallet.type.replace('_', ' ')}
                  </Text>
                </View>

                <View className="items-end">
                  <Text
                    className="text-base font-bold"
                    style={{
                      color: isNegative ? '#DC2626' : colors.text,
                    }}
                  >
                    {formatCurrency(wallet.balance)}
                  </Text>
                  <MoreVertical size={18} color={colors.icon} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View>
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-lg font-bold" style={{ color: colors.text }}>
            Recent Activity
          </Text>
          <TouchableOpacity className="flex-row items-center gap-1">
            <Text className="text-sm font-medium" style={{ color: colors.tint }}>
              View all
            </Text>
            <ChevronRight size={16} color={colors.tint} />
          </TouchableOpacity>
        </View>

        <View
          className="rounded-2xl"
          style={{
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          {recentActivity.map((item, index) => {
            const isIncome = item.type === 'income';

            return (
              <View
                key={item.id}
                className="flex-row items-center p-4"
                style={{
                  borderBottomWidth:
                    index === recentActivity.length - 1 ? 0 : 1,
                  borderBottomColor: colors.border,
                }}
              >
                <View
                  className="mr-3 rounded-full p-2"
                  style={{
                    backgroundColor: isIncome ? '#DCFCE7' : '#FEE2E2',
                  }}
                >
                  {isIncome ? (
                    <ArrowDownLeft size={18} color="#16A34A" />
                  ) : (
                    <ArrowUpRight size={18} color="#DC2626" />
                  )}
                </View>

                <View className="flex-1">
                  <Text
                    className="text-sm font-semibold"
                    style={{ color: colors.text }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    className="mt-1 text-xs"
                    style={{ color: colors.icon }}
                  >
                    {item.wallet}
                  </Text>
                </View>

                <Text
                  className="text-sm font-bold"
                  style={{
                    color: isIncome ? '#16A34A' : '#DC2626',
                  }}
                >
                  {isIncome ? '+' : ''}
                  {formatCurrency(item.amount)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}