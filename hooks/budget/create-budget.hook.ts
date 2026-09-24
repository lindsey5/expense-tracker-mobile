import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useToastStore } from "@/lib/store/toastStore";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import useMutationError from "@/hooks/useMutationError";

type CreateBudgetDto = z.infer<typeof schemas.CreateBudgetDto>;

const createBudget = (data: CreateBudgetDto) => {
    return api.create_budget(data);
}

export default function useCreateBudget() {
    const { showToast } = useToastStore();
    const { clearError, onError } = useMutationError();

    return useMutation({
        mutationFn: createBudget,
        onMutate: clearError,
        onError,
        onSuccess: (data) => {
            showToast(data.message, "success");
        },
    })
}
