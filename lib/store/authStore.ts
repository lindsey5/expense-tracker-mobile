import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { z } from 'zod';

import { schemas } from '@/lib/api/openapi';
import { Platform } from 'react-native';

type LoginResponse = z.infer<typeof schemas.AuthResponseDto>;

type AuthState = {
  accessToken: string | null;
  user: LoginResponse['user'] | null;
  login: (data: LoginResponse) => void;
  logout: () => void;
};

const storage =
  Platform.OS === "web"
    ? createJSONStorage(() => localStorage)
    : createJSONStorage(() => AsyncStorage);

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
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
        }),
        {
        name: 'auth-storage',
        storage,
        },
    ),
);