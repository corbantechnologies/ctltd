import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, Globe, Cloud, Shield, Network, Brain } from "lucide-react";

const allServices = [
  {
    icon: <Banknote className="w-12 h-12" />,
    title: "SACCO SaaS Platform",
    desc: "Complete digital transformation for Kenyan SACCOs.",
    link: "/sacco-platform",
  },
  {
    icon: <Globe className="w-12 h-12" />,
    title: "Web & Mobile Development",
    desc: "Next.js, React Native, Flutter — pixel-perfect, high-performance apps.",
  },
  {
    icon: <Cloud className="w-12 h-12" />,
    title: "Cloud Platforms",
    desc: "AWS, Azure, private cloud — migration, scaling, 24/7 management.",
  },
  {
    icon: <Shield className="w-12 h-12" />,
    title: "Cybersecurity",
    desc: "Penetration testing, compliance, monitoring, incident response.",
  },
  {
    icon: <Network className="w-12 h-12" />,
    title: "IoT & Networking",
    desc: "CCTV, structured cabling, enterprise Wi-Fi, private LTE.",
  },
  {
    icon: <Brain className="w-12 h-12" />,
    title: "AI & Data Intelligence",
    desc: "Credit scoring, fraud detection, predictive analytics.",
  },
];

export default function Services() {
  return (
    <section className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold">Our Services</h1>
          <p className="mt-6 text-xl text-slate-300 max-w-3xl mx-auto">
            End-to-end technology solutions built for East African businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allServices.map((service) => (
            <Card
              key={service.title}
              className="bg-slate-900/50 border-slate-800 hover:border-teal-800 transition-all hover:-translate-y-3"
            >
              <CardHeader>
                <div className="text-teal-500">{service.icon}</div>
                <CardTitle className="text-2xl mt-6">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">{service.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
