"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../authentication/useAxiosAuth";
import { getDivisions, getDivision } from "@/services/divisions";

export function useFetchDivisions() {
  const header = useAxiosAuth();

  return useQuery({
    queryKey: ["divisions"],
    queryFn: () => getDivisions(header),
    enabled: true,
  });
}

export function useFetchDivision(reference: string) {
  const header = useAxiosAuth();

  return useQuery({
    queryKey: ["division", reference],
    queryFn: () => getDivision(reference, header),
    enabled: !!reference,
  });
}
