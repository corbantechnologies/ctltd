"use client";

import { useState } from "react";
import JournalsList from "@/components/financials/JournalsList";
import CreateJournal from "@/forms/journals/CreateJournal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from "next/navigation";
import { useFetchFinancialYear } from "@/hooks/financialyears/actions";

export default function FinanceJournalsPage() {
  const { reference } = useParams();
  const { data: fiscalYear } = useFetchFinancialYear(reference as string);
  const [openCreateJournal, setOpenCreateJournal] = useState(false);

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/finance/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/finance/fiscal-years">
              Fiscal Years
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/finance/fiscal-years/${reference}`}>
              {fiscalYear?.code}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Journals</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-black tracking-tighter">
            Transaction Journals
          </h1>
          <p className="text-black/60 font-medium mt-1">
            Manage daily journal batches and financial entries
          </p>
        </div>
        <Button
          onClick={() => setOpenCreateJournal(true)}
          className="h-12 px-6 bg-[#045138] hover:bg-black text-white rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Journal Batch
        </Button>
      </div>

      <JournalsList rolePrefix="finance" linkPrefix="journals" />

      {/* Manual Modal Implementation for Create Journal */}
      {openCreateJournal && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-200">
          <CreateJournal
            fiscalYear={fiscalYear?.code}
            rolePrefix="finance"
            onSuccess={() => setOpenCreateJournal(false)}
            onClose={() => setOpenCreateJournal(false)}
            className="min-h-screen border-none shadow-none rounded-none"
          />
        </div>
      )}
    </div>
  );
}
