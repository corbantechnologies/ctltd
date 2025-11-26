import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, Globe, Cloud, Shield, Network, Brain } from "lucide-react";

const allServices = [
  {
    icon: <Banknote className="w-10 h-10 text-teal-500" />,
    title: "SACCO Management Platform",
    desc: "Kenya’s most trusted digital core for SACCOs — member management, loans, CBK reporting, mobile + USSD.",
    featured: true,
  },
  {
    icon: <Globe className="w-10 h-10 text-teal-500" />,
    title: "Web & Mobile Development",
    desc: "Modern websites, PWAs, native iOS/Android apps built for performance and scale.",
  },
  {
    icon: <Cloud className="w-10 h-10 text-teal-500" />,
    title: "Cloud Platform Solutions",
    desc: "Migration, hosting, dedicated segments, 24/7 management — AWS, Azure, private cloud.",
  },
  {
    icon: <Network className="w-10 h-10 text-teal-500" />,
    title: "IoT & Networking",
    desc: "CCTV systems, structured cabling, enterprise Wi-Fi, smart IoT deployments across Kenya.",
  },
  {
    icon: <Shield className="w-10 h-10 text-teal-500" />,
    title: "Cybersecurity",
    desc: "Threat assessments, monitoring, penetration testing, compliance & training.",
  },
  {
    icon: <Brain className="w-10 h-10 text-teal-500" />,
    title: "AI & Machine Learning",
    desc: "Predictive models, automation agents, data analytics, computer vision.",
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
