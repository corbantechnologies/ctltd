import type { Metadata } from "next";
import Link from "next/link";
import {
  ShoppingBag,
  Receipt,
  Smartphone,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  ScanBarcode,
  Boxes,
  Store,
  CreditCard,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Omnichannel Commerce & Point-of-Sale (POS) | Corban Technologies LTD",
  description:
    "GearHouse Retail & POS — high-speed retail commerce platform uniting online storefronts with barcode Point-of-Sale (POS) cashier terminals, instant M-Pesa payments, and multi-branch inventory tracking.",
};

export default function RetailProductPage() {
  const highlights = [
    { icon: ScanBarcode, label: "Barcode Cashier POS Terminal", desc: "Sub-second product barcode scanning, fast search, multi-item cart management, and split payment methods." },
    { icon: Store, label: "Online Customer Storefront", desc: "Responsive digital shopping catalog with real-time stock availability, category filters, and mobile carts." },
    { icon: Smartphone, label: "Direct M-Pesa STK Push Checkout", desc: "Cashier initiates prompt directly to customer's phone for immediate PIN entry and automated verification." },
    { icon: Boxes, label: "Inventory Batch & Stock Control", desc: "Automated stock level deduction, low-stock threshold alerts, supplier receipting, and batch expiry tracking." },
    { icon: Receipt, label: "Thermal Receipt Printing", desc: "Instant USB/Bluetooth thermal printer integration with branded customer receipts and digital SMS slips." },
    { icon: TrendingUp, label: "Daily Cash Drawer Reconciliation", desc: "End-of-day teller cash declarations, sales audit logs, and gross margin profit reports." },
  ];

  const modules = [
    {
      title: "Point-of-Sale (POS) Cashier Workspace",
      desc: "Engineered for rapid high-volume retail counter checkouts with zero lag.",
      items: [
        "Barcode scanner support for instant SKU identification",
        "Multiple payment methods: M-Pesa STK Push, Cash, Credit Card, and Customer Credit",
        "Hold cart and resume transaction capability for busy checkout queues",
        "Line-item discount rules and automated tax (VAT) computation",
        "Offline-tolerant checkout caching during transient internet drops",
      ],
    },
    {
      title: "Omnichannel E-Commerce Storefront",
      desc: "Modern digital customer storefront synchronized with your physical retail stores.",
      items: [
        "Real-time stock synchronization between physical shelves and online catalog",
        "Seamless mobile customer checkout with automated Daraja payment confirmation",
        "Customer order tracking from 'Processing' to 'Out for Delivery' or 'In-Store Pickup'",
        "Featured collections, promotional banners, and discount coupon codes",
        "Search engine optimized (SEO) product landing pages",
      ],
    },
    {
      title: "Inventory & Supply Chain Management",
      desc: "Full visibility over warehouse stock levels, purchase orders, and stock movements.",
      items: [
        "Supplier purchase orders (PO) and goods received note (GRN) creation",
        "Automated cost of goods sold (COGS) and profit margin tracking per SKU",
        "Multi-branch inventory transfers and stock audit count worksheets",
        "Low-stock email and dashboard alert triggers",
        "Barcode label generation and batch printing",
      ],
    },
    {
      title: "Executive Business Intelligence & Reports",
      desc: "Actionable retail sales analytics for store managers and company executives.",
      items: [
        "Top-selling products and slow-moving inventory analysis",
        "Hourly and daily sales velocity heatmaps",
        "Cashier shift performance and reconciliation variances",
        "Customer lifetime value and repeat purchase loyalty metrics",
        "Exportable financial summaries formatted for accounting software",
      ],
    },
  ];

  const techSpecs = [
    { label: "Active Client Partner", value: "GearHouse Kenya" },
    { label: "Terminal Architecture", value: "Online Store + Cashier POS" },
    { label: "Payment Verification", value: "Instant Daraja STK Webhooks" },
    { label: "Hardware Support", value: "Barcode Scanners & Thermal Printers" },
    { label: "Sync Latency", value: "Sub-Second Multi-Branch" },
    { label: "Database Isolation", value: "Dedicated PostgreSQL Tenant" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full bg-white border-b border-slate-200 pt-16 pb-16">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary">
                <ShoppingBag className="w-3.5 h-3.5" />
                Rank #3 · Retail Commerce &amp; POS
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                Live Client Deployment (GearHouse)
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight leading-snug">
              Omnichannel E-Commerce, Barcode POS &amp; Real-Time Inventory Control
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              Engineered and cloud-hosted by Corban Technologies. GearHouse Retail connects your online storefront with high-speed barcode cashier terminals, instant Safaricom Daraja M-Pesa counter payments, and multi-branch inventory tracking.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/contact?product=retail"
                className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                Request Retail &amp; POS Demo <ArrowRight className="w-3.5 h-3.5" />
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
              Everything Your Retail Business Needs from Counter to Cloud
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
              Comprehensive Retail Infrastructure
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
                Ready to Deploy Modern POS &amp; E-Commerce for Your Stores?
              </h3>
              <p className="text-xs text-slate-300">
                Corban Technologies handles catalog migration, hardware scanner setup, cashier training, and dedicated hosting.
              </p>
            </div>
            <Link
              href="/contact?product=retail"
              className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5 shrink-0"
            >
              Start Retail Onboarding <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
