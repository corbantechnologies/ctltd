"use client";

import DivisionsList from "@/components/divisions/DivisionsList";
import CreateDivisionModal from "@/forms/divisions/CreateDivisionModal";
import { Database } from "lucide-react";

export default function DivisionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-md bg-[#D0402B] flex items-center justify-center text-white shadow-md shadow-[#D0402B]/20">
              <Database className="w-3 h-3" />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#D0402B]">
              Management Layer
            </p>
          </div>
          <h1 className="text-xl font-black text-black tracking-tighter italic">
            Corporate <span className="text-[#D0402B]">Divisions</span>
          </h1>
          <p className="text-black/40 font-bold mt-0.5 text-xs max-w-md">
            Organize business units and define operational boundaries.
          </p>
        </div>
        <CreateDivisionModal />
      </div>

      <div className="pt-4 border-t border-black/5">
        <DivisionsList rolePrefix="director" />
      </div>
    </div>
  );
}
