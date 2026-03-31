"use client"

import { apiActions } from "@/tools/axios";
import { AxiosResponse } from "axios";
import { PaginatedResponse } from "./general";

export interface TermsAndConditions {
    id: string;
    reference: string;
    name: string;
    content: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export const getTermsAndConditions = async (): Promise<TermsAndConditions[]> => {
    const response: AxiosResponse<PaginatedResponse<TermsAndConditions>> =
        await apiActions.get(`/api/v1/termsandconditions/`);
    return response.data.results || [];
};

export const getTermsAndCondition = async (
    reference: string,
): Promise<TermsAndConditions> => {
    const response: AxiosResponse<TermsAndConditions> = await apiActions.get(
        `/api/v1/termsandconditions/${reference}/`
    );
    return response.data;
};