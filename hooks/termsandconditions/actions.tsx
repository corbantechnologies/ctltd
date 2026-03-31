"use client";

import { useQuery } from "@tanstack/react-query";
import { getTermsAndConditions, getTermsAndCondition } from "@/services/termsandconditions";

export function useFetchTermsAndConditions() {

    return useQuery({
        queryKey: ["termsandconditions"],
        queryFn: () => getTermsAndConditions(),
    });
}

export function useFetchTermsAndCondition(reference: string) {

    return useQuery({
        queryKey: ["termsandcondition", reference],
        queryFn: () => getTermsAndCondition(reference),
        enabled: !!reference
    });
}
