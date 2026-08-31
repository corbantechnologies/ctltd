"use client";

import { useFetchPublicDivision } from "@/hooks/divisions/actions";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Building2, Globe, UserCheck, ArrowLeft, ExternalLink, Briefcase, Zap, Target } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";

export default function DivisionPage() {
  const params = useParams();
  const router = useRouter();
  const reference = params.reference as string;

  const { data: division, isLoading, isError } = useFetchPublicDivision(reference);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col pt-16 px-6">
        <div className="max-w-6xl mx-auto w-full space-y-8 animate-pulse">
          <div className="h-40 w-full bg-slate-200 rounded" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 w-3/4 bg-slate-200 rounded" />
              <div className="h-24 w-full bg-slate-200 rounded" />
            </div>
            <div className="h-64 w-full bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !division) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white px-6">
        <div className="bg-slate-50 p-8 rounded border border-slate-200 max-w-md w-full space-y-4">
          <div className="w-12 h-12 bg-red-50 rounded border border-red-200 flex items-center justify-center mx-auto text-red-600">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-base font-semibold text-slate-900">Division Unavailable</h1>
          <p className="text-xs text-slate-600">
            We couldn&apos;t locate the division you&apos;re searching for. It might have been updated or removed.
          </p>
          <button
            onClick={() => router.push("/divisions")}
            className="inline-flex items-center justify-center bg-corporate-primary hover:bg-orange-600 text-white px-4 py-2 rounded text-xs font-semibold transition-colors w-full"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Divisions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative pt-16 pb-14 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <button
            onClick={() => router.push("/divisions")}
            className="inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors mb-6 text-xs font-semibold group"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Divisions
          </button>

          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            {/* Division Logo */}
            <div className="w-16 h-16 shrink-0 bg-slate-50 rounded p-2.5 flex items-center justify-center border border-slate-200 shadow-sm">
              {division.logo ? (
                <img src={division.logo} alt={division.name} className="w-full h-full object-contain" />
              ) : (
                <Building2 className="w-8 h-8 text-corporate-primary" />
              )}
            </div>

            <div className="space-y-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-semibold text-corporate-primary uppercase tracking-wider">
                Enterprise Division
              </span>
              <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                {division.name}
              </h1>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                {division.description?.substring(0, 150).replace(/[#*`_]/g, "")}...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Markdown Content */}
          <div className="lg:col-span-8 space-y-8">
            <Tabs.Root defaultValue="overview" className="flex flex-col w-full">
              {/* Tab Navigation */}
              <Tabs.List className="flex flex-wrap gap-1.5 mb-6 border-b border-slate-200 pb-3">
                {division.description && (
                  <Tabs.Trigger
                    value="overview"
                    className="px-3.5 py-1.5 rounded text-xs font-semibold transition-all data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=inactive]:bg-slate-50 data-[state=inactive]:text-slate-600 border border-slate-200"
                  >
                    Strategic Overview
                  </Tabs.Trigger>
                )}
                {division.services && (
                  <Tabs.Trigger
                    value="services"
                    className="px-3.5 py-1.5 rounded text-xs font-semibold transition-all data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=inactive]:bg-slate-50 data-[state=inactive]:text-slate-600 border border-slate-200"
                  >
                    Core Services
                  </Tabs.Trigger>
                )}
                {division.projects && (
                  <Tabs.Trigger
                    value="projects"
                    className="px-3.5 py-1.5 rounded text-xs font-semibold transition-all data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=inactive]:bg-slate-50 data-[state=inactive]:text-slate-600 border border-slate-200"
                  >
                    Key Initiatives
                  </Tabs.Trigger>
                )}
              </Tabs.List>

              {/* Tab Panels */}
              <Tabs.Content value="overview" className="space-y-4 focus:outline-none">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-corporate-primary" />
                  <h2 className="text-sm font-semibold text-slate-900">
                    Strategic Overview
                  </h2>
                </div>
                <div className="prose prose-sm prose-slate max-w-none border-l-2 border-slate-200 pl-4 text-xs leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{division.description}</ReactMarkdown>
                </div>
              </Tabs.Content>

              <Tabs.Content value="services" className="space-y-4 focus:outline-none">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <h2 className="text-sm font-semibold text-slate-900">
                    Core Services
                  </h2>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-5 rounded">
                  <div className="prose prose-sm prose-slate max-w-none text-xs leading-relaxed">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{division.services}</ReactMarkdown>
                  </div>
                </div>
              </Tabs.Content>

              <Tabs.Content value="projects" className="space-y-4 focus:outline-none">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="w-4 h-4 text-emerald-600" />
                  <h2 className="text-sm font-semibold text-slate-900">
                    Key Initiatives
                  </h2>
                </div>
                <div className="prose prose-sm prose-slate max-w-none border-l-2 border-emerald-200 pl-4 text-xs leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{division.projects}</ReactMarkdown>
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4 space-y-5">
            {division.website && (
              <div className="bg-slate-50 border border-slate-200 rounded p-5 space-y-3">
                <p className="text-[10px] uppercase font-semibold text-slate-500">
                  Division External Portal
                </p>
                <a
                  href={division.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-corporate-primary hover:underline inline-flex items-center gap-1.5"
                >
                  Visit Dedicated Portal <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            <div className="p-5 rounded bg-slate-900 text-white space-y-3">
              <p className="text-[10px] uppercase font-semibold text-corporate-primary">
                Corporate Inquiries
              </p>
              <h3 className="text-sm font-semibold text-white">
                Interested in this division&apos;s capabilities?
              </h3>
              <p className="text-xs text-slate-400">
                Contact our Mombasa headquarters for technical scoping and collaboration.
              </p>
              <button
                onClick={() => router.push("/contact")}
                className="w-full bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold py-2 rounded transition-colors"
              >
                Inquire With Engineering Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
