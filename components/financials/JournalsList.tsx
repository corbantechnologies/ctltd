"use client";

import { useFetchJournals } from "@/hooks/journals/actions";
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
}

export default function JournalsList({ rolePrefix }: JournalsListProps) {
  const [view, setView] = useState<"grid" | "table">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: journals, isLoading } = useFetchJournals();

  const filteredJournals = useMemo(() => {
    if (!journals) return [];
    return journals.filter(
      (journal) =>
        journal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        journal.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        journal.journal_type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [journals, searchQuery]);

  const totalPages = Math.ceil(filteredJournals.length / itemsPerPage);
  const paginatedJournals = filteredJournals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Controls Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/40 p-4 rounded-[24px] border border-white/60 backdrop-blur-md shadow-sm">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 group-focus-within:text-[#D0402B] transition-colors" />
          <Input
            placeholder="Search journals by description or reference..."
            className="pl-11 h-12 bg-white/80 border-black/5 rounded-2xl focus:ring-[#D0402B]/20 focus:border-[#D0402B] transition-all font-medium text-sm shadow-inner"
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
            className={`w-10 h-10 rounded-xl transition-all ${
              view === "grid"
                ? "bg-[#D0402B] text-white shadow-lg shadow-[#D0402B]/20"
                : "text-black/40 hover:bg-black/5"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant={view === "table" ? "default" : "ghost"}
            size="icon"
            onClick={() => setView("table")}
            className={`w-10 h-10 rounded-xl transition-all ${
              view === "table"
                ? "bg-[#D0402B] text-white shadow-lg shadow-[#D0402B]/20"
                : "text-black/40 hover:bg-black/5"
            }`}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedJournals.map((journal) => (
            <Link
              key={journal.reference}
              href={`/${rolePrefix}/financials/${journal.reference}`}
              className="group block"
            >
              <Card className="h-full border-black/5 bg-white/60 backdrop-blur-xl rounded-[32px] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#D0402B]/10 hover:-translate-y-2 group-hover:bg-white/90">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#D0402B]/5 flex items-center justify-center text-[#D0402B] group-hover:bg-[#D0402B] group-hover:text-white transition-all duration-500 shadow-sm">
                      <FileText className="w-6 h-6" />
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
                      (window.location.href = `/${rolePrefix}/financials/${journal.reference}`)
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

      {filteredJournals.length === 0 && !isLoading && (
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
