import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  BookOpen,
  ShoppingBag,
  Send,
  Truck,
  Ticket,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Store,
  BarChart3,
  Users,
  PiggyBank,
  CreditCard,
  Smartphone,
  Receipt,
  Coins,
  Boxes,
  ScanBarcode,
  Clock,
  Radio,
  Wallet,
  Lock,
  Barcode,
  Navigation,
  FileCheck2,
  Scan,
  Calculator,
  TrendingUp,
} from "lucide-react";
import {
  getAllCategories,
  getCategoryBySlug,
  getProjectsByCategory,
} from "@/lib/data/products";
import LivePlatformPreview from "@/components/products/LivePlatformPreview";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const categorySlug = resolvedParams?.category;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return { title: "Division Not Found | Corban Technologies LTD" };
  }

  return {
    title: `${category.name} | Corban Technologies LTD`,
    description: category.description,
  };
}

const iconMap: Record<string, typeof Building2> = {
  Building2,
  BookOpen,
  ShoppingBag,
  Send,
  Truck,
  Ticket,
  Store,
  BarChart3,
  Users,
  PiggyBank,
  CreditCard,
  Smartphone,
  Receipt,
  Coins,
  Boxes,
  ScanBarcode,
  Clock,
  Radio,
  Wallet,
  Lock,
  Barcode,
  Navigation,
  FileCheck2,
  Scan,
  Calculator,
  TrendingUp,
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const categorySlug = resolvedParams?.category;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const projects = getProjectsByCategory(category.slug);
  const CategoryIcon = iconMap[category.iconName] || Building2;

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Breadcrumb Bar */}
      <div className="w-full bg-slate-50 border-b border-slate-200 py-3">
        <div className="w-full px-6 sm:px-10 lg:px-16 flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-slate-900 transition-colors">
            Products &amp; Divisions
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">{category.name}</span>
        </div>
      </div>

      {/* Category Header */}
      <section className="w-full bg-slate-50/50 border-b border-slate-200 py-12">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded bg-white border border-slate-200 text-corporate-primary">
                <CategoryIcon className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">
                Division #{category.rank} · {category.folderName}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700">
                {category.statusBadge}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              {category.name}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Projects List with Brief and Mockup Preview */}
      <section className="w-full py-12">
        <div className="w-full px-6 sm:px-10 lg:px-16 space-y-12">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
              Platforms &amp; Systems in this Division ({projects.length})
            </h2>
            <p className="text-xs text-slate-600">
              Select any project below to view its complete architecture, modules, verified features, pricing model, and live demo access.
            </p>
          </div>

          <div className="space-y-10">
            {projects.map((project) => {
              return (
                <div
                  key={project.id}
                  className="rounded border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-slate-300 transition-all"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Left Column: Project Brief & Details */}
                    <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        {/* Header Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            {project.categoryName}
                          </span>
                          <span
                            className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${
                              project.statusTone === "emerald"
                                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                : project.statusTone === "blue"
                                ? "bg-blue-50 border-blue-200 text-blue-700"
                                : "bg-amber-50 border-amber-200 text-amber-700"
                            }`}
                          >
                            {project.statusBadge}
                          </span>
                        </div>

                        {/* Title & Headline */}
                        <div>
                          <Link
                            href={`/products/${category.slug}/${project.slug}`}
                            className="text-xl font-semibold text-slate-900 hover:text-corporate-primary tracking-tight transition-colors block"
                          >
                            {project.name}
                          </Link>
                          <p className="text-xs text-corporate-primary font-medium mt-1">
                            {project.heroHeadline}
                          </p>
                        </div>

                        {/* Summary */}
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {project.summary}
                        </p>

                        {/* Key Benefits Preview */}
                        <div className="space-y-2 pt-2">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                            Key Value Delivered
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {project.benefits.slice(0, 2).map((benefit, bIdx) => (
                              <div
                                key={bIdx}
                                className="p-3 rounded bg-slate-50 border border-slate-200 text-xs space-y-1"
                              >
                                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-corporate-primary shrink-0" />
                                  <span>{benefit.title}</span>
                                </div>
                                <p className="text-[11px] text-slate-600 leading-relaxed">
                                  {benefit.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="pt-2 flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] font-medium text-slate-400 mr-1">
                            Stack:
                          </span>
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                        <Link
                          href={`/products/${category.slug}/${project.slug}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs"
                        >
                          View Full Project &amp; Features <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary transition-colors font-mono"
                        >
                          {project.liveDomain} <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Right Column: Authentic Live Production Screen Preview */}
                    <div className="lg:col-span-5 p-4 sm:p-6 bg-slate-900 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-slate-800">
                      <LivePlatformPreview
                        slug={project.slug}
                        liveUrl={project.liveUrl}
                        liveDomain={project.liveDomain}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
