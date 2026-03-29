"use client";

import COAList from "@/components/coa/COAList";
import { Database } from "lucide-react";

export default function COAPage() {
  return (
    <div className="space-y-6 pb-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded bg-[#2563EB] flex items-center justify-center text-white shadow-md shadow-[#2563EB]/20">
              <Database className="w-3 h-3" />
            </div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
              Operational Lifecycle
            </p>
          </div>
          <h1 className="text-xl font-semibold text-black tracking-tighter italic">
            Chart of <span className="text-[#2563EB]">Accounts</span>
          </h1>
          <p className="text-black/40 font-semibold mt-0.5 text-xs max-w-md">
            The foundational structure of your operations. Organize and
            oversee all general ledger accounts.
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-black/5">
        <COAList rolePrefix="operations" />
      </div>
    </div>
  );
}
