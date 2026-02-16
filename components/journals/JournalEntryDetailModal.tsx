"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  X,
  Calendar,
  User,
  Book,
  CreditCard,
  FileText,
  Building2,
  Briefcase,
  Hash,
  DollarSign,
  Globe,
  File,
} from "lucide-react";
import { JournalEntry } from "@/services/journalentries";
import { useEffect } from "react";

interface JournalEntryDetailModalProps {
  entry: JournalEntry | null;
  open: boolean;
  onClose: () => void;
}

export default function JournalEntryDetailModal({
  entry,
  open,
  onClose,
}: JournalEntryDetailModalProps) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!entry || !open) return null;

  const DetailItem = ({ icon: Icon, label, value, className = "" }: any) => (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
        <Icon className="w-3 h-3" />
        {label}
      </span>
      <span className="text-sm font-medium text-gray-900 break-words">
        {value || "—"}
      </span>
    </div>
  );

  const formatCurrency = (amount: string | number, currency: string) => {
    const val = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: currency,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex-none p-6 sm:p-8 border-b border-gray-100 bg-white rounded-t-2xl z-10 flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="bg-gray-50 text-gray-600 border-gray-200 px-3 py-1 text-xs font-medium"
              >
                {entry.code}
              </Badge>
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-600 border-blue-200 px-3 py-1 text-xs font-medium"
              >
                {entry.journal}
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Journal Entry Details
            </h2>
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                Created on{" "}
                {new Date(entry.created_at).toLocaleString(undefined, {
                  dateStyle: "full",
                  timeStyle: "short",
                })}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-gray-100 -mr-2 -mt-2 w-10 h-10 text-gray-500 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-10 custom-scrollbar">
          {/* Financials Section */}
          <section className="space-y-5">
            <h4 className="text-base font-bold text-gray-900 flex items-center gap-2.5">
              <div className="p-2 bg-green-100/50 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-700" />
              </div>
              Financials
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Debit Card */}
              <div
                className={`p-6 rounded-2xl border transition-all ${parseFloat(entry.debit) > 0 ? "bg-green-50/50 border-green-200 shadow-sm" : "bg-gray-50 border-gray-100 opacity-60"}`}
              >
                <div className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${parseFloat(entry.debit) > 0 ? "bg-green-500" : "bg-gray-300"}`}
                  />
                  Debit
                </div>
                <div
                  className={`text-3xl font-bold tracking-tight ${parseFloat(entry.debit) > 0 ? "text-green-700" : "text-gray-400"}`}
                >
                  {formatCurrency(entry.debit, entry.currency)}
                </div>
              </div>

              {/* Credit Card */}
              <div
                className={`p-6 rounded-2xl border transition-all ${parseFloat(entry.credit) > 0 ? "bg-orange-50/50 border-orange-200 shadow-sm" : "bg-gray-50 border-gray-100 opacity-60"}`}
              >
                <div className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${parseFloat(entry.credit) > 0 ? "bg-orange-500" : "bg-gray-300"}`}
                  />
                  Credit
                </div>
                <div
                  className={`text-3xl font-bold tracking-tight ${parseFloat(entry.credit) > 0 ? "text-orange-700" : "text-gray-400"}`}
                >
                  {formatCurrency(entry.credit, entry.currency)}
                </div>
              </div>

              {/* Meta Data */}
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-gray-200/60 bg-white shadow-sm flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
                    Currency
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    {entry.currency}
                  </span>
                </div>
                <div className="p-5 rounded-xl border border-gray-200/60 bg-white shadow-sm flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
                    Exchange Rate
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    {entry.exchange_rate}
                  </span>
                </div>
              </div>
            </div>
            {(parseFloat(entry.foreign_debit) > 0 ||
              parseFloat(entry.foreign_credit) > 0) && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-5 bg-blue-50/30 rounded-xl border border-blue-100/50">
                <DetailItem
                  icon={Globe}
                  label="Foreign Debit"
                  value={formatCurrency(entry.foreign_debit, "USD")}
                />
                <DetailItem
                  icon={Globe}
                  label="Foreign Credit"
                  value={formatCurrency(entry.foreign_credit, "USD")}
                />
              </div>
            )}
          </section>

          <Separator className="bg-gray-100" />

          {/* Entity & Classification */}
          <section className="space-y-5">
            <h4 className="text-base font-bold text-gray-900 flex items-center gap-2.5">
              <div className="p-2 bg-blue-100/50 rounded-lg">
                <Building2 className="w-5 h-5 text-blue-700" />
              </div>
              Entity & Classification
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <DetailItem
                icon={Book}
                label="Account Book"
                value={entry.book}
                className="col-span-1"
              />
              <DetailItem
                icon={Briefcase}
                label="Partner"
                value={entry.partner}
                className="col-span-1"
              />
              <DetailItem
                icon={Building2}
                label="Division"
                value={entry.division}
              />
              <DetailItem
                icon={User}
                label="Created By"
                value={entry.created_by}
              />
            </div>
          </section>

          <Separator className="bg-gray-100" />

          {/* Documentation */}
          <section className="space-y-5">
            <h4 className="text-base font-bold text-gray-900 flex items-center gap-2.5">
              <div className="p-2 bg-orange-100/50 rounded-lg">
                <FileText className="w-5 h-5 text-orange-700" />
              </div>
              Documentation
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <DetailItem
                icon={CreditCard}
                label="Payment Method"
                value={entry.payment_method}
              />
              <DetailItem
                icon={FileText}
                label="Source Document"
                value={`${entry.source_document} ${entry.document_number ? `#${entry.document_number}` : ""}`}
              />
              {entry.document_file && (
                <div className="md:col-span-2 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5 mb-3">
                    <File className="w-3 h-3" />
                    Attachment
                  </span>
                  <a
                    href={entry.document_file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm font-medium text-blue-700 hover:text-blue-800 bg-blue-50 border border-blue-100 hover:bg-blue-100 hover:border-blue-200 px-5 py-3 rounded-xl transition-all group w-full sm:w-auto justify-center"
                  >
                    <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    View Attached Document
                  </a>
                </div>
              )}
            </div>
          </section>

          {entry.notes && (
            <>
              <Separator className="bg-gray-100" />

              {/* Notes */}
              <section className="space-y-3">
                <h4 className="text-base font-bold text-gray-900 flex items-center gap-2.5">
                  <div className="p-2 bg-gray-100/50 rounded-lg">
                    <FileText className="w-5 h-5 text-gray-700" />
                  </div>
                  Notes / Description
                </h4>
                <div className="p-6 bg-gray-50 rounded-2xl text-sm text-gray-700 leading-relaxed border border-gray-100 italic">
                  "{entry.notes}"
                </div>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex-none p-6 sm:p-8 bg-gray-50 border-t border-gray-100 flex justify-end rounded-b-2xl">
          <Button
            onClick={onClose}
            variant="outline"
            size="lg"
            className="font-bold border-gray-200 hover:bg-white hover:text-black min-w-[120px]"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
