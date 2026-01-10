"use client";

import { useFetchDivisions } from "@/hooks/divisions/actions";

export default function Divisions() {
  const { isLoading: isLoadingDivisions, data: divisions } =
    useFetchDivisions();
  return <div>Divisions</div>;
}
