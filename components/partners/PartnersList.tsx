"use client";

import { useFetchPartners } from "@/hooks/partners/actions";
import { useFetchPartnerTypes } from "@/hooks/partnertypes/actions";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ArrowRight,
  UserCircle,
  Mail,
  Phone,
  LayoutGrid,
  List,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PartnersListProps {
  rolePrefix: string;
}

export default function PartnersList({ rolePrefix }: PartnersListProps) {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { isLoading: isLoadingPartners, data: partners } = useFetchPartners();
  const { isLoading: isLoadingTypes, data: partnerTypes } =
    useFetchPartnerTypes();

  const filteredPartners = useMemo(() => {
    if (!partners) return [];

    return partners.filter((partner) => {
      const matchesSearch =
        partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.reference.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        typeFilter === "all" || partner.partner_type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [partners, searchQuery, typeFilter]);

  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);
  const paginatedPartners = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPartners.slice(start, start + itemsPerPage);
  }, [filteredPartners, currentPage]);

  if (isLoadingPartners || isLoadingTypes) {
    return <LoadingSpinner />;
  }

  if (!partners || partners.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-black/5 rounded-[32px] border-2 border-dashed border-black/10">
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-black/20 mb-4 shadow-sm">
          <Users className="w-8 h-8" />
        </div>
        <p className="text-sm font-black text-black/40 uppercase tracking-widest">
          No partners registered yet
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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
            <Input
              placeholder="Search partners..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-11 h-12 rounded-xl border-black/5 bg-black/5 focus:bg-white transition-all font-bold text-xs"
            />
          </div>

          {/* Type Filter */}
          <div className="relative w-full md:w-60">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-12 pl-11 pr-4 rounded-xl border-black/5 bg-black/5 focus:bg-white focus:ring-2 focus:ring-[#D0402B]/10 outline-none transition-all font-black text-[10px] uppercase tracking-widest appearance-none text-black/60 cursor-pointer"
            >
              <option value="all">All Partner Types</option>
              {partnerTypes?.map((type) => (
                <option key={type.reference} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-black/5 p-1.5 rounded-xl self-end lg:self-auto">
          <button
            onClick={() => setView("grid")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              view === "grid"
                ? "bg-white text-[#D0402B] shadow-sm"
                : "text-black/40 hover:text-black"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Grid
          </button>
          <button
            onClick={() => setView("table")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              view === "table"
                ? "bg-white text-[#D0402B] shadow-sm"
                : "text-black/40 hover:text-black"
            }`}
          >
            <List className="w-3.5 h-3.5" />
            Table
          </button>
        </div>
      </div>

      {/* Content Rendering */}
      {paginatedPartners.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm font-black text-black/20 uppercase tracking-[0.2em]">
            No results match your criteria
          </p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPartners.map((partner) => (
            <Link
              key={partner.reference}
              href={`/${rolePrefix}/partners/${partner.reference}`}
              className="group"
            >
              <Card className="border-black/5 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[28px] overflow-hidden bg-white/80 backdrop-blur-xl group-hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#D0402B]/10 flex items-center justify-center text-[#D0402B] group-hover:bg-[#D0402B] group-hover:text-white transition-all duration-500 shadow-inner">
                      <UserCircle className="w-6 h-6" />
                    </div>
                    {partner.is_active ? (
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
                      {partner.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-black/30">
                        {partner.reference}
                      </p>
                      <span className="w-1 h-1 rounded-full bg-black/10" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#D0402B]/60">
                        {partner.partner_type}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-black/50">
                      <Mail className="w-3 h-3" />
                      <span className="text-[11px] font-bold truncate">
                        {partner.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-black/50">
                      <Phone className="w-3 h-3" />
                      <span className="text-[11px] font-bold">
                        {partner.phone}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-black/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#D0402B]">
                      View Profile
                    </span>
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
                    Partner Info
                  </th>
                  <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-black/40">
                    Contact Details
                  </th>
                  <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-black/40">
                    Classification
                  </th>
                  <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest text-black/40">
                    Status
                  </th>
                  <th className="text-right py-5 px-8 text-[10px] font-black uppercase tracking-widest text-black/40">
                    Audit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {paginatedPartners.map((partner) => (
                  <tr
                    key={partner.reference}
                    className="hover:bg-[#D0402B]/5 transition-colors group"
                  >
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-black/30 group-hover:bg-[#D0402B]/20 group-hover:text-[#D0402B] transition-all">
                          <UserCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-black group-hover:text-[#D0402B] transition-colors">
                            {partner.name}
                          </p>
                          <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest mt-0.5">
                            {partner.reference}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-black/50">
                          <Mail className="w-3 h-3" />
                          <p className="text-xs font-bold">{partner.email}</p>
                        </div>
                        <div className="flex items-center gap-2 text-black/50">
                          <Phone className="w-3 h-3" />
                          <p className="text-[11px] font-bold">
                            {partner.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <Badge className="bg-black/5 text-black border-none font-black text-[9px] uppercase tracking-widest px-2.5 py-1">
                        {partner.partner_type}
                      </Badge>
                    </td>
                    <td className="py-6 px-8">
                      {partner.is_active ? (
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
                            Suspended
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-6 px-8 text-right">
                      <Link
                        href={`/${rolePrefix}/partners/${partner.reference}`}
                      >
                        <Button
                          variant="ghost"
                          className="h-10 w-10 p-0 rounded-xl hover:bg-[#D0402B] hover:text-white transition-all"
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
            Showing{" "}
            <span className="text-black">{paginatedPartners.length}</span> of{" "}
            <span className="text-black">{filteredPartners.length}</span>{" "}
            results
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-10 h-10 p-0 rounded-xl border-black/5 bg-white shadow-sm hover:bg-[#D0402B] hover:text-white transition-all disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-1 px-4">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                // Show first, last, current, and pages around current
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
                          ? "bg-[#D0402B] text-white shadow-lg shadow-[#D0402B]/20"
                          : "bg-white border border-black/5 text-black/40 hover:text-black shadow-sm"
                      }`}
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
              className="w-10 h-10 p-0 rounded-xl border-black/5 bg-white shadow-sm hover:bg-[#D0402B] hover:text-white transition-all disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
