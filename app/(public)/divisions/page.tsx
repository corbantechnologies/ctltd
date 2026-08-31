"use client";

import { Building2, ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import { useFetchPublicDivisions } from "@/hooks/divisions/actions";

export default function DivisionsIndexPage() {
  const { data: divisions, isLoading } = useFetchPublicDivisions();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Section */}
      <section className="relative pt-16 pb-14 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary">
              <Building2 className="w-3.5 h-3.5" />
              Corporate Structure
            </span>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 leading-snug">
              Specialized Enterprise Divisions
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Explore the organizational divisions delivering software engineering, fintech infrastructure, and managed cloud services across East Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Divisions Grid Section */}
      <section className="py-12 bg-slate-50 flex-grow">
        <div className="max-w-6xl mx-auto px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-56 bg-white rounded border border-slate-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {divisions?.map((division) => (
                <Link
                  key={division.reference}
                  href={`/divisions/${division.reference}`}
                  className="group bg-white p-6 rounded shadow-sm border border-slate-200 hover:border-corporate-primary/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="bg-slate-50 w-12 h-12 rounded flex items-center justify-center mb-4 border border-slate-200 p-2">
                      {division.logo ? (
                        <img src={division.logo} alt={division.name} className="w-full h-full object-contain" />
                      ) : (
                        <Building2 className="h-5 w-5 text-corporate-primary" />
                      )}
                    </div>
                    <h2 className="text-base font-semibold text-slate-900 mb-2">{division.name}</h2>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {division.description?.substring(0, 150).replace(/[#*`_]/g, '') || "View division operational scope and projects."}
                    </p>
                  </div>

                  <div className="flex items-center text-xs font-semibold text-corporate-primary mt-5 pt-3 border-t border-slate-100">
                    Explore Division Details <ArrowRight className="ml-1 w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}

              {(!divisions || divisions.length === 0) && (
                <div className="col-span-full py-12 text-center text-xs text-slate-500 bg-white rounded border border-slate-200">
                  <p>All current active systems are listed in our Products &amp; Platforms catalog.</p>
                  <Link href="/products" className="text-corporate-primary font-semibold mt-2 inline-block">
                    View 6 Core Platforms &rarr;
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
