import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useQuery } from "@tanstack/react-query";
import z from "zod";
import useRemoveQueryCache from "../use-remove-query-cache";

export type GetWalletsResponse = z.infer<typeof schemas.GetWalletsResponseDto>;

const getWallets = () => api.get("/wallet");

export default function useGetWallets() {

    useRemoveQueryCache(["wallets"]);

    return useQuery<GetWalletsResponse>({
        queryKey: ['wallets'],
        queryFn: getWallets,
        refetchOnWindowFocus: false
    })
}