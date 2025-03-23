import {useQuery} from "@tanstack/react-query";
import QUERY_KEYS from "./queryKeys";
import { search, getScrappingLogs } from "./apis";

export function useGetSearchResults(queryParameters: any) {

    return useQuery({
        queryKey: [QUERY_KEYS.searchResults, queryParameters?.query || "search"],
        queryFn: async () => {
            if (!queryParameters || Object.keys(queryParameters).length === 0) {
                return { results: [] }; // Return empty default result
            }
            const result = await search(queryParameters);
            return result || { results: [] }; // Ensure we never return undefined
        },
        retry: false,
        enabled: false,
    });
}

export function useGetScrappingLogs() {
    return useQuery({
        queryKey: [QUERY_KEYS.logs],
        queryFn: () => getScrappingLogs(),
        retry: false,
    });
}

