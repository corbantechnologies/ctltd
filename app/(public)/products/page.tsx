import { projects } from "@/products/projects";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  CheckCircle2,
  Cpu,
  Globe,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Products() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Products Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-black/5">
        <div className="absolute inset-0 bg-grid-white pointer-events-none opacity-40" />
        <div className="mx-auto px-6 relative z-10 text-center lg:text-left">
          <Badge className="mb-4 bg-orange-100 text-corporate-primary border-orange-200 font-bold uppercase tracking-widest py-2 px-6 shadow-sm rounded">
            Portfolio
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-black mb-8 leading-tight">
            Products &{" "}
            <span className="text-corporate-primary">Innovations.</span>
          </h1>
          <p className="text-black text-lg md:text-xl max-w-2xl leading-relaxed font-bold opacity-70">
            Discover the digital ecosystems we have built to transform financial
            services, ticketing, and transportation across East Africa.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-corporate-secondary">
        <div className="mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {projects.map((project) => (
              <Card
                key={project.slug}
                className="bg-white border-black/5 overflow-hidden group hover:border-corporate-primary transition-all duration-500 shadow-xl hover:shadow-[0_20px_40px_-15px_rgba(255,165,0,0.2)] relative rounded"
              >
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-orange-500/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  {/* Placeholder for project image */}
                  <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                    <Image
                      src={project.imagePlaceholder}
                      alt={project.title}
                      width={800}
                      height={450}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0 contrast-125"
                    />
                  </div>
                  {project.featured && (
                    <Badge className="absolute top-6 right-6 z-20 bg-corporate-primary text-white font-bold shadow-xl py-2.5 px-6 rounded border-none uppercase tracking-widest text-[10px]">
                      Featured Solution
                    </Badge>
                  )}
                </div>

                <CardHeader className="pt-10 px-10">
                  <div className="flex justify-between items-start mb-6">
                    <CardTitle className="text-3xl md:text-4xl text-black group-hover:text-corporate-primary transition-colors tracking-tighter">
                      {project.title}
                    </CardTitle>
                    {project.website && (
                      <Link
                        href={project.website}
                        target="_blank"
                        className="p-3.5 rounded bg-black/5 border border-black/5 hover:bg-corporate-primary hover:text-white hover:border-corporate-primary transition-all shadow-md group/social"
                      >
                        <ExternalLink className="w-5 h-5 group-hover/social:scale-110 transition-transform" />
                      </Link>
                    )}
                  </div>
                  <p className="text-black text-base md:text-lg leading-relaxed mb-8 italic opacity-60">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-10">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-[10px] uppercase font-semibold tracking-widest border-black/10 text-black/70 py-1.5 px-4 bg-black/[0.02]"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="px-10 pb-10 flex-grow">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-black font-semibold mb-6 flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-corporate-primary" />{" "}
                    Key highlights
                  </h4>
                  <ul className="space-y-5">
                    {project.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="text-base text-black font-semibold leading-snug flex items-start gap-4"
                      >
                        <span className="w-2 h-2 rounded-full bg-corporate-primary mt-2 shrink-0 shadow-sm" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="px-10 pb-10 pt-0">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-black/10 hover:border-corporate-primary text-black hover:text-corporate-primary group/btn rounded py-8 h-auto transition-all font-bold shadow-lg hover:bg-orange-50 uppercase tracking-widest text-xs"
                  >
                    <Link
                      href={`/products/${project.slug}`}
                      className="flex items-center justify-center gap-3"
                    >
                      View Technical Case Study{" "}
                      <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-40 relative overflow-hidden bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="w-20 h-20 rounded bg-orange-100 flex items-center justify-center mx-auto mb-12 group shadow-xl">
            <Cpu className="w-10 h-10 text-corporate-primary animate-pulse group-hover:scale-110 transition-transform" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-10 text-black leading-tight tracking-tighter">
            Building scalable digital infrastructure for the next billion users.
          </h2>
          <p className="text-lg md:text-xl text-black leading-relaxed mb-16 font-bold opacity-60">
            Our roadmap includes expanding our SACCO platform into a full
            fintech ecosystem and launching dedicated divisions for AI Research
            and Green Energy IoT.
          </p>
          <div className="flex justify-center flex-wrap gap-12 font-black">
            <div className="flex items-center gap-3 text-black/30 group cursor-default">
              <Globe className="w-6 h-6 group-hover:text-corporate-primary transition-colors" />
              <span className="text-sm tracking-[0.3em] uppercase">
                MOMBASA LABS
              </span>
            </div>
            <div className="flex items-center gap-3 text-black/30 group cursor-default">
              <ArrowRight className="w-6 h-6 group-hover:text-corporate-primary transition-colors" />
              <span className="text-sm tracking-[0.3em] uppercase">
                NAIROBI HUB
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
