/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createJournalEntry } from "@/services/journalentries";
import { useFormik } from "formik";
import { JournalEntrySchema } from "@/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { Loader2, Receipt, Plus } from "lucide-react";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";
import { useRouter } from "next/navigation";
import { useFetchJournals } from "@/hooks/journals/actions";
import { useFetchBooks } from "@/hooks/books/actions";
import { useFetchPartners } from "@/hooks/partners/actions";
import { useFetchDivisions } from "@/hooks/divisions/actions";

interface CreateJournalEntryProps {
  rolePrefix?: string;
  journalReference?: string;
  onSuccess?: () => void;
}

export default function CreateJournalEntry({
  rolePrefix = "finance",
  journalReference,
  onSuccess,
}: CreateJournalEntryProps) {
  const header = useAxiosAuth();
  const router = useRouter();

  const primaryColor = rolePrefix === "director" ? "#D0402B" : "#045138";

  const { data: journals, isLoading: isLoadingJournals } = useFetchJournals();
  const { data: books, isLoading: isLoadingBooks } = useFetchBooks();
  const { data: partners, isLoading: isLoadingPartners } = useFetchPartners();
  const { data: divisions, isLoading: isLoadingDivisions } =
    useFetchDivisions();

  const formik = useFormik({
    initialValues: {
      journal: journalReference || "",
      book: "",
      partner: "",
      division: "",
      debit: 0,
      credit: 0,
      currency: "KES",
      exchange_rate: 1,
      payment_method: "CASH",
      is_intercompany: false,
      source_document: "",
      document_number: "",
      document_file: null as File | null,
      notes: "",
      project: "",
    },
    enableReinitialize: true,
    validationSchema: JournalEntrySchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("journal", values.journal);
        formData.append("book", values.book);
        formData.append("partner", values.partner);
        formData.append("division", values.division);
        formData.append("debit", values.debit.toString());
        formData.append("credit", values.credit.toString());
        formData.append("currency", values.currency);
        formData.append("exchange_rate", values.exchange_rate.toString());
        formData.append("payment_method", values.payment_method);
        formData.append("is_intercompany", values.is_intercompany.toString());
        formData.append("source_document", values.source_document || "");
        formData.append("document_number", values.document_number || "");
        formData.append("notes", values.notes || "");
        formData.append("project", values.project || "");
        if (values.document_file) {
          formData.append("document_file", values.document_file);
        }

        await createJournalEntry(formData, header);
        toast.success("Journal entry recorded");
        resetForm();
        window.location.reload();
        if (onSuccess) onSuccess();
        router.refresh();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to record entry");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Card className="w-full border-black/5 shadow-2xl rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-xl">
      <CardHeader
        className="p-8 border-b border-black/5"
        style={{ backgroundColor: `${primaryColor}0D` }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
            style={{
              backgroundColor: primaryColor,
              boxShadow: `0 10px 15px -3px ${primaryColor}4D`,
            }}
          >
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black text-black tracking-tight">
              New Transaction Entry
            </CardTitle>
            <CardDescription className="text-black/50 font-bold uppercase text-[10px] tracking-widest mt-1">
              Single Entry Point
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          {/* Contextual Mapping */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-6 bg-orange-50/20 rounded-3xl border border-black/5">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">
                Journal Batch
              </Label>
              <select
                name="journal"
                disabled={isLoadingJournals}
                className="flex h-12 w-full rounded-xl border border-black/5 bg-white px-4 text-xs font-bold focus:ring-2 focus:ring-corporate-primary/20 appearance-none"
                onChange={formik.handleChange}
                value={formik.values.journal}
              >
                <option value="">Select Batch...</option>
                {journals?.map((j) => (
                  <option key={j.reference} value={j.reference}>
                    {j.reference} - {j.description.substring(0, 20)}...
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">
                Account Book
              </Label>
              <select
                name="book"
                disabled={isLoadingBooks}
                className="flex h-12 w-full rounded-xl border border-black/5 bg-white px-4 text-xs font-bold focus:ring-2 focus:ring-corporate-primary/20 appearance-none"
                onChange={formik.handleChange}
                value={formik.values.book}
              >
                <option value="">Select Account...</option>
                {books?.map((b) => (
                  <option key={b.code} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">
                Partner
              </Label>
              <select
                name="partner"
                disabled={isLoadingPartners}
                className="flex h-12 w-full rounded-xl border border-black/5 bg-white px-4 text-xs font-bold focus:ring-2 focus:ring-corporate-primary/20 appearance-none"
                onChange={formik.handleChange}
                value={formik.values.partner}
              >
                <option value="">None / External</option>
                {partners?.map((p) => (
                  <option key={p.reference} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">
                Division
              </Label>
              <select
                name="division"
                disabled={isLoadingDivisions}
                className="flex h-12 w-full rounded-xl border border-black/5 bg-white px-4 text-xs font-bold focus:ring-2 focus:ring-corporate-primary/20 appearance-none"
                onChange={formik.handleChange}
                value={formik.values.division}
              >
                <option value="">Global</option>
                {divisions?.map((d) => (
                  <option key={d.reference} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">
                Project
              </Label>
              <Input
                name="project"
                placeholder="PROJ-001"
                className="h-12 rounded-xl border-black/5 bg-white px-4 text-xs font-bold focus:ring-2 focus:ring-corporate-primary/20"
                onChange={formik.handleChange}
                value={formik.values.project}
              />
            </div>
          </div>

          <hr className="border-black/5" />

          {/* Financials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="debit"
                className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                Debit Amount
              </Label>
              <Input
                id="debit"
                name="debit"
                type="number"
                step="0.01"
                className="h-14 rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white font-bold px-5"
                onChange={formik.handleChange}
                value={formik.values.debit}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="credit"
                className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                Credit Amount
              </Label>
              <Input
                id="credit"
                name="credit"
                type="number"
                step="0.01"
                className="h-14 rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white font-bold px-5"
                onChange={formik.handleChange}
                value={formik.values.credit}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">
                Currency
              </Label>
              <select
                name="currency"
                className="flex h-14 w-full rounded-2xl border border-black/5 bg-orange-50/30 px-5 text-sm font-bold focus:ring-2 focus:ring-corporate-primary/20 appearance-none"
                onChange={formik.handleChange}
                value={formik.values.currency}
              >
                <option value="KES">KES</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="exchange_rate"
                className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                Ex. Rate
              </Label>
              <Input
                id="exchange_rate"
                name="exchange_rate"
                type="number"
                step="0.0001"
                className="h-14 rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white font-bold px-5"
                onChange={formik.handleChange}
                value={formik.values.exchange_rate}
              />
            </div>
          </div>

          {/* Documentation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">
                Payment Method
              </Label>
              <select
                name="payment_method"
                className="flex h-14 w-full rounded-2xl border border-black/5 bg-orange-50/30 px-5 text-sm font-bold focus:ring-2 focus:ring-corporate-primary/20 appearance-none"
                onChange={formik.handleChange}
                value={formik.values.payment_method}
              >
                <option value="CASH">CASH</option>
                <option value="BANK_TRANSFER">BANK TRANSFER</option>
                <option value="CHEQUE">CHEQUE</option>
                <option value="MOBILE_MONEY">MPESA / MOBILE</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="source_document"
                className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                Source Doc Type
              </Label>
              <Input
                id="source_document"
                name="source_document"
                placeholder="e.g. INVOICE, RECEIPT"
                className="h-14 rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white font-bold px-5"
                onChange={formik.handleChange}
                value={formik.values.source_document}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="document_number"
                className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                Document #
              </Label>
              <Input
                id="document_number"
                name="document_number"
                placeholder="REF-001"
                className="h-14 rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white font-bold px-5"
                onChange={formik.handleChange}
                value={formik.values.document_number}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="document_file"
                className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                Supporting File
              </Label>
              <input
                id="document_file"
                name="document_file"
                type="file"
                accept=".pdf, .doc, .docx"
                className="h-14 rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white font-bold px-5 py-3 text-xs"
                onChange={(event) => {
                  formik.setFieldValue(
                    "document_file",
                    event.currentTarget.files?.[0] || null
                  );
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="notes"
              className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
            >
              Entry Notes
            </Label>
            <Textarea
              id="notes"
              name="notes"
              className="min-h-[100px] rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white font-bold p-5"
              onChange={formik.handleChange}
              value={formik.values.notes}
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-orange-50/30 rounded-2xl border border-black/5">
            <input
              id="is_intercompany"
              name="is_intercompany"
              type="checkbox"
              className="w-5 h-5 rounded-lg border-black/5 text-corporate-primary focus:ring-corporate-primary/20"
              onChange={formik.handleChange}
              checked={formik.values.is_intercompany}
            />
            <Label
              htmlFor="is_intercompany"
              className="text-sm font-black text-black"
            >
              Intercompany Transaction
            </Label>
          </div>

          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full h-16 text-white rounded-[20px] font-black text-lg transition-all shadow-xl active:scale-[0.98] group"
            style={{
              backgroundColor: primaryColor,
              boxShadow: `0 10px 20px -5px ${primaryColor}4D`,
            }}
          >
            {formik.isSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <div className="flex items-center gap-3">
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                Record Transaction Entry
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
