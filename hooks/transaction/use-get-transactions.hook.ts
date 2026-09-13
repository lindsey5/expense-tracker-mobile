import { TransactionCategory } from "@/types/transaction.type";
import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { PaginationParams, PaginationResponse } from "@/types/pagination.type";
import { useQuery } from "@tanstack/react-query";
import z from "zod";

export type GetTransactionsParams = PaginationParams & {
    type?: "INCOME" | "EXPENSE";
    category?: TransactionCategory
    month?: number;
    year?: number;
    search?: string;
}

export type GetTransactionsResponse = PaginationResponse & z.infer<typeof schemas.GetTransactionsResponseDto> & {}

const getTransactions = (params: GetTransactionsParams) => api.get('/transaction', { queries: params });

export default function useGetTransactions(params: GetTransactionsParams) {
    const apiParams: GetTransactionsParams = {
        page: params.page ? Number(params.page) : 1,
        limit: params.limit ? Number(params.limit) : 10,
        month: params.month ? Number(params.month) : new Date().getMonth() + 1,
        year: params.year ? Number(params.year) : new Date().getFullYear(),
        type: params.type,
        category: params.category,
        search: params.search
    };
    const result = useQuery<GetTransactionsResponse>({
        queryKey: ['transactions', apiParams],
        queryFn: () => getTransactions(apiParams),
        refetchOnWindowFocus: false
    })

    return result
}