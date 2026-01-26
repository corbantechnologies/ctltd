"use client";

import { useParams } from "next/navigation";
import { projects } from "@/products/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Globe,
  CheckCircle2,
  Cpu,
  ChevronRight,
  ExternalLink,
  Target,
} from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center">
          <h1 className="text-4xl font-black text-corporate-foreground mb-4 tracking-tighter">
            Project Not Found
          </h1>
          <p className="text-corporate-foreground opacity-60 font-bold mb-8">
            The project you are looking for does not exist or has been moved.
          </p>
          <Button
            asChild
            className="bg-corporate-primary hover:bg-orange-600 rounded px-8 py-6 h-auto font-bold shadow-lg shadow-orange-500/20"
          >
            <Link href="/products">Back to Portfolio</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Project Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden border-b border-black/5">
        <div className="absolute inset-0 bg-grid-white pointer-events-none opacity-40" />
        <div className="mx-auto px-6 relative z-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-corporate-foreground opacity-40 hover:opacity-100 hover:text-corporate-primary transition-all font-black uppercase tracking-widest text-[10px] mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
            Back to Portfolio
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-orange-100 text-corporate-primary border-orange-200 font-bold uppercase tracking-widest py-1.5 px-4 shadow-sm text-[10px] rounded">
                  Case Study
                </Badge>
                {project.featured && (
                  <Badge className="bg-black text-white font-bold uppercase tracking-widest py-1.5 px-4 shadow-sm text-[10px] rounded">
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-corporate-foreground mb-8 leading-tight">
                {project.title.split(" ").map((word, i, arr) => (
                  <span key={i}>
                    {word === arr[arr.length - 1] ? (
                      <span className="text-corporate-primary">{word}</span>
                    ) : (
                      word + " "
                    )}
                  </span>
                ))}
              </h1>
              <p className="text-corporate-foreground text-lg md:text-xl leading-relaxed font-bold opacity-70">
                {project.shortDescription}
              </p>
            </div>

            {project.website && (
              <Button
                asChild
                size="lg"
                className="bg-corporate-primary hover:bg-orange-600 text-white rounded px-10 py-8 text-lg font-bold shadow-xl shadow-orange-500/40 border-none transition-all hover:scale-105 group w-full lg:w-auto"
              >
                <Link
                  href={project.website}
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  Visit Project{" "}
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-24 bg-corporate-secondary">
        <div className="mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-16">
              <div className="bg-white p-10 md:p-16 rounded border border-black/5 shadow-sm">
                <h3 className="text-2xl font-black text-corporate-foreground mb-8 flex items-center gap-4 tracking-tighter">
                  <div className="w-10 h-10 rounded bg-orange-100 flex items-center justify-center text-corporate-primary">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                  Overview & Context
                </h3>
                <div className="space-y-6">
                  {project.fullDescription.map((para, i) => (
                    <p
                      key={i}
                      className="text-lg md:text-lg text-corporate-foreground opacity-60 font-medium leading-relaxed italic border-l-4 border-orange-200 pl-6"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Highlights/Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded border border-black/5 shadow-sm hover:shadow-xl transition-all">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-corporate-foreground opacity-30 font-black mb-8">
                    Key Achievements
                  </h4>
                  <ul className="space-y-6">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="mt-1.5 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-corporate-primary" />
                        </div>
                        <span className="text-lg font-black text-corporate-foreground tracking-tight leading-snug">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {project.goals && (
                  <div className="bg-black p-10 rounded shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-black mb-8 flex items-center gap-2">
                      <Target className="w-3 h-3 text-corporate-primary" />{" "}
                      Future Roadmap
                    </h4>
                    <p className="text-2xl font-black text-white tracking-widest leading-tight">
                      {project.goals}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar / Tech Stack */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white p-10 rounded border border-black/5 shadow-sm sticky top-32">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-corporate-foreground opacity-30 font-black mb-8 flex items-center gap-2">
                  <Cpu className="w-3 h-3 text-corporate-primary" /> Technology
                  Stack
                </h4>
                <div className="flex flex-wrap gap-3 mb-12">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-[11px] uppercase font-bold tracking-widest border-black/10 text-corporate-foreground py-2 px-6 bg-orange-50/50 rounded hover:bg-orange-50 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="pt-10 border-t border-black/5">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-corporate-foreground opacity-30 font-black mb-6">
                    Need Similar Scalability?
                  </h4>
                  <p className="text-sm font-bold text-corporate-foreground opacity-60 mb-8 leading-relaxed">
                    We can architect a similar ecosystem tailored to your
                    specific organizational needs.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-black/10 hover:border-corporate-primary text-corporate-foreground hover:text-corporate-primary rounded py-8 h-auto font-bold uppercase tracking-widest text-xs transition-all shadow-md hover:bg-orange-50"
                  >
                    <Link href="/contact">Start Your Project</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Showcase (Optional/Future) */}
      {/* <section className="py-24 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-corporate-foreground tracking-tighter mb-16">
            The Engineering{" "}
            <span className="text-corporate-primary">Artifacts.</span>
          </h2>
          <div className="aspect-video relative rounded-[48px] overflow-hidden border border-black/5 bg-corporate-secondary group">
            <div className="absolute inset-0 bg-grid-white opacity-40 group-hover:scale-110 transition-transform duration-[2s]" />
            <div className="absolute inset-0 flex items-center justify-center p-20">
              <div className="relative w-full h-full max-w-4xl mx-auto flex items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 rounded-3xl bg-orange-100 flex items-center justify-center text-corporate-primary mx-auto shadow-xl group-hover:rotate-12 transition-transform">
                    <Globe className="w-10 h-10" />
                  </div>
                  <p className="text-xl font-black text-corporate-foreground opacity-30 uppercase tracking-[0.5em]">
                    Scalable Infrastructure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
