"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../authentication/useAxiosAuth";
import { getFinancialYears, getFinancialYear } from "@/services/financialyears";

export function useFetchFinancialYears() {
  const header = useAxiosAuth();

  return useQuery({
    queryKey: ["financialyears"],
    queryFn: () => getFinancialYears(header),
    enabled: !!header && !!header.headers.Authorization,.headers.Authorization,
  });
}

export function useFetchFinancialYear(reference: string) {
  const header = useAxiosAuth();

  return useQuery({
    queryKey: ["financialyear", reference],
    queryFn: () => getFinancialYear(reference, header),
    enabled: !!reference && !!header.headers.Authorization,
  });
}
