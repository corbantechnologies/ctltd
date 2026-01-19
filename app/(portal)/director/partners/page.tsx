"use client";

import PartnersList from "@/components/partners/PartnersList";
import { Users } from "lucide-react";

export default function PartnersPage() {
  return (
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#D0402B] flex items-center justify-center text-white shadow-lg shadow-[#D0402B]/20">
              <Users className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D0402B]">
              Administrative Interface
            </p>
          </div>
          <h1 className="text-2xl font-black text-black tracking-tighter italic">
            Corporate <span className="text-[#D0402B]">Partners</span>
          </h1>
          <p className="text-black/40 font-bold mt-1 text-xs max-w-md">
            Manage relationships, oversee partner financial status, and track
            historical transaction data.
          </p>
        </div>
      </div>

      <div className="pt-8 border-t border-black/5">
        <PartnersList rolePrefix="director" />
      </div>
    </div>
  );
}
