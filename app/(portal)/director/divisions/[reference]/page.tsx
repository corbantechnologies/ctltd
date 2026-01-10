"use client";

import LoadingSpinner from "@/components/portal/LoadingSpinner";
import { useFetchDivision } from "@/hooks/divisions/actions";
import { useParams } from "next/navigation";

export default function DivisionDetail() {
  const { reference } = useParams<{ reference: string }>();

  const { isLoading: isLoadingDivision, data: division } =
    useFetchDivision(reference);

  if (isLoadingDivision) {
    return <LoadingSpinner />;
  }

  return <div>Division {division?.name}</div>;
}
