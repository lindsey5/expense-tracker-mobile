import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useQuery } from "@tanstack/react-query";
import z from "zod";

export type GetExpensesResponse = z.infer<typeof schemas.GetExpensesResponseDto>;

const getExpenses = () => api.get("/transaction/expenses");

export default function useGetExpenses() {
    return useQuery<GetExpensesResponse>({
        queryKey: ['expenses'],
        queryFn: getExpenses,
        refetchOnWindowFocus: false
    })
}