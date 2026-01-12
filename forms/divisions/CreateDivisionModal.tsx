/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createDivision } from "@/services/divisions";
import { useFormik } from "formik";
import { DivisionSchema } from "@/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import { Loader2, Database, Shield, Plus } from "lucide-react";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateDivisionModal() {
  const header = useAxiosAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      is_active: true,
    },
    validationSchema: DivisionSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await createDivision(values, header);
        toast.success("Division created successfully");
        window.location.reload();
        resetForm();

        setOpen(false);
      } catch (error) {
        console.log(error);
        const errorMessage =
          (error as any)?.response?.data?.message ||
          "Failed to create division";
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-12 px-6 bg-[#D0402B] hover:bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-[#D0402B]/10 active:scale-[0.98] flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Establish Division
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg rounded-[28px] border-black/5 bg-white/95 backdrop-blur-2xl p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="bg-[#D0402B] p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <DialogTitle className="text-lg font-black tracking-tight italic">
                Create New Division
              </DialogTitle>
              <DialogDescription className="text-white/60 font-bold uppercase text-[9px] tracking-widest mt-0.5">
                Corporate Infrastructure
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="p-6">
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-[9px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                Division Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Sales, Marketing, HR"
                className="h-12 rounded-xl border-black/5 bg-black/5 focus:bg-white focus:ring-[#D0402B]/20 transition-all font-bold px-4 text-xs"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-[9px] font-black text-red-500 uppercase tracking-widest ml-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 p-3 bg-black/5 rounded-xl border border-black/5">
              <input
                id="is_active"
                name="is_active"
                type="checkbox"
                className="w-4 h-4 rounded-md border-black/5 text-[#D0402B] focus:ring-[#D0402B]/20"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.is_active}
              />
              <Label
                htmlFor="is_active"
                className="text-xs font-black text-black"
              >
                Set as Active Division
              </Label>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full h-14 bg-black hover:bg-[#D0402B] text-white rounded-[16px] font-black text-sm transition-all shadow-xl active:scale-[0.98] group"
              >
                {formik.isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    Register Division
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
