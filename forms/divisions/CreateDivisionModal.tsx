/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createDivision } from "@/services/divisions";
import { useFormik } from "formik";
import { DivisionSchema } from "@/validation";
import { toast } from "react-hot-toast";
import { Loader2, Database, Shield, Plus, X } from "lucide-react";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import * as Dialog from "@radix-ui/react-dialog";

export default function CreateDivisionModal() {
  const header = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
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
        toast.success("Division established successfully");
        queryClient.invalidateQueries({ queryKey: ["divisions"] });
        router.refresh();
        resetForm();
        setOpen(false);
      } catch (error) {
        const errorMessage =
          (error as any)?.response?.data?.message ||
          "Failed to establish division";
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="h-14 px-8 bg-slate-900 hover:bg-corporate-primary text-white rounded-2xl font-bold text-sm tracking-tight transition-all shadow-xl hover:shadow-corporate-primary/20 active:scale-[0.98] flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <Plus className="w-4 h-4" />
          </div>
          Establish New Division
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[100] animate-in fade-in duration-300" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden z-[101] animate-in zoom-in-95 fade-in duration-300">
          <div className="bg-slate-900 p-8 text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-corporate-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <Dialog.Title className="text-xl font-bold tracking-tight italic">
                  Establish <span className="text-corporate-primary">Division</span>
                </Dialog.Title>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">
                  Corporate Infrastructure Unit
                </p>
              </div>
            </div>

            <Dialog.Close asChild>
              <button className="absolute top-8 right-8 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all border border-white/5">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="p-8">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1 block"
                >
                  Division Nomenclature
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Strategic Operations, Digital Assets"
                  className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-corporate-primary/30 focus:ring-0 transition-all font-bold px-6 text-sm text-slate-900 placeholder:text-slate-300"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest ml-1 mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors group cursor-pointer" onClick={() => formik.setFieldValue('is_active', !formik.values.is_active)}>
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formik.values.is_active ? 'bg-corporate-primary border-corporate-primary shadow-lg shadow-orange-500/20' : 'bg-white border-slate-200'}`}>
                  {formik.values.is_active && <Plus className="w-4 h-4 text-white rotate-45" />}
                </div>
                <div>
                  <label
                    htmlFor="is_active"
                    className="text-sm font-bold text-slate-900 cursor-pointer block"
                  >
                    Active Status
                  </label>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                    Enable immediate unit operations
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full h-16 bg-slate-900 hover:bg-corporate-primary text-white rounded-[1.25rem] font-bold text-base transition-all shadow-xl hover:shadow-corporate-primary/20 active:scale-[0.98] group relative overflow-hidden"
                >
                  {formik.isSubmitting ? (
                    <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Establish Unit
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
