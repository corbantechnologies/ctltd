"use client";

import COAList from "@/components/coa/COAList";
import CreateCOA from "@/forms/coa/CreateCOA";
import { Database, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function FinanceCOAPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6 pb-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-md bg-[#045138] flex items-center justify-center text-white shadow-md shadow-[#045138]/20">
              <Database className="w-3 h-3" />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#045138]">
              Ledger Management
            </p>
          </div>
          <h1 className="text-xl font-black text-black tracking-tighter italic">
            Chart of <span className="text-[#045138]">Accounts</span>
          </h1>
          <p className="text-black/40 font-bold mt-0.5 text-xs max-w-md">
            The technical backbone of fiscal operations. Create and manage the
            financial classification system.
          </p>
        </div>

        <Button
          onClick={() => setOpen(true)}
          className="h-9 px-4 bg-black hover:bg-[#045138] text-white rounded-xl font-bold text-xs transition-all shadow-md active:scale-95 group"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5 group-hover:rotate-90 transition-transform" />
          Register New Account
        </Button>
      </div>

      <div className="pt-4 border-t border-black/5">
        <COAList rolePrefix="finance" />
      </div>

      {/* Manual Modal Implementation */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-200">
          <CreateCOA
            rolePrefix="finance"
            onSuccess={() => setOpen(false)}
            onClose={() => setOpen(false)}
            className="min-h-screen border-none shadow-none rounded-none"
          />
        </div>
      )}
    </div>
  );
}
