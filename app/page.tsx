import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Banknote, Globe, Cloud, Shield, Network, Brain } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: <Banknote className="w-10 h-10 text-teal-500" />,
    title: "SACCO SaaS Platform",
    desc: "End-to-end digital core for Kenyan SACCOs – member management, loans, dividends, CBK reporting, mobile + USSD.",
  },
  {
    icon: <Globe className="w-10 h-10 text-teal-500" />,
    title: "Web & Mobile Development",
    desc: "Next.js, React Native, and Flutter solutions that perform flawlessly on every device.",
  },
  {
    icon: <Cloud className="w-10 h-10 text-teal-500" />,
    title: "Cloud Platforms",
    desc: "AWS, Azure & private cloud deployment, migration, and 24/7 managed operations.",
  },
  {
    icon: <Shield className="w-10 h-10 text-teal-500" />,
    title: "Cybersecurity & Compliance",
    desc: "Penetration testing, ISO 27001 alignment, real-time monitoring, and incident response.",
  },
  {
    icon: <Network className="w-10 h-10 text-teal-500" />,
    title: "IoT & Enterprise Networking",
    desc: "CCTV systems, structured cabling, secure Wi-Fi, and private LTE deployments.",
  },
  {
    icon: <Brain className="w-10 h-10 text-teal-500" />,
    title: "AI & Data Intelligence",
    desc: "Credit scoring models, fraud detection, predictive analytics, and automation agents.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 pt-20">
          <Badge className="mb-6 bg-teal-900/50 text-teal-300 border-teal-800">
            Technology Partner • Mombasa, Kenya
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-6xl mx-auto leading-tight">
            Building Tomorrow’s Businesses with Secure, Intelligent Technology
          </h1>
          <p className="mt-8 text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            From cloud infrastructure and CCTV systems to AI-powered analytics
            and East Africa’s leading SACCO platform — we deliver end-to-end
            digital solutions that grow with you.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-lg px-10"
            >
              <Link href="/sacco-platform">Explore SACCO Platform →</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-slate-600 hover:bg-slate-800 text-lg px-10"
            >
              <Link href="/services">See All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="bg-slate-900/50 border-y border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {["50+", "7", "99.9%", "24/7"].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-bold text-teal-500">{stat}</p>
              <p className="text-slate-400 mt-2">
                {i === 0
                  ? "Clients"
                  : i === 1
                  ? "Live SACCOs"
                  : i === 2
                  ? "Uptime"
                  : "Kenyan Support"}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Flagship Product</Badge>
              <h2 className="text-4xl font-bold mb-6">
                Kenya’s Leading SACCO Management Platform
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Trusted by growing SACCOs to manage members, loans, dividends,
                and CBK compliance — all in one secure system.
              </p>
              <Button asChild>
                <Link href="/sacco-platform">Learn More →</Link>
              </Button>
            </div>
            <div className="bg-gray-300 border-2 border-dashed rounded-xl w-full h-96" />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-20">
            Our Capabilities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <Card
                key={s.title}
                className="bg-slate-900/50 border-slate-800 hover:border-teal-800 transition-all duration-300 hover:-translate-y-2"
              >
                <CardHeader>
                  {s.icon}
                  <CardTitle className="text-xl mt-4">{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
