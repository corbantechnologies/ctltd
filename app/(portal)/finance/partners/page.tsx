"use client";

import { useState } from "react";
import PartnersList from "@/components/partners/PartnersList";
import CreatePartner from "@/forms/partners/CreatePartner";
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
          <h1 className="text-3xl font-black text-black tracking-tighter">
            Operational Partners
          </h1>
          <p className="text-black/60 font-medium mt-1">
            Manage vendors, clients, and internal entities
          </p>
        </div>
        <Button
          onClick={() => setOpenCreatePartner(true)}
          className="h-12 px-6 bg-[#045138] hover:bg-black text-white rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Register Partner
        </Button>
      </div>

      <PartnersList rolePrefix="finance" />

      {/* Manual Modal Implementation */}
      {openCreatePartner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative w-full  my-8 animate-in zoom-in-95 duration-200">
            <Button
              onClick={() => setOpenCreatePartner(false)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white text-black shadow-lg hover:bg-red-50 hover:text-red-600 z-10"
              size="icon"
            >
              <X className="w-5 h-5" />
            </Button>
            <CreatePartner
              rolePrefix="finance"
              onSuccess={() => setOpenCreatePartner(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
