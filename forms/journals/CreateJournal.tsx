/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createJournal } from "@/services/journals";
import { useFormik } from "formik";
import { JournalSchema } from "@/validation";
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
import { Loader2, Book, Plus, X } from "lucide-react";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";
import { useRouter } from "next/navigation";
import { useFetchJournalTypes } from "@/hooks/journaltypes/actions";

interface CreateJournalProps {
  fiscalYear?: string;
  rolePrefix?: string;
  onSuccess?: () => void;
  onClose?: () => void;
  className?: string;
}

export default function CreateJournal({
  fiscalYear,
  rolePrefix = "finance",
  onSuccess,
  onClose,
  className,
}: CreateJournalProps) {
  const header = useAxiosAuth();
  const { data: journalTypes, isLoading: isLoadingTypes } =
    useFetchJournalTypes();

  const primaryColor = rolePrefix === "director" ? "#D0402B" : "#045138";

  const formik = useFormik({
    initialValues: {
      date: new Date().toISOString().split("T")[0],
      description: "",
      journal_type: "",
      currency: "",
      financial_year: fiscalYear || "",
    },
    validationSchema: JournalSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await createJournal(values, header);
        toast.success("Journal created successfully");
        window.location.reload();
        resetForm();
        if (onSuccess) onSuccess();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to create journal"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Card
      className={`mx-auto w-full border-black/5 shadow-2xl rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-xl ${className}`}
    >
      <CardHeader
        className="p-8 border-b border-black/5"
        style={{ backgroundColor: `${primaryColor}0D` }}
      >
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
              <CardTitle className="text-2xl font-black text-black tracking-tight">
                New Journal Batch
              </CardTitle>
              <CardDescription className="text-black/50 font-bold uppercase text-[10px] tracking-widest mt-1">
                Transaction Container
              </CardDescription>
            </div>
          </div>
          {onClose && (
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="hover:bg-red-50 hover:text-red-500 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="financial_year"
                className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                Financial Year
              </Label>
              <Input
                id="financial_year"
                name="financial_year"
                type="text"
                className="h-14 rounded-2xl border-black/5 bg-black/5 focus:bg-white transition-all font-bold px-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.financial_year}
                style={{ ["--tw-ring-color" as any]: `${primaryColor}33` }}
              />
              {formik.touched.financial_year &&
                formik.errors.financial_year && (
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1">
                    {formik.errors.financial_year}
                  </p>
                )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="date"
                className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                Transaction Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                className="h-14 rounded-2xl border-black/5 bg-black/5 focus:bg-white transition-all font-bold px-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
                style={{ ["--tw-ring-color" as any]: `${primaryColor}33` }}
              />
              {formik.touched.date && formik.errors.date && (
                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1">
                  {formik.errors.date}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="journal_type"
                className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                Journal Category
              </Label>
              <select
                id="journal_type"
                name="journal_type"
                disabled={isLoadingTypes}
                className="flex h-14 w-full rounded-2xl border border-black/5 bg-black/5 px-5 py-2 text-sm font-bold focus:ring-2 transition-all appearance-none"
                style={{ ["--tw-ring-color" as any]: `${primaryColor}33` }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.journal_type}
              >
                <option value="">Select Category...</option>
                {journalTypes?.map((type) => (
                  <option key={type.reference} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
              {formik.touched.journal_type && formik.errors.journal_type && (
                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1">
                  {formik.errors.journal_type}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">
                Currency <span className="text-red-500">*</span>
              </Label>
              <select
                name="currency"
                className="flex h-14 w-full rounded-2xl border border-black/5 bg-orange-50/30 px-5 text-sm font-bold focus:ring-2 focus:ring-corporate-primary/20 appearance-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currency}
              >
                <option value="KES">KES</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
            >
              Batch Narrative
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Provide a comprehensive narrative for this journal batch..."
              className="min-h-[120px] rounded-2xl border-black/5 bg-black/5 focus:bg-white transition-all font-bold p-5"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              style={{ ["--tw-ring-color" as any]: `${primaryColor}33` }}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          <div className="pt-4">
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
                  Initialize Journal Batch
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
