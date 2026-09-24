import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import useMutationError from "@/hooks/useMutationError";

const isEmailExist = (email: string) => api.UserController_userLookup({ email });

export default function useIsEmailExist() {
    const { clearError, onError } = useMutationError();

    return useMutation({
        mutationFn: isEmailExist,
        onMutate: clearError,
        onError,
    })
}
