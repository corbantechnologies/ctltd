/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createPartner } from "@/services/partners";
import { useFormik } from "formik";
import { PartnerSchema } from "@/validation";




import { toast } from "react-hot-toast";
import { Loader2, UserPlus, ShieldCheck, X } from "lucide-react";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";
import { useRouter } from "next/navigation";
import { useFetchPartnerTypes } from "@/hooks/partnertypes/actions";
import { useFetchDivisions } from "@/hooks/divisions/actions";
import { useQueryClient } from "@tanstack/react-query";

interface CreatePartnerProps {
  rolePrefix?: string;
  onSuccess?: () => void;
  onClose?: () => void;
  className?: string;
}

export default function CreatePartner({
  rolePrefix = "finance",
  onSuccess,
  onClose,
  className,
}: CreatePartnerProps) {
  const header = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
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
        queryClient.invalidateQueries({ queryKey: ["partners"] });
        resetForm();
        router.refresh();
        if (onSuccess) onSuccess();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to register partner",
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div
      className={`w-full border-black/5 shadow-2xl rounded bg-white/80 backdrop-blur-xl ${className}`}
    >
      <div
        className="p-4 border-b border-black/5"
        style={{ backgroundColor: `${primaryColor}0D` }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded flex items-center justify-center text-white shadow-lg"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 10px 15px -3px ${primaryColor}4D`,
              }}
            >
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-black tracking-tight">
                Register New Partner
              </h2>
              <p className="text-black/50 font-medium text-sm mt-1">
                Ecosystem Relationship Hub
              </p>
            </div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}

              className="hover:bg-red-50 hover:text-red-500 rounded p-2"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      <div className="p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-semibold uppercase tracking-widest text-black/40 ml-1"
              >
                Partner Name
              </label>
              <input
                id="name"
                name="name"
                placeholder="Full Entity Name"
                className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 w-full h-14 rounded focus:bg-slate-50 transition-all font-medium px-5"
                style={{
                  color: primaryColor,
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-xs font-semibold text-red-500 ml-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold uppercase tracking-widest text-black/40 ml-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="contact@entity.com"
                className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 w-full h-14 rounded focus:bg-slate-50 transition-all font-medium px-5"
                style={{
                  color: primaryColor,
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs font-semibold text-red-500 ml-1">
                  {formik.errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-semibold uppercase tracking-widest text-black/40 ml-1"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                placeholder="+254..."
                className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 w-full h-14 rounded focus:bg-slate-50 transition-all font-medium px-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="partner_type"
                className="text-sm font-semibold uppercase tracking-widest text-black/40 ml-1"
              >
                Partner Category
              </label>
              <select
                id="partner_type"
                name="partner_type"
                disabled={isLoadingTypes}
                className="focus:outline-none focus:ring-2 focus:ring-emerald-600/20 flex h-14 w-full rounded border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-medium transition-all appearance-none"
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
                <p className="text-xs font-semibold text-red-500 ml-1">
                  {formik.errors.partner_type}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="division"
                className="text-sm font-semibold uppercase tracking-widest text-black/40 ml-1"
              >
                Assigned Division
              </label>
              <select
                id="division"
                name="division"
                disabled={isLoadingDivisions}
                className="focus:outline-none focus:ring-2 focus:ring-emerald-600/20 flex h-14 w-full rounded border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-medium transition-all appearance-none"
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
              <label
                htmlFor="tax_pin"
                className="text-sm font-semibold uppercase tracking-widest text-black/40 ml-1"
              >
                Tax PIN (KRA)
              </label>
              <input
                id="tax_pin"
                name="tax_pin"
                placeholder="P0XXXXXXXX"
                className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 w-full h-14 rounded focus:bg-slate-50 transition-all font-medium px-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tax_pin}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="currency"
                className="text-sm font-semibold uppercase tracking-widest text-black/40 ml-1"
              >
                Preferred Currency
              </label>
              <select
                id="currency"
                name="currency"
                className="focus:outline-none focus:ring-2 focus:ring-emerald-600/20 flex h-14 w-full rounded border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-medium focus:ring-corporate-primary/20 transition-all appearance-none"
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
              <label
                htmlFor="wht_rate"
                className="text-sm font-semibold uppercase tracking-widest text-black/40 ml-1"
              >
                WHT Rate (%)
              </label>
              <input
                id="wht_rate"
                name="wht_rate"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 w-full h-14 rounded focus:bg-slate-50 transition-all font-medium px-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.wht_rate}
              />
              {formik.touched.wht_rate && formik.errors.wht_rate && (
                <p className="text-xs font-semibold text-red-500 ml-1">
                  {formik.errors.wht_rate}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="payment_terms"
              className="text-sm font-semibold uppercase tracking-widest text-black/40 ml-1"
            >
              Payment Terms / Notes
            </label>
            <input
              id="payment_terms"
              name="payment_terms"
              placeholder="e.g. Net 30, Pay on Delivery"
              className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 w-full h-14 rounded focus:bg-slate-50 transition-all font-medium px-5"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.payment_terms}
            />
          </div>

          <div
            className="flex items-center gap-3 p-4 rounded border border-black/5"
            style={{ backgroundColor: `${primaryColor}0D` }}
          >
            <input
              id="is_active"
              name="is_active"
              type="checkbox"
              className="w-5 h-5 rounded border-black/5 focus:ring-0"
              style={{
                accentColor: primaryColor,
                color: primaryColor,
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.is_active}
            />
            <label
              htmlFor="is_active"
              className="text-sm font-semibold text-black"
            >
              Set Partner as Active
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full h-16 text-white rounded-[1.25rem] font-semibold text-lg transition-all shadow-xl active:scale-[0.98] group flex items-center justify-center"
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
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
