import { createApiClient } from './openapi';
import { useErrorStore } from '@/lib/store/errorStore';
import axios from 'axios';

export const api = createApiClient(
    process.env.EXPO_PUBLIC_BACKEND_URL!
);

api.axios.interceptors.request.use((config) => {
    useErrorStore.getState().clearError();
    return config;
});

api.axios.interceptors.response.use(
    (response) => {
        useErrorStore.getState().clearError();
        return response;
    },
    (error) => {
        if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        useErrorStore.getState().setError(
            Array.isArray(message)
            ? message.join(', ')
            : message || error.message || 'Something went wrong'
        );
        } else {
        useErrorStore.getState().setError('Something went wrong');
        }

        return Promise.reject(error);
    }
);