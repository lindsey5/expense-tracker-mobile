import { createApiClient } from './openapi';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

export const api = createApiClient(
    process.env.EXPO_PUBLIC_BACKEND_URL!,
);

api.axios.interceptors.request.use(
    (config) => {
        const accessToken = useAuthStore.getState().accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

api.axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                useAuthStore.getState().logout();
                return;
            }
        }

        return Promise.reject(error);
    },
);
