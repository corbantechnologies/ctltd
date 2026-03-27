"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../authentication/useAxiosAuth";
import { getPNL, getBalanceSheet, getTrialBalance, getRevenue, getCashBalance } from "@/services/reports";

export function useFetchPNL() {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["pnl"],
        queryFn: () => getPNL(header),
        enabled: !!header && !!header.headers.Authorization,.headers.Authorization,
    });
}

export function useFetchBalanceSheet() {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["balance-sheet"],
        queryFn: () => getBalanceSheet(header),
        enabled: !!header && !!header.headers.Authorization,.headers.Authorization,
    });
}

export function useFetchTrialBalance() {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["trial-balance"],
        queryFn: () => getTrialBalance(header),
        enabled: !!header && !!header.headers.Authorization,.headers.Authorization,
    });
}

export function useFetchRevenue() {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["revenue"],
        queryFn: () => getRevenue(header),
        enabled: !!header && !!header.headers.Authorization,.headers.Authorization,
    });
}

export function useFetchCashBalance() {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["cash-balance"],
        queryFn: () => getCashBalance(header),
        enabled: !!header && !!header.headers.Authorization,.headers.Authorization,
    });
}

