"use client";

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
import FiscalYearJournals from "@/components/financialyears/FiscalYearJournals";

export default function FinanceJournalsPage() {
  const { reference } = useParams();
  const { data: fiscalYear } = useFetchFinancialYear(reference as string);

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/director/dashboard">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/director/fiscal-years">
              Fiscal Years
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/director/fiscal-years/${reference}`}>
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
      </div>

      <FiscalYearJournals
        journals={fiscalYear?.journals || []}
        rolePrefix="director"
        fiscalYearReference={reference as string}
      />
    </div>
  );
}
