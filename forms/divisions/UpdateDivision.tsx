/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { updateDivision } from "@/services/divisions";
import { useFormik } from "formik";
import { DivisionSchema } from "@/validation";
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
import { Loader2, Edit3, Save } from "lucide-react";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";
import { useRouter } from "next/navigation";

interface UpdateDivisionProps {
  division: {
    name: string;
    is_active: boolean;
    reference: string;
  };
}

export default function UpdateDivision({ division }: UpdateDivisionProps) {
  const header = useAxiosAuth();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: division.name,
      is_active: division.is_active,
    },
    enableReinitialize: true,
    validationSchema: DivisionSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await updateDivision(division.reference, values, header);
        toast.success("Division updated successfully");
        router.refresh();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to update division"
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
              Update Division
            </CardTitle>
            <CardDescription className="text-black/50 font-bold uppercase text-[10px] tracking-widest mt-1">
              Refine Infrastructure
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
              Division Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Sales, Marketing, HR"
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
              Keep Division Active
            </Label>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full h-16 bg-corporate-primary hover:bg-black text-white rounded-[20px] font-black text-lg transition-all shadow-xl hover:shadow-black/10 active:scale-[0.98] group"
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
