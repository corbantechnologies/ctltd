import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Banknote,
  Globe,
  Cloud,
  Shield,
  Network,
  Brain,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

const allServices = [
  {
    icon: Banknote,
    title: "SACCO Management Platform",
    desc: "Kenya’s most trusted digital core for SACCOs — member management, loans, CBK reporting, mobile + USSD.",
    featured: true,
    highlights: [
      "CBK & SASRA Compliant",
      "M-PESA Integration",
      "Automated Dividends",
    ],
  },
  {
    icon: Globe,
    title: "Web & Mobile Development",
    desc: "Modern websites, PWAs, native iOS/Android apps built for performance and scale.",
    highlights: [
      "Next.js & React Native",
      "High-Performance APIs",
      "SEO Optimized",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Platform Solutions",
    desc: "Migration, hosting, dedicated segments, 24/7 management — AWS, Azure, private cloud.",
    highlights: [
      "24/7 Monitoring",
      "Disaster Recovery",
      "Zero-Downtime Migration",
    ],
  },
  {
    icon: Network,
    title: "IoT & Networking",
    desc: "CCTV systems, structured cabling, enterprise Wi-Fi, smart IoT deployments across Kenya.",
    highlights: [
      "Smart Automation",
      "Enterprise Mesh Wi-Fi",
      "Remote Monitoring",
    ],
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    desc: "Threat assessments, monitoring, penetration testing, compliance & training.",
    highlights: [
      "ISO 27001 Alignment",
      "Vulnerability Audits",
      "Staff Training",
    ],
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    desc: "Predictive models, automation agents, data analytics, computer vision.",
    highlights: [
      "Predictive Analytics",
      "Process Automation",
      "Custom AI Models",
    ],
  },
];

export default function Services() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Services Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-black/5">
        <div className="absolute inset-0 bg-grid-white pointer-events-none opacity-40" />
        <div className="mx-auto px-6 relative z-10 text-center lg:text-left">
          <Badge className="mb-4 bg-orange-100 text-corporate-primary border-orange-200 font-bold uppercase tracking-widest py-2 px-6 shadow-sm rounded-none">
            Expertise
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-corporate-foreground mb-8 leading-tight">
            Our <span className="text-corporate-primary">Services.</span>
          </h1>
          <p className="text-corporate-foreground text-lg md:text-xl max-w-2xl leading-relaxed font-bold opacity-70">
            End-to-end technology solutions built for East African businesses,
            from startups to large financial institutions.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-corporate-secondary">
        <div className="mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {allServices.map((service) => (
              <Card
                key={service.title}
                className="bg-white border-black/5 hover:border-corporate-primary/30 transition-all group shadow-sm hover:shadow-xl rounded-none overflow-hidden"
              >
                <CardHeader className="p-10 pb-0">
                  <div className="w-16 h-16 rounded-none bg-orange-100 flex items-center justify-center text-corporate-primary mb-8 group-hover:bg-corporate-primary group-hover:text-white transition-all shadow-sm">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl font-black text-corporate-foreground tracking-tight mb-4">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-0">
                  <p className="text-corporate-foreground font-bold opacity-60 leading-relaxed mb-8">
                    {service.desc}
                  </p>

                  <ul className="space-y-4 mb-10">
                    {service.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-corporate-primary" />
                        <span className="text-sm font-black text-corporate-foreground opacity-80">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-black/10 hover:border-corporate-primary text-corporate-foreground hover:text-corporate-primary group/btn rounded-none py-6 h-auto transition-all font-bold shadow-md hover:bg-orange-50 uppercase tracking-widest text-[10px]"
                  >
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-2"
                    >
                      Inquire Now{" "}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto bg-black rounded-none p-12 md:p-24 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-none blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 space-y-10">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter max-w-4xl mx-auto">
              Ready to <span className="text-corporate-primary">Scale</span>{" "}
              Your Operations?
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto font-bold uppercase tracking-widest">
              Let&apos;s build the infrastructure that powers your next phase of
              growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                asChild
                size="lg"
                className="bg-corporate-primary hover:bg-orange-600 text-white rounded-none px-12 py-8 text-lg font-bold shadow-xl shadow-orange-500/20 w-full sm:w-auto"
              >
                <Link href="/contact">Book a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
