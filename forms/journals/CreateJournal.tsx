/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createJournal } from "@/services/journals";
import { useFormik } from "formik";





import { toast } from "react-hot-toast";
import { Loader2, Book, Plus, X } from "lucide-react";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";
import { useRouter } from "next/navigation";
import { useFetchJournalTypes } from "@/hooks/journaltypes/actions";
import { useQueryClient } from "@tanstack/react-query";

interface CreateJournalProps {
  fiscalYear?: string;
  initialJournalType?: string;
  rolePrefix?: string;
  onSuccess?: () => void;
  onClose?: () => void;
  className?: string;
  refetch: () => void;
}

export default function CreateJournal({
  fiscalYear,
  initialJournalType,
  rolePrefix = "finance",
  onSuccess,
  onClose,
  className,
  refetch,
}: CreateJournalProps) {
  const header = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const primaryColor = rolePrefix === "director" ? "#D0402B" : "#045138";

  const { data: journalTypes, isLoading: isLoadingTypes } =
    useFetchJournalTypes();

  const formik = useFormik({
    initialValues: {
      date: new Date().toISOString().split("T")[0],
      description: "",
      journal_type: initialJournalType || "",
      currency: "",
      financial_year: fiscalYear || "",
    },
    enableReinitialize: true,
    // No validationSchema – using native HTML required instead
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await createJournal(values, header);
        toast.success("Journal batch created successfully");
        queryClient.invalidateQueries({ queryKey: ["journals"] });
        refetch();
        if (onSuccess) onSuccess();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to create journal batch",
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div
      className={`mx-auto w-full border-black/5 shadow-2xl rounded-xl overflow-hidden bg-white/80 backdrop-blur-xl ${className}`}
    >
      <div className="p-8 border-b border-black/5 bg-gradient-to-r from-white to-gray-50/50">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 10px 15px -3px ${primaryColor}4D`,
              }}
            >
              <Book className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black tracking-tight">
                New Journal Batch
              </h2>
              <p className="text-black/50 font-medium text-sm mt-1">
                Transaction Container
              </p>
            </div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
             
              className="hover:bg-red-50 hover:text-red-500 rounded-full text-black/40 p-2"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="financial_year"
                className="text-sm font-semibold uppercase tracking-widest text-black/40 ml-1 flex items-center gap-1"
              >
                Financial Year{" "}
                <span className="text-red-500 text-xs font-bold">*</span>
              </label>
              <input
                id="financial_year"
                name="financial_year"
                type="text"
                required
                placeholder="e.g., FY2025/2026"
                className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 w-full h-14 rounded-2xl focus:bg-slate-50 transition-all font-medium px-5"
                onChange={formik.handleChange}
                value={formik.values.financial_year}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="date"
                className="text-sm font-semibold uppercase tracking-widest text-black/40 ml-1 flex items-center gap-1"
              >
                Transaction Date{" "}
                <span className="text-red-500 text-xs font-bold">*</span>
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 w-full h-14 rounded-2xl focus:bg-slate-50 transition-all font-medium px-5"
                onChange={formik.handleChange}
                value={formik.values.date}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="journal_type"
                className="text-sm font-semibold uppercase tracking-widest text-black/40 ml-1 flex items-center gap-1"
              >
                Journal Category{" "}
                <span className="text-red-500 text-xs font-bold">*</span>
              </label>
              <select
                id="journal_type"
                name="journal_type"
                required
                disabled={isLoadingTypes}
                className="focus:outline-none focus:ring-2 focus:ring-emerald-600/20 flex h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-medium focus:ring-[#045138]/30 appearance-none"
                onChange={formik.handleChange}
                value={formik.values.journal_type}
              >
                <option value="">Select Category...</option>
                {journalTypes?.map((type) => (
                  <option key={type.reference} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-semibold uppercase tracking-widest text-black/40 ml-1 flex items-center gap-1"
            >
              Batch Narrative{" "}
              <span className="text-red-500 text-xs font-bold">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              placeholder="Provide a clear description of this journal batch (e.g., 'January 2026 sales and expenses')"
              className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 w-full min-h-[120px] rounded-2xl focus:bg-slate-50 transition-all font-medium p-5"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="currency"
              className="text-sm font-semibold uppercase tracking-widest text-black/40 ml-1 flex items-center gap-1"
            >
              Currency <span className="text-red-500 text-xs font-bold">*</span>
            </label>
            <select
              name="currency"
              required
              className="focus:outline-none focus:ring-2 focus:ring-emerald-600/20 flex h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm font-medium focus:ring-[#045138]/30 appearance-none"
              onChange={formik.handleChange}
              value={formik.values.currency}
            >
              <option value="">Select Currency...</option>
              <option value="KES">KES</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full h-16 text-white rounded-[1.25rem] font-bold text-lg transition-all shadow-xl active:scale-[0.98] group flex items-center justify-center"
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
                  Initialize Journal Batch
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
