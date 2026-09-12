import { createApiClient } from './openapi';
import { useErrorStore } from '@/lib/store/errorStore';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

export const api = createApiClient(
    process.env.EXPO_PUBLIC_BACKEND_URL!,
);

api.axios.interceptors.request.use(
    (config) => {
        useErrorStore.getState().clearError();

        const accessToken = useAuthStore.getState().accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

api.axios.interceptors.response.use(
    (response) => {
        useErrorStore.getState().clearError();
        return response;
    },
    (error) => {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                useAuthStore.getState().logout();
            }

            const message = error.response?.data?.message;

            console.log("Error message", message)

            useErrorStore.getState().setError(
                Array.isArray(message)
                ? message.join(', ')
                : message || error.message || 'Something went wrong',
            );
        } else {
            useErrorStore.getState().setError('Something went wrong');
        }

        return Promise.reject(error);
    },
);