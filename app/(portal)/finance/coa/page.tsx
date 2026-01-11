"use client";

import COAList from "@/components/coa/COAList";
import CreateCOA from "@/forms/coa/CreateCOA";
import { Database, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function FinanceCOAPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#045138] flex items-center justify-center text-white shadow-lg shadow-[#045138]/20">
              <Database className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#045138]">
              Ledger Management
            </p>
          </div>
          <h1 className="text-3xl font-black text-black tracking-tighter italic">
            Chart of <span className="text-[#045138]">Accounts</span>
          </h1>
          <p className="text-black/40 font-bold mt-1 text-sm max-w-md">
            The technical backbone of fiscal operations. Create and manage the
            financial classification system.
          </p>
        </div>

        <Button
          onClick={() => setOpen(true)}
          className="h-14 px-8 bg-black hover:bg-[#045138] text-white rounded-2xl font-black text-sm transition-all shadow-xl active:scale-95 group"
        >
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
          Register New Account
        </Button>
      </div>

      <div className="pt-8 border-t border-black/5">
        <COAList rolePrefix="finance" />
      </div>

      {/* Manual Modal Implementation */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-2xl transform transition-all">
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <CreateCOA rolePrefix="finance" onSuccess={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
