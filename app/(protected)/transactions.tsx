import { useMemo, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Plus,
} from 'lucide-react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import Header from '@/components/custom/Header';
import Summary from '@/components/custom/Transactions/Summary';
import NetBalance from '@/components/custom/Transactions/NetBalance';
import SearchField from '@/components/ui/SearchField';
import Tabs from '@/components/ui/Tabs';
import TransactionList from '@/components/custom/Transactions/TransactionList';
import { useQuery } from '@/hooks/useQuery';
import { GetTransactionsParams } from '@/hooks/transaction/use-get-transactions.hook';

const filters = [
    { label: 'All', value: 'all' },
    { label: 'Expense', value: 'EXPENSE' },
    { label: 'Income', value: 'INCOME' }
];

export default function Transactions() {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];
    const { query, pushQuery } = useQuery<GetTransactionsParams>();
    const [search, setSearch] = useState('');

    const setActiveType = (value: string) => {
        pushQuery({ type: value === 'all' ? undefined : value, page: 1 })
    }

    return (
        <View
            className="flex-1"
            style={{ backgroundColor: colors.background }}
        >
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                padding: 20,
                paddingTop: 58,
                paddingBottom: 110,
            }}
        >
            <Header 
                title='Transactions'
                description='Track your income and expenses'
            />
            <Summary />
            <NetBalance />
            <SearchField 
                search={search}
                setSearch={setSearch}
            />

            {/* Filters */}
            <Tabs 
                activeTab={query.type ?? "all"}
                setActiveTab={setActiveType}
                tabs={filters}
            />

            {/* Transactions */}
            <TransactionList />
        </ScrollView>

        {/* Floating Add Button */}
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

            <Text className="ml-2 font-bold text-white">
                Add Transaction
            </Text>
        </TouchableOpacity>
        </View>
    );
}