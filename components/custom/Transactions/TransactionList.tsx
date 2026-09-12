import Card from "@/components/ui/Card";
import useGetTransactions, { GetTransactionsParams } from "@/hooks/transaction/use-get-transactions.hook";
import { useQuery } from "@/hooks/useQuery";
import { View, Text, useColorScheme, TouchableOpacity } from "react-native";
import { ArrowDownLeft, ArrowUpRight, Filter, Search } from "lucide-react-native";
import { Colors } from "@/constants/theme";
import { formatCurrency } from "@/utils/utils";
import Pagination from "@/components/ui/Pagination";

export default function TransactionList() {
    const { query } = useQuery<GetTransactionsParams>();
    const { data } = useGetTransactions(query);
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    console.log(data)

    return (
        <>
            <View className="mb-3 mt-7 flex-row items-center justify-between">
                <Text
                    className="text-lg font-bold"
                    style={{ color: colors.text }}
                >
                    All Transactions
                </Text>

                <View className="flex-row items-center">
                    <Filter size={14} color={colors.icon} />

                    <Text
                        className="ml-1 text-xs"
                        style={{ color: colors.icon }}
                    >
                    {data?.pagination.total ?? 0} records
                    </Text>
                </View>
            </View>
            {!data?.transactions.length ? (
                <View className="items-center px-6 py-12">
                    <Search size={30} color={colors.icon} />

                    <Text
                        className="mt-3 text-base font-semibold"
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
            ) : 
            data?.transactions.map((transaction, index) => {
                const isIncome = transaction.type === 'INCOME';

                return (
                    <TouchableOpacity
                        key={transaction.id}
                        activeOpacity={0.7}
                        className="flex-row items-center px-4 py-4"
                        style={{
                            borderBottomWidth:
                            index === data.transactions.length - 1 ? 0 : 1,
                            borderBottomColor: colors.border,
                        }}
                    >
                    {/* Icon */}
                    <View
                        className="h-11 w-11 items-center justify-center rounded-2xl"
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
                        {isIncome ? <ArrowDownLeft size={19} color="#16A34A"/> : <ArrowUpRight size={19} color="#DC2626" />}
                    </View>

                    {/* Details */}
                    <View className="ml-3 flex-1">
                        <Text
                            className="text-sm font-semibold"
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

                        <Text
                            className="mt-1 text-[11px]"
                            style={{ color: colors.icon }}
                        >
                            {transaction.date}
                        </Text>
                    </View>

                    {/* Amount */}
                    <View className="items-end">
                        <Text
                            className="text-sm font-bold"
                            style={{
                                color: isIncome ? '#16A34A' : colors.text,
                            }}
                        >
                        {isIncome ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                        </Text>

                        <Text
                            className="mt-1 text-[10px]"
                            style={{ color: colors.icon }}
                        >
                        {isIncome ? 'Income' : 'Expense'}
                        </Text>
                    </View>
                    </TouchableOpacity>
                )
            })}
            <Pagination 
                page={data?.pagination.page || 1}
                totalPages={data?.pagination.totalPages || 0}
            />
        </>
    )

}