import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import z from "zod";
import { useRouter } from "expo-router";
import { useToastStore } from "@/lib/store/toastStore";
import useMutationError from "@/hooks/useMutationError";

type VerifyData = z.infer<typeof schemas.VerifyDTO>;

const verify = (data: VerifyData) => api.verify_email(data);

export default function useVerify() {
    const router = useRouter();
    const { showToast } = useToastStore();
    const { clearError, onError } = useMutationError();

    return useMutation({
        mutationFn: verify,
        onMutate: clearError,
        onError,
        onSuccess: (data) => {
            showToast(data.message, "success");
            router.replace('/');
        },
    });
}
