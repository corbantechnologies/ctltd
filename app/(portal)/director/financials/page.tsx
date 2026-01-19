"use client";

import JournalsList from "@/components/financials/JournalsList";
import { Landmark, Receipt, Sparkles } from "lucide-react";

export default function FinancialsPage() {
  return (
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#D0402B] flex items-center justify-center text-white shadow-lg shadow-[#D0402B]/20">
              <Landmark className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D0402B]">
              Fiscal Management
            </p>
          </div>
          <h1 className="text-2xl font-black text-black tracking-tighter italic">
            Financial <span className="text-[#D0402B]">Operations</span>
          </h1>
          <p className="text-black/40 font-bold mt-1 text-xs max-w-md">
            Comprehensive oversight of ledger journals, transaction records, and
            fiscal summaries.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#D0402B]">
              Platform Sync
            </p>
            <p className="text-xs font-bold text-black opacity-40 italic">
              Last Updated: Just Now
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#D0402B] shadow-xl shadow-black/5 border border-white">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pt-8 border-t border-black/5">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-black/40">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-black text-black tracking-tight italic">
                Journal <span className="text-[#D0402B]">Ledgers</span>
              </h2>
              <p className="text-[9px] font-bold text-black/30 uppercase tracking-widest mt-0.5">
                Chronological fiscal records and movement tracking
              </p>
            </div>
          </div>
        </div>

        <JournalsList rolePrefix="director" linkPrefix="financials" />
      </div>
    </div>
  );
}
