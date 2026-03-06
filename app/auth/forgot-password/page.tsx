"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Loader2, Mail, Send, ArrowRight, ShieldQuestion } from "lucide-react";
import { forgotPassword } from "@/services/accounts";
import { useFormik } from "formik";
import { ForgotPasswordSchema } from "@/validation";
import { cn } from "@/lib/utils";

export default function ForgotPassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        await forgotPassword({ email: values.email });
        setSubmitted(true);
        toast.success("Security protocol initiated. Check your inbox.");
      } catch (error: any) {
        toast.error(
          error.response?.data?.message ||
          "Could not initiate recovery. Please verify your identity."
        );
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Premium Dark Hero Section (Matches Public Style) */}
      <div className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 overflow-hidden bg-slate-900 border-b border-slate-800">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-corporate-primary/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="mb-10 flex justify-center">
            <Link href="/" className="transition-transform hover:scale-105 active:scale-95">
              <Image
                src="/logo.png"
                alt="Corban Technologies Logo"
                width={180}
                height={48}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
          </div>

          <div className="inline-flex items-center rounded-full bg-slate-800/80 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-corporate-primary border border-slate-700/50 mb-6 uppercase tracking-widest shadow-inner">
            Security Restoration
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Recover <span className="text-corporate-primary">Access</span>.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
            Verify your identity to initiate the credential restoration protocol.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto px-6 py-12 flex-grow flex items-center justify-center -mt-16 lg:-mt-24 relative z-20">
        <div className="w-full max-w-md">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-corporate-primary via-orange-400 to-yellow-400 opacity-80" />

            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                <ShieldQuestion className="w-8 h-8 text-corporate-primary" />
              </div>
            </div>

            {!submitted ? (
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900 ml-1">
                    Registered Email
                  </label>
                  <div className="relative group/input">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-corporate-primary transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="identity@company.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={cn(
                        "w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-corporate-primary outline-none transition-all",
                        formik.touched.email && formik.errors.email && "border-red-500 bg-red-50/10"
                      )}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-xs font-bold text-red-500 ml-1">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full h-14 bg-corporate-primary hover:bg-orange-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-900/10 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 group/btn"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Requesting Identity Verification...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Recovery Protocol</span>
                      <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="mt-6 text-center">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 text-sm font-bold transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Sign In
                  </Link>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 mx-auto">
                  <Mail className="w-10 h-10 text-emerald-600 animate-pulse" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900">Protocol Dispatched</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    A recovery link has been sent to <span className="text-corporate-primary font-bold">{formik.values.email}</span>. Please authorize the request via your inbox.
                  </p>
                </div>

                <Link
                  href="/auth/reset-password"
                  className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-3 active:scale-[0.98] group"
                >
                  <span>Enter Recovery Code</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pt-4">
                  Code Expires in 15 Minutes
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="py-10 text-center bg-white border-t border-slate-100">
        <p className="text-slate-400 text-sm font-medium">
          © {new Date().getFullYear()} Corban Technologies LTD. Secure Identity Management.
        </p>
      </footer>
    </div>
  );
}
