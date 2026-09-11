import { create } from "zustand";
import { z } from "zod";
import { schemas } from "@/lib/api/openapi";

type LoginResponse = z.infer<typeof schemas.AuthResponseDto>;

type AuthState = {
    accessToken: string | null;
    user: LoginResponse["user"] | null;

    login: (data: LoginResponse) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    user: null,

    login: (data) =>
        set({
            accessToken: data.accessToken,
            user: data.user,
        }),

    logout: () =>
        set({
            accessToken: null,
            user: null,
        }),
}));