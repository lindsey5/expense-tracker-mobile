import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useQuery } from "@tanstack/react-query";
import z from "zod";

export type GetMonthsResponse = z.infer<typeof schemas.GetMonths>[];

const getMonths = (url: "/transaction/months" | "/budget/months" = "/transaction/months") => api.get(url);

export default function useGetMonths(url: "/transaction/months" | "/budget/months"= "/transaction/months") {
    return useQuery<GetMonthsResponse>({
        queryKey: ['months'],
        queryFn: () => getMonths(url),
        refetchOnWindowFocus: false
    })
}