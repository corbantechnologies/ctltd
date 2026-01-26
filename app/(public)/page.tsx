import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  ShieldCheck,
  Zap,
  ChevronRight,
  CheckCircle2,
  Globe,
  Database,
  Cloud,
  Network,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12">
        <div className="absolute inset-0 bg-grid-white opacity-40" />

        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-100/30 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-50/30 blur-[100px]" />

        <div className="mx-auto px-6 relative z-10 text-center">
          <Badge className="mb-6 bg-orange-100 text-corporate-primary border-orange-200 font-bold uppercase tracking-widest py-2 px-4 shadow-sm rounded-none">
            Mombasa&apos;s Leading Tech Partner
          </Badge>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black mb-8 leading-tight max-w-4xl mx-auto">
            Innovating <span className="text-corporate-primary">Secure</span> &
            Scalable Solutions.
          </h1>

          <p className="text-lg md:text-xl text-black font-medium max-w-2xl mx-auto mb-12 leading-relaxed opacity-80">
            From digital core banking for SACCOs to enterprise cloud
            infrastructure, we build the technology that drives East Africa
            forward.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              asChild
              size="lg"
              className="bg-corporate-primary hover:bg-orange-600 text-white rounded-none px-8 py-6 text-base font-bold shadow-xl shadow-orange-500/20 border-none transition-all hover:scale-105 active:scale-95 group"
            >
              <Link href="/contact" className="flex items-center gap-2">
                Launch Your Project{" "}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-black/10 text-black font-bold rounded-none px-8 py-6 text-base hover:bg-orange-50 hover:border-corporate-primary transition-all"
            >
              <Link href="/products">View Our Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust & Performance Metrics */}
      <section className="py-16 bg-corporate-secondary border-y border-black/5">
        <div className="mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { label: "Active SACCOs", value: "50+" },
              { label: "Daily Transactions", value: "$2M+" },
              { label: "Project Success", value: "99.9%" },
              { label: "Client Retention", value: "100%" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-2 group">
                <div className="text-3xl md:text-4xl font-bold text-black group-hover:text-corporate-primary transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-black/40">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Product Showcase */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-corporate-primary/10 to-orange-100/10 blur-xl group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-orange-50/50 border border-orange-100 rounded-none p-8 overflow-hidden shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-none bg-corporate-primary flex items-center justify-center text-white shadow-lg">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-black tracking-tight">
                  Digital CORE Sacco
                </h3>
              </div>
              <div className="aspect-[4/3] relative rounded-none overflow-hidden border border-black/5 bg-white shadow-sm">
                {/* Mockup Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/mmsacco.png"
                    alt="Sacco Dashboard"
                    width={300}
                    height={80}
                  // className="opacity-20 grayscale brightness-0"
                  />
                </div>
              </div>
            </div>

            {/* Floating Info Tag */}
            <div className="absolute -bottom-6 -right-6 glass border-black/5 p-6 rounded-none shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-none bg-orange-500/10 flex items-center justify-center text-corporate-primary">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="text-sm font-black text-black">
                    CBK Compliant
                  </div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-black/40">
                    Ready to Deploy
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Badge
              variant="outline"
              className="border-corporate-primary/30 text-corporate-primary font-bold px-4 py-1.5 rounded-none uppercase tracking-widest text-[10px]"
            >
              Flagship Solution
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black text-black leading-tight tracking-tighter">
              The Complete Digital Ecosystem for{" "}
              <span className="text-corporate-primary">Modern SACCOs.</span>
            </h2>
            <p className="text-xl text-black font-extrabold opacity-70 leading-relaxed">
              Our cloud-native platform automates member onboarding, loan
              processing, and regulatory reporting, allowing your institution to
              scale without limits.
            </p>
            <ul className="space-y-6">
              {[
                "End-to-end Mobile & USSD Banking integration",
                "Automated CBK & SASRA reporting modules",
                "Deep-analytical Dividend calculation engine",
                "Bank-grade Security with role-based access",
              ].map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <div className="mt-1.5 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-corporate-primary" />
                  </div>
                  <span className="text-lg font-black text-black">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services/Capabilities Grid */}
      <section className="py-20 bg-orange-50/30">
        <div className="mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
              Versatile Expertise.
            </h2>
            <p className="text-lg text-black font-extrabold opacity-60">
              We combine technical depth with regional insight to deliver
              impactful results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Web & Enterprise Dev",
                desc: "Custom dashboards and customer-facing portals built with Next.js and high-performance APIs.",
              },
              {
                icon: Database,
                title: "Fintech Platform Dev",
                desc: "Banking-grade transaction engines and financial ledger systems for modern economies.",
              },
              {
                icon: ShieldCheck,
                title: "Cloud Security",
                desc: "Hardened infrastructure and real-time monitoring to protect your organization's data assets.",
              },
              {
                icon: Cloud,
                title: "Managed Infrastructure",
                desc: "Scalable VPC environments and serverless architectures optimized for East African connectivity.",
              },
              {
                icon: Network,
                title: "IoT & Smart Systems",
                desc: "Embedded solutions for real-time asset tracking and industrial automation.",
              },
              {
                icon: Zap,
                title: "Performance Audit",
                desc: "System-wide optimization to ensure your digital tools are lightning fast and cost-effective.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white p-8 rounded-none border border-black/5 hover:border-corporate-primary/30 transition-all group shadow-sm hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-none bg-orange-100 flex items-center justify-center text-corporate-primary mb-6 group-hover:bg-corporate-primary group-hover:text-white transition-all shadow-sm">
                  <service.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-black text-black mb-4 tracking-tight">
                  {service.title}
                </h4>
                <p className="text-black font-bold opacity-60 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-black rounded-none p-12 md:p-16 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-none blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 space-y-10">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter max-w-4xl mx-auto">
              Ready to{" "}
              <span className="text-corporate-primary">Future-Proof</span> Your
              Business?
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto font-bold uppercase tracking-widest">
              Join dozens of financial institutions and enterprises already
              leveraging Corban platforms.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                asChild
                size="lg"
                className="bg-corporate-primary hover:bg-orange-600 text-white rounded-none px-10 py-6 text-lg font-bold shadow-xl shadow-orange-500/20 w-full sm:w-auto"
              >
                <Link href="/contact">Get Started Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/10 text-white hover:bg-white/5 font-bold px-10 py-6 text-lg rounded-none w-full sm:w-auto"
              >
                <Link href="/services">Our Solutions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
