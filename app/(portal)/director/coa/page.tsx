"use client";

import COAList from "@/components/coa/COAList";
import { Database } from "lucide-react";

export default function COAPage() {
  return (
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#D0402B] flex items-center justify-center text-white shadow-lg shadow-[#D0402B]/20">
              <Database className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D0402B]">
              Financial Architecture
            </p>
          </div>
          <h1 className="text-2xl font-black text-black tracking-tighter italic">
            Chart of <span className="text-[#D0402B]">Accounts</span>
          </h1>
          <p className="text-black/40 font-bold mt-1 text-xs max-w-md">
            The foundational structure of your financial entity. Organize and
            oversee all general ledger accounts.
          </p>
        </div>
      </div>

      <div className="pt-8 border-t border-black/5">
        <COAList rolePrefix="director" />
      </div>
    </div>
  );
}
