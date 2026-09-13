import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useQuery } from "@tanstack/react-query";
import z from "zod";

export type GetMonthsResponse = z.infer<typeof schemas.GetTransactionMonths>[];

const getMonths = () => api.get("/transaction/months");

export default function useGetMonths() {
    return useQuery<GetMonthsResponse>({
        queryKey: ['months'],
        queryFn: getMonths,
        refetchOnWindowFocus: false
    })
}