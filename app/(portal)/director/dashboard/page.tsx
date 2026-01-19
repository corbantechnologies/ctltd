"use client";

import { useFetchAccount } from "@/hooks/accounts/actions";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import DivisionsList from "@/components/divisions/DivisionsList";
import CreateDivisionModal from "@/forms/divisions/CreateDivisionModal";
import { Building2 } from "lucide-react";

export default function DirectorDashboard() {
  const { isLoading, data: account } = useFetchAccount();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#D0402B] flex items-center justify-center text-white shadow-lg shadow-[#D0402B]/20">
              <Building2 className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D0402B]">
              Administrative Portal
            </p>
          </div>
          <h1 className="text-2xl font-black text-black tracking-tighter italic">
            Director <span className="text-[#D0402B]">Dashboard</span>
          </h1>
          <p className="text-black/40 font-bold mt-1 text-xs max-w-md">
            Welcome, {account?.first_name} {account?.last_name}. Oversee
            corporate infrastructure and division management.
          </p>
        </div>
        <CreateDivisionModal />
      </div>

      {/* Divisions Section */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between border-b border-black/5 pb-4">
          <h2 className="text-lg font-black text-black tracking-tight">
            Corporate Divisions
          </h2>
          <p className="text-[10px] font-black uppercase tracking-widest text-black/40">
            Real-time status
          </p>
        </div>
        <DivisionsList rolePrefix="director" />
      </div>
    </div>
  );
}
