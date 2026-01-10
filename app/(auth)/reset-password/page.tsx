/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { resetPassword } from "@/services/accounts";
import { useFormik } from "formik";
import { ResetPasswordSchema } from "@/validation";

export default function ResetPassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      code: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        await resetPassword({
          email: values.email,
          code: values.code,
          password: values.password,
          password_confirmation: values.confirmPassword,
        });
        toast.success("Password reset successfully! You can now login.");
        router.push("/login");
      } catch (error: any) {
        toast.error(
          error.response?.data?.message ||
            "Failed to reset password. Please check your data."
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
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-100/30 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-50/40 rounded-full blur-[100px] animate-pulse-slow delay-1000" />

      <div className="relative z-10 w-full max-w-md my-12">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-orange-100 text-corporate-primary border-orange-200 font-black uppercase tracking-widest py-1.5 px-4 shadow-sm">
            Corban Technologies LTD
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter text-black mb-2">
            Reset <span className="text-corporate-primary">Password.</span>
          </h1>
          <p className="text-black/60 font-bold">
            Securely update your credentials.
          </p>
        </div>

        <Card className="border-black/5 shadow-2xl rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardHeader className="pt-8 px-8">
            <CardTitle className="text-2xl font-black text-black tracking-tight text-center">
              New Credentials
            </CardTitle>
            <CardDescription className="text-center font-bold opacity-60">
              Enter the code from your email and your new password
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={formik.handleSubmit} className="space-y-5">
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

              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-black/40 ml-1">
                  Reset Code
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-black/20 group-focus-within:text-corporate-primary transition-colors" />
                  </div>
                  <Input
                    name="code"
                    type="text"
                    required
                    placeholder="Enter 6-digit code"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`pl-10 h-14 bg-orange-50/50 border-black/5 rounded-2xl font-bold focus:bg-white transition-all tracking-[0.2em] ${
                      formik.touched.code && formik.errors.code
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.code && formik.errors.code && (
                  <p className="text-xs text-red-500 font-bold ml-1">
                    {formik.errors.code}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-black/40 ml-1">
                  New Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-black/20 group-focus-within:text-corporate-primary transition-colors" />
                  </div>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Min. 8 characters"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`pl-10 pr-10 h-14 bg-orange-50/50 border-black/5 rounded-2xl font-bold focus:bg-white transition-all ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-black/20 hover:text-black/40 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-xs text-red-500 font-bold ml-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-black/40 ml-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ShieldCheck className="h-5 w-5 text-black/20 group-focus-within:text-corporate-primary transition-colors" />
                  </div>
                  <Input
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Repeat new password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`pl-10 pr-10 h-14 bg-orange-50/50 border-black/5 rounded-2xl font-bold focus:bg-white transition-all ${
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-xs text-red-500 font-bold ml-1">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              <Button
                disabled={loading}
                type="submit"
                className="w-full h-14 bg-black hover:bg-corporate-primary text-white rounded-2xl text-lg font-black shadow-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 mt-4"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Updating...</span>
                  </div>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="bg-orange-50/50 border-t border-black/5 py-6 flex flex-col items-center">
            <p className="text-sm font-bold text-black/40">
              Corban Technologies LTD Credential Vault
            </p>
          </CardFooter>
        </Card>

        {/* <div className="mt-8 text-center text-sm font-bold text-black/40">
          Didn&apos;t get a code?{" "}
          <Link
            href="/forgot-password"
            className="text-corporate-primary hover:underline font-black"
          >
            Resend Code
          </Link>
        </div> */}
      </div>
    </div>
  );
}
