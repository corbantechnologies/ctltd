import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";
import careers from "@/careers/careers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join our team at Corban Technologies LTD. Explore our open positions and help build the future of digital infrastructure in East Africa.",
};

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Careers Hero */}
      <section className="relative pt-12 pb-24 lg:pt-40 lg:pb-32 overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-grid-slate-100 pointer-events-none opacity-40 mx-auto max-w-7xl" />
        <div className="container mx-auto px-6 relative z-10 text-center lg:text-left max-w-6xl flex flex-col items-center lg:items-start">
          <span className="mb-6 inline-flex items-center rounded bg-slate-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-corporate-primary border border-slate-200 shadow-sm">
            Join Our Team
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Build the <span className="text-corporate-primary">Future.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl leading-relaxed text-center lg:text-left">
            Help us build the foundational infrastructure for modern financial operations and cloud systems. We are looking for driven individuals to join our growing team.
          </p>
        </div>
      </section>

      {/* Positions List */}
      <section className="py-20 lg:py-32 bg-slate-50 flex-grow">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="mb-12 text-center lg:text-left">
            <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">Open Positions</h2>
            <p className="text-slate-500 mt-3 text-lg">Explore our current opportunities and find your next role.</p>
          </div>
          
          <div className="flex flex-col gap-6">
            {careers.map((job) => (
              <Link 
                key={job.id} 
                href={`/careers/${job.id}`} 
                className="group block bg-white p-8 rounded shadow-sm border border-slate-200 hover:shadow-md transition-all hover:border-corporate-primary"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-corporate-primary transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
                      <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded border border-slate-100">
                        <MapPin className="w-4 h-4 text-corporate-primary" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded border border-slate-100">
                        <Briefcase className="w-4 h-4 text-corporate-primary" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-2 md:mt-0">
                    <span className="inline-flex items-center justify-center bg-slate-50 text-slate-700 px-6 py-3 rounded text-sm font-semibold border border-slate-200 group-hover:bg-corporate-primary group-hover:text-white group-hover:border-corporate-primary transition-colors">
                      View Role <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            
            {careers.length === 0 && (
              <div className="text-center py-20 bg-white border border-slate-200 rounded">
                <p className="text-slate-500 text-lg">No open positions at the moment. Please check back later!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}