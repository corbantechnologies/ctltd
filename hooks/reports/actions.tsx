"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../authentication/useAxiosAuth";
import { getPNL, getBalanceSheet, getTrialBalance, getRevenue, getCashBalance } from "@/services/reports";

export function useFetchPNL() {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["pnl"],
        queryFn: () => getPNL(header),
        enabled: true,
    });
}

export function useFetchBalanceSheet() {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["balance-sheet"],
        queryFn: () => getBalanceSheet(header),
        enabled: true,
    });
}

export function useFetchTrialBalance() {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["trial-balance"],
        queryFn: () => getTrialBalance(header),
        enabled: true,
    });
}

export function useFetchRevenue() {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["revenue"],
        queryFn: () => getRevenue(header),
        enabled: true,
    });
}

export function useFetchCashBalance() {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["cash-balance"],
        queryFn: () => getCashBalance(header),
        enabled: true,
    });
}

