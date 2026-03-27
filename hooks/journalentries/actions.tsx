"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../authentication/useAxiosAuth";
import { getJournalEntries, getJournalEntry } from "@/services/journalentries";

export function useFetchJournalEntries() {
  const header = useAxiosAuth();

  return useQuery({
    queryKey: ["journalentries"],
    queryFn: () => getJournalEntries(header),
    enabled: !!header && !!header.headers.Authorization,.headers.Authorization,
  });
}

export function useFetchJournalEntry(reference: string) {
  const header = useAxiosAuth();

  return useQuery({
    queryKey: ["journalentry", reference],
    queryFn: () => getJournalEntry(reference, header),
    enabled: !!reference && !!header.headers.Authorization,
  });
}
