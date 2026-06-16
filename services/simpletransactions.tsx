"use client";

import { apiActions } from "@/tools/axios";
import { AxiosResponse } from "axios";
import { PaginatedResponse } from "./general";

export interface SimpleTransaction {
  id: string;
  code: string;
  created_by: string;
  ledger_book: string;
  payment_method: string;
  division: string;
  journal_type: string;
  partner: string | null;
  journal: string | null;
  name: string;
  transaction_type: "MONEY_IN" | "MONEY_OUT";
  amount: string;
  date: string;
  source_document: string | null;
  document_number: string | null;
  document_file: string | null;
  reference: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSimpleTransaction {
  name: string;
  transaction_type: "MONEY_IN" | "MONEY_OUT";
  ledger_book: string;      // book name
  payment_method: string;   // payment method name
  division: string;         // division name
  journal_type: string;     // journal type name
  partner?: string | null;  // partner name (optional)
  amount: number;
  date: string;
  source_document?: string | null;
  document_number?: string | null;
}

export const createSimpleTransaction = async (
  data: CreateSimpleTransaction,
  headers: { headers: { Authorization: string } }
): Promise<SimpleTransaction> => {
  const response: AxiosResponse<SimpleTransaction> = await apiActions.post(
    `/api/v1/simpletransactions/`,
    data,
    headers
  );
  return response.data;
};

export const getSimpleTransactions = async (
  headers: { headers: { Authorization: string } },
  filters?: Record<string, string>
): Promise<PaginatedResponse<SimpleTransaction>> => {
  const queryParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
  }
  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
  const response: AxiosResponse<PaginatedResponse<SimpleTransaction>> =
    await apiActions.get(`/api/v1/simpletransactions/${queryString}`, headers);
  return response.data;
};

export const getSimpleTransaction = async (
  reference: string,
  headers: { headers: { Authorization: string } }
): Promise<SimpleTransaction> => {
  const response: AxiosResponse<SimpleTransaction> = await apiActions.get(
    `/api/v1/simpletransactions/${reference}/`,
    headers
  );
  return response.data;
};
