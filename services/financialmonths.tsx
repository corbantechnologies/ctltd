"use client";

import { apiActions } from "@/tools/axios";
import { AxiosResponse } from "axios";

export interface FinancialMonth {
  id: string;
  reference: string;
  financial_year: string;
  name: string; // "JAN2024"
  month: number;
  year: number;
  start_date: string;
  end_date: string;
  is_closed: boolean;
  report_pdf: string | null;
  report_generated_at: string | null;
  journals_count: number;
  unposted_journals_count: number;
  created_at: string;
  updated_at: string;
}

export interface BookSummaryRow {
  book__code: string;
  book__name: string;
  total_debit: number;
  total_credit: number;
}

export interface DivisionSummaryRow {
  division__name: string;
  total_debit: number;
  total_credit: number;
}

export interface FinancialMonthDetail extends FinancialMonth {
  report: {
    total_debits: number;
    total_credits: number;
    net_movement: number;
    book_summary: BookSummaryRow[];
    division_summary: DivisionSummaryRow[];
    journals: {
        reference: string;
        code: string;
        date: string;
        description: string;
        journal_type: string;
        is_posted: boolean;
        status: string;
    }[];
  };
}

// List all months, optionally filtered by fiscal year reference
export const getFinancialMonths = async (
  headers: { headers: { Authorization: string } },
  financialYearRef?: string
): Promise<FinancialMonth[]> => {
  const params = financialYearRef
    ? `?financial_year=${financialYearRef}`
    : "";
  const response: AxiosResponse<FinancialMonth[]> = await apiActions.get(
    `/api/v1/financialmonths/${params}`,
    headers
  );
  // API returns a plain array (not paginated)
  return response.data;
};

// Get a single month (with live report data)
export const getFinancialMonth = async (
  reference: string,
  headers: { headers: { Authorization: string } }
): Promise<FinancialMonthDetail> => {
  const response: AxiosResponse<FinancialMonthDetail> = await apiActions.get(
    `/api/v1/financialmonths/${reference}/`,
    headers
  );
  return response.data;
};

// Close a month (Finance / Director only)
export const closeFinancialMonth = async (
  reference: string,
  headers: { headers: { Authorization: string } }
): Promise<FinancialMonth> => {
  const response: AxiosResponse<FinancialMonth> = await apiActions.post(
    `/api/v1/financialmonths/${reference}/close/`,
    {},
    headers
  );
  return response.data;
};

// Reopen a closed month (Director / Finance only)
export const reopenFinancialMonth = async (
  reference: string,
  headers: { headers: { Authorization: string } }
): Promise<FinancialMonth> => {
  const response: AxiosResponse<FinancialMonth> = await apiActions.post(
    `/api/v1/financialmonths/${reference}/reopen/`,
    {},
    headers
  );
  return response.data;
};
