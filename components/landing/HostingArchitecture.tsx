"use client";

import Link from "next/link";
import { Server, ShieldCheck, Database, Zap, RefreshCw, Lock, ArrowRight } from "lucide-react";

interface PillarItem {
  icon: typeof Server;
  title: string;
  desc: string;
}

const pillars: PillarItem[] = [
  {
    icon: Database,
    title: "Dedicated Multi-Tenant Isolation",
    desc: "Every enterprise client gets isolated database schemas and dedicated compute boundaries to prevent data leakage and ensure compliance.",
  },
  {
    icon: Zap,
    title: "Sub-Second M-Pesa Webhook Engine",
    desc: "High-throughput asynchronous webhook processors with automated retry queues for Safaricom Daraja STK and B2C transactions.",
  },
  {
    icon: RefreshCw,
    title: "Automated Daily Backups & Disaster Recovery",
    desc: "Automated point-in-time database snapshots and geo-redundant backups across Google Cloud Platform storage buckets.",
  },
  {
    icon: Lock,
    title: "End-to-End Enterprise Encryption",
    desc: "TLS 1.3 in-transit encryption, AES-256 at-rest database encryption, and strict role-based access control (RBAC).",
  },
];

export default function HostingArchitecture() {
  return (
    <section className="w-full bg-white py-16 border-b border-slate-200">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-10 pb-4 border-b border-slate-200 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary mb-2">
              <Server className="w-3.5 h-3.5" />
              Cloud Infrastructure &amp; Managed Operations
            </div>
            <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
              We Don&apos;t Just Build Software — We Host &amp; Manage It 24/7
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Eliminate server management headaches. Corban Technologies deploys, secures, updates, and monitors your platforms so your team can focus on growing your business.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-xs font-semibold text-corporate-primary hover:text-orange-600 transition-colors shrink-0"
          >
            Inquire About Cloud Hosting <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors space-y-3"
            >
              <div className="p-2.5 rounded bg-white border border-slate-200 text-corporate-primary w-fit">
                <item.icon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Banner Card */}
        <div className="p-6 rounded bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-semibold text-corporate-primary">
              <ShieldCheck className="w-3 h-3" />
              Enterprise SLA Included
            </div>
            <h4 className="text-base font-semibold text-white">
              Ready to Onboard With Zero Server Headaches?
            </h4>
            <p className="text-xs text-slate-400 max-w-3xl">
              From data migration to 24/7 uptime monitoring and Kenyan regulatory compliance, we handle everything for you.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm shrink-0 inline-flex items-center gap-1.5"
          >
            Talk to an Infrastructure Engineer <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
