"use client";

import { useFetchJournal } from "@/hooks/journals/actions";
import { postJournal } from "@/services/journals";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import CreateJournalEntry from "@/forms/journalentries/CreateJournalEntry";
import UpdateJournal from "@/forms/journals/UpdateJournal";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Plus,
  Receipt,
  Edit2,
  Lock,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { useFetchFinancialYear } from "@/hooks/financialyears/actions";

export default function JournalsDetailPage() {
  const { reference, journal_reference } = useParams();
  const router = useRouter();
  const header = useAxiosAuth();
  const { data: fiscalYear } = useFetchFinancialYear(reference as string);
  const {
    isLoading,
    data: journal,
    refetch: refetchJournal,
  } = useFetchJournal(journal_reference as string);
  const [openAddEntry, setOpenAddEntry] = useState(false);
  const [openUpdateJournal, setOpenUpdateJournal] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  // Calculate totals
  const totalDebit =
    journal?.journal_entries?.reduce(
      (sum, entry) => sum + parseFloat(entry.debit),
      0
    ) || 0;
  const totalCredit =
    journal?.journal_entries?.reduce(
      (sum, entry) => sum + parseFloat(entry.credit),
      0
    ) || 0;
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01;

  const handlePostJournal = async () => {
    if (!journal) return;
    if (!isBalanced) {
      toast.error("Journal MUST be balanced before posting");
      return;
    }
    if (journal.journal_entries.length === 0) {
      toast.error("Cannot post an empty journal");
      return;
    }

    try {
      setIsPosting(true);
      await postJournal(journal.reference, header);
      toast.success("Journal posted successfully");
      refetchJournal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to post journal");
    } finally {
      setIsPosting(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!journal)
    return (
      <div className="p-12 text-center font-black text-black/20">
        Journal not found.
      </div>
    );

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
            <BreadcrumbLink
              href={`/finance/fiscal-years/${reference}/journals`}
            >
              Journals
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{journal.description}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full border-black/5 bg-white shadow-sm hover:bg-black/5"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Badge
              className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none ${journal.is_posted
                  ? "bg-green-500/10 text-green-600 shadow-sm shadow-green-500/10"
                  : "bg-orange-500/10 text-orange-600 shadow-sm shadow-orange-500/10"
                }`}
            >
              {journal.is_posted ? (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3" /> POSTED
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" /> PENDING
                </div>
              )}
            </Badge>
          </div>
          <div>
            <h1 className="text-4xl font-black text-black tracking-tighter mb-2">
              {journal.description || "Untitled Journal Batch"}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm font-bold text-black/40">
              <span className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-lg border border-black/5">
                <FileText className="w-4 h-4" /> {journal.reference}
              </span>
              <span className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-lg border border-black/5">
                <Calendar className="w-4 h-4" />
                {new Date(journal.date).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="bg-[#045138]/10 text-[#045138] px-3 py-1 rounded-lg">
                {journal.journal_type}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {!journal.is_posted && (
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Button
              onClick={() => setOpenAddEntry(true)}
              className="h-12 bg-[#D0402B] border border-black/5 text-white hover:bg-black/5 font-black uppercase text-xs tracking-widest rounded-xl shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Entry
            </Button>
            <Button
              // onClick={() => setOpenUpdateJournal(true)} // Implement Update Modal if needed
              variant="outline"
              className="h-12 border-black/5 bg-white hover:bg-black/5 font-black uppercase text-xs tracking-widest rounded-xl"
              onClick={() => setOpenUpdateJournal(true)}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Details
            </Button>

            <Button
              onClick={handlePostJournal}
              disabled={isPosting || !isBalanced}
              className={`h-12 font-black uppercase text-xs tracking-widest rounded-xl shadow-lg transition-all ${!isBalanced
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#045138] hover:bg-black text-white"
                }`}
            >
              {isPosting ? (
                <LoadingSpinner />
              ) : (
                <div className="flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Finalize & Post
                </div>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-black/5 bg-white/60 backdrop-blur-xl rounded-[24px] shadow-sm">
          <CardContent className="p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">
              Total Debit
            </p>
            <p className="text-xl lg:text-3xl font-black text-black tracking-tight truncate" title={new Intl.NumberFormat("en-KE", { style: "currency", currency: journal.currency }).format(totalDebit)}>
              {new Intl.NumberFormat("en-KE", {
                style: "currency",
                currency: journal.currency,
              }).format(totalDebit)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-black/5 bg-white/60 backdrop-blur-xl rounded-[24px] shadow-sm">
          <CardContent className="p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">
              Total Credit
            </p>
            <p className="text-xl lg:text-3xl font-black text-black tracking-tight truncate" title={new Intl.NumberFormat("en-KE", { style: "currency", currency: journal.currency }).format(totalCredit)}>
              {new Intl.NumberFormat("en-KE", {
                style: "currency",
                currency: journal.currency,
              }).format(totalCredit)}
            </p>
          </CardContent>
        </Card>
        <Card
          className={`border-black/5 backdrop-blur-xl rounded-[24px] shadow-sm transition-colors ${isBalanced
              ? "bg-[#045138]/5 border-[#045138]/20"
              : "bg-red-500/5 border-red-500/20"
            }`}
        >
          <CardContent className="p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">
              Balance Status
            </p>
            <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-3">
              <p
                className={`text-xl lg:text-3xl font-black tracking-tight ${isBalanced ? "text-[#045138]" : "text-red-600"
                  }`}
              >
                {isBalanced ? "Balanced" : "Unbalanced"}
              </p>
              {!isBalanced && (
                <Badge className="bg-red-500 text-white border-none w-fit">
                  Diff:{" "}
                  {new Intl.NumberFormat("en-KE", {
                    style: "currency",
                    currency: journal.currency,
                  }).format(Math.abs(totalDebit - totalCredit))}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Entries List */}
      <Card className="border-black/5 bg-white/50 backdrop-blur-xl rounded-[32px] overflow-hidden shadow-xl shadow-black/5 pb-24">
        <div className="p-8 border-b border-black/5 flex justify-between items-center">
          <h3 className="text-xl font-black text-black tracking-tight flex items-center gap-3">
            <Receipt className="w-5 h-5 text-[#045138]" />
            Transaction Entries
          </h3>
          <span className="bg-black/5 px-3 py-1 rounded-full text-xs font-bold text-black/60">
            {journal.journal_entries.length} Records
          </span>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-black/5 border-b border-black/5 text-left">
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-black/40">
                    Account Book
                  </th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-black/40">
                    Partner / Division
                  </th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-black/40">
                    Details
                  </th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-black/40 text-right">
                    Debit
                  </th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-black/40 text-right">
                    Credit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 font-medium text-sm">
                {journal.journal_entries.map((entry) => (
                  <tr
                    key={entry.reference}
                    className="hover:bg-white/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold text-black">{entry.book}</div>
                      <div className="text-[10px] uppercase text-black/40 tracking-wider">
                        {entry.code}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-black">
                        {entry.partner || "—"}
                      </div>
                      <div className="text-[10px] text-black/40">
                        {entry.division}
                      </div>
                    </td>
                    <td className="py-4 px-6 max-w-xs truncate">
                      <div className="text-black/80 truncate">
                        {entry.notes || "No notes"}
                      </div>
                      {(entry.source_document || entry.document_number) && (
                        <div className="text-[10px] font-bold text-[#045138] uppercase tracking-wider mt-0.5">
                          {entry.source_document} #{entry.document_number}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right font-mono text-black/80">
                      {parseFloat(entry.debit) > 0
                        ? new Intl.NumberFormat("en-KE", {
                          style: "decimal",
                          minimumFractionDigits: 2,
                        }).format(parseFloat(entry.debit))
                        : "—"}
                    </td>
                    <td className="py-4 px-6 text-right font-mono text-black/80">
                      {parseFloat(entry.credit) > 0
                        ? new Intl.NumberFormat("en-KE", {
                          style: "decimal",
                          minimumFractionDigits: 2,
                        }).format(parseFloat(entry.credit))
                        : "—"}
                    </td>
                  </tr>
                ))}
                {journal.journal_entries.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-black/30">
                      No entries recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Manual Modal Implementation for Create Journal Entry */}
      {openAddEntry && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-200">
          <CreateJournalEntry
            rolePrefix="finance"
            journalReference={journal.code}
            onSuccess={() => setOpenAddEntry(false)}
            onClose={() => setOpenAddEntry(false)}
            className="min-h-screen border-none shadow-none rounded-none"
          />
        </div>
      )}

      {/* Manual Modal for Update Journal */}
      {openUpdateJournal && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-200">
          <UpdateJournal
            journal={journal}
            onClose={() => setOpenUpdateJournal(false)}
            className="min-h-screen border-none shadow-none rounded-none"
          />
        </div>
      )}
    </div>
  );
}
