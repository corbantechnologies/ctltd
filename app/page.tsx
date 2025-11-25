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
            FinTech for East Africa
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-5xl mx-auto leading-tight">
            Digital Infrastructure for East Africa’s Financial Future
          </h1>
          <p className="mt-8 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            We engineer secure, compliant FinTech platforms that power SACCOs,
            microfinance institutions, and growing enterprises across Kenya and
            beyond.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-lg px-8"
            >
              <Link href="/sacco-platform">Explore SACCO Platform</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-slate-600 hover:bg-slate-800 text-lg px-8"
            >
              <Link href="/services">View All Services</Link>
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
