"use client";

import FinancialYearsList from "@/components/financialyears/FinancialYearsList";
import { CalendarRange } from "lucide-react";

export default function FiscalYearsPage() {
  return (
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#D0402B] flex items-center justify-center text-white shadow-lg shadow-[#D0402B]/20">
              <CalendarRange className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D0402B]">
              Period Management
            </p>
          </div>
          <h1 className="text-2xl font-black text-black tracking-tighter italic">
            Fiscal <span className="text-[#D0402B]">Years</span>
          </h1>
          <p className="text-gray-400 font-bold mt-1 text-xs max-w-md">
            The temporal backbone of financial reporting. View and manage fiscal
            periods.
          </p>
        </div>

        {/* Action button if needed, e.g. Open New Fiscal Year */}
        {/* <Button ... >Open New Fiscal Year</Button> */}
      </div>

      <div className="pt-8 border-t border-gray-100">
        <FinancialYearsList rolePrefix="director" />
      </div>
    </div>
  );
}
