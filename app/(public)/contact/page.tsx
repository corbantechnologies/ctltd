"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, Clock, ArrowRight } from "lucide-react";

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
          errorData.message || "Something went wrong. Please try again.",
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Submission failed. Check your connection.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Contact Hero */}
      <section className="relative pt-12 pb-24 lg:pt-40 lg:pb-32 overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-grid-slate-100 pointer-events-none opacity-40 mx-auto max-w-7xl" />
        <div className="container mx-auto px-6 relative z-10 text-center lg:text-left max-w-6xl flex flex-col items-center lg:items-start">
          <span className="mb-6 inline-flex items-center rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-corporate-primary border border-slate-200 shadow-sm">
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Let&apos;s <span className="text-corporate-primary">Connect.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl leading-relaxed text-center lg:text-left">
            Have a project in mind or need technical consultation? Our experts
            are ready to help you scale.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-slate-50 flex-grow">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Reach Out Directly
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-corporate-primary shadow-sm group-hover:border-corporate-primary/30 transition-all">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
                        Email Us
                      </p>
                      <p className="text-lg font-medium text-slate-900">
                        info@corbantechnologies.org
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-corporate-primary shadow-sm group-hover:border-corporate-primary/30 transition-all">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
                        Call Anywhere
                      </p>
                      <p className="text-lg font-medium text-slate-900">
                        +254 710 584 581
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-corporate-primary shadow-sm group-hover:border-corporate-primary/30 transition-all">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
                        Visit Hub
                      </p>
                      <p className="text-lg font-medium text-slate-900">
                        Mombasa, Kenya
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-900 rounded-2xl shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-corporate-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10 flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-corporate-primary/20 border border-corporate-primary/30 flex items-center justify-center text-corporate-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">
                      1 Hour Reply
                    </p>
                    <p className="text-slate-400 text-xs font-medium">
                      Within Business Hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-sm">
                {success && (
                  <div className="mb-8 bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 flex items-center gap-3">
                    <Send className="w-5 h-5" />
                    <span className="font-medium text-sm">Thanks! Your message has been sent. We&apos;ll reply within 24 hours.</span>
                  </div>
                )}
                {error && (
                  <div className="mb-8 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 flex items-center gap-3">
                    <span className="font-medium text-sm">{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field - hidden from users */}
                  <input
                    name="website_url"
                    className="hidden absolute opacity-0 w-0 h-0 p-0 m-0 -z-50"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-semibold text-slate-700 ml-1 block"
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        className="w-full h-12 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-corporate-primary/20 focus:border-corporate-primary transition-all px-4 font-medium text-slate-900"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold text-slate-700 ml-1 block"
                      >
                        Work Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        className="w-full h-12 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-corporate-primary/20 focus:border-corporate-primary transition-all px-4 font-medium text-slate-900"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-semibold text-slate-700 ml-1 block"
                    >
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about your technical requirements..."
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-corporate-primary/20 focus:border-corporate-primary transition-all p-4 font-medium min-h-[160px] resize-y text-slate-900"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-corporate-primary hover:bg-orange-600 text-white font-medium py-3.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 group/btn disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    disabled={loading}
                  >
                    {loading ? (
                      "Transmitting..."
                    ) : (
                      <>
                        Send Message{" "}
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
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
