import Card from '@/components/ui/Card';
import { Colors } from '@/constants/theme';
import { GetMonthlyBudgetsResponse } from '@/hooks/budget/use-get-monthly-budget.hook';
import { formatCurrency } from '@/utils/utils';
import { Target } from 'lucide-react-native';
import {
  Text,
  useColorScheme,
  View,
} from 'react-native';

type BudgetSummaryProps = {
  data?: GetMonthlyBudgetsResponse;
  isLoading: boolean;
};

export default function BudgetSummary({
  data,
  isLoading,
}: BudgetSummaryProps) {
  const colorScheme =
    useColorScheme() === 'dark' ? 'dark' : 'light';

  const colors = Colors[colorScheme];

  if (isLoading) {
    return <BudgetSummarySkeleton />;
  }

  const percentage = Math.min(data?.percentage ?? 0, 100);

  return (
    <Card variant='surfaceTint'>
      <View className="flex-row items-center">
        <View
          className="h-11 w-11 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: colors.softTint,
          }}
        >
          <Target size={22} color={colors.tint} />
        </View>

        <View className="ml-3">
          <Text
            className="text-sm"
            style={{ color: colors.icon }}
          >
            Monthly Budget
          </Text>

          <Text
            className="mt-0.5 text-[28px] font-bold tracking-tight"
            style={{ color: colors.text }}
          >
            {formatCurrency(data?.totalBudget ?? 0)}
          </Text>
        </View>
      </View>

      <View className="mt-5">
        <View className="mb-2 flex-row justify-between">
          <Text
            className="text-sm"
            style={{ color: colors.icon }}
          >
            Overall spending
          </Text>

          <Text
            className="text-sm font-bold"
            style={{ color: colors.text }}
          >
            {(data?.percentage ?? 0).toFixed(0)}%
          </Text>
        </View>

        <View
          className="h-2.5 overflow-hidden rounded-full"
          style={{
            backgroundColor: colors.soft,
          }}
        >
          <View
            className="h-full rounded-full"
            style={{
              width: `${percentage}%`,
              backgroundColor: colors.tint,
            }}
          />
        </View>
      </View>

      <View className="mt-5 flex-row gap-3">
        <View
          className="flex-1 rounded-2xl p-3"
          style={{
            backgroundColor: colors.soft,
          }}
        >
          <Text
            className="text-[11px]"
            style={{ color: colors.icon }}
          >
            Spent
          </Text>

          <Text
            className="mt-1 text-base font-bold"
            style={{ color: colors.text }}
          >
            {formatCurrency(data?.spending ?? 0)}
          </Text>
        </View>

        <View
          className="flex-1 rounded-2xl p-3"
          style={{
            backgroundColor: colors.soft,
          }}
        >
          <Text
            className="text-[11px]"
            style={{ color: colors.icon }}
          >
            Remaining
          </Text>

          <Text
            className="mt-1 text-base font-bold"
            style={{
              color:
                (data?.remaining ?? 0) < 0
                  ? '#DC2626'
                  : colors.text,
            }}
          >
            {formatCurrency(data?.remaining ?? 0)}
          </Text>
        </View>
      </View>
    </Card>
  );
}

function BudgetSummarySkeleton() {
  const colorScheme =
    useColorScheme() === 'dark' ? 'dark' : 'light';

  const colors = Colors[colorScheme];

  return (
    <Card>
      <View className="flex-row items-center">
        <View
          className="h-11 w-11 rounded-2xl"
          style={{
            backgroundColor: colors.skeleton,
          }}
        />

        <View className="ml-3 gap-2">
          <View
            className="h-3 w-24 rounded-full"
            style={{
              backgroundColor: colors.skeleton,
            }}
          />

          <View
            className="h-7 w-32 rounded-lg"
            style={{
              backgroundColor: colors.skeleton,
            }}
          />
        </View>
      </View>

      <View className="mt-5">
        <View className="mb-2 flex-row justify-between">
          <View
            className="h-3 w-28 rounded-full"
            style={{
              backgroundColor: colors.skeleton,
            }}
          />

          <View
            className="h-3 w-10 rounded-full"
            style={{
              backgroundColor: colors.skeleton,
            }}
          />
        </View>

        <View
          className="h-2.5 w-full rounded-full"
          style={{
            backgroundColor: colors.skeleton,
          }}
        />
      </View>

      <View className="mt-5 flex-row gap-3">
        <View
          className="flex-1 rounded-2xl p-3"
          style={{
            backgroundColor: colors.soft,
          }}
        >
          <View
            className="h-3 w-10 rounded-full"
            style={{
              backgroundColor: colors.skeleton,
            }}
          />

          <View
            className="mt-2 h-5 w-24 rounded-md"
            style={{
              backgroundColor: colors.skeleton,
            }}
          />
        </View>

        <View
          className="flex-1 rounded-2xl p-3"
          style={{
            backgroundColor: colors.soft,
          }}
        >
          <View
            className="h-3 w-16 rounded-full"
            style={{
              backgroundColor: colors.skeleton,
            }}
          />

          <View
            className="mt-2 h-5 w-24 rounded-md"
            style={{
              backgroundColor: colors.skeleton,
            }}
          />
        </View>
      </View>
    </Card>
  );
}