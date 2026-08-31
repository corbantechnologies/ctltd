import { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/lib/data/products";
import { CheckCircle2, ArrowRight, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Products & Platforms | Corban Technologies LTD",
  description:
    "Explore Corban Technologies' 6 core enterprise software platforms: SACCO core banking, financial intelligence, retail POS, marketing CRM, logistics, and digital event ticketing.",
};

export default function ProductsPage() {
  const productsList = getAllProducts();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <section className="relative w-full bg-white border-b border-slate-200 pt-16 pb-14">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary">
              <Layers className="w-3.5 h-3.5" />
              Software Portfolio &amp; Platform Rankings
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
              Enterprise Platforms Engineered &amp; Cloud-Hosted by Corban Technologies
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              Over the past year, our engineers have developed, tested, and deployed 6 core systems tailored for Kenyan and East African enterprise workflows. Every platform is backed by dedicated cloud hosting, database isolation, and 99.9% uptime.
            </p>
          </div>
        </div>
      </section>

      {/* Product List */}
      <section className="py-12 bg-slate-50 flex-grow">
        <div className="w-full px-6 sm:px-10 lg:px-16 space-y-8">
          {productsList.map((product) => (
            <div
              key={product.id}
              id={product.id}
              className="p-6 sm:p-8 rounded bg-white border border-slate-200 shadow-sm"
            >
              {/* Product Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-xs font-semibold">
                      Rank #{product.rank}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${
                        product.statusTone === "emerald"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : product.statusTone === "blue"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {product.statusBadge}
                    </span>
                    {product.domain && (
                      <span className="text-xs font-mono text-slate-500">
                        {product.domain}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900 mt-1">
                    {product.name}
                  </h2>
                  <p className="text-xs font-medium text-corporate-primary">
                    {product.category}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/products/${product.slug}`}
                    className="px-4 py-2 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5"
                  >
                    View Platform Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/contact?product=${product.slug}`}
                    className="px-4 py-2 rounded bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
                  >
                    Request Demo
                  </Link>
                </div>
              </div>

              {/* Product Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                {/* Left: Description & Specs */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                      Overview &amp; Architecture
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {product.summary}
                    </p>
                  </div>

                  {/* Specs Matrix */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {product.specs.map((spec, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded bg-slate-50 border border-slate-200/80"
                      >
                        <p className="text-[10px] uppercase font-semibold text-slate-500">
                          {spec.label}
                        </p>
                        <p className="font-semibold text-slate-900 text-xs mt-0.5">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-medium text-slate-500 mr-1">
                      Tech Stack:
                    </span>
                    {product.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium text-slate-700 px-2 py-0.5 rounded bg-slate-100 border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Capabilities Checklist */}
                <div className="lg:col-span-6 space-y-3">
                  <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Core Capabilities &amp; Modules
                  </p>
                  <ul className="space-y-2">
                    {product.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="p-2.5 rounded bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-corporate-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900">{highlight.title}</p>
                          <p className="text-[11px] text-slate-600 mt-0.5">{highlight.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
