import { authenticatedClient } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useQuery } from "@tanstack/react-query";
import z from "zod";

export type GetWalletsResponse = z.infer<typeof schemas.GetWalletsResponseDto>;

const getWallets = () => authenticatedClient.list_wallets();

export default function useGetWallets() {

    return useQuery<GetWalletsResponse>({
        queryKey: ['wallets'],
        queryFn: getWallets,
        refetchOnMount: true
    })
}