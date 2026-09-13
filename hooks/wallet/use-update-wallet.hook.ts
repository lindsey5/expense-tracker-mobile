import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useToastStore } from "@/lib/store/toastStore";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

type UpdateWalletDto = z.infer<typeof schemas.UpdateWalletDto>;

const updateWallet = ({ id, data }: { id: string; data: UpdateWalletDto; }) => api.patch("/wallet/:id", data, { params: { id } });

export default function useUpdateWallet() {
    const { showToast } = useToastStore();

    return useMutation({
        mutationFn: updateWallet,
        onSuccess: (data) => {
            showToast(data.message, "success");
        },
    });
}