import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { schemas } from "@/lib/api/openapi";
import z from "zod";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "expo-router";
import useMutationError from "@/hooks/useMutationError";

type LoginData = z.infer<typeof schemas.LoginUserDTO>;

const login = (data: LoginData) => api.post("/auth/login", data);

export default function useLogin() {
    const setLogin = useAuthStore((state) => state.login);
    const router = useRouter();
    const { clearError, onError } = useMutationError();

    return useMutation({
        mutationFn: login,
        onMutate: clearError,
        onError,
        onSuccess: (data) => {
            setLogin(data);
            router.push('/dashboard');
        },
    });
}
