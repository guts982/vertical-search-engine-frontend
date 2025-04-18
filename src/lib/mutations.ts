
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { classifyText, getAuthorPublications } from "./apis";
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



export const useManageClassifications = () => {
    const queryClient = useQueryClient();
    return {
        classifyText: useMutation({
            mutationFn: (values: any) => classifyText(values),
            onSuccess:  (_, variables) => {
                //@ts-ignore
                queryClient.invalidateQueries([QUERY_KEYS.textClassification, variables]);
            }
        }),
    } 
}

