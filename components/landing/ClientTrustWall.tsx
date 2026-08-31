"use client";

import Link from "next/link";
import { Building2, Sparkles, ShoppingBag, Send, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

interface ClientStory {
  name: string;
  category: string;
  status: string;
  scope: string;
  impact: string;
  domain?: string;
  icon: typeof Building2;
}

const clientStories: ClientStory[] = [
  {
    name: "Wananchi Mali SACCO (3 Cooperatives)",
    category: "Financial Sector / SACCOs",
    status: "Live in Production",
    scope: "Core banking platform, double-entry GL, member self-service portal, and Safaricom Daraja M-Pesa automated reconciliation.",
    impact: "Automated loan disbursements, member deposit reconciliation, and monthly dividend analytics.",
    domain: "wananchimali.co.ke",
    icon: Building2,
  },
  {
    name: "LJK Marketing Agency",
    category: "Digital Marketing & Telecom",
    status: "Live Client Ecosystem",
    scope: "High-throughput business messaging workspace, custom Alphanumeric Sender ID dispatch, client CRM, and M-Pesa billing.",
    impact: "Powers automated telecom campaigns and client lead attribution with instantaneous transaction confirmations.",
    domain: "ljkmarketingagency.co.ke",
    icon: Send,
  },
  {
    name: "GearHouse Kenya & Clate Cosmetics",
    category: "Omnichannel Retail & Cosmetics Commerce",
    status: "Live Client Deployments",
    scope: "E-commerce storefront catalog, integrated barcode Point-of-Sale (POS) terminal, and real-time inventory synchronization.",
    impact: "Multi-channel retail management powering physical counter checkout and online customer sales across Kenya.",
    domain: "gearhouse.co.ke · clatecosmetics.com",
    icon: ShoppingBag,
  },
  {
    name: "Sherehe Tickets Kenya",
    category: "Events & Digital Ticketing",
    status: "Live Platform Deployment",
    scope: "Event discovery, instant M-Pesa Daraja ticket checkout, dynamic QR gate pass generation, and organizer revenue ledger.",
    impact: "Frictionless gate admission with zero ticket counterfeiting and automated organizer payouts.",
    icon: Sparkles,
  },
];

export default function ClientTrustWall() {
  return (
    <section className="w-full bg-white py-14 border-b border-slate-200">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Client Deployments
            </div>
            <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
              Trusted by East Africa&apos;s Growing Enterprises
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              We design, build, and cloud-host production systems for financial cooperatives, retail businesses, marketing agencies, and live operations.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-corporate-primary hover:text-orange-600 transition-colors shrink-0"
          >
            Become Our Next Success Story <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Client Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {clientStories.map((client, idx) => (
            <div
              key={idx}
              className="p-5 rounded bg-slate-50/60 border border-slate-200 hover:border-orange-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded bg-white border border-slate-200 text-corporate-primary">
                      <client.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 line-clamp-1">
                        {client.name}
                      </h3>
                      <p className="text-[11px] text-slate-600">
                        {client.category}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed mb-3">
                  <span className="font-semibold text-slate-900">Scope: </span>
                  {client.scope}
                </p>

                <div className="p-2.5 rounded bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-900">Value: </span>
                  {client.impact}
                </div>
              </div>

              {client.domain && (
                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                  <span className="text-[11px]">Domain:</span>
                  <span className="font-medium text-slate-900 font-mono text-[11px]">
                    {client.domain}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
