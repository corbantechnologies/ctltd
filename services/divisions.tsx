"use client";

import { apiActions } from "@/tools/axios";
import { AxiosResponse } from "axios";
import { PaginatedResponse } from "./general";

interface Division {
  name: string;
  code: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  reference: string;
}

interface createDivision {
  name: string; //errors expected if the name is not unique
  is_active: boolean; // backend already defaults to true
}

interface updateDivision {
  name: string;
  is_active: boolean;
}

// All actions here are performed by users with the director role

export const createDivision = async (
  data: createDivision,
  headers: { headers: { Authorization: string } }
): Promise<Division> => {
  const response: AxiosResponse<Division> = await apiActions.post(
    `/api/v1/divisions/`,
    data,
    headers
  );
  return response.data;
};

export const getDivisions = async (headers: {
  headers: { Authorization: string };
}): Promise<Division[]> => {
  const response: AxiosResponse<PaginatedResponse<Division>> =
    await apiActions.get(`/api/v1/divisions/`, headers);
  return response.data.results || [];
};

export const getDivision = async (
  reference: string,
  headers: { headers: { Authorization: string } }
): Promise<Division> => {
  const response: AxiosResponse<Division> = await apiActions.get(
    `/api/v1/divisions/${reference}/`,
    headers
  );
  return response.data;
};

export const updateDivision = async (
  reference: string,
  data: updateDivision,
  headers: { headers: { Authorization: string } }
): Promise<Division> => {
  const response: AxiosResponse<Division> = await apiActions.patch(
    `/api/v1/divisions/${reference}/`,
    data,
    headers
  );
  return response.data;
};

export const deleteDivision = async (
  reference: string,
  headers: { headers: { Authorization: string } }
): Promise<Division> => {
  const response: AxiosResponse<Division> = await apiActions.delete(
    `/api/v1/divisions/${reference}/`,
    headers
  );
  return response.data;
};

export const reactivateDivision = async (
  reference: string,
  headers: { headers: { Authorization: string } }
): Promise<Division> => {
  const response: AxiosResponse<Division> = await apiActions.patch(
    `/api/v1/divisions/${reference}/reactivate/`,
    headers
  );
  return response.data;
};
