import { router, useLocalSearchParams } from 'expo-router';

export function useQuery<T extends Record<string, any>>() {
    const params = useLocalSearchParams();

    const query = params as T;

    const setQuery = (updates: Partial<T>) => {
        router.setParams(updates);
    };

    const pushQuery = (newQuery: Record<string, string | number | (string | number)[] | null | undefined>) => {
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