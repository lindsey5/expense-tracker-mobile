import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useQuery } from "@tanstack/react-query";
import z from "zod";
import type { ZodiosQueryParamsByAlias } from "@zodios/core";
import { ApiType } from "@/types/api.type";
import useRemoveQueryCache from "../use-remove-query-cache";

export type GetExpensesQueryParams = ZodiosQueryParamsByAlias<ApiType, "get_transaction_expenses">;
export type GetExpensesResponse = z.infer<typeof schemas.GetExpensesResponseDto>;

const getExpenses = (params: GetExpensesQueryParams) => api.get("/transaction/expenses", { queries: params });

export default function useGetExpenses(params: GetExpensesQueryParams) {
    const apiParams = {
        month: params.month ? Number(params.month) : new Date().getMonth() + 1,
        year: params.year ? Number(params.year) : new Date().getFullYear(),
    }

    useRemoveQueryCache(['expenses', apiParams]);

    return useQuery<GetExpensesResponse>({
        queryKey: ['expenses', apiParams],
        queryFn: () => getExpenses(apiParams),
        refetchOnWindowFocus: false
    })
}