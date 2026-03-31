"use client"

import { apiActions } from "@/tools/axios";
import { AxiosResponse } from "axios";
import { PaginatedResponse } from "./general";
import { QuotationLine } from "./quotationlines";

export interface Quotation {
    id: string;
    reference: string;
    code: string;
    // there are can either be a lead or a partner
    lead?: string; // lead reference
    partner?: string; // partner code
    title: string;
    date: string;
    expiry_date: string;
    status: "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED" | "EXPIRED";
    notes: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
    quotation_total: string;
    payment_account?: string;
    terms_and_conditions?: string;
    lines?: QuotationLine[];
}

interface createQuotationData {
    // there are can either be a lead or a partner
    lead?: string; // lead reference
    partner?: string; // partner code
    date: string;
    expiry_date: string;
    status: "DRAFT";
    notes: string;
    payment_account?: string;
    terms_and_conditions?: string;
}

interface updateQuotationData {
    // there are can either be a lead or a partner
    lead?: string; // lead reference
    partner?: string; // partner code
    date?: string;
    expiry_date?: string;
    status?: "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED" | "EXPIRED";
    notes?: string;
    payment_account?: string;
    terms_and_conditions?: string;
}

export const getQuotations = async (headers: {
    headers: { Authorization: string };
}): Promise<Quotation[]> => {
    const response: AxiosResponse<PaginatedResponse<Quotation>> =
        await apiActions.get(`/api/v1/quotations/`, headers);
    return response.data.results || [];
};

export const getQuotation = async (
    reference: string,
    headers: { headers: { Authorization: string } }
): Promise<Quotation> => {
    const response: AxiosResponse<Quotation> = await apiActions.get(
        `/api/v1/quotations/${reference}/`,
        headers
    );
    return response.data;
};

export const updateQuotation = async (
    reference: string,
    data: updateQuotationData,
    headers: { headers: { Authorization: string } }
): Promise<Quotation> => {
    const response: AxiosResponse<Quotation> = await apiActions.patch(
        `/api/v1/quotations/${reference}/`,
        data,
        headers
    );
    return response.data;
};

export const convertQuotationToInvoice = async (
    reference: string,
    headers: { headers: { Authorization: string } }
): Promise<{ message: string; invoice_reference: string; invoice_code: string }> => {
    const response: AxiosResponse<{ message: string; invoice_reference: string; invoice_code: string }> = await apiActions.post(
        `/api/v1/quotations/${reference}/convert/`,
        {},
        headers
    );
    return response.data;
};

export const createQuotation = async (
    data: createQuotationData,
    headers: { headers: { Authorization: string } }
): Promise<Quotation> => {
    const response: AxiosResponse<Quotation> = await apiActions.post(
        `/api/v1/quotations/`,
        data,
        headers
    );
    return response.data;
};
