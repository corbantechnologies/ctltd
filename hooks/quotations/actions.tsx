"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "../authentication/useAxiosAuth";
import { 
    getQuotations, 
    getQuotation, 
    convertQuotationToInvoice,
    createQuotation
} from "@/services/quotations";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useFetchQuotations() {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["quotations"],
        queryFn: () => getQuotations(header),
        enabled: !!header.headers.Authorization && header.headers.Authorization !== "Token undefined",
    });
}

export function useFetchQuotation(reference: string) {
    const header = useAxiosAuth();

    return useQuery({
        queryKey: ["quotation", reference],
        queryFn: () => getQuotation(reference, header),
        enabled: !!reference && !!header.headers.Authorization && header.headers.Authorization !== "Token undefined",
    });
}

export function useConvertQuotationToInvoice(reference: string, rolePrefix: string) {
    const header = useAxiosAuth();
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: () => convertQuotationToInvoice(reference, header),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["quotations"] });
            queryClient.invalidateQueries({ queryKey: ["invoices"] });
            toast.success("Quotation successfully converted to Invoice");
            router.push(`/${rolePrefix}/invoices/${data.invoice_reference}`);
        },
        onError: (error: any) => {
            const message = error.response?.data?.error || "Conversion failed";
            toast.error(message);
        },
    });
}

export function useCreateQuotation(rolePrefix: string) {
    const header = useAxiosAuth();
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (data: any) => createQuotation(data, header),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["quotations"] });
            toast.success("Quotation created successfully");
            router.push(`/${rolePrefix}/quotations/${data.reference}`);
        },
        onError: (error: any) => {
            const message = error.response?.data?.error || "Creation failed";
            toast.error(message);
        },
    });
}
