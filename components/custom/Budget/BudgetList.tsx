import { Colors } from '@/constants/theme';
import { Budget } from '@/types/budget.type';
import { formatCurrency } from '@/utils/utils';
import {
  AlertTriangle,
  Search,
  Wallet,
} from 'lucide-react-native';
import {
  Pressable,
  Text,
  useColorScheme,
  View,
} from 'react-native';

type BudgetListProps = {
  budgets: Budget[];
  isLoading: boolean;
};

const getBudgetStatus = (budget: Budget) => {
  const percentage = budget.percentage;

  if (percentage >= 100) {
    return {
      label: 'Exceeded',
      text: '#DC2626',
      background: '#FEE2E2',
    };
  }

  if (percentage >= 80) {
    return {
      label: 'Almost reached',
      text: '#D97706',
      background: '#FEF3C7',
    };
  }

  return {
    label: 'On track',
    text: '#059669',
    background: '#D1FAE5',
  };
};

export default function BudgetList({
  budgets,
  isLoading,
}: BudgetListProps) {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  if (isLoading) {
    return (
      <View className="gap-3">
        <BudgetListSkeleton />
        <BudgetListSkeleton />
        <BudgetListSkeleton />
      </View>
    );
  }

  if (budgets.length === 0) {
    return (
      <View className="items-center py-14">
        <View
          className="h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.soft }}
        >
          <Search size={25} color={colors.icon} />
        </View>

        <Text
          className="mt-4 text-base font-bold"
          style={{ color: colors.text }}
        >
          No budgets found
        </Text>

        <Text
          className="mt-1 text-center text-sm"
          style={{ color: colors.icon }}
        >
          Try another search or filter.
        </Text>
      </View>
    );
  }

  return (
    <View className="gap-3">
      {budgets.map((budget) => {
        const status = getBudgetStatus(budget);
        const budgetColor =
          typeof budget.color === 'string' && budget.color
            ? budget.color
            : '#8B5CF6';

        const progressColor: string =
          budget.percentage >= 100
            ? '#EF4444'
            : budget.percentage >= 80
              ? '#F59E0B'
              : budgetColor;

        return (
          <Pressable
            key={budget.id}
            className="rounded-[24px] border p-4"
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
                    backgroundColor: `${budgetColor}20`,
                  }}
                >
                  <Wallet size={20} color={colors.accent} />
                </View>

                <View className="ml-3">
                  <Text
                    className="font-bold"
                    style={{ color: colors.text }}
                  >
                    {budget.category}
                  </Text>

                  <Text
                    className="mt-1 text-xs"
                    style={{ color: colors.icon }}
                  >
                    {formatCurrency(budget.spent)} of{' '}
                    {formatCurrency(budget.amount)}
                  </Text>
                </View>
              </View>

              <View
                className="rounded-full px-2.5 py-1"
                style={{
                  backgroundColor: status.background,
                }}
              >
                <Text
                  className="text-[10px] font-bold"
                  style={{ color: status.text }}
                >
                  {status.label}
                </Text>
              </View>
            </View>

            <View className="mt-5">
              <View
                className="h-2.5 overflow-hidden rounded-full"
                style={{ backgroundColor: colors.soft }}
              >
                <View
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(budget.percentage, 100,)}%`,
                    backgroundColor: progressColor,
                  }}
                />
              </View>

              <View className="mt-2 flex-row items-center justify-between">
                <Text
                  className="text-xs"
                  style={{ color: colors.icon }}
                >
                  {budget.percentage.toFixed(0)}% used
                </Text>

                <Text
                  className="text-xs font-semibold"
                  style={{
                    color:
                      budget.remaining < 0
                        ? '#DC2626'
                        : colors.text,
                  }}
                >
                  {budget.remaining >= 0
                    ? `${formatCurrency(
                        budget.remaining,
                      )} left`
                    : `${formatCurrency(
                        Math.abs(budget.remaining),
                      )} over`}
                </Text>
              </View>
            </View>

            {budget.percentage >= 80 && (
              <View
                className="mt-4 flex-row items-center rounded-xl px-3 py-2.5"
                style={{
                  backgroundColor:
                    budget.percentage >= 100
                      ? '#FEF2F2'
                      : '#FFFBEB',
                }}
              >
                <AlertTriangle
                  size={15}
                  color={
                    budget.percentage >= 100
                      ? '#DC2626'
                      : '#D97706'
                  }
                />

                <Text
                  className="ml-2 flex-1 text-xs"
                  style={{
                    color:
                      budget.percentage >= 100
                        ? '#B91C1C'
                        : '#B45309',
                  }}
                >
                  {budget.percentage >= 100
                    ? 'You have exceeded this budget.'
                    : 'You are close to reaching this budget.'}
                </Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

function BudgetListSkeleton() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  return (
    <View
      className="rounded-[24px] border p-4"
      style={{
        backgroundColor: colors.card,
        borderColor: colors.border,
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View
            className="h-11 w-11 rounded-2xl"
            style={{ backgroundColor: colors.skeleton }}
          />

          <View className="ml-3 gap-2">
            <View
              className="h-4 w-24 rounded-full"
              style={{ backgroundColor: colors.skeleton }}
            />

            <View
              className="h-3 w-32 rounded-full"
              style={{ backgroundColor: colors.skeleton }}
            />
          </View>
        </View>

        <View
          className="h-6 w-16 rounded-full"
          style={{ backgroundColor: colors.skeleton }}
        />
      </View>

      <View className="mt-5">
        <View
          className="h-2.5 w-full rounded-full"
          style={{ backgroundColor: colors.skeleton }}
        />

        <View className="mt-3 flex-row items-center justify-between">
          <View
            className="h-3 w-16 rounded-full"
            style={{ backgroundColor: colors.skeleton }}
          />

          <View
            className="h-3 w-20 rounded-full"
            style={{ backgroundColor: colors.skeleton }}
          />
        </View>
      </View>
    </View>
  );
}