/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Loader2, Mail, Send } from "lucide-react";
import { forgotPassword } from "@/services/accounts";
import { useFormik } from "formik";
import { ForgotPasswordSchema } from "@/validation";

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
        toast.success("Reset code sent to your email!");
      } catch (error: any) {
        toast.error(
          error.response?.data?.message ||
            "Failed to send reset code. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-white px-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-grid-white opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-50/40 rounded-full blur-[100px] animate-pulse-slow delay-1000" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-orange-100 text-corporate-primary border-orange-200 font-black uppercase tracking-widest py-1.5 px-4 shadow-sm">
            Corban Technologies LTD
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter text-black mb-2">
            Recover <span className="text-corporate-primary">Access.</span>
          </h1>
          <p className="text-black/60 font-bold">
            We&apos;ll help you get back into your account.
          </p>
        </div>

        <Card className="border-black/5 shadow-2xl rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardHeader className="pt-8 px-8">
            <CardTitle className="text-2xl font-black text-black tracking-tight text-center">
              {submitted ? "Check Your Email" : "Forgot Password"}
            </CardTitle>
            <CardDescription className="text-center font-bold opacity-60">
              {submitted
                ? "If an account exists for this email, you will receive a reset code shortly."
                : "Enter your email address and we'll send you a recovery code."}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            {!submitted ? (
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest text-black/40 ml-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-black/20 group-focus-within:text-corporate-primary transition-colors" />
                    </div>
                    <Input
                      name="email"
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`pl-10 h-14 bg-orange-50/50 border-black/5 rounded-2xl font-bold focus:bg-white transition-all ${
                        formik.touched.email && formik.errors.email
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-xs text-red-500 font-bold ml-1">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full h-14 bg-black hover:bg-corporate-primary text-white rounded-2xl text-lg font-black shadow-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      <span>Send Reset Code</span>
                    </div>
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-corporate-primary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-black/70">
                    Instructions have been sent to{" "}
                    <strong>{formik.values.email}</strong>
                  </p>
                </div>
                <Button
                  asChild
                  className="w-full h-14 bg-black hover:bg-corporate-primary text-white rounded-2xl text-lg font-black shadow-xl"
                >
                  <Link href="/reset-password">Proceed to Reset</Link>
                </Button>
              </div>
            )}

            {!submitted && (
              <div className="mt-6">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full text-black/40 hover:text-black font-black flex items-center justify-center gap-2"
                >
                  <Link href="/auth/login">
                    <ChevronLeft className="w-4 h-4" />
                    Back to Login
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-orange-50/50 border-t border-black/5 py-6 flex flex-col items-center">
            <p className="text-sm font-bold text-black/40">
              Corban Technologies LTD Recovery Service
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
