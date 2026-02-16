"use client";

import { useFetchPartners } from "@/hooks/partners/actions";
import { useFetchPartnerTypes } from "@/hooks/partnertypes/actions";
import { useState } from "react";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Grid,
  List,
  Search,
  Users,
  Building2,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";

interface PartnersListProps {
  rolePrefix: string;
}

export default function PartnersList({ rolePrefix }: PartnersListProps) {
  const [view, setView] = useState<"grid" | "table">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const { data: partners, isLoading: isLoadingPartners } = useFetchPartners();
  const { data: partnerTypes, isLoading: isLoadingTypes } =
    useFetchPartnerTypes();

  const primaryColor = rolePrefix === "director" ? "#D0402B" : "#045138";

  if (isLoadingPartners || isLoadingTypes) return <LoadingSpinner />;

  // Filter Logic
  const filteredPartners =
    partners?.filter((partner) => {
      const matchesSearch =
        partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.reference.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        typeFilter === "all" || partner.partner_type === typeFilter;

      return matchesSearch && matchesType;
    }) || [];

  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);
  const paginatedPartners = filteredPartners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white/50 backdrop-blur-xl p-3 rounded border border-black/5 shadow-sm">
        {/* Search */}
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/40 group-focus-within:text-black transition-colors" />
          <Input
            placeholder="Search partners..."
            className="pl-9 h-10 bg-white border-black/5 rounded focus:ring-0 focus:border-black/20 transition-all font-bold text-xs"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              boxShadow: "none",
            }}
          />
        </div>

        <div className="flex items-center gap-1.5 w-full md:w-auto">
          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-10 w-[180px] bg-white border border-black/5 rounded font-bold text-[10px] uppercase tracking-wide px-3 outline-none focus:ring-1 focus:ring-black/10 cursor-pointer"
          >
            <option value="all">All Categories</option>
            {partnerTypes?.map((type) => (
              <option key={type.reference} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="flex gap-1.5 items-center bg-black/5 rounded p-1">
            <Button
              onClick={() => setView("grid")}
              variant="ghost"
              className={`h-8 w-8 rounded p-0 transition-all ${view === "grid"
                ? "text-white shadow-sm"
                : "text-black/40 hover:text-black"
                }`}
              style={{
                backgroundColor: view === "grid" ? primaryColor : "transparent",
              }}
            >
              <Grid className="w-3.5 h-3.5" />
            </Button>
            <Button
              onClick={() => setView("table")}
              variant="ghost"
              className={`h-8 w-8 rounded p-0 transition-all ${view === "table"
                ? "text-white shadow-sm"
                : "text-black/40 hover:text-black"
                }`}
              style={{
                backgroundColor:
                  view === "table" ? primaryColor : "transparent",
              }}
            >
              <List className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedPartners.map((partner) => (
            <Link
              key={partner.reference}
              href={`/${rolePrefix}/partners/${partner.reference}`}
              className="group block"
            >
              <Card className="h-full border-black/5 bg-white/60 backdrop-blur-xl rounded overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group-hover:bg-white/90">
                <CardContent className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: primaryColor,
                        boxShadow: `0 4px 10px -2px ${primaryColor}4D`,
                      }}
                    >
                      <Users className="w-5 h-5" />
                    </div>
                    <Badge
                      className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border-none ${partner.is_active
                        ? "bg-green-500/10 text-green-600"
                        : "bg-red-500/10 text-red-600"
                        }`}
                    >
                      {partner.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-black tracking-tight mb-1 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black/60 transition-all">
                      {partner.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[9px] font-bold text-black/40 uppercase tracking-wider">
                      <Briefcase className="w-3 h-3" />
                      {partner.partner_type}
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-black/5">
                    <div className="flex items-center gap-2 text-xs text-black/60">
                      <Building2 className="w-3.5 h-3.5 opacity-50" />
                      <span className="truncate text-xs font-bold">
                        {partner.division || "Global"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Table View */}
      {view === "table" && (
        <div className="bg-white/50 backdrop-blur-xl border border-black/5 rounded overflow-hidden shadow-xl shadow-black/5">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-black/5">
                <TableRow className="hover:bg-transparent border-black/5">
                  <TableHead className="py-2 px-4 text-[10px] font-bold text-black/60 uppercase tracking-wider">
                    Entity
                  </TableHead>
                  <TableHead className="py-2 px-4 text-[10px] font-bold text-black/60 uppercase tracking-wider">
                    Division
                  </TableHead>
                  <TableHead className="py-2 px-4 text-[10px] font-bold text-black/60 uppercase tracking-wider">
                    Category
                  </TableHead>
                  <TableHead className="py-2 px-4 text-[10px] font-bold text-black/60 uppercase tracking-wider">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPartners.map((partner) => (
                  <TableRow
                    key={partner.reference}
                    className="hover:bg-white/50 border-black/5 transition-colors cursor-pointer group"
                    onClick={() =>
                      (window.location.href = `/${rolePrefix}/partners/${partner.reference}`)
                    }
                  >
                    <TableCell className="py-2.5 px-4 border-b border-black/5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-black text-sm font-medium">
                            {partner.name}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-2.5 px-4 border-b border-black/5 text-sm font-medium text-black/70">
                      {partner.division}
                    </TableCell>
                    <TableCell className="py-2.5 px-4 border-b border-black/5">
                      <Badge
                        variant="secondary"
                        className="bg-white border border-black/5 text-black/70 font-bold text-[10px] px-2 py-0.5 rounded-sm shadow-none"
                      >
                        {partner.partner_type}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-2.5 px-4 border-b border-black/5">
                      {partner.is_active ? (
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 uppercase tracking-wider">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-600 uppercase tracking-wider">
                          <AlertCircle className="w-3.5 h-3.5" /> Inactive
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-xl p-4 rounded border border-black/5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">
            Showing{" "}
            <span className="text-black">{paginatedPartners.length}</span> of{" "}
            <span className="text-black">{filteredPartners.length}</span>{" "}
            partners
          </p>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 p-0 rounded border-black/5 bg-white shadow-sm transition-all disabled:opacity-30 hover:text-white"
              style={{ "--hover-bg": primaryColor } as React.CSSProperties}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </Button>

            <div className="flex items-center gap-1 px-2">
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
                      className={`w-8 h-8 rounded text-[10px] font-bold transition-all ${currentPage === page
                        ? "text-white shadow-md"
                        : "bg-white border border-black/5 text-black/40 hover:text-black shadow-sm"
                        }`}
                      style={
                        {
                          backgroundColor:
                            currentPage === page ? primaryColor : undefined,
                          boxShadow:
                            currentPage === page
                              ? `0 4px 6px -1px ${primaryColor}33`
                              : undefined,
                        } as React.CSSProperties
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
                      className="w-3 h-3 text-black/20"
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
              className="w-8 h-8 p-0 rounded border-black/5 bg-white shadow-sm transition-all disabled:opacity-30 hover:text-white"
              style={{ "--hover-bg": primaryColor } as React.CSSProperties}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredPartners?.length === 0 && (
        <div className="text-center py-24">
          <div className="w-16 h-16 bg-black/5 rounded flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-black/20" />
          </div>
          <h3 className="text-xl font-bold text-black/30 tracking-tight">
            No partners found
          </h3>
          <p className="text-black/20 font-medium mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
