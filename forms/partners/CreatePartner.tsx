/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createPartner } from "@/services/partners";
import { useFormik } from "formik";
import { PartnerSchema } from "@/validation";
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
import { Loader2, UserPlus, ShieldCheck } from "lucide-react";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";
import { useRouter } from "next/navigation";
import { useFetchPartnerTypes } from "@/hooks/partnertypes/actions";
import { useFetchDivisions } from "@/hooks/divisions/actions";

interface CreatePartnerProps {
  rolePrefix?: string;
  onSuccess?: () => void;
}

export default function CreatePartner({
  rolePrefix = "finance",
  onSuccess,
}: CreatePartnerProps) {
  const header = useAxiosAuth();
  const router = useRouter();
  const { data: partnerTypes, isLoading: isLoadingTypes } =
    useFetchPartnerTypes();
  const { data: divisions, isLoading: isLoadingDivisions } =
    useFetchDivisions();

  const primaryColor = rolePrefix === "director" ? "#D0402B" : "#045138";

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      tax_pin: "",
      currency: "KES",
      wht_rate: 0,
      payment_terms: "",
      is_active: true,
      partner_type: "",
      division: "",
    },
    validationSchema: PartnerSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await createPartner(values, header);
        toast.success("Partner registered successfully");

        resetForm();
        if (onSuccess) onSuccess();
        router.refresh();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to register partner"
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
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black text-black tracking-tight">
              Register New Partner
            </CardTitle>
            <CardDescription className="text-black/50 font-bold uppercase text-[10px] tracking-widest mt-1">
              Ecosystem Relationship Hub
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                Partner Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Full Entity Name"
                className="h-14 rounded-2xl border-black/5 bg-black/5 focus:bg-white transition-all font-bold px-5"
                style={{
                  color: primaryColor,
                }}
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
                htmlFor="email"
                className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="contact@entity.com"
                className="h-14 rounded-2xl border-black/5 bg-black/5 focus:bg-white transition-all font-bold px-5"
                style={{
                  color: primaryColor,
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1">
                  {formik.errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+254..."
                className="h-14 rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white transition-all font-bold px-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="partner_type"
                className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                Partner Category
              </Label>
              <select
                id="partner_type"
                name="partner_type"
                disabled={isLoadingTypes}
                className="flex h-14 w-full rounded-2xl border border-black/5 bg-black/5 px-5 py-2 text-sm font-bold transition-all appearance-none"
                style={{
                  color: primaryColor,
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.partner_type}
              >
                <option value="">Select Category...</option>
                {partnerTypes?.map((type) => (
                  <option key={type.reference} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
              {formik.touched.partner_type && formik.errors.partner_type && (
                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1">
                  {formik.errors.partner_type}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="division"
                className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                Assigned Division
              </Label>
              <select
                id="division"
                name="division"
                disabled={isLoadingDivisions}
                className="flex h-14 w-full rounded-2xl border border-black/5 bg-black/5 px-5 py-2 text-sm font-bold transition-all appearance-none"
                style={{
                  color: primaryColor,
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.division}
              >
                <option value="">Select Division...</option>
                {divisions?.map((div) => (
                  <option key={div.reference} value={div.name}>
                    {div.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <hr className="border-black/5" />

          {/* Financial Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="tax_pin"
                className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                Tax PIN (KRA)
              </Label>
              <Input
                id="tax_pin"
                name="tax_pin"
                placeholder="P0XXXXXXXX"
                className="h-14 rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white transition-all font-bold px-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tax_pin}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="currency"
                className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                Preferred Currency
              </Label>
              <select
                id="currency"
                name="currency"
                className="flex h-14 w-full rounded-2xl border border-black/5 bg-orange-50/30 px-5 py-2 text-sm font-bold focus:ring-2 focus:ring-corporate-primary/20 transition-all appearance-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currency}
              >
                <option value="KES">KES - Kenyan Shilling</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="wht_rate"
                className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
              >
                WHT Rate (%)
              </Label>
              <Input
                id="wht_rate"
                name="wht_rate"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="h-14 rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white transition-all font-bold px-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.wht_rate}
              />
              {formik.touched.wht_rate && formik.errors.wht_rate && (
                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1">
                  {formik.errors.wht_rate}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="payment_terms"
              className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1"
            >
              Payment Terms / Notes
            </Label>
            <Input
              id="payment_terms"
              name="payment_terms"
              placeholder="e.g. Net 30, Pay on Delivery"
              className="h-14 rounded-2xl border-black/5 bg-orange-50/30 focus:bg-white transition-all font-bold px-5"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.payment_terms}
            />
          </div>

          <div
            className="flex items-center gap-3 p-4 rounded-2xl border border-black/5"
            style={{ backgroundColor: `${primaryColor}0D` }}
          >
            <input
              id="is_active"
              name="is_active"
              type="checkbox"
              className="w-5 h-5 rounded-lg border-black/5 focus:ring-0"
              style={{
                accentColor: primaryColor,
                color: primaryColor,
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.is_active}
            />
            <Label
              htmlFor="is_active"
              className="text-sm font-black text-black"
            >
              Set Partner as Active
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
                  <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Finalize Registration
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
