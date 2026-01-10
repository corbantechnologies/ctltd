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

export default function ResetPassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await resetPassword({
        email,
        code,
        password,
        password_confirmation: passwordConfirmation,
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
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-white px-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-grid-white opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-50/40 rounded-full blur-[100px] animate-pulse-slow delay-1000" />

      <div className="relative z-10 w-full max-w-md my-12">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-orange-100 text-corporate-primary border-orange-200 font-black uppercase tracking-widest py-1.5 px-4 shadow-sm">
            Corban Technology
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
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-black/40 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-black/20 group-focus-within:text-corporate-primary transition-colors" />
                  </div>
                  <Input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-14 bg-orange-50/50 border-black/5 rounded-2xl font-bold focus:bg-white transition-all"
                  />
                </div>
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
                    type="text"
                    required
                    placeholder="Enter 6-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="pl-10 h-14 bg-orange-50/50 border-black/5 rounded-2xl font-bold focus:bg-white transition-all tracking-[0.2em]"
                  />
                </div>
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
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-14 bg-orange-50/50 border-black/5 rounded-2xl font-bold focus:bg-white transition-all"
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
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Repeat new password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className="pl-10 pr-10 h-14 bg-orange-50/50 border-black/5 rounded-2xl font-bold focus:bg-white transition-all"
                  />
                </div>
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
              Corban Technology Credential Vault
            </p>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center text-sm font-bold text-black/40">
          Didn&apos;t get a code?{" "}
          <Link
            href="/forgot-password"
            className="text-corporate-primary hover:underline font-black"
          >
            Resend Code
          </Link>
        </div>
      </div>
    </div>
  );
}
