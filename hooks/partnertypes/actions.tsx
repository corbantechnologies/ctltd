"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../authentication/useAxiosAuth";
import { getPartnerTypes, getPartnerType } from "@/services/partnertypes";

export function useFetchPartnerTypes() {
  const header = useAxiosAuth();

  return useQuery({
    queryKey: ["partnertypes"],
    queryFn: () => getPartnerTypes(header),
    enabled: !!header && !!header.headers.Authorization,.headers.Authorization,
  });
}

export function useFetchPartnerType(reference: string) {
  const header = useAxiosAuth();

  return useQuery({
    queryKey: ["partnertype", reference],
    queryFn: () => getPartnerType(reference, header),
    enabled: !!reference && !!header.headers.Authorization,
  });
}
