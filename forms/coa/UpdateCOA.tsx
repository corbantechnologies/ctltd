/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { updateCOA } from "@/services/coa";
import { useFormik } from "formik";
import { COASchema } from "@/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface UpdateCOAProps {
  coa: {
    code: string;
    name: string;
    reference: string;
  };
  rolePrefix?: string;
  onSuccess?: () => void;
  onClose?: () => void;
  className?: string;
}

export default function UpdateCOA({
  coa,
  rolePrefix = "finance",
  onSuccess,
  onClose,
  className,
}: UpdateCOAProps) {
  const header = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const primaryColor = rolePrefix === "director" ? "#D0402B" : "#045138";

  const formik = useFormik({
    initialValues: {
      name: coa.name,
    },
    enableReinitialize: true,
    validationSchema: COASchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await updateCOA(coa.reference, { name: values.name }, header);
        toast.success("Account updated successfully");
        queryClient.invalidateQueries({ queryKey: ["coas"] });
        queryClient.invalidateQueries({ queryKey: ["coa", coa.reference] });
        if (onSuccess) onSuccess();
        router.refresh();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to update account",
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Card
      className={`w-full border-black/5 shadow-2xl rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-xl ${className}`}
    >
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
            <Edit3 className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black text-black tracking-tight">
              Update Account
            </CardTitle>
            <CardDescription className="text-black/50 font-bold uppercase text-[10px] tracking-widest mt-1">
              Refine Classification
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
        <div className="mb-6 p-4 bg-black/5 rounded-2xl border border-black/5">
          <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-1">
            Account Code (Read-only)
          </p>
          <p className="font-bold text-black">{coa.code}</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
            >
              Account Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Cash in Bank"
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
