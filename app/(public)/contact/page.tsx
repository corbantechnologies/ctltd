"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-black/5">
        <div className="absolute inset-0 bg-grid-white pointer-events-none opacity-40" />
        <div className="mx-auto px-6 relative z-10 text-center lg:text-left">
          <Badge className="mb-4 bg-orange-100 text-corporate-primary border-orange-200 font-bold uppercase tracking-widest py-2 px-6 shadow-sm rounded">
            Contact Us
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-black mb-8 leading-tight">
            Let&apos;s <span className="text-corporate-primary">Connect.</span>
          </h1>
          <p className="text-black text-lg md:text-xl max-w-2xl leading-relaxed font-bold opacity-70">
            Have a project in mind or need technical consultation? Our experts
            are ready to help you scale.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-corporate-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-8">
                <h2 className="text-3xl font-semibold tracking-tighter">
                  Reach Out Directly
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded bg-white border border-black/5 flex items-center justify-center text-corporate-primary shadow-sm group-hover:bg-corporate-primary group-hover:text-white transition-all">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-black text-black/60 mb-1">
                        Email Us
                      </p>
                      <p className="text-lg">
                        info@corbantechnologies.org
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded bg-white border border-black/5 flex items-center justify-center text-corporate-primary shadow-sm group-hover:bg-corporate-primary group-hover:text-white transition-all">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-black text-black/60 mb-1">
                        Call Anywhere
                      </p>
                      <p className="text-lg">
                        +254 710 584 581
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded bg-white border border-black/5 flex items-center justify-center text-corporate-primary shadow-sm group-hover:bg-corporate-primary group-hover:text-white transition-all">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-black text-black/60 mb-1">
                        Visit Hub
                      </p>
                      <p className="text-lg">
                        Mombasa, Kenya
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-black rounded shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded blur-3xl" />
                <div className="relative z-10 flex items-center gap-6">
                  <div className="w-14 h-14 rounded bg-corporate-primary flex items-center justify-center text-white">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-white font-black text-xl">
                      1 Hour Reply
                    </p>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-black">
                      Within Business Hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-10 md:p-12 rounded border border-black/5 shadow-2xl">
                {success && (
                  <Alert className="mb-8 bg-green-50 border-green-100 text-green-700 rounded p-6">
                    <AlertDescription className="font-bold flex items-center gap-3">
                      <Send className="w-5 h-5" /> Thanks! Your message has been
                      sent. We&apos;ll reply within 24 hours.
                    </AlertDescription>
                  </Alert>
                )}
                {error && (
                  <Alert variant="destructive" className="mb-8 rounded p-6">
                    <AlertDescription className="font-bold">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Honeypot field - hidden from users */}
                  <Input
                    name="website_url"
                    className="hidden absolute opacity-0 w-0 h-0 p-0 m-0 -z-50"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label
                        htmlFor="name"
                        className="text-[10px] uppercase tracking-widest font-black text-black/40 ml-1"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        className="h-14 rounded border-black/5 bg-corporate-secondary focus-visible:ring-corporate-primary font-bold px-6"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label
                        htmlFor="email"
                        className="text-[10px] uppercase tracking-widest font-black text-black/40 ml-1"
                      >
                        Work Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        className="h-14 rounded border-black/5 bg-corporate-secondary focus-visible:ring-corporate-primary font-bold px-6"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="message"
                      className="text-[10px] uppercase tracking-widest font-black text-black/40 ml-1"
                    >
                      Project Details
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about your technical requirements..."
                      className="rounded border-black/5 bg-corporate-secondary focus-visible:ring-corporate-primary font-bold p-6 min-h-[160px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-corporate-primary hover:bg-orange-600 text-white font-bold py-8 rounded shadow-xl shadow-orange-500/20 text-lg transition-all active:scale-95 group/btn"
                    disabled={loading}
                  >
                    {loading ? (
                      "Transmitting..."
                    ) : (
                      <span className="flex items-center gap-3">
                        Send Message{" "}
                        <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
