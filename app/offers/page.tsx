"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Tag, Calendar } from "lucide-react";
import Link from "next/link";
import { offers } from "@/offers/offers";

export default function Offers() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Offers Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-black/5">
        <div className="absolute inset-0 bg-grid-white pointer-events-none opacity-40" />
        <div className="mx-auto px-6 relative z-10 text-center lg:text-left">
          <Badge className="mb-4 bg-orange-100 text-corporate-primary border-orange-200 font-black uppercase tracking-widest py-2 px-6 shadow-sm">
            Exclusive Deals
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-corporate-foreground mb-8 leading-[0.9]">
            Special <span className="text-corporate-primary">Offers.</span>
          </h1>
          <p className="text-corporate-foreground text-xl md:text-2xl max-w-2xl leading-relaxed font-black opacity-70">
            Premium technology solutions at unbeatable prices. Limited-time
            opportunities to scale your business.
          </p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-24 bg-corporate-secondary">
        <div className="mx-auto px-6">
          {offers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {offers.map((offer) => (
                <Card
                  key={offer.slug}
                  className="bg-white border-black/5 hover:border-corporate-primary/30 transition-all group shadow-sm hover:shadow-2xl rounded-[32px] overflow-hidden flex flex-col"
                >
                  <CardHeader className="p-10 pb-0">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-corporate-primary group-hover:bg-corporate-primary group-hover:text-white transition-all shadow-md">
                        <Tag className="w-8 h-8" />
                      </div>
                      <Badge
                        variant="outline"
                        className="border-corporate-primary/20 text-corporate-primary font-black px-4 py-1 rounded-full text-[10px] uppercase tracking-wider"
                      >
                        Save{" "}
                        {parseInt(offer.originalPrice) -
                          parseInt(offer.discountedPrice)}
                        k
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-black text-corporate-foreground tracking-tight mb-4 line-clamp-2">
                      {offer.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-10 pt-0 flex-grow flex flex-col">
                    <p className="text-corporate-foreground font-bold opacity-60 leading-relaxed mb-8 line-clamp-3">
                      {offer.description}
                    </p>

                    <div className="mb-8 p-6 bg-corporate-accent rounded-2xl border border-corporate-primary/10">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-3xl font-black text-corporate-primary">
                          {offer.discountedPrice}
                        </span>
                        <span className="text-sm font-bold opacity-40 line-through">
                          {offer.originalPrice}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-50">
                        <Calendar className="w-3 h-3" />
                        Valid Until: {offer.validUntil}
                      </div>
                    </div>

                    <ul className="space-y-4 mb-10 flex-grow">
                      {offer.types.slice(0, 3).map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-corporate-primary mt-1 shrink-0" />
                          <span className="text-sm font-black text-corporate-foreground opacity-80 line-clamp-1">
                            {item.split(" – ")[0]}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-black/10 hover:border-corporate-primary text-corporate-foreground hover:text-corporate-primary group/btn rounded-2xl py-6 h-auto transition-all font-black shadow-lg hover:bg-orange-50 uppercase tracking-widest text-[10px]"
                    >
                      <Link
                        href={`/offers/${offer.slug}`}
                        className="flex items-center justify-center gap-2"
                      >
                        View Full Details{" "}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto py-24 text-center space-y-8 bg-white rounded-[48px] border border-black/5 shadow-sm">
              <div className="w-24 h-24 bg-orange-100 rounded-3xl flex items-center justify-center text-corporate-primary mx-auto shadow-inner">
                <Tag className="w-10 h-10 opacity-20" />
              </div>
              <div>
                <h3 className="text-3xl font-black tracking-tight mb-4">
                  No Active Offers
                </h3>
                <p className="text-corporate-foreground font-bold opacity-50 max-w-lg mx-auto leading-relaxed">
                  We are currently refreshing our promotional lineups. Check
                  back soon for exclusive deals on web, mobile, and cloud
                  solutions.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="border-corporate-primary/20 text-corporate-primary hover:bg-orange-50 rounded-2xl px-10 py-6 h-auto font-black uppercase tracking-widest text-xs"
              >
                <Link href="/contact">Notify Me of New Deals</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto bg-black rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 space-y-10">
            <h2 className="text-4xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter max-w-4xl mx-auto">
              Don&apos;t Miss{" "}
              <span className="text-corporate-primary">Future</span> Deals.
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto font-bold uppercase tracking-widest">
              Contact us today to find the best solution for your project at the
              best price.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                asChild
                size="lg"
                className="bg-corporate-primary hover:bg-orange-600 text-white rounded-2xl px-12 py-8 text-xl font-black shadow-2xl shadow-orange-500/20 w-full sm:w-auto"
              >
                <Link href="/contact">Inquire Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
