import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import { schemas } from "@/lib/api/openapi";
import z from "zod";
import { useRouter } from "expo-router";
import { useToastStore } from "@/lib/store/toastStore";

type VerifyData = z.infer<typeof schemas.VerifyDTO>;

const verify = (data: VerifyData) => api.post("/auth/verify", data);

export default function useVerify() {
    const router = useRouter();
    const { showToast } = useToastStore();

    return useMutation({
        mutationFn: verify,
        onSuccess: (data) => {
            showToast(data.message, "success");
            router.replace('/');
        },
    });
}