import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import { MONTH_SHORT_MAP } from '@/constants/month';
import { Colors } from '@/constants/theme';
import { formatCurrency } from '@/utils/utils';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react-native';
import { Text, useColorScheme, View } from 'react-native';

type BalanceCardProps = {
  totalBalance: number;
  incomes: number;
  expenses: number;
  isLoading: boolean;
};

type BalanceStatProps = {
  label: string;
  amount: number;
  icon: React.ReactNode;
};

function BalanceStat({
  label,
  amount,
  icon,
}: BalanceStatProps) {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  return (
    <Card variant="surfaceTint" className="flex-1">
      <View className="flex-row items-center">
        {icon}

        <Text
          className="ml-2 text-[11px] font-medium"
          style={{ color: colors.icon }}
        >
          {label}
        </Text>
      </View>

      <Text
        className="mt-2 text-base font-bold"
        style={{ color: colors.text }}
      >
        {formatCurrency(amount)}
      </Text>
    </Card>
  );
}

function BalanceStatSkeleton() {
  return (
    <Card variant="surfaceTint" className="flex-1">
      <View className="flex-row items-center">
        <Skeleton
          width={26}
          height={26}
          className="rounded-full"
        />

        <Skeleton
          width={52}
          height={12}
          className="ml-2 rounded-full"
        />
      </View>

      <Skeleton
        width={96}
        height={20}
        className="mt-2 rounded-md"
      />
    </Card>
  );
}

function BalanceSkeleton() {
  return (
    <>
      <Card variant="surfaceTint">
        <View className="mb-4 flex-row items-center justify-between">
          <Skeleton
            width={82}
            height={14}
            className="rounded-full"
          />

          <Skeleton
            width={62}
            height={22}
            className="rounded-full"
          />
        </View>

        <Skeleton
          width={190}
          height={40}
          className="rounded-lg"
        />
      </Card>

      <View className="mt-5 flex-row gap-3">
        <BalanceStatSkeleton />
        <BalanceStatSkeleton />
      </View>
    </>
  );
}

export default function BalanceCard({
  totalBalance,
  incomes,
  expenses,
  isLoading,
}: BalanceCardProps) {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  if (isLoading) {
    return <BalanceSkeleton />;
  }

  return (
    <>
      <Card variant="surfaceTint">
        <View className="mb-4 flex-row items-center justify-between">
          <Text
            className="text-sm font-medium"
            style={{ color: colors.icon }}
          >
            Total Balance
          </Text>

          <View
            className="rounded-full border px-2.5 py-1"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.soft,
            }}
          >
            <Text
              className="text-[10px] font-semibold"
              style={{ color: colors.tint }}
            >
              {
                MONTH_SHORT_MAP[
                  month as keyof typeof MONTH_SHORT_MAP
                ]
              }{' '}
              {year}
            </Text>
          </View>
        </View>

        <Text
          className="text-[34px] font-bold tracking-tight"
          style={{ color: colors.text }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {formatCurrency(totalBalance)}
        </Text>
      </Card>

      <View className="mt-5 flex-row gap-3">
        <BalanceStat
          label="Income"
          amount={incomes}
          icon={
            <View className="rounded-full bg-emerald-100 p-1.5">
              <ArrowDownLeft size={12} color="#16A34A" />
            </View>
          }
        />

        <BalanceStat
          label="Expenses"
          amount={expenses}
          icon={
            <View className="rounded-full bg-rose-100 p-1.5">
              <ArrowUpRight size={12} color="#DC2626" />
            </View>
          }
        />
      </View>
    </>
  );
}