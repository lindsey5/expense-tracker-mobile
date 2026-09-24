import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useToastStore } from "@/lib/store/toastStore";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import useMutationError from "@/hooks/useMutationError";

type UpdateWalletDto = z.infer<typeof schemas.UpdateWalletDto>;

const updateWallet = ({ id, data }: { id: string; data: UpdateWalletDto; }) => api.update_wallet(data, { params: { id } });

export default function useUpdateWallet() {
    const { showToast } = useToastStore();
    const { clearError, onError } = useMutationError();

    return useMutation({
        mutationFn: updateWallet,
        onMutate: clearError,
        onError,
        onSuccess: (data) => {
            showToast(data.message, "success");
        },
    });
}
