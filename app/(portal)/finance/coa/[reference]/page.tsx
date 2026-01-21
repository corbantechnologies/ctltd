"use client";

import { useFetchCOA } from "@/hooks/coa/actions";
import BooksList from "@/components/coa/BooksList";
import UpdateCOA from "@/forms/coa/UpdateCOA";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import {
  Database,
  ChevronRight,
  Edit3,
  Hash,
  ArrowUpDown,
  Activity,
  ArrowLeft,
  BookPlus,
} from "lucide-react";
import Link from "next/link";
import CreateBook from "@/forms/books/CreateBook";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FinanceCOADetailPage() {
  const { reference } = useParams();
  const { isLoading, data: coa, refetch: refetchCOA } = useFetchCOA(reference as string);
  const [open, setOpen] = useState(false);
  const [openCreateBook, setOpenCreateBook] = useState(false);

  if (isLoading) return <LoadingSpinner />;
  if (!coa)
    return (
      <div className="p-12 text-center font-bold text-black/20">
        Account not found.
      </div>
    );

  return (
    <div className="space-y-12 pb-12">
      {/* Breadcrumbs & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-4">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/40">
            <Link
              href="/finance/coa"
              className="hover:text-[#045138] transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              Chart of Accounts
            </Link>
            <ChevronRight className="w-3 h-3 opacity-30" />
            <span className="text-black/20">{coa.name}</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#045138] flex items-center justify-center text-white shadow-xl shadow-[#045138]/20">
              <Database className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-black tracking-tighter italic leading-none">
                {coa.name}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge className="bg-black text-white border-none font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-lg">
                  CODE: {coa.code}
                </Badge>
                {coa.is_active ? (
                  <div className="flex items-center gap-1.5 text-green-600 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Active
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-black/40 bg-black/5 px-3 py-1 rounded-full border border-black/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Inactive
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setOpenCreateBook(true)}
            className="h-14 px-6 bg-white border border-black/5 hover:bg-black/5 text-black rounded-2xl font-bold text-sm transition-all shadow-sm active:scale-95 group"
          >
            <BookPlus className="w-5 h-5 mr-2 group-hover:text-[#045138] transition-colors" />
            Add Ledger Book
          </Button>

          <Button
            onClick={() => setOpen(true)}
            className="h-14 px-8 bg-black hover:bg-[#045138] text-white rounded-2xl font-bold text-sm transition-all shadow-xl active:scale-95 group"
          >
            <Edit3 className="w-5 h-5 mr-2" />
            Update Account
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: Hash,
            label: "Core Reference",
            value: coa.reference,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            icon: ArrowUpDown,
            label: "Normal Balance",
            value: coa.normal_balance,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            icon: Activity,
            label: "Associated Books",
            value: `${coa.books?.length || 0} Records`,
            color: "text-[#045138]",
            bg: "bg-green-50",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white/60 backdrop-blur-xl p-6 rounded-[32px] border border-black/5 shadow-sm group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-1 truncate">
                  {stat.label}
                </p>
                <p className="text-lg font-bold text-black tracking-tight truncate">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Associated Books Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-black/5" />
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-black/20">
            Associated Ledger Books
          </h2>
          <div className="flex-1 h-px bg-black/5" />
        </div>

        <BooksList
          books={coa.books || []}
          rolePrefix="finance"
          coaReference={coa.reference}
        />
      </div>

      {/* Manual Modal Implementation */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-200">
          <UpdateCOA
            coa={{ name: coa.name, code: coa.code, reference: coa.reference }}
            rolePrefix="finance"
            onSuccess={() => setOpen(false)}
            onClose={() => setOpen(false)}
            className="min-h-screen border-none shadow-none rounded-none"
          />
        </div>
      )}

      {/* Manual Modal Implementation for Create Book */}
      {openCreateBook && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-200">
          <CreateBook
            rolePrefix="finance"
            initialCOA={coa.name}
            onSuccess={() => setOpenCreateBook(false)}
            onClose={() => setOpenCreateBook(false)}
            className="min-h-screen border-none shadow-none rounded-none"
            refetch={refetchCOA}
          />
        </div>
      )}
    </div>
  );
}
