import { api } from "@/lib/api";
import { useToastStore } from "@/lib/store/toastStore";
import { useMutation } from "@tanstack/react-query";
import useMutationError from "@/hooks/useMutationError";

const deleteTransaction = (id: string) => api.delete_transaction(undefined, { params: { id }});

export default function useDeleteTransaction() {
    const { showToast } = useToastStore();
    const { clearError, onError } = useMutationError();

    return useMutation({
        mutationFn: deleteTransaction,
        onMutate: clearError,
        onError,
        onSuccess: (data) => {
            showToast(data.message, "success");
        },
    });
}
