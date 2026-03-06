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
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-grid-slate-100 pointer-events-none opacity-40 mx-auto max-w-7xl" />
        <div className="container mx-auto px-6 relative z-10 text-center lg:text-left max-w-6xl flex flex-col items-center lg:items-start">
          <span className="mb-6 inline-flex items-center rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-corporate-primary border border-slate-200 shadow-sm">
            Our Mission
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Engineering the{" "}
            <span className="text-corporate-primary">Future.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl leading-relaxed text-center lg:text-left">
            Founded in Mombasa, Corban Technologies LTD is an East African company dedicated to driving digital transformation for small and medium-sized enterprises. Our top-tier engineers build reliable, efficient, and future-proof systems, allowing you to focus entirely on your core business operations.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 lg:py-32 bg-slate-50 flex-grow">
        <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Local Insight,{" "}
              <span className="text-corporate-primary block sm:inline mt-2 sm:mt-0">Global Standards.</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              From rural SACCOs to fast-growing SMEs — we deliver secure,
              scalable systems that work reliably even in low-bandwidth
              environments across East Africa.
            </p>
            <ul className="space-y-6 text-left max-w-lg mx-auto lg:mx-0">
              {[
                "Deep understanding of Kenyan financial compliance",
                "Scalable infrastructure designed for local connectivity",
                "Customer-first engineering philosophy",
                "Security as a core pillar of every deployment",
              ].map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mt-1">
                    <CheckCircle2 className="w-5 h-5 text-corporate-primary" />
                  </div>
                  <span className="text-lg text-slate-700 font-medium leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative group w-full max-w-md mx-auto lg:max-w-none">
            <div className="relative bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50">
              <div className="grid grid-cols-2 gap-8 sm:gap-10">
                {stats.map((stat) => (
                  <div key={stat.label} className="space-y-4 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-corporate-primary shadow-sm border border-slate-100">
                      <stat.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs uppercase tracking-widest font-bold text-slate-400">
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
