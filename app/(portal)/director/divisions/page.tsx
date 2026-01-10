"use client";

import LoadingSpinner from "@/components/portal/LoadingSpinner";
import { useFetchDivisions } from "@/hooks/divisions/actions";

export default function Divisions() {
  const { isLoading: isLoadingDivisions, data: divisions } =
    useFetchDivisions();

  if (isLoadingDivisions) {
    return <LoadingSpinner />;
  }

  return <div>Divisions</div>;
}
