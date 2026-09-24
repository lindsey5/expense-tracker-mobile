import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useToastStore } from "@/lib/store/toastStore";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import useMutationError from "@/hooks/useMutationError";

type CreateTransactionDto = z.infer<typeof schemas.CreateTransactionDto>;

const createTransaction = (data: CreateTransactionDto) => {
    return api.create_transaction(data);
}

export default function useCreateTransaction() {
    const { showToast } = useToastStore();
    const { clearError, onError } = useMutationError();

    return useMutation({
        mutationFn: createTransaction,
        onMutate: clearError,
        onError,
        onSuccess: (data) => {
            showToast(data.message, "success");
        },
    })
}
