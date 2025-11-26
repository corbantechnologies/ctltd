"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("https://formspree.io/f/xldkklev", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSuccess(true);
        // Optional: Reset form
        document.querySelector("form")?.reset();
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
    <section className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold">Get in Touch</h1>
          <p className="mt-6 text-xl text-slate-300">
            We reply within 1 business hour (Nairobi time)
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold">
                Corban<span className="text-teal-500">.</span>
              </h3>
              <p className="text-slate-400 mt-4">
                Corban Innovation Hub
                <br />
                Mombasa, Kenya
              </p>
              <p className="text-slate-400 text-sm mt-2">
                P.O. Box 10541-80101
                <br />
                info@corbantechnologies.org
              </p>
            </div>
            <div>
              <Button
                asChild
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <a href="https://wa.me/254710584581">Chat on WhatsApp</a>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {success && (
              <Alert className="bg-green-900/20 border-green-800 text-green-300">
                <AlertDescription>
                  Thanks! Your message has been sent. We&apos;ll reply within 24
                  hours.
                </AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert
                variant="destructive"
                className="border-red-800 bg-red-900/20 text-red-300"
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form action={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@sacco.co.ke"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us about your project..."
                  className="mt-2"
                  required
                />
              </div>
              <input
                type="hidden"
                name="_next"
                value="https://corbantechnologies.org/thank-you"
              />{" "}
              {/* Optional: Redirect after submit */}
              <input type="hidden" name="_captcha" value="false" />{" "}
              {/* Disable captcha for better UX */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
