import { TransactionCategory } from "@/types/transaction.type";
import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import {  PaginationResponse } from "@/types/pagination.type";
import { useQuery } from "@tanstack/react-query";
import z from "zod";
import useRemoveQueryCache from "../use-remove-query-cache";

export type GetRecentTransactionsResponse = z.infer<typeof schemas.TransactionResponseDto>[];

const getRecentTransactions = () => api.list_transaction_recent();

export default function useGetRecentTransactions() {

    useRemoveQueryCache(['recent-transactions']);

    return useQuery<GetRecentTransactionsResponse>({
        queryKey: ['recent-transactions'],
        queryFn: getRecentTransactions,
        refetchOnWindowFocus: false
    })
}