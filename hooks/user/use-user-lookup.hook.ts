import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

const isEmailExist = (email: string) => api.post("/user/lookup", { email });

export default function useIsEmailExist() {
    return useMutation({
        mutationFn: isEmailExist
    })
}