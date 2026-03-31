"use client";

import { useFetchLead } from "@/hooks/leads/actions";
import { useParams, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import UpdateLead from "@/forms/leads/UpdateLead";
import {
  Users,
  Building2,
  Mail,
  Phone,
  Globe,
  Tag,
  Calendar,
  ArrowLeft,
  Activity,
  Edit,
  ClipboardList,
  Fingerprint,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function LeadDetailPage() {
  const { reference } = useParams();
  const router = useRouter();
  const { data: lead, isLoading } = useFetchLead(reference as string);

  if (isLoading) return <LoadingSpinner />;
  if (!lead) return <div>Lead not found.</div>;

  const statusColors: Record<string, string> = {
    NEW: "bg-blue-50 text-blue-700 border-blue-100",
    CONTACTED: "bg-amber-50 text-amber-700 border-amber-100",
    QUALIFIED: "bg-emerald-50 text-emerald-700 border-emerald-100",
    PROPOSAL_SENT: "bg-purple-50 text-purple-700 border-purple-100",
    WON: "bg-green-50 text-green-700 border-green-100",
    LOST: "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto">
      {/* Dynamic Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4 w-full">
            <Link 
                href="/operations/leads"
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors group"
            >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                Back to Pipeline
            </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-2xl shadow-blue-500/30">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600">
                  Lead Profile Case
                </p>
                <span className={cn("px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border shadow-sm", statusColors[lead.status] || "bg-slate-50 text-slate-600 border-slate-200")}>
                  {lead.status}
                </span>
              </div>
              <h1 className="text-3xl font-semibold text-slate-900 tracking-tight italic">
                {lead.first_name} <span className="text-blue-600">{lead.last_name}</span>
              </h1>
            </div>
          </div>
        </div>

        <UpdateLead
          lead={lead}
          trigger={
            <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-semibold text-sm tracking-tight transition-all shadow-2xl hover:shadow-blue-600/20 active:scale-[0.98] group">
              <Edit className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Modify Identity
            </button>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Essential Bio */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-100/50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:bg-blue-100 transition-colors" />
            
            <div className="relative z-10 space-y-10">
              <div className="flex items-center gap-3">
                <Fingerprint className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Structural Metadata</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Reference ID</p>
                  <p className="text-base font-semibold text-slate-900 tabular-nums">{lead.reference}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Division Assignment</p>
                  <p className="text-base font-semibold text-slate-900">{lead.division || "Unassigned"}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Engagement Status</p>
                  <p className="text-base font-semibold text-slate-900">{lead.status}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Origin Timestamp</p>
                  <p className="text-base font-semibold text-slate-900">{new Date(lead.created_at).toLocaleDateString()} at {new Date(lead.created_at).toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-100/50 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:bg-amber-100 transition-colors" />
            
            <div className="relative z-10 space-y-10">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Corporate Identity</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Legal Entity Name</p>
                  <p className="text-base font-semibold text-slate-900 underline decoration-amber-200 underline-offset-4">{lead.company_name || "N/A"}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Primary Country</p>
                  <p className="text-base font-semibold text-slate-900">{lead.country || "Global"}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Tax Identification (PIN)</p>
                  <p className="text-base font-semibold text-slate-900 tracking-widest">{lead.tax_pin || "Not Disclosed"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Communications Hub */}
        <div className="space-y-8">
          <div className="bg-slate-900 p-8 rounded-[32px] text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Connectivity</h3>
              </div>

              <div className="space-y-8">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Email Protocol</p>
                      <p className="text-sm font-semibold truncate max-w-[150px]">{lead.email || "No email linked"}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center text-emerald-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Voice Channel</p>
                      <p className="text-sm font-semibold">{lead.phone || "No phone linked"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
                <ClipboardList className="w-4 h-4 text-slate-400" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Pipeline Timeline</h3>
            </div>
            <div className="space-y-6">
                <div className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 ring-4 ring-blue-50" />
                    <div>
                        <p className="text-[11px] font-bold text-slate-900">Lead Established</p>
                        <p className="text-[10px] font-semibold text-slate-400">{new Date(lead.created_at).toDateString()}</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 ring-4 ring-slate-100" />
                    <div>
                        <p className="text-[11px] font-bold text-slate-900">Last Synced</p>
                        <p className="text-[10px] font-semibold text-slate-400">{new Date(lead.updated_at).toDateString()}</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}