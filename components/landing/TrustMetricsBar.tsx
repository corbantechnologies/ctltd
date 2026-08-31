"use client";

import { Building2, ShieldCheck, Server, Sparkles } from "lucide-react";

interface Metric {
  value: string;
  label: string;
  sublabel: string;
  icon: typeof Building2;
}

const metrics: Metric[] = [
  {
    value: "3+ SACCOs",
    label: "Live in Production",
    sublabel: "Core Banking & M-Pesa",
    icon: Building2,
  },
  {
    value: "99.9%",
    label: "Cloud Uptime SLA",
    sublabel: "Dedicated Infrastructure",
    icon: Server,
  },
  {
    value: "6 Platforms",
    label: "Engineered & Hosted",
    sublabel: "Finance, Commerce, Fleet",
    icon: Sparkles,
  },
  {
    value: "100%",
    label: "Kenyan Compliant",
    sublabel: "KRA Tax & Daraja Rails",
    icon: ShieldCheck,
  },
];

export default function TrustMetricsBar() {
  return (
    <section className="w-full bg-white border-y border-slate-200 py-6">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-3.5 rounded bg-slate-50 border border-slate-200/80"
            >
              <div className="p-2 rounded bg-white border border-slate-200 text-corporate-primary shrink-0">
                <item.icon className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-base font-semibold text-slate-900 leading-tight">
                  {item.value}
                </p>
                <p className="text-xs font-semibold text-slate-800">
                  {item.label}
                </p>
                <p className="text-xs text-slate-600">
                  {item.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
