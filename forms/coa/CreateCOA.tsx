/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createCOA } from "@/services/coa";
import { useFormik } from "formik";
import { COASchema } from "@/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { Loader2, FileText, Plus } from "lucide-react";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";
import { useRouter } from "next/navigation";

export default function CreateCOA() {
  const header = useAxiosAuth();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      code: "",
      name: "",
      normal_balance: "DEBIT",
      order: 0,
      is_active: true,
    },
    validationSchema: COASchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await createCOA(values, header);
        toast.success("Account created successfully");
        resetForm();
        router.refresh();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to create account");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Card className="w-full max-w-2xl border-black/5 shadow-2xl rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-xl">
      <CardHeader className="bg-orange-50/50 p-8 border-b border-black/5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-corporate-primary flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black text-black tracking-tight">Add Chart of Account</CardTitle>
            <CardDescription className="text-black/50 font-bold uppercase text-[10px] tracking-widest mt-1">Financial Classification</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">
                Account Code
              </Label>
              <Input
                id="code"
                name="code"
                type="text"
                placeholder="e.g. 1000"
                className="h-14 rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white focus:ring-corporate-primary/20 transition-all font-bold px-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.code}
              />
              {formik.touched.code && formik.errors.code && (
                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1">{formik.errors.code}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="order" className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">
                Display Order
              </Label>
              <Input
                id="order"
                name="order"
                type="number"
                placeholder="e.g. 10"
                className="h-14 rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white focus:ring-corporate-primary/20 transition-all font-bold px-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.order}
              />
              {formik.touched.order && formik.errors.order && (
                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1">{formik.errors.order}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">
              Account Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Cash in Bank"
              className="h-14 rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white focus:ring-corporate-primary/20 transition-all font-bold px-5"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1">{formik.errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="normal_balance" className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">
              Normal Balance
            </Label>
            <select
              id="normal_balance"
              name="normal_balance"
              className="flex h-14 w-full rounded-2xl border border-black/5 bg-orange-50/30 px-5 py-2 text-sm font-bold ring-offset-white focus:outline-none focus:ring-2 focus:ring-corporate-primary/20 disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.normal_balance}
            >
              <option value="DEBIT">DEBIT</option>
              <option value="CREDIT">CREDIT</option>
            </select>
            {formik.touched.normal_balance && formik.errors.normal_balance && (
              <p className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1">{formik.errors.normal_balance}</p>
            )}
          </div>

          <div className="flex items-center gap-3 p-4 bg-orange-50/30 rounded-2xl border border-black/5">
            <input
              id="is_active"
              name="is_active"
              type="checkbox"
              className="w-5 h-5 rounded-lg border-black/5 text-corporate-primary focus:ring-corporate-primary/20"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.is_active}
            />
            <Label htmlFor="is_active" className="text-sm font-black text-black">
              Set as Active Account
            </Label>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full h-16 bg-black hover:bg-corporate-primary text-white rounded-[20px] font-black text-lg transition-all shadow-xl hover:shadow-orange-500/20 active:scale-[0.98] group"
            >
              {formik.isSubmitting ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <div className="flex items-center gap-3">
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  Register Account
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
