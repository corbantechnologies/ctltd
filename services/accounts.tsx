"use client";

import { apiActions } from "@/tools/axios";
import { AxiosResponse } from "axios";

interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  gender: string;
  id_type: string;
  id_no: string;
  tax_pin: string;
  is_active: boolean;
  is_employee: boolean;
  is_director: boolean;
  is_finance: boolean;
  is_superuser: boolean;
  is_staff: boolean;
}

interface forgotPassword {
  email: string;
}

interface resetPassword {
  email: string;
  code: string;
  password: string;
  password_confirmation: string;
}

export const getAccount = async (
  username: string,
  headers: { headers: { Authorization: string } }
): Promise<User> => {
  const response: AxiosResponse<User> = await apiActions.get(
    `/api/v1/auth/${username}/`,
    headers
  );
  return response.data;
};

export const forgotPassword = async (data: forgotPassword): Promise<User> => {
  const response: AxiosResponse<User> = await apiActions.post(
    `/api/v1/auth/password/reset/`,
    data
  );
  return response.data;
};

export const resetPassword = async (data: resetPassword): Promise<User> => {
  const response: AxiosResponse<User> = await apiActions.post(
    `/api/v1/auth/password/reset/confirm/`,
    data
  );
  return response.data;
};
