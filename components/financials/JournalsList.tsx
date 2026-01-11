/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFetchJournals } from "@/hooks/journals/actions";
import { useFetchJournalTypes } from "@/hooks/journaltypes/actions";
import {
  FileText,
  Search,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  History,
  Filter,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import LoadingSpinner from "../portal/LoadingSpinner";

interface JournalsListProps {
  rolePrefix: string;
  linkPrefix: string;
}

export default function JournalsList({ rolePrefix, linkPrefix }: JournalsListProps) {
  const [view, setView] = useState<"grid" | "table">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: journals, isLoading: isLoadingJournals } = useFetchJournals();
  const { data: journalTypes, isLoading: isLoadingTypes } =
    useFetchJournalTypes();

  const primaryColor = rolePrefix === "director" ? "#D0402B" : "#045138";
  const primaryColorWithOpacity =
    rolePrefix === "director"
      ? "rgba(208, 64, 43, 0.2)"
      : "rgba(4, 81, 56, 0.2)"; // simplified for inline styles if needed, but hex is better for dynamic string interpolation

  const filteredJournals = useMemo(() => {
    if (!journals) return [];
    return journals.filter((journal) => {
      const journalDate = new Date(journal.date);

      // Text Search
      const matchesSearch =
        journal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        journal.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        journal.journal_type.toLowerCase().includes(searchQuery.toLowerCase());

      // Type Filter
      const matchesType =
        typeFilter === "all" || journal.journal_type === typeFilter;

      // Date Range Filter
      const matchesDateRange =
        (!startDate || journalDate >= new Date(startDate)) &&
        (!endDate || journalDate <= new Date(endDate));

      // Month Filter
      const matchesMonth =
        selectedMonth === "all" ||
        journalDate.getMonth() === parseInt(selectedMonth);

      // Year Filter
      const matchesYear =
        selectedYear === "all" ||
        journalDate.getFullYear() === parseInt(selectedYear);

      return (
        matchesSearch &&
        matchesType &&
        matchesDateRange &&
        matchesMonth &&
        matchesYear
      );
    });
  }, [
    journals,
    searchQuery,
    typeFilter,
    startDate,
    endDate,
    selectedMonth,
    selectedYear,
  ]);

  const totalPages = Math.ceil(filteredJournals.length / itemsPerPage);
  const paginatedJournals = filteredJournals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoadingJournals || isLoadingTypes) return <LoadingSpinner />;

  const clearFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setStartDate("");
    setEndDate("");
    setSelectedMonth("all");
    setSelectedYear(new Date().getFullYear().toString());
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Controls Section */}
      <div className="bg-white/40 p-6 rounded-[32px] border border-white/60 backdrop-blur-md shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="relative w-full lg:w-96 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 transition-colors"
              style={{
                color: undefined, // Let CSS handle focus-within if possible, or simple inline
              }}
            />
            <Input
              placeholder="Search journals by description or reference..."
              className="pl-11 h-12 bg-white/80 border-black/5 rounded-2xl transition-all font-medium text-sm shadow-inner focus:ring-2"
              style={{
                ["--tw-ring-color" as any]: `${primaryColor}33`,
                borderColor: "rgba(0,0,0,0.05)", // default
              }}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex items-center gap-2 bg-white/80 p-1.5 rounded-2xl border border-black/5 shadow-sm">
            <Button
              variant={view === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setView("grid")}
              className="w-10 h-10 rounded-xl transition-all"
              style={{
                backgroundColor: view === "grid" ? primaryColor : "transparent",
                color: view === "grid" ? "white" : "rgba(0,0,0,0.4)",
                boxShadow:
                  view === "grid"
                    ? `0 10px 15px -3px ${primaryColor}33`
                    : "none",
              }}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={view === "table" ? "default" : "ghost"}
              size="icon"
              onClick={() => setView("table")}
              className="w-10 h-10 rounded-xl transition-all"
              style={{
                backgroundColor:
                  view === "table" ? primaryColor : "transparent",
                color: view === "table" ? "white" : "rgba(0,0,0,0.4)",
                boxShadow:
                  view === "table"
                    ? `0 10px 15px -3px ${primaryColor}33`
                    : "none",
              }}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Validated Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-black/5">
          {/* Type Filter */}
          <div className="relative group">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 transition-colors" />
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-12 pl-11 pr-4 rounded-xl border border-black/5 bg-white/80 focus:ring-2 focus:ring-[#D0402B]/10 outline-none transition-all font-black text-[10px] uppercase tracking-widest appearance-none text-black/60 cursor-pointer shadow-sm hover:bg-white"
            >
              <option value="all">All Journal Types</option>
              {journalTypes?.map((type) => (
                <option key={type.reference} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Start */}
          <div className="relative group">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 group-focus-within:text-[#D0402B] transition-colors" />
            <Input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-11 h-12 bg-white/80 border-black/5 rounded-xl focus:ring-[#D0402B]/20 focus:border-[#D0402B] transition-all font-bold text-[10px] uppercase tracking-widest shadow-sm"
              title="Start Date"
            />
          </div>

          {/* Date Range End */}
          <div className="relative group">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 group-focus-within:text-[#D0402B] transition-colors" />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-11 h-12 bg-white/80 border-black/5 rounded-xl focus:ring-[#D0402B]/20 focus:border-[#D0402B] transition-all font-bold text-[10px] uppercase tracking-widest shadow-sm"
              title="End Date"
            />
          </div>

          {/* Month/Year Controls */}
          <div className="flex gap-2">
            <select
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-1 h-12 px-4 rounded-xl border border-black/5 bg-white/80 focus:ring-2 focus:ring-[#D0402B]/10 outline-none transition-all font-black text-[10px] uppercase tracking-widest appearance-none text-black/60 cursor-pointer shadow-sm hover:bg-white"
            >
              <option value="all">Every Month</option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month, idx) => (
                <option key={month} value={idx}>
                  {month}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setCurrentPage(1);
              }}
              className="w-24 h-12 px-2 rounded-xl border border-black/5 bg-white/80 focus:ring-2 focus:ring-[#D0402B]/10 outline-none transition-all font-black text-[10px] uppercase tracking-widest appearance-none text-black/60 cursor-pointer shadow-sm hover:bg-white text-center"
              title="Filter by Year"
            >
              <option value="all">Year</option>
              {[...Array(5)].map((_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>

            {(searchQuery ||
              typeFilter !== "all" ||
              startDate ||
              endDate ||
              selectedMonth !== "all" ||
              selectedYear !== "all") && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="h-12 w-12 p-0 rounded-xl border-black/5 bg-white/80 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all text-black/40 shadow-sm"
                title="Clear Filters"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedJournals.map((journal) => (
            <Link
              key={journal.reference}
              href={`/${rolePrefix}/${linkPrefix}/${journal.reference}`}
              className="group block"
            >
              <Card className="h-full border-black/5 bg-white/60 backdrop-blur-xl rounded-[32px] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group-hover:bg-white/90">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm group-hover:text-white"
                      style={{
                        backgroundColor: `${primaryColor}0D`, // 5% opacity
                        color: primaryColor,
                        // We will use CSS variables or direct style manipulation for hover effects if possible,
                        // but standard React style won't handle hover easily without state or CSS variables.
                        // For now, simpler approach: use style for base, rely on classNames for generic hover if not dynamic,
                        // OR set a CSS variable on the card.
                      }}
                    >
                      <FileText className="w-6 h-6" />
                      {/* Note: The hover effect changing bg to primaryColor is hard to do with inline styles for dynamic colors without CSS vars. 
                          I will use a style tag or simpler CSS variable approach. */}
                      <style jsx>{`
                        .group:hover .group-hover\\:bg-primary {
                          background-color: ${primaryColor} !important;
                          color: white !important;
                        }
                        .group:hover .group-hover\\:text-primary {
                          color: ${primaryColor} !important;
                        }
                      `}</style>
                    </div>
                    <Badge
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none ${
                        journal.is_posted
                          ? "bg-green-500/10 text-green-600 shadow-sm shadow-green-500/10"
                          : "bg-orange-500/10 text-orange-600 shadow-sm shadow-orange-500/10"
                      }`}
                    >
                      {journal.is_posted ? "Posted" : "Pending"}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-black text-black tracking-tight leading-tight group-hover:text-[#D0402B] transition-colors mb-2 italic">
                        {journal.description || "No Description Provided"}
                      </h3>
                      <div className="flex items-center gap-2 text-black/30 font-bold uppercase text-[10px] tracking-[0.2em]">
                        <Calendar className="w-3 h-3" />
                        {new Date(journal.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase tracking-widest text-black/30">
                          Registry Ref
                        </span>
                        <span className="text-sm font-mono font-bold text-black">
                          {journal.reference}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-black/20 group-hover:bg-[#D0402B]/10 group-hover:text-[#D0402B] transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white/60 backdrop-blur-xl rounded-[32px] border border-black/5 overflow-hidden shadow-xl shadow-black/5">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-black/5 border-b border-black/5">
                  <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-black/40">
                    Posting Date
                  </th>
                  <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-black/40">
                    Journal Description
                  </th>
                  <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-black/40">
                    Type
                  </th>
                  <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-black/40">
                    Status
                  </th>
                  <th className="text-right py-5 px-8 text-[10px] font-black uppercase tracking-widest text-black/40 text-center">
                    Reference
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {paginatedJournals.map((journal) => (
                  <tr
                    key={journal.reference}
                    className="hover:bg-white/80 transition-all cursor-pointer group"
                    onClick={() =>
                      (window.location.href = `/${rolePrefix}/${linkPrefix}/${journal.reference}`)
                    }
                  >
                    <td className="py-6 px-8">
                      <div className="flex flex-col">
                        <span className="text-base font-black text-black">
                          {new Date(journal.date).toLocaleDateString()}
                        </span>
                        <span className="text-[10px] font-bold text-black/30 uppercase tracking-widest mt-0.5">
                          Automated Entry
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-black/40 group-hover:bg-[#D0402B]/10 group-hover:text-[#D0402B] transition-all">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="text-base font-bold text-black group-hover:text-[#D0402B] transition-colors">
                          {journal.description}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <Badge
                        variant="outline"
                        className="bg-white/50 border-black/5 text-black/60 font-black text-[9px] uppercase px-3 py-1 rounded-full"
                      >
                        {journal.journal_type}
                      </Badge>
                    </td>
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-2">
                        {journal.is_posted ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">
                              POSTED
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-orange-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">
                              PENDING
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-6 px-8 text-right">
                      <div className="flex items-center justify-end gap-4 font-mono font-bold text-sm text-black/40 group-hover:text-black">
                        {journal.reference}
                        <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:bg-[#D0402B]">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center bg-white/40 p-6 rounded-[24px] border border-white/60 backdrop-blur-md shadow-sm mt-8">
          <p className="text-xs font-bold text-black/40 uppercase tracking-widest">
            Showing{" "}
            <span className="text-black font-black">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="text-black font-black">
              {Math.min(currentPage * itemsPerPage, filteredJournals.length)}
            </span>{" "}
            of{" "}
            <span className="text-black font-black">
              {filteredJournals.length}
            </span>{" "}
            journals
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-xl border-black/5 bg-white/80 transition-all hover:bg-[#D0402B] hover:text-white disabled:opacity-30 h-10 px-4 font-black"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Prev
            </Button>
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl transition-all font-black ${
                    currentPage === i + 1
                      ? "bg-[#D0402B] text-white shadow-lg shadow-[#D0402B]/20"
                      : "bg-white/80 border-black/5 hover:bg-black/5"
                  }`}
                  style={{
                    backgroundColor:
                      currentPage === i + 1 ? primaryColor : undefined,
                    color: currentPage === i + 1 ? "white" : undefined,
                    boxShadow:
                      currentPage === i + 1
                        ? `0 10px 15px -3px ${primaryColor}33`
                        : undefined,
                  }}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-xl border-black/5 bg-white/80 transition-all hover:bg-[#D0402B] hover:text-white disabled:opacity-30 h-10 px-4 font-black"
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {filteredJournals.length === 0 && !isLoadingJournals && (
        <div className="py-24 text-center bg-white/40 rounded-[40px] border border-dashed border-black/10">
          <div className="w-20 h-20 rounded-3xl bg-black/5 flex items-center justify-center text-black/10 mx-auto mb-6">
            <History className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-black tracking-tight mb-2 uppercase tracking-widest italic scale-95">
            No Journals Detected
          </h3>
          <p className="text-black/30 font-bold max-w-sm mx-auto text-sm">
            Adjust your search parameters or synchronize your data to view
            financial records.
          </p>
        </div>
      )}
    </div>
  );
}
