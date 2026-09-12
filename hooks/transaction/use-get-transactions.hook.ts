import { type TransactionCategory } from "@/constants/transaction";
import { api } from "@/lib/api/api";
import { schemas } from "@/lib/api/openapi";
import { PaginationParams, PaginationResponse } from "@/types/pagination.type";
import { useQuery } from "@tanstack/react-query";
import z from "zod";

export type GetTransactionsParams = PaginationParams & {
    type?: "INCOME" | "EXPENSE";
    category?: TransactionCategory
    month?: number;
    year?: number;
}

export type GetTransactionsResponse = PaginationResponse & z.infer<typeof schemas.GetTransactionsResponseDto> & { }

const getTransactions = (params: GetTransactionsParams) => api.get('/transaction', { queries: params });

export default function useGetTransactions(params: GetTransactionsParams) {
    return useQuery<GetTransactionsResponse>({
        queryKey: ['transactions', params],
        queryFn: () => getTransactions(params),
        refetchOnWindowFocus: false
    })
}