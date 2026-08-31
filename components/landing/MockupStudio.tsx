"use client";

import { useState } from "react";
import Link from "next/link";
import {
  getAllCategories,
  getProjectsByCategory,
  CategoryItem,
  ProjectItem,
} from "@/lib/data/products";
import {
  CheckCircle2,
  ArrowRight,
  Layers,
  Lock,
  ExternalLink,
} from "lucide-react";

export default function MockupStudio() {
  const categories = getAllCategories();
  const [activeTab, setActiveTab] = useState<string>("sacco");
  const currentCategory =
    categories.find((c) => c.slug === activeTab) || categories[0];
  const categoryProjects = getProjectsByCategory(currentCategory.slug);
  const primaryProject: ProjectItem | undefined = categoryProjects[0];

  return (
    <section id="products" className="w-full bg-white py-16 border-b border-slate-200">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-10 pb-4 border-b border-slate-200 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary mb-2">
              <Layers className="w-3.5 h-3.5" />
              Engineered &amp; Cloud-Hosted Portfolio
            </div>
            <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
              Our Core Software Platforms &amp; Systems
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Over the past year, Corban Technologies has built, refined, and deployed 6 core enterprise divisions. Explore the live platforms powering businesses across East Africa.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs font-semibold text-corporate-primary hover:text-orange-600 transition-colors shrink-0"
          >
            View All Divisions ({categories.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Tab Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {categories.map((category) => {
            const isActive = activeTab === category.slug;
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.slug)}
                className={`p-3 rounded text-left transition-all border flex flex-col justify-between ${
                  isActive
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      isActive
                        ? "bg-slate-800 text-corporate-primary"
                        : "bg-white text-slate-500 border border-slate-200"
                    }`}
                  >
                    Division #{category.rank}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold leading-tight line-clamp-1">
                    {category.folderName}
                  </p>
                  <p
                    className={`text-[11px] truncate mt-0.5 ${
                      isActive ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {category.projectCount} {category.projectCount === 1 ? "Platform" : "Platforms"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Showcase Card */}
        {primaryProject && (
          <div className="rounded border border-slate-200 bg-white overflow-hidden shadow-sm">
            {/* Header Strip */}
            <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-xs font-semibold">
                    Division #{currentCategory.rank} · {currentCategory.folderName}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${
                      primaryProject.statusTone === "emerald"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : primaryProject.statusTone === "blue"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {primaryProject.statusBadge}
                  </span>
                  <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                    {primaryProject.liveDomain}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {primaryProject.name}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/products/${currentCategory.slug}`}
                  className="px-4 py-2 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5"
                >
                  Explore {currentCategory.folderName} Folder <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={primaryProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded bg-white hover:bg-slate-50 text-corporate-primary border border-slate-200 text-xs font-semibold transition-colors inline-flex items-center gap-1 font-mono"
                >
                  {primaryProject.liveDomain} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Body Content & Mockup Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left: Detailed Info & Specifications */}
              <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {primaryProject.summary}
                  </p>

                  {/* Platforms in this Category */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Platforms in this Division:
                    </p>
                    <div className="space-y-2">
                      {categoryProjects.map((proj) => (
                        <Link
                          key={proj.id}
                          href={`/products/${currentCategory.slug}/${proj.slug}`}
                          className="p-3 rounded border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-corporate-primary transition-all block text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-900">
                              {proj.name}
                            </span>
                            <span className="text-[10px] font-mono text-corporate-primary font-semibold">
                              Details →
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 line-clamp-1">
                            {proj.heroHeadline}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Key Capabilities */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Core Engineering Highlights
                    </p>
                    <ul className="space-y-2">
                      {primaryProject.highlights.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-corporate-primary shrink-0 mt-0.5" />
                          <span>
                            <strong className="font-semibold text-slate-900">
                              {item.title}:
                            </strong>{" "}
                            {item.desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Technical Specifications Matrix */}
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {primaryProject.specs.slice(0, 4).map((spec, idx) => (
                      <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-200/80">
                        <p className="text-[10px] uppercase font-semibold text-slate-500">
                          {spec.label}
                        </p>
                        <p className="font-semibold text-slate-900 text-xs">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-medium text-slate-500 mr-1">
                      Tech Stack:
                    </span>
                    {primaryProject.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium text-slate-700 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: High-Fidelity UI Browser Mockup */}
              <div className="lg:col-span-7 p-6 bg-slate-50/70 flex flex-col justify-center">
                <div className="rounded border border-slate-300 bg-white overflow-hidden shadow-sm">
                  {/* Browser Window Chrome */}
                  <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    </div>
                    <div className="flex-1 max-w-sm mx-auto bg-white border border-slate-200 rounded px-2.5 py-0.5 flex items-center justify-between text-[11px] font-mono text-slate-600">
                      <span className="truncate">{primaryProject.mockup.browserUrl}</span>
                      <Lock className="w-2.5 h-2.5 text-emerald-600 shrink-0 ml-2" />
                    </div>
                  </div>

                  {/* Mockup Canvas Screen */}
                  <div className="p-5 bg-white space-y-4">
                    {/* Mockup Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-corporate-primary">
                          System Interface Preview
                        </p>
                        <p className="text-xs font-semibold text-slate-900">
                          {primaryProject.mockup.windowTitle}
                        </p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                        Live Production
                      </span>
                    </div>

                    {/* KPI Mini-Dashboard */}
                    <div className="grid grid-cols-3 gap-3">
                      {primaryProject.mockup.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded bg-slate-50 border border-slate-200"
                        >
                          <p className="text-[10px] font-semibold text-slate-500 truncate">
                            {metric.label}
                          </p>
                          <p className="text-sm font-semibold text-slate-900 mt-0.5">
                            {metric.value}
                          </p>
                          {metric.trend && (
                            <p className="text-[10px] font-medium text-emerald-700 mt-0.5 font-mono">
                              {metric.trend}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* UI Representation Table / Cards */}
                    <div className="rounded border border-slate-200 overflow-hidden text-xs">
                      <div className="bg-slate-50 px-3 py-1.5 font-semibold text-slate-700 border-b border-slate-200 flex items-center justify-between text-[11px]">
                        <span>Active Transaction Stream &amp; Module Ledger</span>
                        <span className="text-corporate-primary font-mono text-[10px]">
                          Operational
                        </span>
                      </div>

                      <div className="divide-y divide-slate-100">
                        {primaryProject.mockup.ledgerItems.map((item, idx) => (
                          <div key={idx} className="p-2.5 flex items-center justify-between bg-white text-xs">
                            <div>
                              <p className="font-semibold text-slate-900">
                                {item.title}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                {item.subtitle}
                              </p>
                            </div>
                            {item.amount && (
                              <span className="font-mono font-semibold text-emerald-700">
                                {item.amount}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
