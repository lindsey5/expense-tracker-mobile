import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useQuery } from "@tanstack/react-query";
import z from "zod";
import useRemoveQueryCache from "./use-remove-query-cache";

export type GetMonthsResponse = z.infer<typeof schemas.GetMonths>[];

const getMonths = (url: "/transaction/months" | "/budget/months" = "/transaction/months") => {
  if (url === "/budget/months") return api.budget_months();
  return api.list_transaction_months();
};

export default function useGetMonths(url: "/transaction/months" | "/budget/months"= "/transaction/months") {
     useRemoveQueryCache(["months"]);
    
    return useQuery<GetMonthsResponse>({
        queryKey: ['months'],
        queryFn: () => getMonths(url),
        refetchOnWindowFocus: false
    })
}