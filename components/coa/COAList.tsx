"use client";

import { useFetchCOAs } from "@/hooks/coa/actions";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  ArrowRight,
  LayoutGrid,
  List,
  Search,
  Activity,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Hash,
  ArrowUpDown,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type CSSWithVariables = React.CSSProperties & {
  [key: string]: string | number;
};

interface COAListProps {
  rolePrefix: string;
}

export default function COAList({ rolePrefix }: COAListProps) {
  const [view, setView] = useState<"grid" | "table">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { isLoading, data: coas } = useFetchCOAs();

  const filteredCOAs = useMemo(() => {
    if (!coas) return [];

    return coas.filter(
      (coa) =>
        coa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coa.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coa.reference.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [coas, searchQuery]);

  const totalPages = Math.ceil(filteredCOAs.length / itemsPerPage);
  const paginatedCOAs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCOAs.slice(start, start + itemsPerPage);
  }, [filteredCOAs, currentPage]);

  const primaryColor = rolePrefix === "director" ? "#D0402B" : "#045138";

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!coas || coas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-black/5 rounded-[32px] border-2 border-dashed border-black/10">
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-black/20 mb-4 shadow-sm">
          <Database className="w-8 h-8" />
        </div>
        <p className="text-sm font-black text-black/40 uppercase tracking-widest">
          No accounts registered in COA
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white/50 backdrop-blur-xl p-4 rounded-[24px] border border-black/5 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20"
              style={
                {
                  color: searchQuery ? primaryColor : undefined,
                } as CSSWithVariables
              }
            />
            <Input
              placeholder="Search by name or code..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-11 h-12 rounded-xl border-black/5 bg-black/5 focus:bg-white transition-all font-bold text-xs"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 bg-black/5 p-1.5 rounded-xl self-end lg:self-auto">
          <button
            onClick={() => setView("grid")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              view === "grid"
                ? "bg-white shadow-sm"
                : "text-black/40 hover:text-black"
            }`}
            style={
              {
                color: view === "grid" ? primaryColor : undefined,
              } as CSSWithVariables
            }
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Grid
          </button>
          <button
            onClick={() => setView("table")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              view === "table"
                ? "bg-white shadow-sm"
                : "text-black/40 hover:text-black"
            }`}
            style={
              {
                color: view === "table" ? primaryColor : undefined,
              } as CSSWithVariables
            }
          >
            <List className="w-3.5 h-3.5" />
            Table
          </button>
        </div>
      </div>

      {/* Content Rendering */}
      {paginatedCOAs.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm font-black text-black/20 uppercase tracking-[0.2em]">
            No accounts match your criteria
          </p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCOAs.map((coa) => (
            <Link
              key={coa.reference}
              href={`/${rolePrefix}/coa/${coa.reference}`}
              className="group"
            >
              <Card className="border-black/5 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[28px] overflow-hidden bg-white/80 backdrop-blur-xl group-hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:text-white transition-all duration-500 shadow-inner"
                      style={
                        {
                          backgroundColor: `${primaryColor}1A`, // 10% opacity
                          color: primaryColor,
                          "--hover-bg": primaryColor,
                        } as CSSWithVariables
                      }
                    >
                      <Hash className="w-6 h-6" />
                    </div>
                    {coa.is_active ? (
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
                    <h3
                      className="text-xl font-black text-black tracking-tight transition-colors line-clamp-1"
                      style={
                        {
                          "--hover-text": primaryColor,
                        } as CSSWithVariables
                      }
                    >
                      {coa.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p
                        className="text-[10px] font-black uppercase tracking-widest"
                        style={{ color: primaryColor } as CSSWithVariables}
                      >
                        CODE: {coa.code}
                      </p>
                      <span className="w-1 h-1 rounded-full bg-black/10" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-black/30">
                        REF: {coa.reference}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-black/5">
                    <div className="flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-black/20" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-black/40">
                        {coa.normal_balance} Balance
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-black/20 group-hover:text-[#D0402B] group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white/50 backdrop-blur-xl border border-black/5 rounded-[32px] overflow-hidden shadow-xl shadow-black/5">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/10 bg-black/5">
                  <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-black/40">
                    Account Name
                  </th>
                  <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-black/40">
                    Code
                  </th>
                  <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-black/40">
                    Type / Balance
                  </th>
                  <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-black/40">
                    Status
                  </th>
                  <th className="text-right py-5 px-8 text-[10px] font-black uppercase tracking-widest text-black/40">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {paginatedCOAs.map((coa) => (
                  <tr
                    key={coa.reference}
                    className="transition-colors group"
                    style={
                      { "--hover-bg": `${primaryColor}0D` } as CSSWithVariables
                    } // 5% opacity
                  >
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-black/30 transition-all font-bold"
                          style={
                            {
                              "--group-hover-bg": `${primaryColor}33`, // 20% opacity
                              "--group-hover-text": primaryColor,
                            } as CSSWithVariables
                          }
                        >
                          <Hash className="w-5 h-5" />
                        </div>
                        <div>
                          <p
                            className="text-sm font-black text-black transition-colors"
                            style={
                              {
                                "--group-hover-text": primaryColor,
                              } as CSSWithVariables
                            }
                          >
                            {coa.name}
                          </p>
                          <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest mt-0.5">
                            {coa.reference}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <Badge className="bg-black text-white border-none font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-lg">
                        {coa.code}
                      </Badge>
                    </td>
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-2">
                        <ArrowUpDown className="w-3 h-3 text-black/30" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-black/60">
                          {coa.normal_balance}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      {coa.is_active ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            Active
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-black/30">
                          <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            Inactive
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-6 px-8 text-right">
                      <Link href={`/${rolePrefix}/coa/${coa.reference}`}>
                        <Button
                          variant="ghost"
                          className="h-10 w-10 p-0 rounded-xl hover:text-white transition-all duration-300"
                          style={
                            {
                              "--hover-bg": primaryColor,
                            } as CSSWithVariables
                          }
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-xl p-6 rounded-[24px] border border-black/5">
          <p className="text-[10px] font-black uppercase tracking-widest text-black/30">
            Showing <span className="text-black">{paginatedCOAs.length}</span>{" "}
            of <span className="text-black">{filteredCOAs.length}</span>{" "}
            accounts
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-10 h-10 p-0 rounded-xl border-black/5 bg-white shadow-sm transition-all disabled:opacity-30 hover:text-white"
              style={{
                ["--hover-bg" as any]: primaryColor,
              }}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-1 px-4">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${
                        currentPage === page
                          ? "text-white shadow-lg"
                          : "bg-white border border-black/5 text-black/40 hover:text-black shadow-sm"
                      }`}
                      style={
                        {
                          backgroundColor:
                            currentPage === page ? primaryColor : undefined,
                          boxShadow:
                            currentPage === page
                              ? `0 10px 15px -3px ${primaryColor}33`
                              : undefined,
                        } as CSSWithVariables
                      }
                    >
                      {page}
                    </button>
                  );
                }
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <MoreHorizontal
                      key={page}
                      className="w-4 h-4 text-black/20"
                    />
                  );
                }
                return null;
              })}
            </div>

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-10 h-10 p-0 rounded-xl border-black/5 bg-white shadow-sm transition-all disabled:opacity-30 hover:text-white"
              style={{
                ["--hover-bg" as any]: primaryColor,
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
