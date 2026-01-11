"use client";

import { useFetchDivisions } from "@/hooks/divisions/actions";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, ArrowRight, Layers } from "lucide-react";
import Link from "next/link";

interface DivisionsListProps {
  rolePrefix: string;
}

export default function DivisionsList({ rolePrefix }: DivisionsListProps) {
  const { isLoading, data: divisions } = useFetchDivisions();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!divisions || divisions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-black/5 rounded-[32px] border-2 border-dashed border-black/10">
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-black/20 mb-4 shadow-sm">
          <Database className="w-8 h-8" />
        </div>
        <p className="text-sm font-black text-black/40 uppercase tracking-widest">
          No divisions established yet
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {divisions.map((division) => (
        <Link
          key={division.reference}
          href={`/${rolePrefix}/divisions/${division.reference}`}
          className="group"
        >
          <Card className="border-black/5 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[28px] overflow-hidden bg-white/80 backdrop-blur-xl group-hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#D0402B]/10 flex items-center justify-center text-[#D0402B] group-hover:bg-[#D0402B] group-hover:text-white transition-all duration-500 shadow-inner">
                  <Layers className="w-6 h-6" />
                </div>
                {division.is_active ? (
                  <Badge className="bg-green-500/10 text-green-600 border-none font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                    Active
                  </Badge>
                ) : (
                  <Badge className="bg-black/5 text-black/40 border-none font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                    Inactive
                  </Badge>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-black text-black tracking-tight group-hover:text-[#D0402B] transition-colors line-clamp-1">
                  {division.name}
                </h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mt-1">
                  REF: {division.reference}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-black/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#D0402B]">
                  View Infrastructure
                </span>
                <ArrowRight className="w-4 h-4 text-black/20 group-hover:text-[#D0402B] group-hover:translate-x-1 transition-all" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
