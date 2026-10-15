import { authenticatedClient } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useQuery } from "@tanstack/react-query";
import z from "zod";

export type GetTotalBalanceResponse = z.infer<typeof schemas.GetTotalBalance>;

const getTotalBalance = () => authenticatedClient.get_total_balance();

export default function useGetTotalBalance() {

    return useQuery<GetTotalBalanceResponse>({
        queryKey: ['total-balance'],
        queryFn: getTotalBalance,
        refetchOnMount: true
    })
}