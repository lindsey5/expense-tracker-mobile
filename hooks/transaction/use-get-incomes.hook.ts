import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useQuery } from "@tanstack/react-query";
import z from "zod";

export type GetIncomesResponse = z.infer<typeof schemas.GetIncomesResponseDto>;

const getIncomes = () => api.get("/transaction/incomes");

export default function useGetIncomes() {
    return useQuery<GetIncomesResponse>({
        queryKey: ['incomes'],
        queryFn: getIncomes,
        refetchOnWindowFocus: false
    })
}