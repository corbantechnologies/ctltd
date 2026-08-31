"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      type: "contact",
      userName: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      productInterest: formData.get("productInterest"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Submission failed. Check your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Contact Hero */}
      <section className="relative pt-16 pb-14 border-b border-slate-200 bg-white">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary">
              <Mail className="w-3.5 h-3.5" />
              Client Onboarding &amp; Inquiries
            </span>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 leading-snug">
              Start Your Platform Onboarding With Corban Technologies
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              Whether you are a cooperative SACCO looking to deploy core banking, a retailer seeking a reliable POS, or an enterprise needing dedicated cloud hosting — our engineering team is ready to scope and deploy your solution.
            </p>
          </div>
        </div>
      </section>

      {/* Form & Info Section */}
      <section className="py-14 bg-slate-50 flex-grow">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded bg-white border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Direct Corporate Office
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Headquartered in Mombasa, Kenya. Serving East Africa.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-slate-50 border border-slate-200 text-corporate-primary shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Corporate Email</p>
                      <p className="text-slate-600 mt-0.5">info@corbantechnologies.org</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-slate-50 border border-slate-200 text-corporate-primary shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Phone / WhatsApp</p>
                      <p className="text-slate-600 mt-0.5">+254 768 978 865</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-slate-50 border border-slate-200 text-corporate-primary shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Office Location</p>
                      <p className="text-slate-600 mt-0.5">Mombasa, Kenya</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="p-2 rounded bg-slate-100 border border-slate-200 text-corporate-primary">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Fast Response Guarantee</p>
                    <p className="text-[11px] text-slate-500">Replies within 1 business day</p>
                  </div>
                </div>
              </div>

              {/* Verified Trust Card */}
              <div className="p-6 rounded bg-slate-900 text-white space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-corporate-primary" />
                  <p className="text-xs font-semibold text-white">Full Regulatory &amp; SLA Backing</p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All deployments are covered by data isolation guarantees, KRA/SASRA compliance support, and 99.9% cloud uptime SLAs.
                </p>
              </div>
            </div>

            {/* Ingestion / Scoping Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded bg-white border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Schedule Technical Scoping &amp; Demo
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tell us about your organization and which platform you want to deploy.
                  </p>
                </div>

                {success && (
                  <div className="p-3.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Thank you! Your request has been received. Our team will contact you within 24 hours.</span>
                  </div>
                )}

                {error && (
                  <div className="p-3.5 rounded bg-red-50 border border-red-200 text-red-800 text-xs">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field */}
                  <input
                    name="website_url"
                    className="hidden absolute opacity-0 w-0 h-0 p-0 m-0 -z-50"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-xs font-semibold text-slate-700 block">
                        Full Name / Contact Person *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="e.g. John Kamau"
                        className="w-full h-10 px-3 rounded border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-corporate-primary text-xs text-slate-900"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="email" className="text-xs font-semibold text-slate-700 block">
                        Official Work Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="e.g. john@sacco.co.ke"
                        className="w-full h-10 px-3 rounded border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-corporate-primary text-xs text-slate-900"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="phone" className="text-xs font-semibold text-slate-700 block">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="e.g. 0768978865"
                        className="w-full h-10 px-3 rounded border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-corporate-primary text-xs text-slate-900"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="productInterest" className="text-xs font-semibold text-slate-700 block">
                        Platform of Interest *
                      </label>
                      <select
                        id="productInterest"
                        name="productInterest"
                        className="w-full h-10 px-3 rounded border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-corporate-primary text-xs text-slate-900"
                        required
                      >
                        <option value="sacco">1. SACCO Core Banking Platform (Wananchi Mali)</option>
                        <option value="finance">2. Finance Intelligence &amp; SME Bookkeeping (FedhaHub / MannaBooks)</option>
                        <option value="retail">3. Omnichannel Commerce &amp; POS (GearHouse)</option>
                        <option value="marketing">4. Marketing CRM &amp; Telecom Suite (LJK)</option>
                        <option value="logistics">5. Freight &amp; Fleet Logistics OS (CT Logistics)</option>
                        <option value="events">6. Digital Event Ticketing &amp; Passes (Sherehe Tickets)</option>
                        <option value="cloud-hosting">Dedicated Cloud Hosting &amp; Custom Architecture</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="text-xs font-semibold text-slate-700 block">
                      Project Requirements &amp; Timeline *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Describe your current setup, number of members/users, timeline, and any specific custom requirements..."
                      className="w-full p-3 rounded border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-corporate-primary text-xs text-slate-900 resize-y"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold py-2.5 rounded transition-colors shadow-sm inline-flex items-center justify-center gap-1.5 disabled:opacity-70"
                  >
                    {loading ? "Transmitting Scoping Request..." : "Submit Scoping Request"} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
