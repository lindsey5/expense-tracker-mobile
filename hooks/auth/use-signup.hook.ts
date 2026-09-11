import { useMutation } from "@tanstack/react-query";
import { schemas } from "@/lib/api/openapi";
import z from "zod";
import { api } from "@/lib/api/api";

type SignupData = z.infer<typeof schemas.SignupUserDTO>;

const signup = (data: SignupData) => api.post("/auth/signup", data);

export default function useSignup() {
    return useMutation({
        mutationFn: signup,
    });
}
