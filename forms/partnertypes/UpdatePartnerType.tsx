/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { updatePartnerType } from "@/services/partnertypes";
import { useFormik } from "formik";
import { PartnerTypeSchema } from "@/validation";
import { Button } from "@/components/ui/button";
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
import { Loader2, Edit3, Save } from "lucide-react";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface UpdatePartnerTypeProps {
  partnerType: {
    name: string;
    description: string;
    is_active: boolean;
    reference: string;
  };
}

export default function UpdatePartnerType({
  partnerType,
}: UpdatePartnerTypeProps) {
  const header = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      name: partnerType.name,
      description: partnerType.description,
      is_active: partnerType.is_active,
    },
    enableReinitialize: true,
    validationSchema: PartnerTypeSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await updatePartnerType(
          partnerType.reference,
          {
            description: values.description,
            is_active: values.is_active,
          },
          header,
        );
        toast.success("Partner type updated successfully");
        queryClient.invalidateQueries({ queryKey: ["partner_types"] });
        router.refresh();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to update partner type",
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Card className="w-full max-w-2xl border-black/5 shadow-2xl rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-xl">
      <CardHeader className="bg-orange-50/50 p-8 border-b border-black/5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-lg">
            <Edit3 className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black text-black tracking-tight">
              Update Category
            </CardTitle>
            <CardDescription className="text-black/50 font-bold uppercase text-[10px] tracking-widest mt-1">
              Refine Ecosystem
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="mb-6 p-4 bg-black/5 rounded-2xl border border-black/5">
          <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-1">
            Category Name (Read-only)
          </p>
          <p className="font-bold text-black">{partnerType.name}</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
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
              placeholder="Refine the purpose of this partner type..."
              className="min-h-[120px] rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white transition-all font-bold p-5"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-orange-50/30 rounded-2xl border border-black/5 transition-colors">
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
              Keep Category Active
            </Label>
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
