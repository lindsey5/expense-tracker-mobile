import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Plus,
  Search,
  Target,
  TrendingUp,
  Wallet,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

type Budget = {
  id: string;
  category: string;
  spent: number;
  limit: number;
  color: string;
};

const mockBudgets: Budget[] = [
  { id: '1', category: 'Food', spent: 3250, limit: 5000, color: '#F97316' },
  { id: '2', category: 'Transportation', spent: 1850, limit: 3000, color: '#3B82F6' },
  { id: '3', category: 'Bills', spent: 4200, limit: 5000, color: '#EF4444' },
  { id: '4', category: 'Shopping', spent: 3850, limit: 4000, color: '#A855F7' },
  { id: '5', category: 'Entertainment', spent: 950, limit: 2500, color: '#EC4899' },
  { id: '6', category: 'Healthcare', spent: 1200, limit: 3000, color: '#10B981' },
  { id: '7', category: 'Subscriptions', spent: 1249, limit: 1500, color: '#6366F1' },
  { id: '8', category: 'Personal Care', spent: 800, limit: 2000, color: '#14B8A6' },
];

const formatCurrency = (value: number) =>
  `₱${value.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const getPercentage = (spent: number, limit: number) =>
  limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;

export default function Budgets() {
  const router = useRouter();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'warning' | 'exceeded'>('all');

  const totalBudget = useMemo(
    () => mockBudgets.reduce((sum, budget) => sum + budget.limit, 0),
    [],
  );

  const totalSpent = useMemo(
    () => mockBudgets.reduce((sum, budget) => sum + budget.spent, 0),
    [],
  );

  const remaining = totalBudget - totalSpent;
  const overallPercentage = getPercentage(totalSpent, totalBudget);

  const filteredBudgets = useMemo(() => {
    return mockBudgets.filter((budget) => {
      const matchesSearch = budget.category.toLowerCase().includes(search.toLowerCase());
      const percentage = getPercentage(budget.spent, budget.limit);

      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && percentage < 80) ||
        (filter === 'warning' && percentage >= 80 && percentage < 100) ||
        (filter === 'exceeded' && percentage >= 100);

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const getBudgetStatus = (budget: Budget) => {
    const percentage = (budget.spent / budget.limit) * 100;

    if (percentage >= 100) {
      return { label: 'Exceeded', text: '#DC2626', background: '#FEE2E2' };
    }

    if (percentage >= 80) {
      return { label: 'Almost reached', text: '#D97706', background: '#FEF3C7' };
    }

    return { label: 'On track', text: '#059669', background: '#D1FAE5' };
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        <View className="px-5 pt-14">
          <View className="mb-6 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Pressable
                onPress={() => router.back()}
                className="mr-3 h-10 w-10 items-center justify-center rounded-full border"
                style={{ backgroundColor: colors.card, borderColor: colors.border }}
              >
                <ArrowLeft size={21} color={colors.text} />
              </Pressable>

              <View>
                <Text className="text-[30px] font-bold tracking-tight" style={{ color: colors.text }}>
                  Budgets
                </Text>
                <Text className="mt-1 text-sm" style={{ color: colors.icon }}>
                  Manage your monthly spending
                </Text>
              </View>
            </View>

            <Pressable
              onPress={() => {}}
              className="h-11 w-11 items-center justify-center rounded-2xl border"
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
            >
              <Plus size={23} color={colors.tint} />
            </Pressable>
          </View>

          <Pressable
            className="mb-5 flex-row items-center justify-between rounded-[20px] border px-4 py-3.5"
            style={{ backgroundColor: colors.card, borderColor: colors.border }}
          >
            <View className="flex-row items-center">
              <CalendarDays size={19} color={colors.tint} />
              <Text className="ml-3 font-semibold" style={{ color: colors.text }}>
                September 2026
              </Text>
            </View>

            <ChevronDown size={19} color={colors.icon} />
          </Pressable>

          <View
            className="rounded-[26px] border p-5"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.05,
              shadowRadius: 14,
              elevation: 2,
            }}
          >
            <View className="flex-row items-center">
              <View className="h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: colors.softTint }}>
                <Target size={22} color={colors.tint} />
              </View>

              <View className="ml-3">
                <Text className="text-sm" style={{ color: colors.icon }}>
                  Monthly Budget
                </Text>
                <Text className="mt-0.5 text-[28px] font-bold tracking-tight" style={{ color: colors.text }}>
                  {formatCurrency(totalBudget)}
                </Text>
              </View>
            </View>

            <View className="mt-5">
              <View className="mb-2 flex-row justify-between">
                <Text className="text-sm" style={{ color: colors.icon }}>
                  Overall spending
                </Text>
                <Text className="text-sm font-bold" style={{ color: colors.text }}>
                  {overallPercentage.toFixed(0)}%
                </Text>
              </View>

              <View className="h-2.5 overflow-hidden rounded-full" style={{ backgroundColor: colors.soft }}>
                <View className="h-full rounded-full" style={{ width: `${overallPercentage}%`, backgroundColor: colors.tint }} />
              </View>
            </View>

            <View className="mt-5 flex-row gap-3">
              <View className="flex-1 rounded-2xl p-3" style={{ backgroundColor: colors.soft }}>
                <Text className="text-[11px]" style={{ color: colors.icon }}>
                  Spent
                </Text>
                <Text className="mt-1 text-base font-bold" style={{ color: colors.text }}>
                  {formatCurrency(totalSpent)}
                </Text>
              </View>

              <View className="flex-1 rounded-2xl p-3" style={{ backgroundColor: colors.soft }}>
                <Text className="text-[11px]" style={{ color: colors.icon }}>
                  Remaining
                </Text>
                <Text className="mt-1 text-base font-bold" style={{ color: colors.text }}>
                  {formatCurrency(remaining)}
                </Text>
              </View>
            </View>
          </View>

          <View className="mt-5 flex-row gap-3">
            <View className="flex-1 rounded-[22px] border p-4" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
              <View className="h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: '#DCFCE7' }}>
                <TrendingUp size={18} color="#16A34A" />
              </View>

              <Text className="mt-3 text-xs" style={{ color: colors.icon }}>
                Total Spent
              </Text>

              <Text className="mt-1 text-base font-bold" style={{ color: colors.text }}>
                {formatCurrency(totalSpent)}
              </Text>
            </View>

            <View className="flex-1 rounded-[22px] border p-4" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
              <View className="h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: '#EDE9FE' }}>
                <CircleDollarSign size={18} color={colors.tint} />
              </View>

              <Text className="mt-3 text-xs" style={{ color: colors.icon }}>
                Remaining
              </Text>

              <Text className="mt-1 text-base font-bold" style={{ color: colors.text }}>
                {formatCurrency(remaining)}
              </Text>
            </View>
          </View>

          <View className="mt-5 flex-row items-center rounded-[20px] border px-4" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
            <Search size={19} color={colors.icon} />

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search budgets..."
              placeholderTextColor={colors.placeholder}
              className="ml-3 flex-1 py-4 text-sm"
              style={{ color: colors.text }}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 16, gap: 8 }}>
            {[
              { label: 'All', value: 'all' },
              { label: 'On Track', value: 'active' },
              { label: 'Warning', value: 'warning' },
              { label: 'Exceeded', value: 'exceeded' },
            ].map((item) => {
              const active = filter === item.value;

              return (
                <Pressable
                  key={item.value}
                  onPress={() => setFilter(item.value as 'all' | 'active' | 'warning' | 'exceeded')}
                  className="rounded-full px-5 py-2.5"
                  style={{ backgroundColor: active ? colors.tint : colors.card, borderColor: colors.border, borderWidth: active ? 0 : 1 }}
                >
                  <Text className="text-sm font-semibold" style={{ color: active ? '#FFFFFF' : colors.icon }}>
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View className="mb-3 flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-bold" style={{ color: colors.text }}>
                Category Budgets
              </Text>
              <Text className="mt-1 text-xs" style={{ color: colors.icon }}>
                {filteredBudgets.length} budget{filteredBudgets.length !== 1 ? 's' : ''}
              </Text>
            </View>

            <Pressable onPress={() => {}} className="flex-row items-center">
              <Plus size={17} color={colors.tint} />
              <Text className="ml-1 text-sm font-semibold" style={{ color: colors.tint }}>
                Add Budget
              </Text>
            </Pressable>
          </View>

          <View className="gap-3">
            {filteredBudgets.map((budget) => {
              const percentage = getPercentage(budget.spent, budget.limit);
              const status = getBudgetStatus(budget);
              const remainingAmount = budget.limit - budget.spent;

              return (
                <Pressable
                  key={budget.id}
                  className="rounded-[24px] border p-4"
                  style={{ backgroundColor: colors.card, borderColor: colors.border }}
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <View className="h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: `${budget.color}20` }}>
                        <Wallet size={20} color={budget.color} />
                      </View>

                      <View className="ml-3">
                        <Text className="font-bold" style={{ color: colors.text }}>
                          {budget.category}
                        </Text>

                        <Text className="mt-1 text-xs" style={{ color: colors.icon }}>
                          {formatCurrency(budget.spent)} of {formatCurrency(budget.limit)}
                        </Text>
                      </View>
                    </View>

                    <View className="rounded-full px-2.5 py-1" style={{ backgroundColor: status.background }}>
                      <Text className="text-[10px] font-bold" style={{ color: status.text }}>
                        {status.label}
                      </Text>
                    </View>
                  </View>

                  <View className="mt-5">
                    <View className="h-2.5 overflow-hidden rounded-full" style={{ backgroundColor: colors.soft }}>
                      <View
                        className="h-full rounded-full"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor:
                            percentage >= 100 ? '#EF4444' : percentage >= 80 ? '#F59E0B' : budget.color,
                        }}
                      />
                    </View>

                    <View className="mt-2 flex-row items-center justify-between">
                      <Text className="text-xs" style={{ color: colors.icon }}>
                        {percentage.toFixed(0)}% used
                      </Text>

                      <Text
                        className="text-xs font-semibold"
                        style={{
                          color: remainingAmount < 0 ? '#DC2626' : colors.text,
                        }}
                      >
                        {remainingAmount >= 0
                          ? `${formatCurrency(remainingAmount)} left`
                          : `${formatCurrency(Math.abs(remainingAmount))} over`}
                      </Text>
                    </View>
                  </View>

                  {percentage >= 80 && (
                    <View
                      className="mt-4 flex-row items-center rounded-xl px-3 py-2.5"
                      style={{ backgroundColor: percentage >= 100 ? '#FEF2F2' : '#FFFBEB' }}
                    >
                      <AlertTriangle size={15} color={percentage >= 100 ? '#DC2626' : '#D97706'} />

                      <Text className="ml-2 flex-1 text-xs" style={{ color: percentage >= 100 ? '#B91C1C' : '#B45309' }}>
                        {percentage >= 100
                          ? 'You have exceeded this budget.'
                          : 'You are close to reaching this budget.'}
                      </Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>

          {filteredBudgets.length === 0 && (
            <View className="items-center py-14">
              <View className="h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: colors.soft }}>
                <Search size={25} color={colors.icon} />
              </View>

              <Text className="mt-4 text-base font-bold" style={{ color: colors.text }}>
                No budgets found
              </Text>

              <Text className="mt-1 text-center text-sm" style={{ color: colors.icon }}>
                Try another search or filter.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View className="absolute bottom-6 left-5 right-5">
        <Pressable
          onPress={() => {}}
          className="flex-row items-center justify-center rounded-2xl py-4"
          style={{
            backgroundColor: colors.tint,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.15,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <Plus size={20} color="#FFFFFF" />
          <Text className="ml-2 font-bold text-white">Add Budget</Text>
        </Pressable>
      </View>
    </View>
  );
}