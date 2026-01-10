"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Mail, ChevronRight, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-white px-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-grid-white opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-50/40 rounded-full blur-[100px] animate-pulse-slow delay-1000" />

      <div className="relative z-10 w-full max-w-2xl text-center">
        <div className="mb-8">
          <Badge className="mb-6 bg-orange-100 text-corporate-primary border-orange-200 font-black uppercase tracking-widest py-2 px-6 shadow-sm">
            Error 404
          </Badge>

          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-orange-500/10 blur-3xl rounded-full" />
            <div className="relative bg-orange-50 w-24 h-24 rounded-[32px] flex items-center justify-center text-corporate-primary mx-auto border border-orange-100 shadow-xl">
              <Search className="w-10 h-10" />
            </div>
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-black mb-8 leading-[0.9]">
            Lost in <span className="text-corporate-primary">The Cloud?</span>
          </h1>

          <p className="text-xl md:text-2xl text-black/60 font-bold max-w-lg mx-auto mb-12 leading-relaxed">
            The page you are looking for has been moved, deleted, or never
            existed in the first place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              asChild
              size="lg"
              className="bg-black hover:bg-corporate-primary text-white rounded-2xl px-10 py-8 text-lg font-black shadow-2xl transition-all hover:scale-105 active:scale-95 group"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Return Home
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-black/10 text-black font-black rounded-2xl px-10 py-8 text-lg hover:bg-orange-50 hover:border-corporate-primary transition-all"
            >
              <Link href="/contact" className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Support
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-12 border-t border-black/5">
          <p className="text-sm font-black text-black/20 uppercase tracking-[0.2em]">
            Corban Technology Infrastructure
          </p>
        </div>
      </div>
    </div>
  );
}
