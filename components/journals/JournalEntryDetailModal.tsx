"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
  if (!entry) return null;

  const DetailItem = ({ icon: Icon, label, value, className = "" }: any) => (
    <div className={`flex flex-col gap-1 ${className}`}>
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-white rounded-2xl shadow-2xl border border-gray-100">
        <DialogHeader className="p-8 border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="bg-gray-50 text-gray-600 border-gray-200 px-3 py-1 text-xs"
                >
                  {entry.code}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-600 border-blue-200 px-3 py-1 text-xs"
                >
                  {entry.journal}
                </Badge>
              </div>
              <DialogTitle className="text-2xl font-bold text-gray-900 tracking-tight">
                Journal Entry Details
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Created on{" "}
                {new Date(entry.created_at).toLocaleString(undefined, {
                  dateStyle: "full",
                  timeStyle: "medium",
                })}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-gray-100 -mr-2 -mt-2 w-10 h-10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-8 space-y-10">
          {/* Financials Section */}
          <section className="space-y-5">
            <h4 className="text-base font-bold text-gray-900 flex items-center gap-2.5">
              <div className="p-1.5 bg-green-100 rounded-lg">
                <DollarSign className="w-4 h-4 text-green-700" />
              </div>
              Financials
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              {/* Debit Card */}
              <div
                className={`p-5 rounded-2xl border transition-all ${parseFloat(entry.debit) > 0 ? "bg-green-50 border-green-200 shadow-sm" : "bg-gray-50 border-gray-100 opacity-60"}`}
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${parseFloat(entry.debit) > 0 ? "bg-green-500" : "bg-gray-300"}`}
                  />
                  Debit
                </div>
                <div
                  className={`text-2xl font-bold tracking-tight ${parseFloat(entry.debit) > 0 ? "text-green-700" : "text-gray-400"}`}
                >
                  {formatCurrency(entry.debit, entry.currency)}
                </div>
              </div>

              {/* Credit Card */}
              <div
                className={`p-5 rounded-2xl border transition-all ${parseFloat(entry.credit) > 0 ? "bg-orange-50 border-orange-200 shadow-sm" : "bg-gray-50 border-gray-100 opacity-60"}`}
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${parseFloat(entry.credit) > 0 ? "bg-orange-500" : "bg-gray-300"}`}
                  />
                  Credit
                </div>
                <div
                  className={`text-2xl font-bold tracking-tight ${parseFloat(entry.credit) > 0 ? "text-orange-700" : "text-gray-400"}`}
                >
                  {formatCurrency(entry.credit, entry.currency)}
                </div>
              </div>

              {/* Meta Data */}
              <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-gray-100 bg-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
                    Currency
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {entry.currency}
                  </span>
                </div>
                <div className="p-4 rounded-xl border border-gray-100 bg-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
                    Exchange Rate
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {entry.exchange_rate}
                  </span>
                </div>
              </div>
            </div>
            {(parseFloat(entry.foreign_debit) > 0 ||
              parseFloat(entry.foreign_credit) > 0) && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-4 bg-blue-50/30 rounded-xl border border-blue-100">
                <DetailItem
                  icon={Globe}
                  label="Foreign Debit"
                  value={formatCurrency(entry.foreign_debit, "USD")} // Assuming simplified display, ideally currency code should be dynamic if available for foreign
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
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Building2 className="w-4 h-4 text-blue-700" />
              </div>
              Entity & Classification
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 p-6 bg-gray-50/50 rounded-2xl border border-gray-100/50 hover:border-gray-100 transition-colors">
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
              <div className="p-1.5 bg-orange-100 rounded-lg">
                <FileText className="w-4 h-4 text-orange-700" />
              </div>
              Documentation
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
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
                <div className="sm:col-span-2 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5 mb-3">
                    <File className="w-3 h-3" />
                    Attachment
                  </span>
                  <a
                    href={entry.document_file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm font-medium text-blue-700 hover:text-blue-800 bg-blue-50 border border-blue-100 hover:bg-blue-100 hover:border-blue-200 px-5 py-3 rounded-xl transition-all group"
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
                  <div className="p-1.5 bg-gray-100 rounded-lg">
                    <FileText className="w-4 h-4 text-gray-700" />
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

        <div className="p-8 bg-gray-50/80 border-t border-gray-100 flex justify-end backdrop-blur-sm">
          <Button
            onClick={onClose}
            variant="outline"
            className="font-bold border-gray-200 hover:bg-white hover:text-black"
          >
            Close Details
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
