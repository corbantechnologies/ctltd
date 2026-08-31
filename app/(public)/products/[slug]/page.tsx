import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllProducts,
  getProductBySlug,
  ProductItem,
} from "@/lib/data/products";
import {
  Users,
  PiggyBank,
  CreditCard,
  Smartphone,
  BookOpen,
  BarChart3,
  Calculator,
  Coins,
  TrendingUp,
  Receipt,
  ScanBarcode,
  Store,
  Boxes,
  Radio,
  Send,
  Wallet,
  Lock,
  Barcode,
  Navigation,
  Truck,
  FileCheck2,
  Clock,
  QrCode,
  Scan,
  Ticket,
  Zap,
  Building2,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Layers,
  ShoppingBag,
} from "lucide-react";

// Icon mapping helper
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  PiggyBank,
  CreditCard,
  Smartphone,
  BookOpen,
  BarChart3,
  Calculator,
  Coins,
  TrendingUp,
  Receipt,
  ScanBarcode,
  Store,
  Boxes,
  Radio,
  Send,
  Wallet,
  Lock,
  Barcode,
  Navigation,
  Truck,
  FileCheck2,
  Clock,
  QrCode,
  Scan,
  Ticket,
  Zap,
  Building2,
  ShoppingBag,
};

function getIcon(name: string) {
  return ICON_MAP[name] || Layers;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Corban Technologies LTD",
    };
  }

  return {
    title: `${product.name} | Corban Technologies LTD`,
    description: product.summary,
    openGraph: {
      title: `${product.name} | Corban Technologies LTD`,
      description: product.summary,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ── 1. PRODUCT HERO ─────────────────────────────────────────── */}
      <section className="relative w-full bg-white border-b border-slate-200 pt-16 pb-16">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary">
                <Building2 className="w-3.5 h-3.5" />
                Rank #{product.rank} · {product.category}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold border ${
                  product.statusTone === "emerald"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : product.statusTone === "blue"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {product.statusBadge}
              </span>
              {product.domain && (
                <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                  {product.domain}
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight leading-snug">
              {product.heroHeadline}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              {product.summary}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/contact?product=${product.slug}`}
                className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                Request Platform Demo &amp; Setup <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              {product.domain && (
                <a
                  href={`https://${product.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
                >
                  Visit Live Domain <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SPECS STRIP ──────────────────────────────────────────── */}
      <section className="w-full bg-slate-50 border-b border-slate-200 py-8">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {product.specs.map((spec, idx) => (
              <div key={idx} className="p-3 rounded bg-white border border-slate-200 shadow-sm">
                <p className="text-[10px] uppercase font-semibold text-slate-500">
                  {spec.label}
                </p>
                <p className="text-xs font-semibold text-slate-900 mt-0.5">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. HIGHLIGHTS GRID ──────────────────────────────────────── */}
      <section className="w-full bg-white py-14 border-b border-slate-200">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="mb-8 pb-3 border-b border-slate-200">
            <p className="text-xs font-semibold text-corporate-primary uppercase tracking-wider mb-1">
              Core Capabilities
            </p>
            <h2 className="text-lg font-semibold text-slate-900">
              Key Platform Advantages &amp; Architectural Strengths
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {product.highlights.map((item, idx) => {
              const IconComp = getIcon(item.iconName);
              return (
                <div
                  key={idx}
                  className="p-5 rounded bg-slate-50 border border-slate-200 space-y-2.5"
                >
                  <div className="w-7 h-7 bg-white border border-slate-200 rounded flex items-center justify-center text-corporate-primary">
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. DETAILED MODULES ──────────────────────────────────────── */}
      <section className="w-full bg-slate-50 py-14 border-b border-slate-200">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="mb-8 pb-3 border-b border-slate-200">
            <p className="text-xs font-semibold text-corporate-primary uppercase tracking-wider mb-1">
              Module Breakdown
            </p>
            <h2 className="text-lg font-semibold text-slate-900">
              Included Engineering Deliverables &amp; Workspaces
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.modules.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded bg-white border border-slate-200 shadow-sm space-y-4"
              >
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {m.desc}
                  </p>
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

      {/* ── 5. TECH STACK & HOSTING ─────────────────────────────────── */}
      <section className="w-full bg-white py-14 border-b border-slate-200">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="p-6 rounded bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Technology Stack &amp; Infrastructure
              </p>
              <p className="text-xs text-slate-600">
                Engineered for sub-second query performance, multi-tenant isolation, and high availability.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {product.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded bg-white border border-slate-200 text-xs font-medium text-slate-800 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CLOSING ONBOARDING CTA ───────────────────────────────── */}
      <section className="w-full bg-slate-50 py-14">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="p-8 rounded bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 max-w-2xl">
              <h3 className="text-base font-semibold text-white">
                Ready to Deploy {product.name}?
              </h3>
              <p className="text-xs text-slate-300">
                Corban Technologies handles architecture setup, customization, staff onboarding, and dedicated cloud hosting with a 99.9% uptime SLA.
              </p>
            </div>
            <Link
              href={`/contact?product=${product.slug}`}
              className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5 shrink-0"
            >
              Start Platform Onboarding <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
