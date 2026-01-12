"use client";

import { useFetchFinancialYears } from "@/hooks/financialyears/actions";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarRange,
  ArrowRight,
  LayoutGrid,
  List,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FinancialYearsListProps {
  rolePrefix: string;
}

export default function FinancialYearsList({
  rolePrefix,
}: FinancialYearsListProps) {
  const [view, setView] = useState<"grid" | "table">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { isLoading, data: financialYears } = useFetchFinancialYears();

  const filteredYears = useMemo(() => {
    if (!financialYears) return [];

    return financialYears.filter(
      (year) =>
        year.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        year.reference.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [financialYears, searchQuery]);

  const totalPages = Math.ceil(filteredYears.length / itemsPerPage);
  const paginatedYears = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredYears.slice(start, start + itemsPerPage);
  }, [filteredYears, currentPage]);

  const primaryColor = rolePrefix === "director" ? "#D0402B" : "#045138";

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!financialYears || financialYears.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-gray-400 mb-4 shadow-sm border border-gray-100">
          <CalendarRange className="w-8 h-8" />
        </div>
        <p className="text-sm font-black text-gray-400 uppercase tracking-widest">
          No fiscal years registered
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-4 rounded-[24px] border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              style={{ color: searchQuery ? primaryColor : undefined }}
            />
            <Input
              placeholder="Search by code or reference..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-11 h-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white transition-all font-bold text-xs focus:ring-1"
              style={
                {
                  "--tw-ring-color": primaryColor,
                } as React.CSSProperties
              }
            />
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl self-end lg:self-auto">
          <button
            onClick={() => setView("grid")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              view === "grid"
                ? "bg-white shadow-sm text-black"
                : "text-gray-400 hover:text-black"
            }`}
            style={{ color: view === "grid" ? primaryColor : undefined }}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Grid
          </button>
          <button
            onClick={() => setView("table")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              view === "table"
                ? "bg-white shadow-sm text-black"
                : "text-gray-400 hover:text-black"
            }`}
            style={{ color: view === "table" ? primaryColor : undefined }}
          >
            <List className="w-3.5 h-3.5" />
            Table
          </button>
        </div>
      </div>

      {/* Content Rendering */}
      {paginatedYears.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm font-black text-gray-300 uppercase tracking-[0.2em]">
            No fiscal years match your criteria
          </p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedYears.map((year) => (
            <Link
              key={year.reference}
              href={`/${rolePrefix}/fiscal-years/${year.reference}`}
              className="group"
            >
              <Card className="border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[28px] overflow-hidden bg-white group-hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-inner"
                      style={{
                        backgroundColor: `${primaryColor}1A`, // 10% opacity
                        color: primaryColor,
                      }}
                    >
                      <CalendarRange className="w-6 h-6" />
                    </div>
                    {year.is_active ? (
                      <Badge className="bg-green-50 text-green-600 border-none font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-green-100">
                        Active
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-50 text-gray-400 border-none font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-gray-100">
                        Closed
                      </Badge>
                    )}
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-black text-black tracking-tight transition-colors line-clamp-1 group-hover:text-opacity-80">
                      {year.code}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                          Start Date
                        </span>
                        <span className="text-xs font-bold text-gray-600">
                          {new Date(year.start_date).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="w-px h-8 bg-gray-100 mx-2" />
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                          End Date
                        </span>
                        <span className="text-xs font-bold text-gray-600">
                          {new Date(year.end_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        view details
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-black group-hover:text-[#D0402B] group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Fiscal Code
                  </th>
                  <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Period
                  </th>
                  <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Status
                  </th>
                  <th className="text-right py-5 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedYears.map((year) => (
                  <tr
                    key={year.reference}
                    className="transition-colors group hover:bg-gray-50/50"
                  >
                    <td className="py-6 px-8">
                      <Link href={`/${rolePrefix}/fiscal-years/${year.reference}`} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 transition-all font-bold group-hover:bg-white group-hover:shadow-sm">
                          <CalendarRange className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-black transition-colors">
                            {year.code}
                          </p>
                          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-0.5">
                            {year.reference}
                          </p>
                        </div>
                      </Link>
                    </td>
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-white text-gray-600 border-gray-200 font-bold text-[10px]"
                        >
                          {new Date(year.start_date).toLocaleDateString()}
                        </Badge>
                        <span className="text-gray-300">-</span>
                        <Badge
                          variant="outline"
                          className="bg-white text-gray-600 border-gray-200 font-bold text-[10px]"
                        >
                          {new Date(year.end_date).toLocaleDateString()}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      {year.is_active ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            Active
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            Closed
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-6 px-8 text-right">
                      <Link
                        href={`/${rolePrefix}/fiscal-years/${year.reference}`}
                      >
                        <Button
                          variant="ghost"
                          className="h-10 w-10 p-0 rounded-xl hover:bg-white hover:shadow-sm hover:text-black transition-all duration-300 text-gray-300"
                        >
                          <ArrowRight className="w-4 h-4 text-black" />
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
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Showing <span className="text-black">{paginatedYears.length}</span>{" "}
            of <span className="text-black">{filteredYears.length}</span> years
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-10 h-10 p-0 rounded-xl border-gray-100 bg-white shadow-sm transition-all disabled:opacity-30 hover:text-black hover:border-gray-300"
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
                          : "bg-white border border-gray-100 text-gray-400 hover:text-black shadow-sm"
                      }`}
                      style={{
                        backgroundColor:
                          currentPage === page ? primaryColor : undefined,
                        boxShadow:
                          currentPage === page
                            ? `0 10px 15px -3px ${primaryColor}33`
                            : undefined,
                      }}
                    >
                      {page}
                    </button>
                  );
                }
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <MoreHorizontal
                      key={page}
                      className="w-4 h-4 text-gray-300"
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
              className="w-10 h-10 p-0 rounded-xl border-gray-100 bg-white shadow-sm transition-all disabled:opacity-30 hover:text-black hover:border-gray-300"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
