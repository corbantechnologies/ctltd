"use client";

import { useState } from "react";
import PartnersList from "@/components/partners/PartnersList";
import CreatePartner from "@/forms/partners/CreatePartner";
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

export default function FinancePartnersPage() {
  const [openCreatePartner, setOpenCreatePartner] = useState(false);

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
            <BreadcrumbPage>Partners Hub</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-black tracking-tighter">
            Operational Partners
          </h1>
          <p className="text-xs text-black/60 font-medium mt-1">
            Manage vendors, clients, and internal entities
          </p>
        </div>
        <Button
          onClick={() => setOpenCreatePartner(true)}
          className="h-10 px-4 bg-[#045138] hover:bg-black text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Register Partner
        </Button>
      </div>
      <PartnersList rolePrefix="finance" />
      {openCreatePartner && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-200">
          <CreatePartner
            rolePrefix="finance"
            onSuccess={() => setOpenCreatePartner(false)}
            onClose={() => setOpenCreatePartner(false)}
            className="min-h-screen border-none shadow-none rounded-none"
          />
        </div>
      )}
    </div>
  );
}
