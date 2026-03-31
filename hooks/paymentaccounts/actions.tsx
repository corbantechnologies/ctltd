"use client";

import { useQuery } from "@tanstack/react-query";
import { getPaymentAccounts, getPaymentAccount } from "@/services/paymentaccounts";

export function useFetchPaymentAccounts() {

    return useQuery({
        queryKey: ["paymentaccounts"],
        queryFn: () => getPaymentAccounts(),
    });
}

export function useFetchPaymentAccount(reference: string) {

    return useQuery({
        queryKey: ["paymentaccount", reference],
        queryFn: () => getPaymentAccount(reference),
        enabled: !!reference
    });
}
