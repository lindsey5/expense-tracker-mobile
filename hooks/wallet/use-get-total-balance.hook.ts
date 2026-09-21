import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useQuery } from "@tanstack/react-query";
import z from "zod";
import useRemoveQueryCache from "../use-remove-query-cache";

export type GetTotalBalanceResponse = z.infer<typeof schemas.GetTotalBalance>;

const getTotalBalance = () => api.get("/wallet/total-balance");

export default function useGetTotalBalance() {
    
    useRemoveQueryCache(['total-balance']);

    return useQuery<GetTotalBalanceResponse>({
        queryKey: ['total-balance'],
        queryFn: getTotalBalance,
        refetchOnWindowFocus: false
    })
}