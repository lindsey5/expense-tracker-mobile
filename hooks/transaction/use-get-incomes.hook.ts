import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useQuery } from "@tanstack/react-query";
import z from "zod";
import type { ZodiosQueryParamsByAlias } from "@zodios/core";
import { ApiType } from "@/types/api.type";

export type GetIncomesQueryParams = ZodiosQueryParamsByAlias<ApiType, "get_transaction_incomes">;
export type GetIncomesResponse = z.infer<typeof schemas.GetIncomesResponseDto>;

const getIncomes = (queries: GetIncomesQueryParams) => api.get("/transaction/incomes", { queries });

export default function useGetIncomes(params: GetIncomesQueryParams) {
    const apiParams = {
        month: params.month ? Number(params.month) : new Date().getMonth() + 1,
        year: params.year ? Number(params.year) : new Date().getFullYear(),
    }
    
    const result =  useQuery<GetIncomesResponse>({
        queryKey: ['incomes', apiParams],
        queryFn: () => getIncomes(apiParams),
        refetchOnWindowFocus: false
    })

    return result
}