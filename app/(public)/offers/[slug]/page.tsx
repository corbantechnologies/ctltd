"use client";

import { use } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Sparkles,
  Zap,
  Tag,
  Info,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { offers } from "@/offers/offers";
import { notFound } from "next/navigation";
import { useState } from "react";
import { ClaimOfferModal } from "@/components/offers/ClaimOfferModal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function OfferDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const offer = offers.find((o) => o.slug === resolvedParams.slug);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!offer) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ClaimOfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        offerTitle={offer.title}
        offerSlug={offer.slug}
      />
      {/* Header / Back Link */}
      <div className="fixed top-24 left-6 z-50">
        <Button
          asChild
          variant="ghost"
          className="bg-white/50 backdrop-blur-md border border-black/5 hover:bg-white hover:text-corporate-primary rounded px-4 font-bold transition-all"
        >
          <Link href="/offers" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Offers
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white pointer-events-none opacity-40" />
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-orange-100/10 rounded blur-[100px] -z-10 animate-pulse-slow" />

        <div className="mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <Badge className="mb-6 bg-orange-500 text-white border-none font-bold uppercase tracking-widest py-2 px-6 shadow-xl shadow-orange-500/20 rounded">
              Limited Time Offer
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-corporate-foreground mb-8 leading-tight">
              {offer.title.split(":")[0]}
              <span className="text-corporate-primary block mt-2 text-3xl md:text-5xl italic">
                {offer.title.split(":")[1] || ""}
              </span>
            </h1>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-3 px-6 py-4 bg-white border border-black/5 rounded shadow-sm">
                <Calendar className="w-5 h-5 text-corporate-primary" />
                <span className="font-bold text-corporate-foreground opacity-70 uppercase tracking-widest text-xs">
                  Expiry: {offer.validUntil}
                </span>
              </div>
              <div className="flex items-center gap-3 px-6 py-4 bg-corporate-primary text-white rounded shadow-xl shadow-orange-500/20">
                <Tag className="w-5 h-5" />
                <span className="font-black uppercase tracking-widest text-xs">
                  Save{" "}
                  {parseInt(offer.originalPrice) -
                    parseInt(offer.discountedPrice)}
                  k Kes
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="pb-24 px-6">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-7 space-y-16">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-8 flex items-center gap-3">
                <Info className="w-8 h-8 text-corporate-primary" />
                About This Offer
              </h2>
              <p className="text-xl md:text-2xl text-corporate-foreground font-bold opacity-60 leading-relaxed">
                {offer.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-corporate-accent rounded border border-corporate-primary/10 relative overflow-hidden group">
                <Sparkles className="absolute top-4 right-4 w-12 h-12 text-corporate-primary opacity-5 group-hover:scale-125 transition-transform" />
                <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-corporate-primary">
                  What&apos;s Included
                </h3>
                <ul className="space-y-4">
                  {offer.included.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-corporate-primary mt-1 shrink-0" />
                      <span className="font-black text-corporate-foreground opacity-80 leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 bg-white border border-black/5 rounded shadow-sm">
                <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-corporate-foreground opacity-40">
                  Applicable To
                </h3>
                <ul className="space-y-4">
                  {offer.types.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Zap className="w-5 h-5 text-corporate-primary mt-1 shrink-0" />
                      <span className="font-black text-corporate-foreground opacity-70 leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {offer.optionalAddOns && (
              <div className="space-y-8">
                <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-corporate-primary" />
                  Elevate Your Package
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {offer.optionalAddOns.map((addon) => (
                    <div
                      key={addon.name}
                      className="p-8 bg-corporate-secondary border border-black/5 rounded hover:border-corporate-primary/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                    >
                      <div className="space-y-2">
                        <h4 className="text-xl font-black group-hover:text-corporate-primary transition-colors">
                          {addon.name}
                        </h4>
                        <p className="font-bold opacity-60 max-w-xl">
                          {addon.description}
                        </p>
                      </div>
                      <Badge className="bg-white border-black/10 text-corporate-foreground font-bold py-4 px-6 rounded w-fit whitespace-normal text-center">
                        {addon.note}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-10 bg-black/5 rounded border border-dashed border-black/10">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 opacity-40">
                The Fine Print
              </h4>
              <p className="text-xs font-bold leading-relaxed opacity-50 italic">
                {offer.disclaimer}
              </p>
            </div>
          </div>

          {/* Sticky Sidebar CTA */}
          <div className="lg:col-span-5">
            <div className="sticky top-40">
              <div className="bg-white border border-black/5 rounded p-10 shadow-2xl shadow-black/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-600" />

                <div className="mb-10 text-center">
                  <span className="text-xs font-black uppercase tracking-[0.3em] opacity-40 block mb-2">
                    Investment
                  </span>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-sm font-black opacity-30 line-through">
                      KES {offer.originalPrice}
                    </span>
                    <span className="text-6xl font-black text-corporate-primary tracking-tighter">
                      {offer.discountedPrice}
                    </span>
                  </div>
                  <Badge className="mt-4 bg-orange-100 text-corporate-primary border-none font-bold px-4 py-2 uppercase tracking-widest text-[10px] rounded">
                    Limited Opportunity
                  </Badge>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-3 p-4 bg-corporate-secondary rounded">
                    <CheckCircle2 className="w-5 h-5 text-corporate-primary" />
                    <span className="font-black text-sm">
                      Priority Setup Included
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-corporate-secondary rounded-2xl">
                    <CheckCircle2 className="w-5 h-5 text-corporate-primary" />
                    <span className="font-black text-sm">
                      24/7 Expert Support
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-corporate-primary hover:bg-orange-600 text-white rounded py-10 text-lg font-bold shadow-xl shadow-orange-500/30 transition-all hover:scale-[1.02] active:scale-95 group"
                  >
                    Claim This Offer
                    <ArrowRight className="w-6 h-6 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <p className="text-center text-[10px] font-black uppercase tracking-widest opacity-40">
                    No hidden fees • Full transparency
                  </p>
                </div>
              </div>

              <div className="mt-8 p-8 bg-black rounded text-white flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-black uppercase tracking-widest text-xs mb-1">
                    Need something custom?
                  </h4>
                  <p className="text-white/50 text-[10px] font-bold">
                    Talk to our solutions architects.
                  </p>
                </div>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white hover:text-black rounded font-bold"
                >
                  <Link href="/contact">Inquire</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
