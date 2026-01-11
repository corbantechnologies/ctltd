/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createBook } from "@/services/books";
import { useFormik } from "formik";
import { BookSchema } from "@/validation";
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
import { Loader2, BookOpen, Plus } from "lucide-react";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";
import { useRouter } from "next/navigation";
import { useFetchCOAs } from "@/hooks/coa/actions";
import { useQueryClient } from "@tanstack/react-query";

interface CreateBookProps {
  rolePrefix?: string;
  initialCOA?: string;
  onSuccess?: () => void;
}

export default function CreateBook({
  rolePrefix = "finance",
  initialCOA,
  onSuccess,
}: CreateBookProps) {
  const header = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: coas, isLoading: isLoadingCOAs } = useFetchCOAs();

  const primaryColor = rolePrefix === "director" ? "#D0402B" : "#045138";

  const formik = useFormik({
    initialValues: {
      code: "",
      name: "",
      account_type: initialCOA || "",
      is_active: true,
      is_bank: false,
      is_tax: false,
      is_cash: false,
      description: "",
    },
    enableReinitialize: true,
    validationSchema: BookSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await createBook(values, header);
        toast.success("Account Book created successfully");
        router.refresh();

        // reload
        queryClient.invalidateQueries({ queryKey: ["books"] });
        queryClient.invalidateQueries({ queryKey: ["coas"] }); // Refresh COA list as books are nested
        if (initialCOA) {
          // If we have an initial COA (likely from detail page), invalidate specific COA query
          // We'd need the reference for this, assuming initialCOA passed is the name or we can find it.
          // Ideally initialCOA passed here is the NAME as per the form usage below, but for invalidation we might need reference.
          // However, refreshing "coas" list will often be enough or we can try to find the reference from the list.
          const coa = coas?.find((c) => c.name === values.account_type);
          if (coa) {
            queryClient.invalidateQueries({ queryKey: ["coa", coa.reference] });
          }
        }

        resetForm();
        if (onSuccess) onSuccess();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to create book");
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
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black text-black tracking-tight">
              Create Account Book
            </CardTitle>
            <CardDescription className="text-black/50 font-bold uppercase text-[10px] tracking-widest mt-1">
              General Ledger Infrastructure
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="code"
                className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                Book Code
              </Label>
              <Input
                id="code"
                name="code"
                type="text"
                placeholder="e.g. BK-100"
                className="h-14 rounded-2xl border-black/5 bg-black/5 focus:bg-white transition-all font-bold px-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.code}
                style={{ ["--tw-ring-color" as any]: `${primaryColor}33` }}
              />
              {formik.touched.code && formik.errors.code && (
                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1">
                  {formik.errors.code}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                Book Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Main Cash Book"
                className="h-14 rounded-2xl border-black/5 bg-black/5 focus:bg-white transition-all font-bold px-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                style={{ ["--tw-ring-color" as any]: `${primaryColor}33` }}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1">
                  {formik.errors.name}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="account_type"
              className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
            >
              Account Type (COA)
            </Label>
            <select
              id="account_type"
              name="account_type"
              disabled={isLoadingCOAs || !!initialCOA}
              className="flex h-14 w-full rounded-2xl border border-black/5 bg-black/5 px-5 py-2 text-sm font-bold ring-offset-white focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer disabled:opacity-50"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.account_type}
              style={{ ["--tw-ring-color" as any]: `${primaryColor}33` }}
            >
              <option value="">Select an account type...</option>
              {coas?.map((coa) => (
                <option key={coa.reference} value={coa.name}>
                  {coa.code} - {coa.name}
                </option>
              ))}
            </select>
            {formik.touched.account_type && formik.errors.account_type && (
              <p className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1">
                {formik.errors.account_type}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border border-black/5 transition-all gap-2 group cursor-pointer ${formik.values.is_active ? "bg-black/5" : "bg-white"}`}
              onClick={() =>
                formik.setFieldValue("is_active", !formik.values.is_active)
              }
              style={{
                borderColor: formik.values.is_active ? primaryColor : undefined,
                ["--group-hover-border" as any]: primaryColor,
              }}
            >
              <input
                type="checkbox"
                name="is_active"
                checked={formik.values.is_active}
                onChange={formik.handleChange}
                className="w-5 h-5 rounded-lg transition-colors cursor-pointer"
                style={{ accentColor: primaryColor }}
              />
              <span className="text-[10px] font-black uppercase text-black/60 group-hover:text-black">
                Active
              </span>
            </div>
            <div
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border border-black/5 transition-all gap-2 group cursor-pointer ${formik.values.is_bank ? "bg-black/5" : "bg-white"}`}
              onClick={() =>
                formik.setFieldValue("is_bank", !formik.values.is_bank)
              }
              style={{
                borderColor: formik.values.is_bank ? primaryColor : undefined,
              }}
            >
              <input
                type="checkbox"
                name="is_bank"
                checked={formik.values.is_bank}
                onChange={formik.handleChange}
                className="w-5 h-5 rounded-lg transition-colors cursor-pointer"
                style={{ accentColor: primaryColor }}
              />
              <span className="text-[10px] font-black uppercase text-black/60 group-hover:text-black">
                Bank
              </span>
            </div>
            <div
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border border-black/5 transition-all gap-2 group cursor-pointer ${formik.values.is_tax ? "bg-black/5" : "bg-white"}`}
              onClick={() =>
                formik.setFieldValue("is_tax", !formik.values.is_tax)
              }
              style={{
                borderColor: formik.values.is_tax ? primaryColor : undefined,
              }}
            >
              <input
                type="checkbox"
                name="is_tax"
                checked={formik.values.is_tax}
                onChange={formik.handleChange}
                className="w-5 h-5 rounded-lg transition-colors cursor-pointer"
                style={{ accentColor: primaryColor }}
              />
              <span className="text-[10px] font-black uppercase text-black/60 group-hover:text-black">
                Tax
              </span>
            </div>
            <div
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border border-black/5 transition-all gap-2 group cursor-pointer ${formik.values.is_cash ? "bg-black/5" : "bg-white"}`}
              onClick={() =>
                formik.setFieldValue("is_cash", !formik.values.is_cash)
              }
              style={{
                borderColor: formik.values.is_cash ? primaryColor : undefined,
              }}
            >
              <input
                type="checkbox"
                name="is_cash"
                checked={formik.values.is_cash}
                onChange={formik.handleChange}
                className="w-5 h-5 rounded-lg transition-colors cursor-pointer"
                style={{ accentColor: primaryColor }}
              />
              <span className="text-[10px] font-black uppercase text-black/60 group-hover:text-black">
                Cash
              </span>
            </div>
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
              placeholder="Provide a brief description of this book..."
              className="min-h-[120px] rounded-2xl border-black/5 bg-black/5 focus:bg-white transition-all font-bold p-5"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              style={{ ["--tw-ring-color" as any]: `${primaryColor}33` }}
            />
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
                  Initialize Account Book
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
