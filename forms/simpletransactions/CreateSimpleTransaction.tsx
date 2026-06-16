/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { Loader2, Zap, X, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { formatBackendError } from "@/lib/error-handler";
import { createSimpleTransaction } from "@/services/simpletransactions";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";
import { useFetchBooks } from "@/hooks/books/actions";
import { useFetchDivisions } from "@/hooks/divisions/actions";
import { useFetchJournalTypes } from "@/hooks/journaltypes/actions";
import SearchableSelect from "@/components/portal/SearchableSelect";
import { useFetchPaymentMethods } from "@/hooks/paymentmethods/actions";
import { useFetchPartners } from "@/hooks/partners/actions";

interface CreateSimpleTransactionProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export default function CreateSimpleTransaction({
  onSuccess,
  onClose,
}: CreateSimpleTransactionProps) {
  const header = useAxiosAuth();
  const queryClient = useQueryClient();

  const { data: books, isLoading: loadingBooks } = useFetchBooks();
  const { data: divisions, isLoading: loadingDivisions } = useFetchDivisions();
  const { data: journalTypes, isLoading: loadingJournalTypes } = useFetchJournalTypes();
  const { data: paymentMethods, isLoading: loadingPaymentMethods } = useFetchPaymentMethods();
  const { data: partners } = useFetchPartners();

  const formik = useFormik({
    initialValues: {
      name: "",
      transaction_type: "MONEY_OUT" as "MONEY_IN" | "MONEY_OUT",
      ledger_book: "",
      payment_method: "",
      division: "",
      journal_type: "",
      partner: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      source_document: "",
      document_number: "",
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await createSimpleTransaction(
          {
            ...values,
            amount: parseFloat(values.amount),
            partner: values.partner || null,
            source_document: values.source_document || null,
            document_number: values.document_number || null,
          },
          header
        );
        toast.success("Transaction logged! Journal auto-generated.");
        queryClient.invalidateQueries({ queryKey: ["simpletransactions"] });
        resetForm();
        if (onSuccess) onSuccess();
      } catch (error: any) {
        toast.error(formatBackendError(error, "Failed to log transaction"));
      } finally {
        setSubmitting(false);
      }
    },
  });

  const isMoneyIn = formik.values.transaction_type === "MONEY_IN";

  const bookOptions = books?.map((b) => ({ value: b.name, label: b.name, secondaryLabel: b.account_type })) || [];
  const divisionOptions = divisions?.map((d) => ({ value: d.name, label: d.name })) || [];
  const journalTypeOptions = journalTypes?.map((j) => ({ value: j.name, label: j.name, secondaryLabel: j.code })) || [];
  const paymentMethodOptions = paymentMethods?.map((p) => ({ value: p.name, label: p.name })) || [];
  const partnerOptions = partners?.map((p) => ({ value: p.name, label: p.name })) || [];

  const isLoading = loadingBooks || loadingDivisions || loadingJournalTypes || loadingPaymentMethods;

  return (
    <div className="mx-auto w-full border border-slate-200 shadow-2xl rounded overflow-hidden bg-white">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded flex items-center justify-center text-white shadow-xl bg-slate-900">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Log Transaction</h2>
              <p className="text-slate-400 font-semibold text-[10px] uppercase tracking-widest mt-1">
                Journal entry auto-generated on save
              </p>
            </div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="hover:bg-red-50 hover:text-red-500 rounded text-slate-300 p-2.5 transition-all active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="p-6 pb-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6">

          {/* Transaction Type Toggle */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
              Transaction Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => formik.setFieldValue("transaction_type", "MONEY_OUT")}
                className={cn(
                  "flex items-center justify-center gap-2 h-12 rounded border font-semibold text-sm transition-all",
                  !isMoneyIn
                    ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/20"
                    : "bg-slate-50 text-slate-500 border-slate-200 hover:border-red-200 hover:text-red-500"
                )}
              >
                <ArrowUpRight className="w-4 h-4" />
                Money Out
              </button>
              <button
                type="button"
                onClick={() => formik.setFieldValue("transaction_type", "MONEY_IN")}
                className={cn(
                  "flex items-center justify-center gap-2 h-12 rounded border font-semibold text-sm transition-all",
                  isMoneyIn
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/20"
                    : "bg-slate-50 text-slate-500 border-slate-200 hover:border-emerald-200 hover:text-emerald-500"
                )}
              >
                <ArrowDownLeft className="w-4 h-4" />
                Money In
              </button>
            </div>
          </div>

          <div className="space-y-2 md:col-span-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                Description <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="e.g. Bought water, Office supplies..."
                className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-900/10 w-full h-12 rounded focus:bg-white focus:border-slate-900 transition-all font-semibold px-4 text-sm"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </div>

          {/* Description + Amount + Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                Amount (KES) <span className="text-red-500">*</span>
              </label>
              <input
                name="amount"
                type="number"
                required
                step="0.01"
                min="0.01"
                placeholder="0.00"
                className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-900/10 w-full h-12 rounded focus:bg-white focus:border-slate-900 transition-all font-semibold px-4 text-sm font-mono"
                onChange={formik.handleChange}
                value={formik.values.amount}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                name="date"
                type="date"
                required
                className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-900/10 w-full h-12 rounded focus:bg-white focus:border-slate-900 transition-all font-semibold px-4 text-sm"
                onChange={formik.handleChange}
                value={formik.values.date}
              />
            </div>
          </div>

          {/* Ledger Book + Payment Method */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchableSelect
              label={isMoneyIn ? "Credit Book (Where money goes to)" : "Debit Book (What is being bought/paid)"}
              options={bookOptions}
              value={formik.values.ledger_book}
              onChange={(val) => formik.setFieldValue("ledger_book", val)}
              placeholder="Select Ledger Book..."
              required
              disabled={loadingBooks}
            />
            <SearchableSelect
              label={isMoneyIn ? "Debit Account (Bank/Cash receiving)" : "Credit Account (Bank/Cash paying)"}
              options={paymentMethodOptions}
              value={formik.values.payment_method}
              onChange={(val) => formik.setFieldValue("payment_method", val)}
              placeholder="Select Payment Method..."
              required
              disabled={loadingPaymentMethods}
            />
          </div>

          {/* Division + Journal Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchableSelect
              label="Division"
              options={divisionOptions}
              value={formik.values.division}
              onChange={(val) => formik.setFieldValue("division", val)}
              placeholder="Select Division..."
              required
              disabled={loadingDivisions}
            />
            <SearchableSelect
              label="Journal Type"
              options={journalTypeOptions}
              value={formik.values.journal_type}
              onChange={(val) => formik.setFieldValue("journal_type", val)}
              placeholder="Select Journal Type..."
              required
              disabled={loadingJournalTypes}
            />
          </div>

          {/* Partner (optional) */}
          <SearchableSelect
            label="Partner / Vendor (Optional)"
            options={partnerOptions}
            value={formik.values.partner}
            onChange={(val) => formik.setFieldValue("partner", val)}
            placeholder="Select Partner..."
            disabled={false}
          />

          {/* Documentation (optional) */}
          <div className="pt-4 border-t border-slate-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
              Documentation (Optional)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Source Document
                </label>
                <input
                  name="source_document"
                  type="text"
                  placeholder="Invoice, Receipt, Tax Receipt, etc."
                  className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-900/10 w-full h-12 rounded focus:bg-white focus:border-slate-900 transition-all font-semibold px-4 text-sm"
                  onChange={formik.handleChange}
                  value={formik.values.source_document}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Document Number
                </label>
                <input
                  name="document_number"
                  type="text"
                  placeholder="INV-001, RCT-2024, etc."
                  className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-900/10 w-full h-12 rounded focus:bg-white focus:border-slate-900 transition-all font-semibold px-4 text-sm"
                  onChange={formik.handleChange}
                  value={formik.values.document_number}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={formik.isSubmitting || isLoading}
            className={cn(
              "w-full h-14 text-white rounded font-bold text-sm transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2.5",
              isMoneyIn
                ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30"
                : "bg-slate-900 hover:bg-slate-800 shadow-slate-900/30"
            )}
          >
            {formik.isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Zap className="w-4 h-4" />
                LOG TRANSACTION & AUTO-GENERATE JOURNAL
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
