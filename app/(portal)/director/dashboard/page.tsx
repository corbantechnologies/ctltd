"use client";

import { useFetchAccount } from "@/hooks/accounts/actions";
import { useFetchDivisions } from "@/hooks/divisions/actions";

export default function Director() {
  const { isLoading, data: account } = useFetchAccount();
  const { isLoading: isLoadingDivisions, data: divisions } =
    useFetchDivisions();
  return (
    <div>
      <h1>Director</h1>
    </div>
  );
}
