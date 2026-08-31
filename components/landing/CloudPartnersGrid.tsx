"use client";

import { Cloud, Server, Cpu, Database, Smartphone, Mail, ShieldCheck } from "lucide-react";

interface InfrastructurePartner {
  name: string;
  category: string;
  role: string;
  icon: typeof Cloud;
  badge: string;
}

const infraPartners: InfrastructurePartner[] = [
  {
    name: "Google Cloud Platform (GCP)",
    category: "Cloud Compute & Virtual Servers",
    role: "Core backend services, isolated relational databases, high-availability compute instances, and automated regional backup storage.",
    icon: Cloud,
    badge: "Tier-1 Cloud",
  },
  {
    name: "Railway Infrastructure",
    category: "Container Orchestration & Microservices",
    role: "Production deployment pipelines, scalable Docker containers, background worker queues, and persistent services.",
    icon: Server,
    badge: "DevOps & Compute",
  },
  {
    name: "Vercel Enterprise Edge",
    category: "Global Edge Network & Frontend",
    role: "Sub-millisecond static and server-rendered Next.js frontend delivery with localized SSL and real-time performance analytics.",
    icon: Cpu,
    badge: "Edge Network",
  },
  {
    name: "Safaricom Daraja API",
    category: "Telecom & Mobile Payment Rails",
    role: "Certified C2B STK Push deposits, B2C automated disbursements, reversal reconciliations, and high-speed webhook listener gateways.",
    icon: Smartphone,
    badge: "Fintech Rails",
  },
  {
    name: "PostgreSQL & Supabase",
    category: "Relational Data & Double-Entry Ledgers",
    role: "ACID-compliant relational storage, strict tenant schema isolation, and real-time transaction event streams.",
    icon: Database,
    badge: "ACID Database",
  },
  {
    name: "Resend & Enterprise SMTP",
    category: "Transactional Communications",
    role: "Deliverability-focused OTP dispatch, member statements, invoice receipts, and automated security alert triggers.",
    icon: Mail,
    badge: "Verified Delivery",
  },
];

export default function CloudPartnersGrid() {
  return (
    <section className="w-full bg-slate-50 py-14 border-b border-slate-200">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="mb-8 pb-4 border-b border-slate-200">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-semibold text-corporate-primary mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Infrastructure &amp; Technology Partners
          </div>
          <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
            Backed by World-Class Cloud &amp; Financial Rails
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Corban Technologies guarantees enterprise-grade reliability, data isolation, and uptime by pairing custom software architecture with battle-tested cloud providers.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {infraPartners.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded bg-white border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 text-corporate-primary">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-slate-900 mb-0.5">
                  {item.name}
                </h3>
                <p className="text-xs font-medium text-corporate-primary mb-2">
                  {item.category}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.role}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                99.9% Uptime SLA Guaranteed
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
