
import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useToastStore } from "@/lib/store/toastStore";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import useMutationError from "@/hooks/useMutationError";

type UpdateTransactionDto = z.infer<typeof schemas.UpdateTransactionDto>;

const updateTransaction = (id: string, data: UpdateTransactionDto) => {
    return api.update_transaction(data, { params: { id } });
}

export default function useUpdateTransaction() {
    const { showToast } = useToastStore();
    const { clearError, onError } = useMutationError();

    return useMutation({
        mutationFn: ({ data, id } : { id: string; data: UpdateTransactionDto }) => updateTransaction(id, data),
        onMutate: clearError,
        onError,
        onSuccess: (data) => {
            showToast(data.message, "success");
        },
    })
}
