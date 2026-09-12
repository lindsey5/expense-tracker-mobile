import { router, useLocalSearchParams } from 'expo-router';

export function useQuery<T extends Record<string, any>>() {
    const params = useLocalSearchParams();

    const query = params as T;

    const setQuery = (updates: Partial<T>) => {
        router.setParams(updates);
    };

    const pushQuery = (newQuery: T) => {
        setQuery({
            ...query,
            ...newQuery
        })
    }

    return {
        query,
        setQuery,
        pushQuery,
    };
}