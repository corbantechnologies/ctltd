"use client";

import { ArrowRight, Building2, Terminal, Code2, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useFetchPublicDivisions } from "@/hooks/divisions/actions";

export default function Home() {
  const { data: divisions, isLoading } = useFetchPublicDivisions();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full bg-slate-900 text-white py-24 sm:py-32 overflow-hidden">
        {/* Decorative background gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-corporate-primary/10 to-transparent blur-3xl opacity-30 transform rotate-12" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="mb-8">
            <div className="inline-flex items-center rounded bg-slate-800 px-3 py-1 text-xs font-semibold text-corporate-primary border border-slate-700">
              MOMBASA'S LEADING TECH PARTNER
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            Innovating <span className="text-corporate-primary">Secure</span> &amp;{" "}
            <br className="hidden sm:block" /> Scalable Solutions.
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            From digital core banking for SACCOs to enterprise cloud infrastructure, we build the technology that drives East Africa forward.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-corporate-primary hover:bg-orange-600 text-white px-8 py-3.5 rounded font-medium transition-colors shadow-lg shadow-orange-900/20"
            >
              Launch Your Project <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/divisions"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white px-8 py-3.5 rounded font-medium transition-colors ring-1 ring-slate-700"
            >
              Explore Divisions
            </Link>
          </div>
        </div>
      </section>



      {/* Enterprise Divisions Grid */}
      <section id="divisions" className="py-20 bg-slate-50 flex-grow">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Enterprise Divisions</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Explore our specialized technology divisions handling everything from
              financial ecosystems to robust infrastructure.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-white rounded border border-slate-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {divisions?.map((division) => (
                <Link
                  key={division.reference}
                  href={`/divisions/${division.reference}`}
                  className="group bg-white p-8 rounded shadow-sm border border-slate-200 hover:shadow-md transition-all hover:border-orange-200 flex flex-col h-full"
                >
                  <div className="bg-slate-50 w-14 h-14 rounded flex items-center justify-center mb-6 border border-slate-100 group-hover:scale-110 transition-all overflow-hidden p-2">
                    {division.logo ? (
                      <img src={division.logo} alt={division.name} className="w-full h-full object-contain" />
                    ) : (
                      <Building2 className="h-7 w-7 text-corporate-primary" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{division.name}</h3>
                  <p className="text-slate-500 line-clamp-3 mb-6 flex-grow">
                    {/* Fallback description text since we render markdown inside, we just want a plain snippet */}
                    {division.description?.substring(0, 150).replace(/[#*`_]/g, '') || "View division details and projects."}
                  </p>

                  <div className="flex items-center text-sm font-medium text-corporate-primary mt-auto">
                    Explore Division <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Removed Flagship Product Showcase & Grid in favor of Dynamic Divisions */}

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-corporate-primary/10 rounded blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight max-w-3xl mx-auto">
              Ready to <span className="text-corporate-primary">Future-Proof</span> Your Business?
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Join dozens of financial institutions and enterprises already leveraging Corban platforms.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-corporate-primary hover:bg-orange-600 text-white px-8 py-3.5 rounded font-medium transition-colors shadow-lg shadow-orange-900/20"
              >
                Get Started Now
              </Link>
              <Link
                href="/divisions"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white px-8 py-3.5 rounded font-medium transition-colors ring-1 ring-slate-700"
              >
                View Divisions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
