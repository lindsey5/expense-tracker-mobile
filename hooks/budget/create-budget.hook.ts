import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import { useToastStore } from "@/lib/store/toastStore";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

type CreateBudgetDto = z.infer<typeof schemas.CreateBudgetDto>;

const createBudget = (data: CreateBudgetDto) => {
    return api.post("/budget", data);
}

export default function useCreateBudget() {
    const { showToast } = useToastStore();

    return useMutation({
        mutationFn: createBudget,
        onSuccess: (data) => {
            showToast(data.message, "success");
        },
    })
}