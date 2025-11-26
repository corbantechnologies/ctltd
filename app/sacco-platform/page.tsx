import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Phone, Shield, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SaccoPlatform() {
  const features = [
    "Member registration & KYC",
    "Savings, shares & loan accounts",
    "Instant loan processing & guarantor workflow",
    "Automated dividends & financial reporting",
    // "CBK & SASRA compliant statements",
    "Member web portal",
    "Real-time dashboard for management",
    "Bulk SMS & email notifications",
    "Credit scoring engine (coming Q1 2026)",
  ];

  const pricing = [
    {
      name: "Starter",
      price: "KES 30,000/annually",
      sacoos: "1 SACCO",
      users: "Up to 1,000 members",
    },
    {
      name: "Growth",
      price: "KES 60,000/annually",
      sacoos: "1 SACCO",
      users: "1,000 – 5,000 members",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      sacoos: "Multi-branch / Group",
      users: "Unlimited",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Badge className="mb-6 bg-teal-900/50 text-teal-300">
            The #1 SACCO Platform in Kenya
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-5xl mx-auto">
            Run Your SACCO Like a Bank — Without the Bank Price Tag
          </h1>
          <p className="mt-8 text-xl text-slate-300 max-w-3xl mx-auto">
            Fully digital, CBK-compliant core system trusted by 7+ SACCOs and
            growing.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-lg px-10"
            >
              <Phone className="mr-2 w-5 h-5" />
              <Link
                href="https://calendar.app.google/NVBGSFXxVqm2gGi9A"
                target="_blank"
              >
                Book Free Demo
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 hover:bg-slate-800"
            >
              <Link href="#pricing">View Pricing →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mockups */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <Image
              src="/adminNoBg.png"
              alt="Sacco Platform Mockup"
              width={1000}
              height={1000}
              className="w-full"
            />
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">
                One platform. Every SACCO function.
              </h2>
              <ul className="space-y-4">
                {features.slice(0, 5).map((f) => (
                  <li key={f} className="flex items-center gap-4 text-lg">
                    <Check className="w-6 h-6 text-teal-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-4xl font-bold mb-16">
            Everything Your SACCO Needs
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users />,
                title: "Member Portal",
                desc: "Members check balances, apply for loans, pay via M-PESA",
              },
              {
                icon: <Shield />,
                title: "Bank-Grade Security",
                desc: "End-to-end encryption, 2FA, audit logs",
              },
              {
                icon: <TrendingUp />,
                title: "Automated Reporting",
                desc: "One-click CBK & SASRA reports",
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="bg-slate-900/50 border-slate-800"
              >
                <CardHeader>
                  <div className="w-12 h-12 text-teal-500">{item.icon}</div>
                  <CardTitle className="mt-4">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-4xl font-bold mb-16">
            Simple, Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((tier) => (
              <Card
                key={tier.name}
                className={`bg-slate-900/70 border-slate-800 ${
                  tier.popular ? "ring-2 ring-teal-500" : ""
                }`}
              >
                <CardHeader>
                  {tier.popular && (
                    <Badge className="w-fit mb-4">Most Popular</Badge>
                  )}
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <p className="text-4xl font-bold mt-4">{tier.price}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-400">{tier.sacoos}</p>
                  <p className="text-slate-400">{tier.users}</p>
                  <Button
                    className="w-full mt-6"
                    variant={tier.popular ? "default" : "outline"}
                  >
                    {tier.price === "Custom" ? "Contact Sales" : "Start Today"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-8">Ready to go digital?</h2>
          <p className="text-xl text-slate-300 mb-10">
            Join the 7+ SACCOs already saving 200+ hours per month with Corban.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-lg px-10"
            >
              <Phone className="mr-2 w-5 h-5" />
              <Link
                href="https://calendar.app.google/NVBGSFXxVqm2gGi9A"
                target="_blank"
              >
                Book Free Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
