import { Metadata } from "next";
import Link from "next/link";
import { Users, History, Building2, Globe, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Corban Technologies LTD",
  description:
    "Corban Technologies LTD is a Kenyan software engineering and enterprise cloud hosting company based in Mombasa. We build, deploy, and manage mission-critical platforms.",
};

export default function About() {
  const stats = [
    { label: "Founded", value: "2025", icon: History, sub: "Mombasa, Kenya" },
    { label: "Active Deployments", value: "50+", icon: Users, sub: "Enterprises & SMEs" },
    { label: "Live SACCOs", value: "3 Cooperatives", icon: Building2, sub: "Core Banking & M-Pesa" },
    { label: "Engineering & Hosting", value: "100%", icon: Globe, sub: "Kenyan Built & Compliant" },
  ];

  const pillars = [
    {
      title: "Custom Engineering & Architecture",
      desc: "We design every platform to match the actual regulatory, accounting, and operational requirements of East African enterprises.",
    },
    {
      title: "Dedicated Cloud Hosting & DevOps",
      desc: "Multi-tenant database schema isolation, automated point-in-time backups, and 99.9% uptime SLA hosted on Google Cloud Platform and modern edge infrastructure.",
    },
    {
      title: "Kenyan Regulatory & Telecom Compliance",
      desc: "Deep integration with Safaricom Daraja M-Pesa APIs, SASRA cooperative reporting standards, and KRA PAYE tax schedules.",
    },
    {
      title: "24/7 Managed Operations & Support",
      desc: "Continuous health monitoring, proactive security updates, and dedicated local engineering support based out of Mombasa.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* About Hero */}
      <section className="relative pt-16 pb-16 border-b border-slate-200 bg-white">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary">
              <Building2 className="w-3.5 h-3.5" />
              About Corban Technologies LTD
            </span>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 leading-snug">
              Engineering and Hosting the Digital Backbone for East African Businesses
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              Founded in Mombasa, Corban Technologies LTD is a technology engineering firm dedicated to building, refining, and cloud-hosting reliable software platforms for cooperatives, retail enterprises, logistics operators, and growing SMEs across Kenya and East Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Matrix */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded bg-white border border-slate-200 space-y-2 shadow-sm"
              >
                <div className="w-7 h-7 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-corporate-primary">
                  <stat.icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-base font-semibold text-slate-900 font-mono">
                    {stat.value}
                  </p>
                  <p className="text-xs font-semibold text-slate-800">
                    {stat.label}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {stat.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy & Approach */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="mb-10 pb-4 border-b border-slate-200">
            <p className="text-xs font-semibold text-corporate-primary uppercase tracking-wider mb-1">
              Our Methodology
            </p>
            <h2 className="text-lg font-semibold text-slate-900">
              The Corban 360-Degree Delivery Model
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Most software vendors hand over a codebase and leave you to figure out hosting, compliance, and backups. At Corban, we handle the entire lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-5 rounded bg-slate-50 border border-slate-200 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-corporate-primary shrink-0" />
                  <h3 className="text-sm font-semibold text-slate-900">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-slate-50">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="p-8 rounded bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 max-w-2xl">
              <h3 className="text-base font-semibold text-white">
                Partner With Mombasa&apos;s Leading Engineering Team
              </h3>
              <p className="text-xs text-slate-300">
                Ready to deploy your next platform? Speak directly with our lead architects.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5 shrink-0"
            >
              Get in Touch <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
