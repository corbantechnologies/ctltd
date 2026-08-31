import { Briefcase, ArrowRight, Mail, Users, Code, ShieldCheck, Sparkles, Building2 } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import careers from "@/careers/careers";

export const metadata: Metadata = {
  title: "Engineering & Careers | Corban Technologies LTD",
  description:
    "Engineering and technology roles at Corban Technologies LTD in Mombasa & Nairobi. Building mission-critical core banking, finance, retail POS, and cloud platforms for East Africa.",
  alternates: {
    canonical: "https://www.corbantechnologies.org/careers",
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://www.corbantechnologies.org/careers",
    title: "Engineering & Careers | Corban Technologies LTD",
    description:
      "Join the engineering team building future-proof digital infrastructure and enterprise software across East Africa.",
    siteName: "Corban Technologies LTD",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering & Careers | Corban Technologies LTD",
    description:
      "Join the engineering team building future-proof digital infrastructure across East Africa.",
    creator: "@corbantechltd",
  },
};

export default function CareersPage() {
  const openPositions = careers || [];

  return (
    <div className="w-full bg-white min-h-screen">
      {/* ── 1. CAREERS HERO HEADER ─────────────────────────────────────── */}
      <section className="w-full bg-slate-50/80 border-b border-slate-200 py-10 sm:py-14">
        <div className="w-full px-4 sm:px-8 lg:px-16">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-semibold text-corporate-primary">
              <Briefcase className="w-3.5 h-3.5" />
              Talent &amp; Engineering Careers
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
              Build Mission-Critical Infrastructure in East Africa
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              At Corban Technologies, we design and cloud-host the foundational software powering financial cooperatives, SME accounting, retail point-of-sale systems, and telecom engines across Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. POSITIONS STATUS / LISTING ──────────────────────────────── */}
      <section className="w-full py-12 sm:py-16">
        <div className="w-full px-4 sm:px-8 lg:px-16 space-y-10">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
                Current Openings ({openPositions.length})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                All full-time engineering and commercial roles are currently filled.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 self-start sm:self-auto">
              Hiring Status: Fully Staffed
            </span>
          </div>

          {openPositions.length === 0 ? (
            <div className="rounded border border-slate-200 bg-white p-8 sm:p-12 text-center space-y-4 max-w-3xl mx-auto shadow-2xs">
              <div className="w-12 h-12 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 mx-auto">
                <Briefcase className="w-6 h-6 text-corporate-primary" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-slate-900">
                  No Active Vacancies at This Time
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-lg mx-auto">
                  We currently have no open positions. Our core engineering, DevOps, and commercial teams are fully staffed. However, we are always eager to meet top-tier Kenyan software engineers and domain experts.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="mailto:careers@corbantechnologies.org?subject=General%20Talent%20Inquiry%20-%20Corban%20Technologies"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" /> Submit CV for Future Openings
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {openPositions.map((job) => (
                <Link
                  key={job.id}
                  href={`/careers/${job.id}`}
                  className="p-5 rounded border border-slate-200 bg-white hover:border-corporate-primary transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {job.location} &bull; {job.type}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-corporate-primary inline-flex items-center gap-1">
                    View Role <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* ── 3. TALENT POOL & CULTURE OVERVIEW ───────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
            <div className="p-4 rounded border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs">
                <Code className="w-4 h-4 text-corporate-primary" />
                <span>Modern Engineering Stack</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We work with Next.js, TypeScript, PostgreSQL, Drizzle ORM, Google Cloud Platform, and direct Safaricom Daraja telecom APIs.
              </p>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs">
                <Building2 className="w-4 h-4 text-corporate-primary" />
                <span>Real Kenyan Impact</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our code powers genuine Kenyan enterprises, managing millions in member savings and daily retail commerce.
              </p>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>High Autonomy &amp; Ownership</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We value disciplined software craftsmanship, rigorous financial accuracy, and direct architectural ownership.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}