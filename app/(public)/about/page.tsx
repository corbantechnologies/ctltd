import { Badge } from "@/components/ui/badge";
import { Users, History, Building2, Globe, CheckCircle2 } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Founded", value: "2025", icon: History },
    { label: "Active Clients", value: "50+", icon: Users },
    { label: "Live SACCOs", value: "3+", icon: Building2 },
    { label: "Kenyan Built", value: "100%", icon: Globe },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* About Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-black/5">
        <div className="absolute inset-0 bg-grid-white pointer-events-none opacity-40" />
        <div className="mx-auto px-6 relative z-10 text-center lg:text-left">
          <Badge className="mb-4 bg-orange-100 rounded text-corporate-primary border-orange-200 font-bold uppercase tracking-widest py-2 px-6 shadow-sm">
            Our Mission
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-black mb-8 leading-tight">
            Engineering the{" "}
            <span className="text-corporate-primary">Future.</span>
          </h1>
          <p className="text-black text-lg md:text-xl max-w-3xl leading-relaxed font-bold opacity-70">
            Founded and built in Nairobi, we&apos;re a team of Kenyan software
            engineers obsessed with solving real financial problems using
            world-class technology.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-corporate-secondary">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter leading-tight">
              Local Insight,{" "}
              <span className="text-corporate-primary">Global Standards.</span>
            </h2>
            <p className="text-lg md:text-xl text-black font-bold opacity-60 leading-relaxed">
              From rural SACCOs to fast-growing SMEs — we deliver secure,
              scalable systems that work reliably even in low-bandwidth
              environments across East Africa.
            </p>
            <ul className="space-y-6">
              {[
                "Deep understanding of Kenyan financial compliance",
                "Scalable infrastructure designed for local connectivity",
                "Customer-first engineering philosophy",
                "Security as a core pillar of every deployment",
              ].map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded bg-orange-100 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-corporate-primary" />
                  </div>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-orange-100/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-white border border-black/5 p-12 rounded shadow-xl">
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="space-y-3">
                    <div className="w-12 h-12 rounded bg-orange-50 flex items-center justify-center text-corporate-primary shadow-sm">
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-black">
                        {stat.value}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest font-black text-black/40">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
