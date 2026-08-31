import { notFound } from "next/navigation";
import Link from "next/link";
import {
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
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Layers,
  FileText,
  BadgeCheck,
  DollarSign,
} from "lucide-react";
import {
  getAllProjects,
  getProjectBySlug,
  getCategoryBySlug,
} from "@/lib/data/products";
import LivePlatformPreview from "@/components/products/LivePlatformPreview";

interface ProjectPageProps {
  params: Promise<{ category: string; project: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    category: p.categorySlug,
    project: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const categorySlug = resolvedParams?.category;
  const projectSlug = resolvedParams?.project;
  const project = getProjectBySlug(categorySlug, projectSlug);

  if (!project) {
    return { title: "Project Not Found | Corban Technologies LTD" };
  }

  return {
    title: `${project.name} | Corban Technologies LTD`,
    description: project.summary,
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

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const categorySlug = resolvedParams?.category;
  const projectSlug = resolvedParams?.project;
  const project = getProjectBySlug(categorySlug, projectSlug);

  if (!project) {
    notFound();
  }

  const category = getCategoryBySlug(project.categorySlug);

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Breadcrumb Navigation Bar */}
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
          <Link
            href={`/products/${project.categorySlug}`}
            className="hover:text-slate-900 transition-colors"
          >
            {category?.name || project.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">{project.shortTag}</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="w-full bg-slate-50/70 border-b border-slate-200 py-12">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl space-y-4">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
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

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              {project.name}
            </h1>

            {/* Hero Subtitle */}
            <p className="text-sm font-medium text-corporate-primary">
              {project.heroHeadline}
            </p>

            {/* Summary */}
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              {project.summary}
            </p>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs"
              >
                Launch Live Platform ({project.liveDomain}) <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors shadow-xs"
              >
                Schedule Architecture Demo <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="w-full py-12">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Content Column (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Key Business Benefits Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <BadgeCheck className="w-4 h-4 text-corporate-primary" />
                  <h2 className="text-base font-semibold text-slate-900 uppercase tracking-wide">
                    Key Value &amp; Business Benefits
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded border border-slate-200 bg-slate-50/50 space-y-1.5"
                    >
                      <h3 className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-corporate-primary shrink-0" />
                        <span>{benefit.title}</span>
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Features & Highlights */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <Layers className="w-4 h-4 text-corporate-primary" />
                  <h2 className="text-base font-semibold text-slate-900 uppercase tracking-wide">
                    Core Engineering Highlights
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.highlights.map((highlight, idx) => {
                    const IconComponent = iconMap[highlight.iconName] || CheckCircle2;
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded border border-slate-200 bg-white space-y-2 hover:border-slate-300 transition-colors shadow-xs"
                      >
                        <div className="flex items-center gap-2 text-corporate-primary">
                          <div className="p-1.5 rounded bg-slate-50 border border-slate-200">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <h3 className="text-xs font-semibold text-slate-900">
                            {highlight.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {highlight.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* System Architecture & Modules */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <FileText className="w-4 h-4 text-corporate-primary" />
                  <h2 className="text-base font-semibold text-slate-900 uppercase tracking-wide">
                    System Architecture &amp; Functional Modules
                  </h2>
                </div>
                <div className="space-y-4">
                  {project.modules.map((mod, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded border border-slate-200 bg-slate-50/40 space-y-3"
                    >
                      <div>
                        <h3 className="text-xs font-semibold text-slate-900">
                          {mod.title}
                        </h3>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          {mod.desc}
                        </p>
                      </div>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {mod.items.map((item, iIdx) => (
                          <li
                            key={iIdx}
                            className="flex items-start gap-1.5 text-xs text-slate-700"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-corporate-primary shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & Commercial Model */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <DollarSign className="w-4 h-4 text-corporate-primary" />
                  <h2 className="text-base font-semibold text-slate-900 uppercase tracking-wide">
                    Pricing &amp; Commercial Model
                  </h2>
                </div>
                <div className="p-5 rounded border border-slate-200 bg-white space-y-4 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        Commercial Structure
                      </span>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {project.pricing.model}
                      </h3>
                    </div>
                    {project.pricing.startingAt && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800">
                        {project.pricing.startingAt}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {project.pricing.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Included in Platform Package:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.pricing.featuresIncluded.map((feat, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-1.5 text-xs text-slate-700"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar: Authentic Live Production Screen & Specifications (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Authentic Live Production Screen */}
              <LivePlatformPreview
                slug={project.slug}
                liveUrl={project.liveUrl}
                liveDomain={project.liveDomain}
              />

              {/* Technical Specifications Card */}
              <div className="p-5 rounded border border-slate-200 bg-slate-50/50 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-corporate-primary" />
                  <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wide">
                    Platform Specifications
                  </h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  {project.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 text-[11px]">{spec.label}</span>
                      <span className="font-mono font-medium text-slate-900 text-right text-[11px]">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Badges */}
                <div className="pt-3 border-t border-slate-200 space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Technology Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-mono text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Back to Division CTA */}
              <div className="p-4 rounded border border-slate-200 bg-white flex items-center justify-between text-xs">
                <Link
                  href={`/products/${project.categorySlug}`}
                  className="font-semibold text-corporate-primary hover:underline inline-flex items-center gap-1"
                >
                  ← Back to {category?.name || "Division"}
                </Link>
                <Link
                  href="/products"
                  className="text-slate-500 hover:text-slate-900"
                >
                  All Divisions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
