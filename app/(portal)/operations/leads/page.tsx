"use client";

import LeadsList from "@/components/leads/LeadsList";
import { Users } from "lucide-react";

export default function LeadsPage() {
  return (
    <div className="space-y-6 pb-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded bg-[#2563EB] flex items-center justify-center text-white shadow-md shadow-[#2563EB]/20">
              <Users className="w-3 h-3" />
            </div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
              Pipeline Management
            </p>
          </div>
          <h1 className="text-xl font-semibold text-black tracking-tighter italic">
            Active <span className="text-[#2563EB]">Prospects</span>
          </h1>
          <p className="text-black/40 font-semibold mt-0.5 text-xs max-w-md">
            Monitor incoming leads, qualify opportunities, and drive the initial pipeline cycle from first contact to engagement.
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-black/5">
        <LeadsList rolePrefix="operations" />
      </div>
    </div>
  );
}
