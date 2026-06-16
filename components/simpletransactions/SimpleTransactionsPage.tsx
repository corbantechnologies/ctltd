"use client";

import { useState, useEffect } from "react";
import { useFetchSimpleTransactions } from "@/hooks/simpletransactions/actions";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import CreateSimpleTransaction from "@/forms/simpletransactions/CreateSimpleTransaction";
import {
  Search,
  X,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  Zap,
  CheckCircle,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { formatNumber } from "@/tools/format";
import { cn } from "@/lib/utils";
import { SimpleTransaction } from "@/services/simpletransactions";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function SimpleTransactionsPage() {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState("20");
  const debouncedSearch = useDebounce(searchQuery, 500);

  const activeFilters: Record<string, string> = {
    page: page.toString(),
    limit,
  };
  if (debouncedSearch) activeFilters["search"] = debouncedSearch;

  const { data: response, isLoading } = useFetchSimpleTransactions(activeFilters);
  const transactions = response?.results || [];
  const totalCount = response?.count || 0;
  const totalPages = Math.ceil(totalCount / parseInt(limit));

  const totalIn = transactions
    .filter((t) => t.transaction_type === "MONEY_IN")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const totalOut = transactions
    .filter((t) => t.transaction_type === "MONEY_OUT")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-xl text-slate-900 tracking-tight">
            Quick <span className="text-slate-600">Transactions</span>
          </h1>
          <p className="text-slate-400 mt-1 text-sm max-w-lg">
            Log day-to-day transactions. A Journal Entry is auto-generated for each record.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-slate-900 text-white px-5 h-11 rounded font-semibold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Log Transaction
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/60 backdrop-blur-sm rounded border border-black/5 p-4 flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
            <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Money In (Page)</p>
            <p className="text-lg font-bold text-emerald-600 font-mono mt-0.5">
              {formatNumber(totalIn)}
            </p>
          </div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded border border-black/5 p-4 flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded bg-red-500/10 flex items-center justify-center flex-shrink-0">
            <ArrowUpRight className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Money Out (Page)</p>
            <p className="text-lg font-bold text-red-600 font-mono mt-0.5">
              {formatNumber(totalOut)}
            </p>
          </div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded border border-black/5 p-4 flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded bg-slate-900/10 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-slate-700" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Total Records</p>
            <p className="text-lg font-bold text-slate-900 font-mono mt-0.5">{totalCount}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white/40 p-4 rounded border border-white/60 backdrop-blur-md shadow-sm flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
          <input
            type="text"
            placeholder="Search by description, reference, partner..."
            className="pl-11 h-11 w-full bg-white/80 border border-black/5 rounded font-medium text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-slate-900/20"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
          />
        </div>
        {searchQuery && (
          <button
            onClick={() => { setSearchQuery(""); setPage(1); }}
            className="h-11 w-11 flex items-center justify-center border border-black/5 rounded bg-white/80 hover:bg-red-50 hover:text-red-500 transition-all text-black/40 shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* List */}
      {isLoading ? (
        <LoadingSpinner />
      ) : transactions.length > 0 ? (
        <div className="bg-white/60 backdrop-blur-xl border border-black/5 overflow-hidden shadow-xl shadow-black/5 rounded">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-black/5 border-b border-black/5">
                  <th className="text-left py-3 px-4 text-[10px] font-semibold uppercase tracking-wider text-black/60">Date & Ref</th>
                  <th className="text-left py-3 px-4 text-[10px] font-semibold uppercase tracking-wider text-black/60">Description</th>
                  <th className="text-left py-3 px-4 text-[10px] font-semibold uppercase tracking-wider text-black/60">Book / Method</th>
                  <th className="text-right py-3 px-4 text-[10px] font-semibold uppercase tracking-wider text-black/60">Amount</th>
                  <th className="text-center py-3 px-4 text-[10px] font-semibold uppercase tracking-wider text-black/60">Journal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {transactions.map((t: SimpleTransaction) => (
                  <tr key={t.reference} className="hover:bg-white/80 transition-all group">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm text-black flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-black/30" />
                          {new Date(t.date).toLocaleDateString("en-KE", { day: "2-digit", month: "short", year: "numeric" })}
                        </span>
                        <span className="text-[10px] font-mono text-black/30 mt-1 uppercase">{t.code}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-black font-medium">{t.name}</span>
                        {t.partner && (
                          <span className="text-xs text-black/40 mt-0.5">{t.partner}</span>
                        )}
                        <span className="text-[10px] text-black/30 mt-0.5 uppercase">{t.division}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-xs text-black/70 font-medium">{t.ledger_book}</span>
                        <span className="text-[10px] text-black/30 mt-0.5">via {t.payment_method}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-sm font-mono font-bold",
                        t.transaction_type === "MONEY_IN"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      )}>
                        {t.transaction_type === "MONEY_IN"
                          ? <ArrowDownLeft className="w-3 h-3" />
                          : <ArrowUpRight className="w-3 h-3" />
                        }
                        {formatNumber(parseFloat(t.amount))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {t.journal ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded uppercase">
                          <CheckCircle className="w-3 h-3" />
                          {t.journal}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded uppercase">
                          <AlertCircle className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t border-black/5 bg-white/50 p-4 flex justify-between items-center gap-4">
            <span className="text-xs font-semibold text-black/50 uppercase tracking-widest">
              {totalCount} records
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="h-8 px-4 rounded border border-black/10 bg-white font-semibold text-xs text-black/70 hover:bg-black/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              <span className="text-xs font-semibold text-black/50 mx-2 uppercase tracking-widest">
                Page {page} of {Math.max(1, totalPages)}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
                className="h-8 px-4 rounded border border-black/10 bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-24 text-center bg-white/40 rounded border border-dashed border-black/10">
          <div className="w-20 h-20 rounded bg-black/5 flex items-center justify-center text-black/10 mx-auto mb-6">
            <Zap className="w-10 h-10" />
          </div>
          <h3 className="text-base font-semibold text-black tracking-tight mb-2 uppercase">
            No Transactions Yet
          </h3>
          <p className="text-black/30 font-semibold max-w-sm mx-auto text-sm mb-6">
            Log your first transaction and a journal entry will be automatically generated.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 h-11 rounded font-semibold text-sm hover:bg-slate-800 transition-all"
          >
            <Plus className="w-4 h-4" />
            Log First Transaction
          </button>
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <CreateSimpleTransaction
              onSuccess={() => setShowForm(false)}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
