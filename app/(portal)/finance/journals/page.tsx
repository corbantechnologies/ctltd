"use client";

import { useState } from "react";
import JournalsList from "@/components/financials/JournalsList";
import CreateJournal from "@/forms/journals/CreateJournal";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function FinanceJournalsPage() {
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
            <BreadcrumbPage>Journals Hub</BreadcrumbPage>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl animate-in zoom-in-95 duration-200">
            <Button
              onClick={() => setOpenCreateJournal(false)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white text-black shadow-lg hover:bg-red-50 hover:text-red-600 z-10"
              size="icon"
            >
              <X className="w-5 h-5" />
            </Button>
            <CreateJournal
              rolePrefix="finance"
              onSuccess={() => setOpenCreateJournal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
