"use client";

import { useFetchPublicDivision } from "@/hooks/divisions/actions";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Building2, Globe, Mail, Phone, UserCheck } from "lucide-react";

export default function DivisionPage() {
    const params = useParams();
    const reference = params.reference as string;

    const { data: division, isLoading, isError } = useFetchPublicDivision(reference);

    if (isLoading) {
        return (
            <div className="py-20 space-y-12 animate-pulse mx-auto px-6 max-w-6xl">
                <div className="h-32 w-full max-w-4xl bg-slate-200 rounded-2xl" />
                <div className="h-64 w-full bg-slate-200 rounded-2xl" />
            </div>
        );
    }

    if (isError || !division) {
        return (
            <div className="py-32 flex flex-col items-center justify-center text-center">
                <Building2 className="w-16 h-16 text-slate-300 mb-6" />
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Division Not Found</h1>
                <p className="text-slate-500 max-w-md">
                    The division you are looking for does not exist or has been removed.
                </p>
            </div>
        );
    }

    return (
        <div className="py-16 md:py-24">
            {/* Division Header */}
            <div className="mb-16 border-b border-slate-200 pb-12">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 shadow-sm">
                        {division.logo ? (
                            <img src={division.logo} alt={division.name} className="w-10 h-10 object-contain" />
                        ) : (
                            <Building2 className="w-8 h-8 text-slate-400" />
                        )}
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                            {division.name}
                        </h1>
                        <div className="mt-2 text-slate-500 font-medium">Corban Enterprise Division</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content Area (Markdown) */}
                <div className="lg:col-span-2 space-y-16">
                    {/* Description */}
                    {division.description && (
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                About this Division
                            </h2>
                            <div className="prose prose-slate prose-lg max-w-none">
                                <ReactMarkdown>{division.description}</ReactMarkdown>
                            </div>
                        </section>
                    )}

                    {/* Services */}
                    {division.services && (
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 pt-8 border-t border-slate-100">
                                Core Services
                            </h2>
                            <div className="prose prose-slate prose-lg max-w-none prose-ul:space-y-2 prose-li:marker:text-corporate-primary">
                                <ReactMarkdown>{division.services}</ReactMarkdown>
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {division.projects && (
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 pt-8 border-t border-slate-100">
                                Key Projects & Partners
                            </h2>
                            <div className="prose prose-slate prose-lg max-w-none">
                                <ReactMarkdown>{division.projects}</ReactMarkdown>
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Information */}
                <div className="space-y-8">
                    {/* Contact Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Contact Information</h3>
                        <ul className="space-y-5">
                            {division.email && (
                                <li className="flex items-start gap-3 text-slate-600">
                                    <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                                    <a href={`mailto:${division.email}`} className="hover:text-corporate-primary transition-colors">
                                        {division.email}
                                    </a>
                                </li>
                            )}
                            {division.phone && (
                                <li className="flex items-start gap-3 text-slate-600">
                                    <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                                    <a href={`tel:${division.phone}`} className="hover:text-corporate-primary transition-colors">
                                        {division.phone}
                                    </a>
                                </li>
                            )}
                            {division.website && (
                                <li className="flex items-start gap-3 text-slate-600">
                                    <Globe className="w-5 h-5 text-slate-400 mt-0.5" />
                                    <a href={division.website} target="_blank" rel="noreferrer" className="hover:text-corporate-primary transition-colors">
                                        Visit Website
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Director Card */}
                    {division.director_details && (
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
                            <h3 className="text-lg font-bold text-slate-900 mb-6">Division Leadership</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-full border border-slate-200 flex items-center justify-center shadow-sm">
                                    <UserCheck className="w-6 h-6 text-slate-400" />
                                </div>
                                <div>
                                    <div className="font-semibold text-slate-900">
                                        {division.director_details.full_name}
                                    </div>
                                    <div className="text-sm text-slate-500">Director</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
