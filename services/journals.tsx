"use client";

import { apiActions } from "@/tools/axios";
import { AxiosResponse } from "axios";
import { PaginatedResponse } from "./general";

interface Journal {
  code: string;
  journal_type: string;
  date: string;
  description: string;
  is_posted: boolean;
  status: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  reference: string;
}

interface createJournal {
  journal_type: string;
  date: string;
  description: string;
}

interface updateJournal {
  journal_type?: string;
  date?: string;
  description?: string;
}

// finance responsibilities

export const createJournal = async (
  data: createJournal,
  headers: { headers: { Authorization: string } }
): Promise<Journal> => {
  const response: AxiosResponse<Journal> = await apiActions.post(
    `/api/v1/journals/`,
    data,
    headers
  );
  return response.data;
};

export const postJournal = async (
  reference: string,
  headers: { headers: { Authorization: string } }
): Promise<Journal> => {
  const response: AxiosResponse<Journal> = await apiActions.patch(
    `/api/v1/journals/${reference}/`,
    { is_posted: true },
    headers
  );
  return response.data;
};

export const updateJournal = async (
  reference: string,
  data: updateJournal,
  headers: { headers: { Authorization: string } }
): Promise<Journal> => {
  const response: AxiosResponse<Journal> = await apiActions.patch(
    `/api/v1/journals/${reference}/`,
    data,
    headers
  );
  return response.data;
};

// All can read

export const getJournals = async (headers: {
  headers: { Authorization: string };
}): Promise<Journal[]> => {
  const response: AxiosResponse<PaginatedResponse<Journal>> =
    await apiActions.get(`/api/v1/journals/`, headers);
  return response.data.results || [];
};

export const getJournal = async (
  reference: string,
  headers: { headers: { Authorization: string } }
): Promise<Journal> => {
  const response: AxiosResponse<Journal> = await apiActions.get(
    `/api/v1/journals/${reference}/`,
    headers
  );
  return response.data;
};
