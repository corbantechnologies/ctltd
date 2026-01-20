/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { Journal } from "@/services/journals";
import LoadingSpinner from "@/components/portal/LoadingSpinner";

interface FiscalYearJournalsProps {
  journals: Journal[];
  rolePrefix: string;
  fiscalYearReference: string;
}

export default function FiscalYearJournals({
  journals,
  rolePrefix,
  fiscalYearReference,
}: FiscalYearJournalsProps) {
  const [view, setView] = useState<"grid" | "table">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: journalTypes, isLoading: isLoadingTypes } =
    useFetchJournalTypes();

  const primaryColor = rolePrefix === "director" ? "#D0402B" : "#045138";

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

      return matchesSearch && matchesType && matchesDateRange;
    });
  }, [journals, searchQuery, typeFilter, startDate, endDate]);

  const totalPages = Math.ceil(filteredJournals.length / itemsPerPage);
  const paginatedJournals = filteredJournals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoadingTypes) return <LoadingSpinner />;

  const clearFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Controls Section */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 transition-colors" />
            <Input
              placeholder="Search journals by description or reference..."
              className="pl-9 h-10 bg-gray-50 border-gray-100 rounded-xl transition-all font-medium text-sm shadow-inner focus:ring-1 focus:bg-white"
              style={{
                ["--tw-ring-color" as any]: primaryColor,
              }}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-100 shadow-sm">
            <Button
              variant={view === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setView("grid")}
              className="w-8 h-8 rounded-lg transition-all"
              style={{
                backgroundColor: view === "grid" ? primaryColor : "transparent",
                color: view === "grid" ? "white" : "rgba(0,0,0,0.4)",
                boxShadow:
                  view === "grid"
                    ? `0 4px 6px -1px ${primaryColor}33`
                    : "none",
              }}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant={view === "table" ? "default" : "ghost"}
              size="icon"
              onClick={() => setView("table")}
              className="w-8 h-8 rounded-lg transition-all"
              style={{
                backgroundColor:
                  view === "table" ? primaryColor : "transparent",
                color: view === "table" ? "white" : "rgba(0,0,0,0.4)",
                boxShadow:
                  view === "table"
                    ? `0 4px 6px -1px ${primaryColor}33`
                    : "none",
              }}
            >
              <List className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Validated Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-gray-100">
          {/* Type Filter */}
          <div className="relative group">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 transition-colors" />
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-10 pl-9 pr-3 rounded-lg border border-gray-100 bg-white focus:ring-2 focus:ring-gray-100 outline-none transition-all font-bold text-[10px] uppercase tracking-widest appearance-none text-gray-600 cursor-pointer shadow-sm hover:bg-gray-50"
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
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-black transition-colors" />
            <Input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 h-10 bg-white border-gray-100 rounded-lg focus:ring-gray-100 transition-all font-bold text-[10px] uppercase tracking-widest shadow-sm"
              title="Start Date"
            />
          </div>

          {/* Date Range End */}
          <div className="relative group">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-black transition-colors" />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 h-10 bg-white border-gray-100 rounded-lg focus:ring-gray-100 transition-all font-bold text-[10px] uppercase tracking-widest shadow-sm"
              title="End Date"
            />
          </div>

          {/* Clear Filter Button */}
          {(searchQuery || typeFilter !== "all" || startDate || endDate) && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="h-10 px-4 rounded-lg border-gray-100 bg-white hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all text-gray-400 shadow-sm flex items-center justify-center gap-2"
              title="Clear Filters"
            >
              <X className="w-3.5 h-3.5" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Clear
              </span>
            </Button>
          )}
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedJournals.map((journal) => (
            <Link
              key={journal.reference}
              href={`/${rolePrefix}/fiscal-years/${fiscalYearReference}/journals/${journal.reference}`}
              className="group block"
            >
              <Card className="h-full border-gray-100 bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group-hover:bg-white">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm bg-gray-50 text-gray-400 group-hover:text-white"
                      style={
                        {
                          // We will use CSS variables or inline styles for hover bg
                        }
                      }
                    >
                      <FileText className="w-5 h-5" />
                      <style jsx>{`
                        .group:hover .group-hover\\:bg-primary {
                          background-color: ${primaryColor} !important;
                          color: white !important;
                        }
                      `}</style>
                    </div>
                    <Badge
                      className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border-none ${journal.is_posted
                        ? "bg-green-50 text-green-600 shadow-sm shadow-green-100"
                        : "bg-orange-50 text-orange-600 shadow-sm shadow-orange-100"
                        }`}
                    >
                      {journal.is_posted ? "Posted" : "Pending"}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3
                        className="text-base font-bold text-black tracking-tight leading-snug transition-colors mb-1.5 italic"
                        style={{
                          color: "black",
                        }}
                      >
                        {journal.description || "No Description Provided"}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[9px] tracking-[0.2em]">
                        <Calendar className="w-3 h-3" />
                        {new Date(journal.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                          Registry Ref
                        </span>
                        <span className="text-xs font-mono font-bold text-black">
                          {journal.reference}
                        </span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 transition-all group-hover:bg-black group-hover:text-white">
                        <ArrowUpRight className="w-3.5 h-3.5" />
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
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-lg shadow-gray-100/50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-[9px] font-black uppercase tracking-widest text-gray-400">
                    Posting Date
                  </th>
                  <th className="text-left py-3 px-4 text-[9px] font-black uppercase tracking-widest text-gray-400">
                    Journal Description
                  </th>
                  <th className="text-left py-3 px-4 text-[9px] font-black uppercase tracking-widest text-gray-400">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-[9px] font-black uppercase tracking-widest text-gray-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedJournals.map((journal) => (
                  <tr
                    key={journal.reference}
                    className="hover:bg-gray-50/50 transition-all cursor-pointer group"
                    onClick={() =>
                      (window.location.href = `/${rolePrefix}/fiscal-years/${fiscalYearReference}/journals/${journal.reference}`)
                    }
                  >
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-black">
                          {new Date(journal.date).toLocaleDateString()}
                        </span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                          Auto
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-md bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-black transition-all">
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-bold text-black transition-colors">
                          {journal.description}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className="bg-white border-gray-200 text-gray-600 font-semibold text-[9px] uppercase px-2 py-0.5 rounded-full"
                      >
                        {journal.journal_type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {journal.is_posted ? (
                          <div className="flex items-center gap-1.5 text-green-600">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span className="text-[9px] font-bold uppercase tracking-widest">
                              POSTED
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-orange-600">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="text-[9px] font-bold uppercase tracking-widest">
                              PENDING
                            </span>
                          </div>
                        )}
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
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mt-6 gap-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center md:text-left">
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
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border-gray-100 bg-white transition-all hover:bg-gray-50 hover:text-black disabled:opacity-30 h-8 px-3 font-black text-gray-500 text-[10px] uppercase tracking-wider"
            >
              <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Prev
            </Button>
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg transition-all font-black text-xs ${currentPage === i + 1
                      ? "text-white shadow-md"
                      : "bg-white border-gray-100 hover:bg-gray-50 text-gray-400"
                    }`}
                  style={{
                    backgroundColor:
                      currentPage === i + 1 ? primaryColor : undefined,
                    boxShadow:
                      currentPage === i + 1
                        ? `0 4px 6px -1px ${primaryColor}33`
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
              className="rounded-lg border-gray-100 bg-white transition-all hover:bg-gray-50 hover:text-black disabled:opacity-30 h-8 px-3 font-black text-gray-500 text-[10px] uppercase tracking-wider"
            >
              Next <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {filteredJournals.length === 0 && !isLoadingTypes && (
        <div className="py-16 text-center bg-white rounded-[32px] border border-dashed border-gray-200">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 mx-auto mb-4">
            <History className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-black tracking-tight mb-2 uppercase tracking-widest italic scale-95">
            No Journals Found
          </h3>
          <p className="text-gray-400 font-bold max-w-sm mx-auto text-xs">
            This fiscal year does not contain any journal entries matching your
            criteria.
          </p>
        </div>
      )}
    </div>
  );
}
