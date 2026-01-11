"use client";

import { useFetchAccount } from "@/hooks/accounts/actions";

export default function FinanceDashboard() {
  // creation of journal types
  // listing of journal types
  // creation of partner types
  // listing partner types
  const { isLoading, data: account } = useFetchAccount();
  return (
    <div>
      <h1>Finance Dashboard</h1>
    </div>
  );
}
