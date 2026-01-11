/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createJournalType } from "@/services/journaltypes";
import { useFormik } from "formik";
import { JournalTypeSchema } from "@/validation";
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
import { Loader2, Settings2, Plus } from "lucide-react";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";
import { useRouter } from "next/navigation";

interface CreateJournalTypeProps {
  rolePrefix?: string;
  onSuccess?: () => void;
}

export default function CreateJournalType({
  rolePrefix = "finance",
  onSuccess,
}: CreateJournalTypeProps) {
  const header = useAxiosAuth();
  const router = useRouter();

  const primaryColor = rolePrefix === "director" ? "#D0402B" : "#045138";

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      is_active: true,
    },
    validationSchema: JournalTypeSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await createJournalType(values, header);
        toast.success("Journal type defined successfully");
        resetForm();
        if (onSuccess) onSuccess();
        router.refresh();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to define journal type"
        );
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
            <Settings2 className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black text-black tracking-tight">
              New Journal Category
            </CardTitle>
            <CardDescription className="text-black/50 font-bold uppercase text-[10px] tracking-widest mt-1">
              Ledger Configuration
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
            >
              Category Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Sales Journal, Purchase Journal"
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

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
            >
              Functionality Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the operational purpose of this journal category..."
              className="min-h-[120px] rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white transition-all font-bold p-5"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
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
            <Label
              htmlFor="is_active"
              className="text-sm font-black text-black"
            >
              Enable for Operations
            </Label>
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
                  Define Journal Type
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
