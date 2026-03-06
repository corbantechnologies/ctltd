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
      <section className="relative pt-10 pb-24 overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-grid-slate-100 pointer-events-none opacity-40" />
        <div className="mx-auto px-6 relative z-10 text-center lg:text-left max-w-6xl">
          <span className="mb-4 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-corporate-primary border border-slate-200 shadow-sm">
            Our Mission
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">
            Engineering the{" "}
            <span className="text-corporate-primary">Future.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-3xl leading-relaxed">
            Founded in Mombasa, Corban Technologies LTD is an East African company dedicated to driving digital transformation for small and medium-sized enterprises. Our top-tier engineers build reliable, efficient, and future-proof systems, allowing you to focus entirely on your core business operations.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-slate-50 flex-grow">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              Local Insight,{" "}
              <span className="text-corporate-primary">Global Standards.</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
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
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-corporate-primary" />
                  </div>
                  <span className="text-lg text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative group">
            <div className="relative bg-white border border-slate-200 p-10 rounded-2xl shadow-sm">
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-corporate-primary shadow-sm border border-slate-100">
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-slate-900">
                        {stat.value}
                      </div>
                      <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 mt-1">
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
