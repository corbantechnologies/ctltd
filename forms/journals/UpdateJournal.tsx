/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { updateJournal } from "@/services/journals";
import { useFormik } from "formik";
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
import { Loader2, Edit3, Save, X } from "lucide-react";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface UpdateJournalProps {
  journal: {
    reference: string;
    date: string;
    description: string;
    currency: string;
    journal_type: string;
  };
  onClose?: () => void;
  className?: string;
}

/* -------------------------------------------------------------
   NO VALIDATION SCHEMA – form always submits when the button is
   pressed (you can add server-side checks in the API if you need)
   ------------------------------------------------------------- */
export default function UpdateJournal({
  journal,
  onClose,
  className,
}: UpdateJournalProps) {
  const header = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      date: new Date(journal.date).toISOString().split("T")[0],
      description: journal.description,
      currency: journal.currency,
    },
    enableReinitialize: true,
    // ----> NO validationSchema <----
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await updateJournal(
          journal.reference,
          {
            description: values.description,
            date: values.date,
            currency: values.currency,
          },
          header,
        );
        toast.success("Journal batch updated successfully");
        queryClient.invalidateQueries({ queryKey: ["journals"] });
        queryClient.invalidateQueries({
          queryKey: ["journal", journal.reference],
        });
        router.refresh();
        onClose?.();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to update journal batch",
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Card
      className={`mx-auto border-black/5 shadow-2xl rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-xl ${className}`}
    >
      <CardHeader className="bg-orange-50/50 p-8 border-b border-black/5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-lg">
            <Edit3 className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black text-black tracking-tight">
              Update Journal Batch
            </CardTitle>
            <CardDescription className="text-black/50 font-bold uppercase text-[10px] tracking-widest mt-1">
              Refine Transaction Batch
            </CardDescription>
          </div>
          {onClose && (
            <div className="ml-auto">
              <Button
                type="button"
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="hover:bg-red-50 hover:text-red-500 rounded-full text-black/40"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-8">
        {/* Static info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-black/5 rounded-2xl border border-black/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-1">
              Batch Reference
            </p>
            <p className="font-bold text-black">{journal.reference}</p>
          </div>
          <div className="p-4 bg-black/5 rounded-2xl border border-black/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-1">
              Category
            </p>
            <p className="font-bold text-black">{journal.journal_type}</p>
          </div>
        </div>

        {/* Editable fields */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
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
              className="h-14 rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white transition-all font-bold px-5"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
            >
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              className="min-h-[120px] rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white transition-all font-bold p-5"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
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
              onBlur={formik.handleBlur}
              value={formik.values.currency}
            >
              <option value="KES">KES</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full h-16 bg-corporate-primary hover:bg-black text-white rounded-[20px] font-black text-lg transition-all shadow-xl active:scale-[0.98] group"
            >
              {formik.isSubmitting ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <div className="flex items-center gap-3">
                  <Save className="w-5 h-5" />
                  Save Changes
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
