import { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import Header from '@/components/custom/Header';
import Summary from '@/components/custom/Transactions/Summary';
import NetBalance from '@/components/custom/Transactions/NetBalance';
import SearchField from '@/components/ui/SearchField';
import Tabs from '@/components/ui/Tabs';
import TransactionList from '@/components/custom/Transactions/TransactionList';
import { useQuery } from '@/hooks/useQuery';
import useGetTransactions, { GetTransactionsParams } from '@/hooks/transaction/use-get-transactions.hook';
import { useDebounce } from '@/hooks/useDebounce';
import { ExpenseCategories, IncomeCategories, TransactionCategories } from '@/constants/transaction';
import Select from '@/components/ui/Select';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Expense', value: 'EXPENSE' },
  { label: 'Income', value: 'INCOME' },
];

export default function Transactions() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  const { query, pushQuery } = useQuery<GetTransactionsParams>();

  const { data } = useGetTransactions({ ...query, search: debouncedSearch });

  const setActiveType = (value: string) => {
    pushQuery({
      type: value === 'all' ? undefined : (value as GetTransactionsParams['type']),
      page: 1,
    });
  };

  const setCategory = (value: string) => {
    pushQuery({
      category: !value ? undefined : (value as GetTransactionsParams['category']),
      page: 1,
    });
  };

  const categoryOptions = useMemo(() => {
    let categories = TransactionCategories;

    if (query.type === 'EXPENSE') {
      categories = ExpenseCategories;
    }

    if (query.type === 'INCOME') {
      categories = IncomeCategories;
    }

    return [
      { label: 'All', value: '' },
      ...categories.map((category) => ({
        label: category.replace(/_/g, ' '),
        value: category,
      })),
    ];
  }, [query.type]);

  useEffect(() => {
    if (
      query.category &&
      !categoryOptions.some((option) => option.value === query.category)
    ) {
      pushQuery({
        category: undefined,
        page: 1,
      });
    }
  }, [query.category, categoryOptions]);

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingTop: 58,
          paddingBottom: 110,
        }}
      >
        <Header title="Transactions" description="Track your income and expenses" />

        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-base font-bold" style={{ color: colors.text }}>
            Overview
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            className="rounded-full border px-3 py-1.5"
            style={{
              backgroundColor: colors.soft,
              borderColor: colors.border,
            }}
          >
            <Text className="text-xs font-semibold" style={{ color: colors.tint }}>
              This month
            </Text>
          </TouchableOpacity>
        </View>

        <Summary />
        <NetBalance />

        <View className="mt-6 mb-3 flex-row items-center justify-between">
          <Text className="text-base font-bold" style={{ color: colors.text }}>
            Activity
          </Text>

          <View className="rounded-full border px-2.5 py-1.5" style={{ backgroundColor: colors.soft, borderColor: colors.border }}>
            <Text className="text-[10px] font-semibold" style={{ color: colors.icon }}>
              {data?.transactions?.length ?? 0} entries
            </Text>
          </View>
        </View>

        <SearchField search={search} setSearch={setSearch} className="mt-0" />

        <View className="mt-5">
          <Tabs activeTab={query.type ?? 'all'} setActiveTab={setActiveType} tabs={filters} />
        </View>

        <View className="mb-3 mt-6 flex-row items-center justify-between">
          <Text className="text-lg font-bold" style={{ color: colors.text }}>
            All Transactions
          </Text>

          <Select
            className="w-[52%]"
            placeholder="Select Category"
            value={query.category}
            onChange={setCategory}
            options={categoryOptions}
          />
        </View>

        <TransactionList
          transactions={data?.transactions || []}
          page={data?.pagination.page}
          totalPages={data?.pagination.totalPages}
        />
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-6 right-5 flex-row items-center rounded-full px-5 py-4"
        style={{
          backgroundColor: colors.tint,
          elevation: 6,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
        }}
      >
        <Plus size={20} color="#FFFFFF" />

        <Text className="ml-2 font-bold text-white">Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}
