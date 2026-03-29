"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../authentication/useAxiosAuth";
import { getLeads, getLead } from "@/services/leads";

export function useFetchLeads() {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["leads"],
        queryFn: () => getLeads(header),
        enabled: !!header.headers.Authorization && header.headers.Authorization !== "Token undefined",
    });
}

export function useFetchLead(reference: string) {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["lead", reference],
        queryFn: () => getLead(reference, header),
        enabled: !!reference && !!header.headers.Authorization && header.headers.Authorization !== "Token undefined",
    });
}
