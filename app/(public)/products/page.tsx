import Link from "next/link";
import {
  Building2,
  BookOpen,
  ShoppingBag,
  Send,
  Truck,
  Ticket,
  ArrowRight,
  ShieldCheck,
  FolderTree,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { getAllCategories, getProjectsByCategory } from "@/lib/data/products";

export const metadata = {
  title: "Products & Systems Directory | Corban Technologies LTD",
  description:
    "Explore our full suite of enterprise software divisions: SACCO core banking, SME general ledgers & finance, retail POS & e-commerce, telecom marketing, fleet logistics, and digital event ticketing.",
};

const iconMap: Record<string, typeof Building2> = {
  Building2,
  BookOpen,
  ShoppingBag,
  Send,
  Truck,
  Ticket,
};

export default function ProductsPage() {
  const categories = getAllCategories();

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Top Banner Header */}
      <section className="w-full bg-slate-50/80 border-b border-slate-200 py-10 sm:py-12">
        <div className="w-full px-4 sm:px-8 lg:px-16">
          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-semibold text-corporate-primary">
              <FolderTree className="w-3.5 h-3.5" />
              Corporate Systems Portfolio
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 tracking-tight">
              Enterprise Software &amp; Platform Divisions
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              Over the year, Corban Technologies has built, refined, and deployed mission-critical production platforms across key East African industries. Click on any division or specific project below to explore architectures, verified features, live screens, and platform access.
            </p>
          </div>
        </div>
      </section>

      {/* Categories / Folders Grid */}
      <section className="w-full py-10 sm:py-12">
        <div className="w-full px-4 sm:px-8 lg:px-16 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = iconMap[category.iconName] || Building2;
              const categoryProjects = getProjectsByCategory(category.slug);

              return (
                <div
                  key={category.id}
                  className="rounded border border-slate-200 bg-white hover:border-slate-300 transition-all p-6 flex flex-col justify-between shadow-xs hover:shadow-sm"
                >
                  <div className="space-y-4">
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/products/${category.slug}`}
                        className="p-2.5 rounded bg-slate-50 border border-slate-200 text-corporate-primary hover:bg-slate-100 transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                      </Link>
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        Division #{category.rank}
                      </span>
                    </div>

                    {/* Title & Tagline (Clickable) */}
                    <div>
                      <Link
                        href={`/products/${category.slug}`}
                        className="text-lg font-semibold text-slate-900 hover:text-corporate-primary tracking-tight transition-colors block"
                      >
                        {category.name}
                      </Link>
                      <p className="text-xs text-corporate-primary font-medium mt-0.5">
                        {category.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Clickable Projects in this folder */}
                    <div className="pt-3 border-t border-slate-100 space-y-2.5">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Platforms in this Division ({category.projectCount}):
                      </span>
                      <div className="flex flex-col gap-2">
                        {categoryProjects.map((proj) => (
                          <Link
                            key={proj.id}
                            href={`/products/${category.slug}/${proj.slug}`}
                            className="p-2.5 rounded bg-slate-50 border border-slate-200 hover:bg-white hover:border-corporate-primary hover:shadow-xs transition-all flex items-center justify-between text-xs group"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                              <span className="font-semibold text-slate-900 group-hover:text-corporate-primary transition-colors">
                                {proj.name}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono text-corporate-primary font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                              <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Big Button */}
                  <div className="pt-5 mt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Status:</span>
                      <span className="font-semibold text-emerald-700">{category.statusBadge}</span>
                    </div>

                    <Link
                      href={`/products/${category.slug}`}
                      className="w-full py-2.5 px-4 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-between transition-colors shadow-xs"
                    >
                      <span>Explore Division &amp; Mockups</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Trust Assurance Bar */}
          <div className="p-5 sm:p-6 rounded bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-white border border-slate-200 text-emerald-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Direct Integration &amp; SLA Deployment
                </h3>
                <p className="text-xs text-slate-600">
                  Every product is deployed in isolated cloud environments with Safaricom Daraja API rails and 99.9% uptime SLA.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shrink-0 shadow-sm"
            >
              Request Custom Enterprise Deployment <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
