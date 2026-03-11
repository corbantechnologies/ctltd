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
            <div className="min-h-screen bg-slate-50 flex flex-col pt-32 px-6">
                <div className="max-w-6xl mx-auto w-full space-y-12 animate-pulse">
                    <div className="h-64 w-full bg-slate-200 rounded-3xl" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="h-12 w-3/4 bg-slate-200 rounded-xl" />
                            <div className="h-32 w-full bg-slate-200 rounded-xl" />
                        </div>
                        <div className="h-96 w-full bg-slate-200 rounded-3xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !division) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center bg-slate-50 px-6">
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200 max-w-lg w-full">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Building2 className="w-10 h-10 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">Division Unavailable</h1>
                    <p className="text-slate-500 mb-8">
                        We couldn't locate the division you're searching for. It might have been updated or removed.
                    </p>
                    <button
                        onClick={() => router.push('/divisions')}
                        className="inline-flex items-center justify-center bg-corporate-primary hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors w-full"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Divisions
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Premium Dark Hero Section */}
            <div className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 border-b border-slate-800">
                {/* Abstract Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-corporate-primary/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                </div>

                <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                    <button
                        onClick={() => router.push('/divisions')}
                        className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8 sm:mb-12 text-sm font-medium tracking-wide group"
                    >
                        <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
                        Explore All Divisions
                    </button>

                    <div className="flex flex-col md:flex-row gap-8 sm:gap-10 items-start md:items-center">
                        {/* Division Logo Bubble */}
                        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 shrink-0 bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 flex items-center justify-center shadow-2xl shadow-black/50 border-4 border-slate-800/50 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-white z-0" />
                            {division.logo ? (
                                <img src={division.logo} alt={division.name} className="w-full h-full object-contain relative z-10 group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <Building2 className="w-10 h-10 sm:w-14 sm:h-14 text-slate-400 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="inline-flex items-center rounded-full bg-slate-800/80 backdrop-blur-md px-4 py-1.5 text-[10px] font-semibold text-corporate-primary border border-slate-700/50 mb-4 sm:mb-6 uppercase tracking-[0.2em] shadow-inner">
                                Enterprise Division
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-4 leading-[1.1]">
                                {division.name}
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-slate-400 font-medium max-w-2xl leading-relaxed">
                                {division.description?.substring(0, 150).replace(/[#*`_]/g, '')}...
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="container mx-auto px-6 py-20 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">

                    {/* Left Column: Heavy Content (Markdown) */}
                    <div className="lg:col-span-8 space-y-24">

                        <Tabs.Root defaultValue="overview" className="flex flex-col w-full">
                            {/* Tab Navigation */}
                            <div className="overflow-x-auto scrollbar-none -mx-6 px-6 sm:mx-0 sm:px-0">
                                <Tabs.List className="flex flex-nowrap sm:flex-wrap gap-2 mb-10 border-b border-slate-200 pb-4 min-w-max sm:min-w-0">
                                    {division.description && (
                                        <Tabs.Trigger
                                            value="overview"
                                            className="px-6 py-3 rounded-full text-[11px] sm:text-sm font-bold tracking-wide transition-all data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:bg-slate-50 data-[state=inactive]:text-slate-500 hover:data-[state=inactive]:bg-slate-100 hover:data-[state=inactive]:text-slate-900 focus:outline-none whitespace-nowrap"
                                        >
                                            Strategic Overview
                                        </Tabs.Trigger>
                                    )}
                                    {division.services && (
                                        <Tabs.Trigger
                                            value="services"
                                            className="px-6 py-3 rounded-full text-[11px] sm:text-sm font-bold tracking-wide transition-all data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:bg-slate-50 data-[state=inactive]:text-slate-500 hover:data-[state=inactive]:bg-slate-100 hover:data-[state=inactive]:text-slate-900 focus:outline-none whitespace-nowrap"
                                        >
                                            Core Services
                                        </Tabs.Trigger>
                                    )}
                                    {division.projects && (
                                        <Tabs.Trigger
                                            value="projects"
                                            className="px-6 py-3 rounded-full text-[11px] sm:text-sm font-bold tracking-wide transition-all data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:bg-slate-50 data-[state=inactive]:text-slate-500 hover:data-[state=inactive]:bg-slate-100 hover:data-[state=inactive]:text-slate-900 focus:outline-none whitespace-nowrap"
                                        >
                                            Key Initiatives
                                        </Tabs.Trigger>
                                    )}
                                </Tabs.List>
                            </div>

                            {/* Tab Panels */}

                            <Tabs.Content value="overview" className="space-y-8 animate-in fade-in duration-500 focus:outline-none mt-4">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100 shadow-sm shrink-0">
                                        <Target className="w-5 h-5 sm:w-6 sm:h-6 text-corporate-primary" />
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight italic uppercase italic">
                                        Strategic Overview
                                    </h2>
                                </div>
                                <div className="prose prose-base sm:prose-lg prose-slate prose-orange max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:font-semibold prose-a:text-corporate-primary hover:prose-a:text-orange-600 prose-p:leading-relaxed prose-img:rounded-3xl prose-img:shadow-lg prose-strong:text-slate-900 border-l-2 sm:border-l-4 border-slate-200 pl-4 sm:pl-8 ml-2 sm:ml-6">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{division.description}</ReactMarkdown>
                                </div>
                            </Tabs.Content>

                            <Tabs.Content value="services" className="space-y-8 animate-in fade-in duration-500 focus:outline-none mt-4">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
                                        <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight italic uppercase italic">
                                        Core Services
                                    </h2>
                                </div>
                                <div className="bg-slate-50 border border-slate-200 p-6 sm:p-12 rounded-[1.5rem] sm:rounded-[2rem]">
                                    <div className="prose prose-base sm:prose-lg prose-slate prose-orange max-w-none prose-ul:space-y-4 prose-li:marker:text-corporate-primary prose-li:marker:font-bold prose-li:pl-2">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{division.services}</ReactMarkdown>
                                    </div>
                                </div>
                            </Tabs.Content>

                            <Tabs.Content value="projects" className="space-y-8 animate-in fade-in duration-500 focus:outline-none mt-4">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100 shadow-sm shrink-0">
                                        <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight italic uppercase italic">
                                        Key Initiatives
                                    </h2>
                                </div>
                                <div className="prose prose-base sm:prose-lg prose-slate prose-emerald max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-blockquote:border-l-corporate-primary prose-blockquote:bg-slate-50 prose-blockquote:p-4 sm:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-slate-700 border-l-2 sm:border-l-4 border-emerald-200 pl-4 sm:pl-8 ml-2 sm:ml-6">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{division.projects}</ReactMarkdown>
                                </div>
                            </Tabs.Content>
                        </Tabs.Root>
                    </div>

                    {/* Right Column: Sticky Sidebar */}
                    <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32 h-fit">

                        {/* Executive Contact Card */}
                        {division.website && (
                            <div className="bg-white border text-center border-slate-200 rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
                                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-corporate-primary via-orange-400 to-yellow-400" />

                                <h3 className="text-xl font-semibold text-slate-900 mb-8 pt-2">Division Connect</h3>

                                <ul className="space-y-6 text-left">
                                    <li className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                            <Globe className="w-5 h-5 text-slate-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Learn More</p>
                                            <a href={division.website} target="_blank" rel="noreferrer" className="text-slate-900 font-semibold hover:text-corporate-primary transition-colors inline-flex items-center">
                                                Visit Website <ExternalLink className="ml-1.5 w-4 h-4" />
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )}

                        {/* Leadership Spot */}
                        {division.director_details && (
                            <div className="bg-slate-900 rounded-[2rem] p-8 relative overflow-hidden text-center border border-slate-800">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-corporate-primary/20 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2" />

                                <div className="relative z-10">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Division Leadership</p>

                                    <div className="w-20 h-20 bg-slate-800 rounded-full border-2 border-slate-700 flex items-center justify-center mx-auto mb-5 shadow-inner">
                                        <UserCheck className="w-8 h-8 text-corporate-primary" />
                                    </div>

                                    <h4 className="text-xl font-bold text-white mb-1">
                                        {division.director_details.full_name}
                                    </h4>
                                    <p className="text-sm font-medium text-slate-400 mb-8">Managing Director</p>

                                    <button
                                        onClick={() => router.push('/contact')}
                                        className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 rounded-xl transition-colors border border-white/10"
                                    >
                                        Request Meeting
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
