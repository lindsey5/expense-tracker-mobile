import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type AuthState = {
  accessToken: string | null;
  user: User | null;
  login: (data: {
    accessToken: string;
    user: User;
  }) => void;
  logout: () => void;
};

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
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);