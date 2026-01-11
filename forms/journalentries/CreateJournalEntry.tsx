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
import { Loader2, Receipt, Plus, AlertCircle } from "lucide-react";
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
      debit: "",
      credit: "",
      currency: "KES",
      exchange_rate: "1",
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
        formData.append("partner", values.partner || "");
        formData.append("division", values.division);
        formData.append("debit", values.debit);
        formData.append("credit", values.credit);
        formData.append("currency", values.currency);
        formData.append("exchange_rate", values.exchange_rate);
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
        toast.success("Journal entry recorded successfully!");
        resetForm();
        if (onSuccess) onSuccess();
        router.refresh();
      } catch (error: any) {
        console.error("Submission error:", error);
        toast.error(error?.response?.data?.message || "Failed to record entry");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const hasAmount =
    Number(formik.values.debit) > 0 || Number(formik.values.credit) > 0;
  const bothAmounts =
    Number(formik.values.debit) > 0 && Number(formik.values.credit) > 0;

  return (
    <Card className="w-full h-full border-0 shadow-none md:shadow-2xl rounded-none md:rounded-3xl overflow-hidden bg-white">
      <CardHeader className="p-6 md:p-8 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
            style={{
              backgroundColor: primaryColor,
              boxShadow: `0 8px 16px -4px ${primaryColor}30`,
            }}
          >
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              New Journal Entry
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm font-medium mt-1">
              Record one debit or credit transaction (exactly one amount
              required)
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 md:p-8 flex-1 overflow-y-auto">
        <form onSubmit={formik.handleSubmit} className="space-y-10">
          {/* Error Summary */}
          {(!formik.isValid || bothAmounts || !hasAmount) &&
            Object.keys(formik.touched).length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-amber-800 text-sm">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-semibold">
                    Please fix these issues:
                  </span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  {!formik.values.journal && <li>Journal batch is required</li>}
                  {!formik.values.book && <li>Account book is required</li>}
                  {!formik.values.division && <li>Division is required</li>}
                  {!hasAmount && (
                    <li>Enter either Debit or Credit amount (not both)</li>
                  )}
                  {bothAmounts && <li>Cannot enter both Debit and Credit</li>}
                  {formik.errors.currency && <li>Currency is required</li>}
                  {formik.errors.payment_method && (
                    <li>Payment method is required</li>
                  )}
                </ul>
              </div>
            )}

          {/* Contextual Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                Journal Batch{" "}
                <span className="text-red-500 text-xs font-bold">*</span>
              </Label>
              <select
                name="journal"
                disabled={isLoadingJournals}
                className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium focus:border-[#045138] focus:ring-2 focus:ring-[#045138]/30 appearance-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.journal}
              >
                <option value="">Select Journal Batch...</option>
                {journals?.map((j) => (
                  <option key={j.reference} value={j.code}>
                    {j.description?.substring(0, 40) || j.code}
                  </option>
                ))}
              </select>
              {formik.touched.journal && formik.errors.journal && (
                <p className="text-xs text-red-600 font-medium">
                  {formik.errors.journal}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                Account Book{" "}
                <span className="text-red-500 text-xs font-bold">*</span>
              </Label>
              <select
                name="book"
                disabled={isLoadingBooks}
                className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium focus:border-[#045138] focus:ring-2 focus:ring-[#045138]/30 appearance-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.book}
              >
                <option value="">Select Account...</option>
                {books?.map((b) => (
                  <option key={b.code} value={b.code}>
                    {b.code} - {b.name}
                  </option>
                ))}
              </select>
              {formik.touched.book && formik.errors.book && (
                <p className="text-xs text-red-600 font-medium">
                  {formik.errors.book}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Partner (optional)</Label>
              <select
                name="partner"
                disabled={isLoadingPartners}
                className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium focus:border-[#045138] focus:ring-2 focus:ring-[#045138]/30 appearance-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.partner}
              >
                <option value="">None / External</option>
                {partners?.map((p) => (
                  <option key={p.reference} value={p.code}>
                    {p.code} - {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                Division{" "}
                <span className="text-red-500 text-xs font-bold">*</span>
              </Label>
              <select
                name="division"
                disabled={isLoadingDivisions}
                className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium focus:border-[#045138] focus:ring-2 focus:ring-[#045138]/30 appearance-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.division}
              >
                <option value="">Select Division</option>
                {divisions?.map((d) => (
                  <option key={d.reference} value={d.code}>
                    {d.name}
                  </option>
                ))}
              </select>
              {formik.touched.division && formik.errors.division && (
                <p className="text-xs text-red-600 font-medium">
                  {formik.errors.division}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Project (optional)</Label>
              <Input
                name="project"
                placeholder="e.g., PROJ-001"
                className="h-12 rounded-xl border-gray-300 focus:border-[#045138] focus:ring-[#045138]/30"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.project}
              />
            </div>
          </div>

          <hr className="border-gray-200 my-8" />

          {/* Financials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                Debit Amount
                <span className="text-xs text-gray-500 font-normal ml-1">
                  (leave blank if crediting)
                </span>
              </Label>
              <Input
                name="debit"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                className="h-14 rounded-xl border-gray-300 focus:border-[#045138] focus:ring-[#045138]/30 text-lg font-bold"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.debit}
              />
              {formik.touched.debit && formik.errors.debit && (
                <p className="text-xs text-red-600 font-medium">
                  {formik.errors.debit}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                Credit Amount
                <span className="text-xs text-gray-500 font-normal ml-1">
                  (leave blank if debiting)
                </span>
              </Label>
              <Input
                name="credit"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                className="h-14 rounded-xl border-gray-300 focus:border-[#045138] focus:ring-[#045138]/30 text-lg font-bold"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.credit}
              />
              {formik.touched.credit && formik.errors.credit && (
                <p className="text-xs text-red-600 font-medium">
                  {formik.errors.credit}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                Currency <span className="text-red-500">*</span>
              </Label>
              <select
                name="currency"
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium focus:border-[#045138] focus:ring-[#045138]/30 appearance-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currency}
              >
                <option value="KES">KES (Kenyan Shilling)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="EUR">EUR (Euro)</option>
                <option value="GBP">GBP (Pound Sterling)</option>
              </select>
              {formik.touched.currency && formik.errors.currency && (
                <p className="text-xs text-red-600 font-medium">
                  {formik.errors.currency}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Exchange Rate</Label>
              <Input
                name="exchange_rate"
                type="number"
                step="0.0001"
                min="0"
                placeholder="1.0000"
                className="h-14 rounded-xl border-gray-300 focus:border-[#045138] focus:ring-[#045138]/30"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.exchange_rate}
              />
            </div>
          </div>

          {/* Documentation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Payment Method</Label>
              <select
                name="payment_method"
                className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium focus:border-[#045138] focus:ring-[#045138]/30 appearance-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.payment_method}
              >
                <option value="CASH">Cash</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="CHEQUE">Cheque</option>
                <option value="MOBILE_MONEY">M-Pesa / Mobile Money</option>
                <option value="CARD">Card</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Source Document Type
              </Label>
              <Input
                name="source_document"
                placeholder="e.g., INVOICE, RECEIPT, BILL"
                className="h-14 rounded-xl border-gray-300 focus:border-[#045138] focus:ring-[#045138]/30"
                onChange={formik.handleChange}
                value={formik.values.source_document}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Document Number</Label>
              <Input
                name="document_number"
                placeholder="e.g., INV-2026-001"
                className="h-14 rounded-xl border-gray-300 focus:border-[#045138] focus:ring-[#045138]/30"
                onChange={formik.handleChange}
                value={formik.values.document_number}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Supporting File</Label>
              <div className="h-14 border border-gray-300 rounded-xl flex items-center px-4 bg-gray-50">
                <input
                  id="document_file"
                  name="document_file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#045138]/10 file:text-[#045138] hover:file:bg-[#045138]/20"
                  onChange={(e) => {
                    formik.setFieldValue(
                      "document_file",
                      e.currentTarget.files?.[0] || null
                    );
                  }}
                />
              </div>
            </div>
          </div>

          {/* Notes & Checkbox */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Entry Notes</Label>
              <Textarea
                name="notes"
                placeholder="Add any additional details, memo, or explanation..."
                className="min-h-[100px] rounded-xl border-gray-300 focus:border-[#045138] focus:ring-[#045138]/30"
                onChange={formik.handleChange}
                value={formik.values.notes}
              />
            </div>

            <div className="flex items-center gap-3 self-end">
              <input
                id="is_intercompany"
                name="is_intercompany"
                type="checkbox"
                className="w-5 h-5 rounded border-gray-300 text-[#045138] focus:ring-[#045138]/30"
                checked={formik.values.is_intercompany}
                onChange={formik.handleChange}
              />
              <Label
                htmlFor="is_intercompany"
                className="text-sm font-medium cursor-pointer"
              >
                This is an intercompany transaction
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={
              formik.isSubmitting ||
              !formik.isValid ||
              (Number(formik.values.debit) === 0 &&
                Number(formik.values.credit) === 0) ||
              (Number(formik.values.debit) > 0 &&
                Number(formik.values.credit) > 0)
            }
            className="w-full h-16 text-white rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] group"
            style={{
              backgroundColor: primaryColor,
              boxShadow: `0 10px 20px -5px ${primaryColor}40`,
            }}
          >
            {formik.isSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <div className="flex items-center gap-3">
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Record Journal Entry
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
