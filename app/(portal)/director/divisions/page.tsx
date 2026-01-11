"use client";

import DivisionsList from "@/components/portal/director/DivisionsList";
import CreateDivisionModal from "@/forms/divisions/CreateDivisionModal";
import { Database } from "lucide-react";

export default function DivisionsPage() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#D0402B] flex items-center justify-center text-white shadow-lg shadow-[#D0402B]/20">
              <Database className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D0402B]">
              Management Layer
            </p>
          </div>
          <h1 className="text-3xl font-black text-black tracking-tighter italic">
            Corporate <span className="text-[#D0402B]">Divisions</span>
          </h1>
          <p className="text-black/40 font-bold mt-1 text-sm max-w-md">
            Organize business units and define operational boundaries.
          </p>
        </div>
        <CreateDivisionModal />
      </div>

      <div className="pt-8 border-t border-black/5">
        <DivisionsList rolePrefix="director" />
      </div>
    </div>
  );
}
