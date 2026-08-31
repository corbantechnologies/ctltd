import type { Metadata } from "next";
import Link from "next/link";
import {
  Truck,
  Receipt,
  Smartphone,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  MapPin,
  Barcode,
  Navigation,
  FileCheck2,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Freight, Waybills & Logistics OS | Corban Technologies LTD",
  description:
    "CT Logistics — comprehensive supply chain platform for parcel couriers, cargo transporters, and fleet operators. Features automated waybill barcodes, shipment milestone tracking, and digital Proof of Delivery (POD).",
};

export default function LogisticsProductPage() {
  const highlights = [
    { icon: Barcode, label: "Automated Waybill & Barcode Issuance", desc: "Instant waybill PDF generation with unique scannable barcodes for parcels, cargo pallets, and container loads." },
    { icon: Navigation, label: "Real-Time Shipment Milestone Tracking", desc: "Live status updates: Created, Manifested, In Transit, Arrived at Hub, and Out for Delivery." },
    { icon: Truck, label: "Fleet Vehicle & Driver Dispatch", desc: "Assign trucks, assign drivers, generate cargo manifests, and balance multi-hub transport capacities." },
    { icon: Smartphone, label: "Automated Customer SMS Alerts", desc: "Senders and receivers receive instant tracking links and automated milestone SMS notifications." },
    { icon: FileCheck2, label: "Digital Proof of Delivery (POD)", desc: "Delivery drivers capture recipient signatures, ID photos, and OTP confirmation codes on arrival." },
    { icon: Clock, label: "Multi-Hub Depot Operations", desc: "Streamline cargo handoffs between central depots in Mombasa, Nairobi, Nakuru, Kisumu, and regional drop points." },
  ];

  const modules = [
    {
      title: "Waybill & Parcel Ingestion Center",
      desc: "High-speed front-desk cargo intake interface for logistics agents and depot staff.",
      items: [
        "Rapid sender and consignee detail capture with address autocompletion",
        "Weight, volumetric dimension, and package fragility classification",
        "Automated freight rate calculation based on weight, distance, and insurance",
        "Instant thermal waybill label printing with scannable Code-128 barcodes",
        "Payment integration for cash, corporate billing accounts, or M-Pesa STK Push",
      ],
    },
    {
      title: "Fleet Manifest & Route Dispatch",
      desc: "Optimized logistics dispatch console for warehouse managers and fleet controllers.",
      items: [
        "Consolidated trip manifests grouping multiple parcels onto designated trucks",
        "Truck capacity utilization indicators (weight and volume load meters)",
        "Driver assignment with digital delivery trip sheets and contact lists",
        "Inter-depot transfer manifests with origin and destination station sign-offs",
        "Fuel allocation, toll fees, and transit expense recording",
      ],
    },
    {
      title: "Consignee Tracking & Customer Experience",
      desc: "Self-service web and mobile tracking interface for senders and recipients.",
      items: [
        "Public tracking lookup page requiring only the unique waybill number",
        "Milestone timeline displaying exact timestamps and station checkpoints",
        "SMS notifications dispatched upon critical transit updates",
        "Estimated arrival time (ETA) calculations based on route progress",
        "Delivery address change or pickup point selection requests",
      ],
    },
    {
      title: "Digital Proof of Delivery (POD) & Billing",
      desc: "Eliminates lost delivery sheets and provides instant financial reconciliation.",
      items: [
        "Mobile-optimized delivery driver sign-off screen",
        "OTP delivery confirmation sent directly to the recipient's phone",
        "Immediate cloud upload of stamped delivery documents and recipient signatures",
        "Corporate monthly billing statements with linked POD proof attachments",
        "Claims management and damaged goods incident logging",
      ],
    },
  ];

  const techSpecs = [
    { label: "Platform Name", value: "CT Logistics Management OS" },
    { label: "Barcode Standard", value: "Code-128 & QR Compatible" },
    { label: "Transit Routes", value: "Multi-Hub (Mombasa-Nairobi-Regional)" },
    { label: "Database Engine", value: "PostgreSQL with Drizzle ORM" },
    { label: "Hosting", value: "High-Availability Cloud Container" },
    { label: "POD Security", value: "OTP & Digital Signature Validated" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full bg-white border-b border-slate-200 pt-16 pb-16">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary">
                <Truck className="w-3.5 h-3.5" />
                Rank #5 · Freight &amp; Logistics OS
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                Enterprise Ready
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight leading-snug">
              Waybill Automation, Fleet Dispatch &amp; Real-Time Cargo Tracking
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              Engineered and cloud-hosted by Corban Technologies. CT Logistics provides parcel couriers, cargo transporters, and freight forwarders with automated barcode waybills, multi-hub fleet manifests, and digital Proof of Delivery (POD).
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/contact?product=logistics"
                className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                Request Logistics OS Demo <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/products"
                className="px-5 py-2.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
              >
                View All Platforms
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Strip */}
      <section className="w-full bg-slate-50 border-b border-slate-200 py-8">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {techSpecs.map((spec, idx) => (
              <div key={idx} className="p-3 rounded bg-white border border-slate-200">
                <p className="text-[10px] uppercase font-semibold text-slate-500">{spec.label}</p>
                <p className="text-xs font-semibold text-slate-900 mt-0.5">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="w-full bg-white py-14 border-b border-slate-200">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="mb-8 pb-3 border-b border-slate-200">
            <p className="text-xs font-semibold text-corporate-primary uppercase tracking-wider mb-1">
              Core Capabilities
            </p>
            <h2 className="text-lg font-semibold text-slate-900">
              Complete Control Over Every Cargo Parcel from Intake to Delivery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {highlights.map((item, idx) => (
              <div key={idx} className="p-5 rounded bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="w-7 h-7 bg-white border border-slate-200 rounded flex items-center justify-center text-corporate-primary">
                  <item.icon className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">{item.label}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Modules */}
      <section className="w-full bg-slate-50 py-14 border-b border-slate-200">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="mb-8 pb-3 border-b border-slate-200">
            <p className="text-xs font-semibold text-corporate-primary uppercase tracking-wider mb-1">
              Platform Modules
            </p>
            <h2 className="text-lg font-semibold text-slate-900">
              Depot Operations &amp; Fleet Management Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((m, idx) => (
              <div key={idx} className="p-6 rounded bg-white border border-slate-200 shadow-sm space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{m.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{m.desc}</p>
                </div>
                <ul className="space-y-2 pt-2 border-t border-slate-100">
                  {m.items.map((it, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-corporate-primary shrink-0 mt-0.5" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-white py-14">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="p-8 rounded bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 max-w-2xl">
              <h3 className="text-base font-semibold text-white">
                Digitize Your Logistics Fleet &amp; Depot Operations
              </h3>
              <p className="text-xs text-slate-300">
                Corban Technologies customizes your waybill templates, depot route networks, and dedicated cloud hosting.
              </p>
            </div>
            <Link
              href="/contact?product=logistics"
              className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5 shrink-0"
            >
              Start Logistics Onboarding <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
