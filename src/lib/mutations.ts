
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { getAuthorPublications } from "./apis";
import QUERY_KEYS from "./queryKeys";


export const useManageCoventryAuthors = () => {
    const queryClient = useQueryClient();
    return {
        authorPublications: useMutation({
            mutationFn: (values: any) => getAuthorPublications(values),
            onSuccess:  (_, variables) => {
                //@ts-ignore
                queryClient.invalidateQueries([QUERY_KEYS.authorPublications, variables]);
            }
        }),
    } 
}

