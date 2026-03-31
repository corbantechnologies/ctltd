"use client";

import InvoicesList from "@/components/financials/InvoicesList";
import { Landmark, FileText } from "lucide-react";

export default function FinanceInvoicesPage() {
  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-corporate-primary flex items-center justify-center text-white shadow-2xl shadow-corporate-primary/30">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-corporate-primary mb-1">
              Financial Registry
            </p>
            <h1 className="text-3xl font-semibold text-slate-900 tracking-tight italic">
              Invoice <span className="text-corporate-primary font-bold">Ledger</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-slate-50/50 p-1 rounded-[40px] border border-slate-100">
        <div className="bg-white p-10 rounded-[38px] shadow-sm">
            <InvoicesList rolePrefix="finance" />
        </div>
      </div>
    </div>
  );
}
