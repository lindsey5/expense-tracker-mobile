import Card from '@/components/ui/Card';
import { Colors } from '@/constants/theme';
import { formatCurrency } from '@/utils/utils';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react-native';
import { View, Text, useColorScheme } from 'react-native';

export default function Summary() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  const totalIncome = 100000;
  const totalExpenses = 10000;

  return (
    <View className="mt-1 flex-row gap-3">
      <Card className="rounded-[24px] border p-4">
        <View className="mb-4 flex-row items-center justify-between">
          <View className="h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100">
            <ArrowDownLeft size={16} color="#16A34A" />
          </View>

          <Text className="text-xs font-semibold" style={{ color: colors.icon }}>
            Income
          </Text>
        </View>

        <Text className="text-[26px] font-bold tracking-tight" style={{ color: colors.text }}>
          {formatCurrency(totalIncome)}
        </Text>

        <Text className="mt-2 text-[10px] font-medium" style={{ color: colors.icon }}>
          +12.4% vs last month
        </Text>
      </Card>

      <Card className="rounded-[24px] border p-4">
        <View className="mb-4 flex-row items-center justify-between">
          <View className="h-10 w-10 items-center justify-center rounded-2xl bg-rose-100">
            <ArrowUpRight size={16} color="#DC2626" />
          </View>

          <Text className="text-xs font-semibold" style={{ color: colors.icon }}>
            Expenses
          </Text>
        </View>

        <Text className="text-[26px] font-bold tracking-tight" style={{ color: colors.text }}>
          {formatCurrency(totalExpenses)}
        </Text>

        <Text className="mt-2 text-[10px] font-medium" style={{ color: colors.icon }}>
          -4.8% from target
        </Text>
      </Card>
    </View>
  );
}
