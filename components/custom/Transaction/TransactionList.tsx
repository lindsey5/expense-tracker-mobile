import Skeleton from '@/components/ui/Skeleton';
import { View, Text, useColorScheme, TouchableOpacity } from 'react-native';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  Trash2,
} from 'lucide-react-native';
import { Colors } from '@/constants/theme';
import { formatCurrency, formatDateOnly } from '@/utils/utils';
import Pagination from '@/components/ui/Pagination';
import { Transaction } from '@/types/transaction.type';

type TransactionListProps = {
  transactions: Transaction[];
  page?: number;
  totalPages?: number;
  isLoading: boolean;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
};

function TransactionSkeleton() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  return (
    <View className="gap-3">
      {[1, 2, 3, 4, 5].map((item) => (
        <View
          key={item}
          className="rounded-[22px] border p-3"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <View className="flex-row items-center">
            <Skeleton width={48} height={48} className="rounded-2xl" />

            <View className="ml-3 flex-1">
              <Skeleton width={120} height={15} className="rounded-md" />
              <View className="mt-2 flex-row items-center">
                <Skeleton width={55} height={10} className="rounded-full" />
                <View
                  className="mx-2 h-1 w-1 rounded-full"
                  style={{ backgroundColor: colors.border }}
                />
                <Skeleton width={75} height={10} className="rounded-full" />
              </View>
            </View>

            <View className="items-end">
              <Skeleton width={80} height={14} className="rounded-md" />
              <Skeleton
                width={55}
                height={9}
                className="mt-2 rounded-full"
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

export default function TransactionList({
  transactions,
  page,
  totalPages,
  isLoading,
  handleDelete,
  handleEdit,
}: TransactionListProps) {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  if (isLoading) {
    return <TransactionSkeleton />;
  }

  return (
    <View className="gap-3">
      {!transactions.length ? (
        <View
          className="items-center rounded-[24px] border px-6 py-12"
          style={{
            borderColor: colors.border,
            backgroundColor: colors.card,
          }}
        >
          <View
            className="h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.soft }}
          >
            <Search size={28} color={colors.icon} />
          </View>

          <Text
            className="mt-4 text-base font-semibold"
            style={{ color: colors.text }}
          >
            No transactions found
          </Text>

          <Text
            className="mt-1 text-center text-sm"
            style={{ color: colors.icon }}
          >
            Try changing your search or filter.
          </Text>
        </View>
      ) : (
        transactions.map((transaction) => {
          const isIncome = transaction.type === 'INCOME';

          return (
            <TouchableOpacity
              key={transaction.id}
              activeOpacity={0.85}
              onPress={() => handleEdit(transaction.id)}
              className="rounded-[22px] border p-3"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <View className="flex-row items-center">
                <View
                  className="h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: isIncome
                      ? colorScheme === 'dark'
                        ? '#163A27'
                        : '#DCFCE7'
                      : colorScheme === 'dark'
                        ? '#3F2024'
                        : '#FEE2E2',
                  }}
                >
                  {isIncome ? (
                    <ArrowDownLeft
                      size={19}
                      color="#16A34A"
                    />
                  ) : (
                    <ArrowUpRight
                      size={19}
                      color="#DC2626"
                    />
                  )}
                </View>

                <View className="ml-3 flex-1">
                  <Text
                    className="text-[15px] font-semibold"
                    style={{ color: colors.text }}
                  >
                    {transaction.title}
                  </Text>

                  <View className="mt-1 flex-row items-center">
                    <Text
                      className="text-xs"
                      style={{ color: colors.icon }}
                    >
                      {transaction.category}
                    </Text>

                    <Text
                      className="mx-1 text-xs"
                      style={{ color: colors.border }}
                    >
                      •
                    </Text>

                    <Text
                      className="text-xs"
                      style={{ color: colors.icon }}
                    >
                      {transaction.wallet.name}
                    </Text>
                  </View>
                </View>

                <View className="items-end">
                  <Text
                    className="text-sm font-bold"
                    style={{
                      color: isIncome ? '#16A34A' : '#DC2626',
                    }}
                  >
                    {isIncome ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </Text>

                  <Text
                    className="mt-1 text-[10px]"
                    style={{ color: colors.icon }}
                  >
                    {formatDateOnly(transaction.date)}
                  </Text>
                </View>

                <TouchableOpacity
                  className="ml-3 h-9 w-9 items-center justify-center rounded-xl"
                  onPress={(event) => {
                    event.stopPropagation();
                    handleDelete(transaction.id);
                  }}
                  style={{
                    backgroundColor:
                      colorScheme === 'dark' ? '#3F2024' : '#FEE2E2',
                  }}
                >
                  <Trash2 size={17} color="#DC2626" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })
      )}

      <Pagination
        page={page || 1}
        totalPages={totalPages || 0}
      />
    </View>
  );
}