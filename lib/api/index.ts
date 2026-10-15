import axios from 'axios';
import { createApiClient } from './openapi';
import { useAuthStore } from '../store/authStore';

export const client = createApiClient(
    process.env.EXPO_PUBLIC_BACKEND_URL!,
);

export const authenticatedClient = createApiClient(
    process.env.EXPO_PUBLIC_BACKEND_URL!,
);

authenticatedClient.axios.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

authenticatedClient.axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            useAuthStore.getState().logout();
        }

        return Promise.reject(error);
    },
);