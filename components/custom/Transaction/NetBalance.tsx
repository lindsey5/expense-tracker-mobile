import Card from '@/components/ui/Card';
import { Colors } from '@/constants/theme';
import { formatCurrency } from '@/utils/utils';
import { Wallet } from 'lucide-react-native';
import { View, Text, useColorScheme } from 'react-native';

export default function NetBalance() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  const balance = 300000;

  return (
    <Card
      variant="surfaceTint"
      className="mt-4 overflow-hidden rounded-[28px] border p-4"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View
            className="rounded-2xl p-2.5"
            style={{ backgroundColor: colors.card }}
          >
            <Wallet size={19} color={colors.tint} />
          </View>

          <View className="ml-3">
            <Text className="text-xs" style={{ color: colors.icon }}>
              Net Balance
            </Text>

            <Text className="mt-0.5 text-[28px] font-bold tracking-tight" style={{ color: colors.text }}>
              {formatCurrency(balance)}
            </Text>
          </View>
        </View>

        <View
          className="rounded-full border px-2.5 py-1.5"
          style={{ backgroundColor: colors.card, borderColor: colors.border }}
        >
          <Text className="text-[10px] font-semibold" style={{ color: colors.tint }}>
            Sep 2026
          </Text>
        </View>
      </View>

      <View className="mt-5 h-2.5 overflow-hidden rounded-full" style={{ backgroundColor: colors.card }}>
        <View
          className="h-full rounded-full"
          style={{
            width: '68%',
            backgroundColor: colors.tint,
          }}
        />
      </View>

      <View className="mt-3 flex-row items-center justify-between">
        <Text className="text-[11px]" style={{ color: colors.icon }}>
          68% of monthly target reached
        </Text>

        <Text className="text-[11px] font-semibold" style={{ color: colors.tint }}>
          ₱96,000 left
        </Text>
      </View>
    </Card>
  );
}
