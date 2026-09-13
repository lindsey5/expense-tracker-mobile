import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useToastStore } from "@/lib/store/toastStore";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

type CreateTransactionDto = z.infer<typeof schemas.CreateTransactionDto>;

const createTransaction = (data: CreateTransactionDto) => api.post("/transaction", data);

export default function useCreateTransaction() {
    const { showToast } = useToastStore();

    return useMutation({
        mutationFn: createTransaction,
        onSuccess: (data) => {
            showToast(data.message, "success");
        },
    })
}