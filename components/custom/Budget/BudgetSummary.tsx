import GradientCard from '@/components/ui/GradientCard';
import { Colors } from '@/constants/theme';
import { GetMonthlyBudgetsResponse } from '@/hooks/budget/use-get-monthly-budget.hook';
import { cn, formatCurrency } from '@/utils/utils';
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
    <GradientCard>
      {/* Header */}
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
          <Text className="text-sm text-white">
            Monthly Budget
          </Text>

          <Text className="mt-0.5 text-[28px] font-bold tracking-tight text-white">
            {formatCurrency(data?.totalBudget ?? 0)}
          </Text>
        </View>
      </View>

      {/* Progress */}
      <View className="mt-5">
        <View className="mb-2 flex-row justify-between">
          <Text className="text-sm text-white">
            Overall spending
          </Text>

          <Text className="text-sm font-bold text-white">
            {(data?.percentage ?? 0).toFixed(0)}%
          </Text>
        </View>

        <View
          className={cn(
            "h-4 overflow-hidden rounded-full border",
            colorScheme === 'dark' ? 'border-[#1B1720]' : `border-white`,
             colorScheme === 'dark' ? 'bg-[#1B1720]' : `bg-[#E4E4E7]`
          )}
        >
          <View
            className="h-full rounded-full"
            style={{
              width: `${percentage}%`,
              backgroundColor: colors.tint
            }}
          />
        </View>
      </View>

      {/* Summary */}
      <View className="mt-5 flex-row gap-3">
        <View
          className="flex-1 rounded-2xl p-3"
          style={{
            backgroundColor: colors.softTint,
          }}
        >
          <Text
            className="text-[11px]"
            style={{
              color: colors.icon,
            }}
          >
            Spent
          </Text>

          <Text
            className="mt-1 text-base font-bold"
            style={{
              color: colors.text,
            }}
          >
            {formatCurrency(data?.spending ?? 0)}
          </Text>
        </View>

        <View
          className="flex-1 rounded-2xl p-3"
          style={{
            backgroundColor: colors.softTint,
          }}
        >
          <Text
            className="text-[11px]"
            style={{
              color: colors.icon,
            }}
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
    </GradientCard>
  );
}

function BudgetSummarySkeleton() {
  const colorScheme =
    useColorScheme() === 'dark' ? 'dark' : 'light';

  const colors = Colors[colorScheme];

  return (
    <GradientCard>
      {/* Header */}
      <View className="flex-row items-center">
        <View
          className="h-11 w-11 rounded-2xl"
          style={{
            backgroundColor:
              colorScheme === 'dark'
                ? 'rgba(255,255,255,0.12)'
                : 'rgba(255,255,255,0.25)',
          }}
        />

        <View className="ml-3 gap-2">
          <View
            className="h-3 w-24 rounded-full"
            style={{
              backgroundColor: 'rgba(255,255,255,0.35)',
            }}
          />

          <View
            className="h-7 w-36 rounded-lg"
            style={{
              backgroundColor: 'rgba(255,255,255,0.5)',
            }}
          />
        </View>
      </View>

      {/* Progress */}
      <View className="mt-5">
        <View className="mb-2 flex-row justify-between">
          <View
            className="h-3 w-28 rounded-full"
            style={{
              backgroundColor: 'rgba(255,255,255,0.35)',
            }}
          />

          <View
            className="h-3 w-10 rounded-full"
            style={{
              backgroundColor: 'rgba(255,255,255,0.35)',
            }}
          />
        </View>

        <View
          className="h-4 w-full overflow-hidden rounded-full"
          style={{
            backgroundColor:
              colorScheme === 'dark'
                ? 'rgba(27,23,32,0.65)'
                : 'rgba(255,255,255,0.3)',
          }}
        >
          <View
            className="h-full w-2/3 rounded-full"
            style={{
              backgroundColor: 'rgba(255,255,255,0.45)',
            }}
          />
        </View>
      </View>

      {/* Bottom cards */}
      <View className="mt-5 flex-row gap-3">
        <View
          className="flex-1 rounded-2xl p-3"
          style={{
            backgroundColor:
              colorScheme === 'dark'
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(255,255,255,0.78)',
          }}
        >
          <View
            className="h-3 w-10 rounded-full"
            style={{
              backgroundColor:
                colorScheme === 'dark'
                  ? 'rgba(255,255,255,0.25)'
                  : colors.skeleton,
            }}
          />

          <View
            className="mt-2 h-5 w-24 rounded-md"
            style={{
              backgroundColor:
                colorScheme === 'dark'
                  ? 'rgba(255,255,255,0.38)'
                  : colors.skeleton,
            }}
          />
        </View>

        <View
          className="flex-1 rounded-2xl p-3"
          style={{
            backgroundColor:
              colorScheme === 'dark'
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(255,255,255,0.78)',
          }}
        >
          <View
            className="h-3 w-16 rounded-full"
            style={{
              backgroundColor:
                colorScheme === 'dark'
                  ? 'rgba(255,255,255,0.25)'
                  : colors.skeleton,
            }}
          />

          <View
            className="mt-2 h-5 w-24 rounded-md"
            style={{
              backgroundColor:
                colorScheme === 'dark'
                  ? 'rgba(255,255,255,0.38)'
                  : colors.skeleton,
            }}
          />
        </View>
      </View>
    </GradientCard>
  );
}