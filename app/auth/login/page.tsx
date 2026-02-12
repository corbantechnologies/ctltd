"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { Session, User } from "next-auth";
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
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useFormik } from "formik";
import { LoginSchema } from "@/validation";

interface CustomUser extends User {
  is_director?: boolean;
  is_employee?: boolean;
  is_finance?: boolean;
  is_superuser?: boolean;
}

interface CustomSession extends Session {
  user?: CustomUser;
}

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      const session = (await getSession()) as CustomSession | null;

      setLoading(false);

      if (response?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Login successful! Redirecting...");

        if (session?.user?.is_director === true) {
          router.push("/director/dashboard");
        } else if (session?.user?.is_employee === true) {
          router.push("/employee/dashboard");
        } else if (session?.user?.is_finance === true) {
          router.push("/finance/dashboard");
        } else if (session?.user?.is_superuser === true) {
          // TODO: Add superuser dashboard
          router.push("/director/dashboard");
        } else {
          router.push("/");
        }
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
          <Badge className="mb-4 bg-orange-100 text-corporate-primary border-orange-200 font-medium uppercase tracking-widest py-1.5 px-4 shadow-sm">
            Corban Technologies LTD
          </Badge>
          <h1 className="text-4xl font-bold tracking-tighter text-black mb-2">
            Welcome <span className="text-corporate-primary">Back.</span>
          </h1>
          <p className="text-black/60 font-medium">
            Secure access to your enterprise portal.
          </p>
        </div>

        <Card className="border-black/5 shadow-2xl rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardHeader className="pt-8 px-8">
            <CardTitle className="text-2xl font-bold text-black tracking-tight text-center">
              Login
            </CardTitle>
            <CardDescription className="text-center font-medium opacity-60">
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold uppercase tracking-widest text-black/40 ml-1">
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
                    className={`pl-10 h-14 bg-orange-50/50 border-black/5 rounded-md font-medium focus:bg-white transition-all ${formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                      }`}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-xs text-red-500 font-medium ml-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-semibold uppercase tracking-widest text-black/40">
                    Password
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    title="Forgot Password"
                    className="text-xs font-semibold text-corporate-primary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-black/20 group-focus-within:text-corporate-primary transition-colors" />
                  </div>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`pl-10 pr-10 h-14 bg-orange-50/50 border-black/5 rounded-md font-medium focus:bg-white transition-all ${formik.touched.password && formik.errors.password
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
                  <p className="text-xs text-red-500 font-medium ml-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <Button
                disabled={loading}
                type="submit"
                className="w-full h-14 bg-black hover:bg-corporate-primary text-white rounded-md text-lg font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:bg-black"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="bg-orange-50/50 border-t border-black/5 py-6 flex flex-col items-center">
            <p className="text-sm font-medium text-black/40">
              Corban Technologies LTD Enterprise Security
            </p>
          </CardFooter>
        </Card>

        {/* <div className="mt-8 text-center">
          <p className="text-sm font-bold text-black/60">
            Need assistance?{" "}
            <Link
              href="/contact"
              className="text-corporate-primary hover:underline font-black"
            >
              Contact Support
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
}
