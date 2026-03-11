"use client";

import { Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useFetchPublicDivisions } from "@/hooks/divisions/actions";

export default function DivisionsIndexPage() {
    const { data: divisions, isLoading } = useFetchPublicDivisions();

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Section */}
            <section className="relative pt-40 pb-24 overflow-hidden border-b border-black/5 bg-white">
                <div className="absolute inset-0 bg-grid-white pointer-events-none opacity-40" />
                <div className="mx-auto px-6 relative z-10 text-center lg:text-left max-w-6xl">
                    <span className="mb-4 inline-flex items-center rounded bg-slate-100 px-3 py-1 text-xs font-semibold text-corporate-primary border border-slate-200 shadow-sm">
                        Enterprise Sectors
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">
                        Our <span className="text-corporate-primary">Divisions.</span>
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl max-w-3xl leading-relaxed">
                        Explore our specialized technology divisions handling everything from
                        financial ecosystems to robust infrastructure across East Africa.
                    </p>
                </div>
            </section>

            {/* Divisions Grid Section */}
            <section className="py-24 bg-slate-50 flex-grow">
                <div className="container mx-auto px-6 max-w-6xl">
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-72 bg-white rounded border border-slate-200 animate-pulse" />
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
                                        {division.description?.substring(0, 150).replace(/[#*`_]/g, '') || "View division details and projects."}
                                    </p>

                                    <div className="flex items-center text-sm font-medium text-corporate-primary mt-auto">
                                        Explore Division <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                            {divisions?.length === 0 && (
                                <div className="col-span-full py-12 text-center text-slate-500">
                                    No divisions found.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
