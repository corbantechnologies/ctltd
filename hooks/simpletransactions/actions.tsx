"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "../authentication/useAxiosAuth";
import {
  getSimpleTransactions,
  getSimpleTransaction,
  createSimpleTransaction,
  CreateSimpleTransaction,
} from "@/services/simpletransactions";

export function useFetchSimpleTransactions(filters?: Record<string, string>) {
  const header = useAxiosAuth();

  return useQuery({
    queryKey: ["simpletransactions", filters],
    queryFn: () => getSimpleTransactions(header, filters),
    enabled: !!header.headers.Authorization,
  });
}

export function useFetchSimpleTransaction(reference: string) {
  const header = useAxiosAuth();

  return useQuery({
    queryKey: ["simpletransaction", reference],
    queryFn: () => getSimpleTransaction(reference, header),
    enabled: !!reference && !!header.headers.Authorization,
  });
}

export function useCreateSimpleTransaction() {
  const header = useAxiosAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSimpleTransaction) =>
      createSimpleTransaction(data, header),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["simpletransactions"] });
    },
  });
}
