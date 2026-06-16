"use client";

import { useState } from "react";
import { X, Zap } from "lucide-react";
import CreateSimpleTransaction from "@/forms/simpletransactions/CreateSimpleTransaction";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openCreateTransaction, setOpenCreateTransaction] = useState(false);

  return (
    <div className="relative min-h-screen">
      {children}

      {/* Floating Quick-Log Button */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-40">
        <button
          onClick={() => setOpenCreateTransaction(true)}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded shadow-lg border border-white/10 hover:bg-slate-800 transition-all shadow-black/30 group"
        >
          <span className="text-xs font-semibold uppercase tracking-widest hidden group-hover:block transition-all">
            Log Transaction
          </span>
          <Zap className="w-5 h-5 flex-shrink-0" />
        </button>
      </div>

      {openCreateTransaction && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setOpenCreateTransaction(false)}>
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpenCreateTransaction(false)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded bg-white text-black shadow-lg hover:bg-red-50 hover:text-red-600 z-10 flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <CreateSimpleTransaction
              onSuccess={() => setOpenCreateTransaction(false)}
              onClose={() => setOpenCreateTransaction(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
