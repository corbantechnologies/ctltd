"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../authentication/useAxiosAuth";
import { getPNL, getBalanceSheet, getTrialBalance, getRevenue, getCashBalance, getGLStatement } from "@/services/reports";

export function useFetchPNL() {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["pnl"],
        queryFn: () => getPNL(header),
        enabled: !!header.headers.Authorization,
    });
}

export function useFetchBalanceSheet() {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["balance-sheet"],
        queryFn: () => getBalanceSheet(header),
        enabled: !!header.headers.Authorization,
    });
}

export function useFetchTrialBalance() {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["trial-balance"],
        queryFn: () => getTrialBalance(header),
        enabled: !!header.headers.Authorization,
    });
}

export function useFetchRevenue() {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["revenue"],
        queryFn: () => getRevenue(header),
        enabled: !!header.headers.Authorization,
    });
}

export function useFetchCashBalance() {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["cash-balance"],
        queryFn: () => getCashBalance(header),
        enabled: !!header.headers.Authorization,
    });
}

export function useFetchGLStatement(bookReference: string, params: { start_date?: string; end_date?: string; division?: string } = {}) {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["gl-statement", bookReference, params],
        queryFn: () => getGLStatement(bookReference, params, header),
        enabled: !!bookReference && !!header.headers.Authorization,
    });
}


