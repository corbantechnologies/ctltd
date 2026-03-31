"use client"

import { apiActions } from "@/tools/axios";
import { AxiosResponse } from "axios";
import { PaginatedResponse } from "./general";

export interface Quotation {
    id: string;
    reference: string;
    code: string;
    lead?: string;
    partner?: string;
    date: string;
    expiry_date: string;
    status: "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED" | "EXPIRED";
    notes: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
    payment_account?: string;
    terms_and_conditions?: string;
    lines?: any[];
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
    data: any,
    headers: { headers: { Authorization: string } }
): Promise<Quotation> => {
    const response: AxiosResponse<Quotation> = await apiActions.post(
        `/api/v1/quotations/`,
        data,
        headers
    );
    return response.data;
};
