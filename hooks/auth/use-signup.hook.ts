import { useMutation } from "@tanstack/react-query";
import { schemas } from "@/lib/api/openapi";
import z from "zod";
import { api } from "@/lib/api";
import useMutationError from "@/hooks/useMutationError";

type SignupData = z.infer<typeof schemas.SignupUserDTO>;

const signup = (data: SignupData) => api.signup(data);

export default function useSignup() {
    const { clearError, onError } = useMutationError();

    return useMutation({
        mutationFn: signup,
        onMutate: clearError,
        onError,
    });
}
