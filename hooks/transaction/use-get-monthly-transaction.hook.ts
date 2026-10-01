import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import {  PaginationResponse } from "@/types/pagination.type";
import { useQuery } from "@tanstack/react-query";
import z from "zod";
import type { ZodiosQueryParamsByAlias } from "@zodios/core";
import { ApiType } from "@/types/api.type";

export type GetMonthlyTransactionsParams = ZodiosQueryParamsByAlias<ApiType, "monthly_transactions">;
export type GetMonthlyTransactionsResponse = z.infer<typeof schemas.GetMonthlyTransactionsResponseDto>[];

const getMonthlyTransactions = (params: GetMonthlyTransactionsParams) => api.monthly_transactions({ queries: params });

export default function useGetMonthlyTransactions(params: Partial<GetMonthlyTransactionsParams> = {}) {
    const apiParams: GetMonthlyTransactionsParams = {
        year: params.year ? Number(params.year) : new Date().getFullYear(),
    };

    return useQuery<GetMonthlyTransactionsResponse>({
        queryKey: ['monthly-transactions', apiParams],
        queryFn: () => getMonthlyTransactions(apiParams),
        refetchOnMount: true
    })
}