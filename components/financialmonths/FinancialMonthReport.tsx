"use client";

import { Activity, BookOpen, ChevronRight, FileText, Globe, Layers, LayoutGrid, List, Receipt, Users } from "lucide-react";
import { FinancialMonthDetail } from "@/services/financialmonths";
import LoadingSpinner from "@/components/portal/LoadingSpinner";

interface FinancialMonthReportProps {
  month: FinancialMonthDetail;
  rolePrefix: string;
}

export default function FinancialMonthReport({
  month,
  rolePrefix,
}: FinancialMonthReportProps) {
  const primaryColor = rolePrefix === "director" ? "#D0402B" : "#045138";

  if (!month) return <LoadingSpinner />;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Debits",
            value: `KES ${month.report.total_debits.toLocaleString()}`,
            icon: ArrowUpRight,
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            label: "Total Credits",
            value: `KES ${month.report.total_credits.toLocaleString()}`,
            icon: ArrowDownLeft,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Net Movement",
            value: `KES ${month.report.net_movement.toLocaleString()}`,
            icon: Activity,
            color: month.report.net_movement >= 0 ? "text-slate-900" : "text-red-600",
            bg: "bg-gray-50",
          },
          {
            label: "Journals Count",
            value: `${month.journals_count}`,
            icon: Receipt,
            color: "text-orange-600",
            bg: "bg-orange-50",
          },
        ].map((metric, i) => (
          <div key={i} className="bg-white p-4 rounded border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-8 rounded ${metric.bg} ${metric.color} flex items-center justify-center`}>
                <metric.icon className="w-4 h-4" />
              </div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/30">
                {metric.label}
              </p>
            </div>
            <p className={`text-xl font-bold tracking-tight ${metric.color}`}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trial Balance Summary (Books) */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 rounded bg-black/5 flex items-center justify-center text-black/40">
                <BookOpen className="w-3.5 h-3.5" />
             </div>
             <h2 className="text-xs font-bold uppercase tracking-widest text-black">Trial Balance by Account</h2>
             <div className="flex-1 h-px bg-gray-100" />
          </div>
          
          <div className="bg-white border border-gray-100 rounded overflow-hidden shadow-sm">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="text-left p-3 font-semibold text-black/40 uppercase tracking-widest">Account (Code)</th>
                  <th className="text-right p-3 font-semibold text-black/40 uppercase tracking-widest">Debit</th>
                  <th className="text-right p-3 font-semibold text-black/40 uppercase tracking-widest">Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {month.report.book_summary.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3">
                      <span className="font-bold text-black italic">{row.book__name}</span>
                      <span className="ml-2 px-1.5 py-0.5 rounded bg-black/5 text-black/30 font-mono text-[9px]">{row.book__code}</span>
                    </td>
                    <td className="p-3 text-right font-medium text-black">{row.total_debit.toLocaleString()}</td>
                    <td className="p-3 text-right font-medium text-black">{row.total_credit.toLocaleString()}</td>
                  </tr>
                ))}
                {month.report.book_summary.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-300 italic">No entries recorded.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Division Summary */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 rounded bg-black/5 flex items-center justify-center text-black/40">
                <Globe className="w-3.5 h-3.5" />
             </div>
             <h2 className="text-xs font-bold uppercase tracking-widest text-black">Summary by Division</h2>
             <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="bg-white border border-gray-100 rounded overflow-hidden shadow-sm">
             <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="text-left p-3 font-semibold text-black/40 uppercase tracking-widest">Division</th>
                  <th className="text-right p-3 font-semibold text-black/40 uppercase tracking-widest">Total Debit</th>
                  <th className="text-right p-3 font-semibold text-black/40 uppercase tracking-widest">Total Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {month.report.division_summary.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 text-black font-semibold italic">{row.division__name}</td>
                    <td className="p-3 text-right font-medium text-black">{row.total_debit.toLocaleString()}</td>
                    <td className="p-3 text-right font-medium text-black">{row.total_credit.toLocaleString()}</td>
                  </tr>
                ))}
                {month.report.division_summary.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-300 italic">No entries recorded.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Project Allocation Summary */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 rounded bg-black/5 flex items-center justify-center text-black/40">
                <Layers className="w-3.5 h-3.5" />
             </div>
             <h2 className="text-xs font-bold uppercase tracking-widest text-black">Summary by Project</h2>
             <div className="flex-1 h-px bg-gray-100" />
          </div>
          
          <div className="bg-white border border-gray-100 rounded overflow-hidden shadow-sm">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="text-left p-3 font-semibold text-black/40 uppercase tracking-widest">Project Tag</th>
                  <th className="text-right p-3 font-semibold text-black/40 uppercase tracking-widest">Debit</th>
                  <th className="text-right p-3 font-semibold text-black/40 uppercase tracking-widest">Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {month.report.project_summary.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-bold text-black italic">{row.project}</td>
                    <td className="p-3 text-right font-medium text-black">{row.total_debit.toLocaleString()}</td>
                    <td className="p-3 text-right font-medium text-black">{row.total_credit.toLocaleString()}</td>
                  </tr>
                ))}
                {month.report.project_summary.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-300 italic">No project allocations.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Partner Involvement Summary */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 rounded bg-black/5 flex items-center justify-center text-black/40">
                <Users className="w-3.5 h-3.5" />
             </div>
             <h2 className="text-xs font-bold uppercase tracking-widest text-black">Summary by Partner</h2>
             <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="bg-white border border-gray-100 rounded overflow-hidden shadow-sm">
             <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="text-left p-3 font-semibold text-black/40 uppercase tracking-widest">Partner</th>
                  <th className="text-right p-3 font-semibold text-black/40 uppercase tracking-widest">Debit</th>
                  <th className="text-right p-3 font-semibold text-black/40 uppercase tracking-widest">Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {month.report.partner_summary.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 text-black font-semibold italic">{row.partner__name}</td>
                    <td className="p-3 text-right font-medium text-black">{row.total_debit.toLocaleString()}</td>
                    <td className="p-3 text-right font-medium text-black">{row.total_credit.toLocaleString()}</td>
                  </tr>
                ))}
                {month.report.partner_summary.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-300 italic">No partner activity.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Monthly Journals List */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
           <div className="w-6 h-6 rounded bg-black/5 flex items-center justify-center text-black/40">
              <FileText className="w-3.5 h-3.5" />
           </div>
           <h2 className="text-xs font-bold uppercase tracking-widest text-black">Journals in Period</h2>
           <div className="flex-1 h-px bg-gray-100" />
        </div>

        <div className="bg-white border border-gray-100 rounded overflow-hidden shadow-sm">
           <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="text-left p-3 font-semibold text-black/40 uppercase tracking-widest">Description</th>
                  <th className="text-left p-3 font-semibold text-black/40 uppercase tracking-widest text-center">Type</th>
                  <th className="text-left p-3 font-semibold text-black/40 uppercase tracking-widest text-center">Status</th>
                  <th className="text-right p-3 font-semibold text-black/40 uppercase tracking-widest">Date</th>
                  <th className="text-right p-3 font-semibold text-black/40 uppercase tracking-widest">Ref</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {month.report.journals.map((journal) => (
                  <tr key={journal.reference} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3">
                       {journal.description || "No description"}
                    </td>
                    <td className="p-3 text-center">
                       <span className="px-2 py-0.5 rounded bg-black/5 text-[9px] font-bold uppercase">{journal.journal_type}</span>
                    </td>
                    <td className="p-3 text-center">
                       {journal.is_posted ? (
                         <div className="flex items-center justify-center gap-1.5 text-green-600">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                           <span className="font-bold uppercase text-[9px]">Posted</span>
                         </div>
                       ) : (
                         <div className="flex items-center justify-center gap-1.5 text-orange-600">
                           <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                           <span className="font-bold uppercase text-[9px]">Draft</span>
                         </div>
                       )}
                    </td>
                    <td className="p-3 text-right text-black/40">{new Date(journal.date).toLocaleDateString()}</td>
                    <td className="p-3 text-right font-mono text-[9px] text-black/30 font-semibold">{journal.reference}</td>
                  </tr>
                ))}
                {month.report.journals.length === 0 && (
                   <tr>
                    <td colSpan={5} className="p-12 text-center text-gray-300 italic">No journals found in this period.</td>
                  </tr>
                )}
              </tbody>
           </table>
        </div>
      </section>
    </div>
  );
}

import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
