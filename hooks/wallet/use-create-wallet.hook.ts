import { authenticatedClient } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useToastStore } from "@/lib/store/toastStore";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import useMutationError from "@/hooks/useMutationError";

type CreateWalletDto = z.infer<typeof schemas.CreateWalletDto>;

const createWallet = (data: CreateWalletDto) => authenticatedClient.create_wallet(data);

export default function useCreateWallet() {
    const { showToast } = useToastStore();
    const { clearError, onError } = useMutationError();

    return useMutation({
        mutationFn: createWallet,
        onMutate: clearError,
        onError,
        onSuccess: (data) => {
            showToast(data.message, "success");
        },
    })
}
