import { notFound } from "next/navigation";
import careers from "@/careers/careers";
import { ArrowLeft, MapPin, Briefcase, Mail } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const career = careers.find((c) => c.id.toString() === resolvedParams.id);

  if (!career) {
    return {
      title: "Role Not Found",
    };
  }

  return {
    title: career.title,
    description: career.about.substring(0, 160) + "...",
  };
}

export function generateStaticParams() {
  return careers.map((career) => ({
    id: career.id.toString(),
  }));
}

export default async function CareerDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const career = careers.find((c) => c.id.toString() === resolvedParams.id);

  if (!career) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <section className="relative pt-12 pb-16 lg:pt-24 lg:pb-20 overflow-hidden border-b border-slate-200 bg-white">
        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <Link href="/careers" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-corporate-primary transition-colors mb-8 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full shadow-sm hover:border-corporate-primary">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Careers
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            {career.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-600 font-medium">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded border border-slate-100">
              <MapPin className="w-5 h-5 text-corporate-primary" />
              <span>{career.location}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded border border-slate-100">
              <Briefcase className="w-5 h-5 text-corporate-primary" />
              <span>{career.type}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-slate-50 flex-grow">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white rounded border border-slate-200 shadow-sm p-6 sm:p-8 md:p-12 space-y-12">

            {/* About */}
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">About the Role</h2>
              <div className="prose prose-slate max-w-none text-slate-600 space-y-4 text-lg">
                {career.about.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">{paragraph}</p>
                ))}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Compensation */}
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Compensation & Structure</h2>
              <p className="text-slate-600 mb-6 leading-relaxed text-lg">{career.compensation.structure}</p>
              <div className="space-y-6">
                {career.compensation.phases.map((phase, index) => (
                  <div key={index} className="bg-slate-50 rounded p-6 border border-slate-100">
                    <h3 className="font-semibold text-slate-900 mb-4 text-lg">{phase.name}</h3>
                    <ul className="space-y-3">
                      {phase.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-600">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-corporate-primary mt-2" />
                          <span className="leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Responsibilities */}
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Key Responsibilities</h2>
              <div className="space-y-10">
                {career.responsibilities.map((group, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-slate-900 mb-4 text-xl">{group.category}</h3>
                    <ul className="space-y-4">
                      {group.items.map((item, idx) => {
                        const [title, ...desc] = item.split(': ');
                        return (
                          <li key={idx} className="flex items-start gap-3 text-slate-600 bg-slate-50/50 p-4 rounded border border-slate-100">
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-corporate-primary mt-2" />
                            <span className="leading-relaxed">
                              {desc.length > 0 ? (
                                <>
                                  <strong className="text-slate-900 font-semibold">{title}:</strong> {desc.join(': ')}
                                </>
                              ) : (
                                item
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Requirements */}
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Who You Are</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {career.requirements.map((req, index) => (
                  <div key={index} className="bg-slate-50 p-6 rounded border border-slate-100">
                    <h3 className="font-semibold text-slate-900 mb-3 text-lg">{req.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{req.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Now */}
            <div className="bg-slate-900 text-white rounded p-6 md:p-12 text-center mt-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-corporate-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
               <div className="relative z-10">
                 <h2 className="text-2xl md:text-3xl font-semibold mb-4">Ready to Apply?</h2>
                 <p className="text-slate-300 mb-6 max-w-2xl mx-auto leading-relaxed text-lg">
                   {career.howToApply.instruction}
                 </p>
                 
                 {/* Instruction Box with clean layout and dedicated email display */}
                 <div className="text-white font-medium block bg-slate-800 p-5 sm:p-6 rounded border border-slate-700 text-left mb-8 max-w-2xl mx-auto space-y-4">
                   <p className="leading-relaxed text-slate-200 break-words">
                     Please send us a brief introduction highlighting your background in business development or sales. In your note, briefly walk us through the strategy or approach you would take to get our financial core infrastructure in front of your first three institutional clients.
                   </p>
                   <div className="pt-2 border-t border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                     <span className="text-xs uppercase tracking-wider text-slate-400">Submit via Email:</span>
                     <span className="text-corporate-primary font-mono select-all break-all text-sm sm:text-base">
                       {career.howToApply.email}
                     </span>
                   </div>
                 </div>

                 <a 
                   href={`mailto:${career.howToApply.email}?subject=Application: ${career.title}`}
                   className="inline-flex items-center justify-center bg-corporate-primary hover:bg-orange-600 text-white px-8 py-4 rounded font-semibold transition-colors shadow-lg shadow-orange-900/20 max-w-full w-full sm:w-auto"
                 >
                   <Mail className="mr-2 w-5 h-5 flex-shrink-0" />
                   <span>Email Your Application</span>
                 </a>
               </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
