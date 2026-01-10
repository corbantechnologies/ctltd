"use client";

import { useFetchAccount } from "@/hooks/accounts/actions";

export default function FinanceDashboard() {
  const { isLoading, data: account } = useFetchAccount();
  return (
    <div>
      <h1>Finance Dashboard</h1>
    </div>
  );
}
