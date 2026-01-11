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

export default function CreateBook() {
  const header = useAxiosAuth();
  const router = useRouter();
  const { data: coas, isLoading: isLoadingCOAs } = useFetchCOAs();

  const formik = useFormik({
    initialValues: {
      code: "",
      name: "",
      account_type: "",
      is_active: true,
      is_bank: false,
      is_tax: false,
      is_cash: false,
      description: "",
    },
    validationSchema: BookSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await createBook(values, header);
        toast.success("Account Book created successfully");
        resetForm();
        router.refresh();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to create book");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Card className="w-full max-w-3xl border-black/5 shadow-2xl rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-xl">
      <CardHeader className="bg-orange-50/50 p-8 border-b border-black/5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-corporate-primary flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
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
                className="h-14 rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white focus:ring-corporate-primary/20 transition-all font-bold px-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.code}
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
                className="h-14 rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white focus:ring-corporate-primary/20 transition-all font-bold px-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
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
              disabled={isLoadingCOAs}
              className="flex h-14 w-full rounded-2xl border border-black/5 bg-orange-50/30 px-5 py-2 text-sm font-bold ring-offset-white focus:outline-none focus:ring-2 focus:ring-corporate-primary/20 transition-all appearance-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.account_type}
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
              className="flex flex-col items-center justify-center p-4 bg-orange-50/30 rounded-2xl border border-black/5 hover:border-corporate-primary/20 transition-all gap-2 group cursor-pointer"
              onClick={() =>
                formik.setFieldValue("is_active", !formik.values.is_active)
              }
            >
              <input
                type="checkbox"
                name="is_active"
                checked={formik.values.is_active}
                onChange={formik.handleChange}
                className="w-5 h-5 rounded-lg text-corporate-primary"
              />
              <span className="text-[10px] font-black uppercase text-black/60 group-hover:text-black">
                Active
              </span>
            </div>
            <div
              className="flex flex-col items-center justify-center p-4 bg-orange-50/30 rounded-2xl border border-black/5 hover:border-corporate-primary/20 transition-all gap-2 group cursor-pointer"
              onClick={() =>
                formik.setFieldValue("is_bank", !formik.values.is_bank)
              }
            >
              <input
                type="checkbox"
                name="is_bank"
                checked={formik.values.is_bank}
                onChange={formik.handleChange}
                className="w-5 h-5 rounded-lg text-corporate-primary"
              />
              <span className="text-[10px] font-black uppercase text-black/60 group-hover:text-black">
                Bank
              </span>
            </div>
            <div
              className="flex flex-col items-center justify-center p-4 bg-orange-50/30 rounded-2xl border border-black/5 hover:border-corporate-primary/20 transition-all gap-2 group cursor-pointer"
              onClick={() =>
                formik.setFieldValue("is_tax", !formik.values.is_tax)
              }
            >
              <input
                type="checkbox"
                name="is_tax"
                checked={formik.values.is_tax}
                onChange={formik.handleChange}
                className="w-5 h-5 rounded-lg text-corporate-primary"
              />
              <span className="text-[10px] font-black uppercase text-black/60 group-hover:text-black">
                Tax
              </span>
            </div>
            <div
              className="flex flex-col items-center justify-center p-4 bg-orange-50/30 rounded-2xl border border-black/5 hover:border-corporate-primary/20 transition-all gap-2 group cursor-pointer"
              onClick={() =>
                formik.setFieldValue("is_cash", !formik.values.is_cash)
              }
            >
              <input
                type="checkbox"
                name="is_cash"
                checked={formik.values.is_cash}
                onChange={formik.handleChange}
                className="w-5 h-5 rounded-lg text-corporate-primary"
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
              className="min-h-[120px] rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white transition-all font-bold p-5"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full h-16 bg-black hover:bg-corporate-primary text-white rounded-[20px] font-black text-lg transition-all shadow-xl active:scale-[0.98] group"
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
