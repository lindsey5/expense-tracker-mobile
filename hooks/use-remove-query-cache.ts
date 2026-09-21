import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useRemoveQueryCache(
    queryKey: readonly unknown[],
) {
    const queryClient = useQueryClient();

    useEffect(() => {
        return () => {
            queryClient.removeQueries({
                queryKey,
            });
        };
    }, [queryClient, queryKey]);
}