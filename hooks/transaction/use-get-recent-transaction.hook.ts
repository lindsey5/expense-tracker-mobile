import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useQuery } from "@tanstack/react-query";
import z from "zod";

export type GetRecentTransactionsResponse = z.infer<typeof schemas.TransactionResponseDto>[];

const getRecentTransactions = () => api.list_transaction_recent();

export default function useGetRecentTransactions() {

    return useQuery<GetRecentTransactionsResponse>({
        queryKey: ['recent-transactions'],
        queryFn: getRecentTransactions,
        refetchOnMount: true
    })
}