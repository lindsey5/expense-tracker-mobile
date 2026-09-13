import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

type CreateWalletDto = z.infer<typeof schemas.CreateWalletDto>;

const createWallet = (data: CreateWalletDto) => api.post("/wallet", data);

export default function useCreateWallet() {
    return useMutation({
        mutationFn: createWallet
    })
}