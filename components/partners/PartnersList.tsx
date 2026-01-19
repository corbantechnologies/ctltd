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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Grid,
  List,
  Search,
  Users,
  Building2,
  Mail,
  Phone,
  Briefcase,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

interface PartnersListProps {
  rolePrefix: string;
}

export default function PartnersList({ rolePrefix }: PartnersListProps) {
  const [view, setView] = useState<"grid" | "table">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const { data: partners, isLoading: isLoadingPartners } = useFetchPartners();
  const { data: partnerTypes, isLoading: isLoadingTypes } =
    useFetchPartnerTypes();

  const primaryColor = rolePrefix === "director" ? "#D0402B" : "#045138";

  if (isLoadingPartners || isLoadingTypes) return <LoadingSpinner />;

  // Filter Logic
  const filteredPartners = partners?.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.reference.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      typeFilter === "all" || partner.partner_type === typeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/50 backdrop-blur-xl p-4 rounded-[24px] border border-black/5 shadow-sm">
        {/* Search */}
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 group-focus-within:text-black transition-colors" />
          <Input
            placeholder="Search partners by name, email, or ref..."
            className="pl-11 h-12 bg-white border-black/5 rounded-2xl focus:ring-0 focus:border-black/20 transition-all font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              boxShadow: "none",
            }}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Type Filter */}
          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-12 w-[180px] bg-white border border-black/5 rounded-2xl font-bold text-xs uppercase tracking-wide px-3 outline-none focus:ring-1 focus:ring-black/10 cursor-pointer"
          >
            <option value="all">All Categories</option>
            {partnerTypes?.map((type) => (
              <option key={type.reference} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="flex bg-white rounded-2xl p-1 border border-black/5">
            <Button
              onClick={() => setView("grid")}
              variant="ghost"
              className={`h-10 w-10 rounded-xl p-0 transition-all ${
                view === "grid" ? "text-white shadow-md" : "text-black/40"
              }`}
              style={{
                backgroundColor: view === "grid" ? primaryColor : "transparent",
              }}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setView("table")}
              variant="ghost"
              className={`h-10 w-10 rounded-xl p-0 transition-all ${
                view === "table" ? "text-white shadow-md" : "text-black/40"
              }`}
              style={{
                backgroundColor:
                  view === "table" ? primaryColor : "transparent",
              }}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPartners?.map((partner) => (
            <Link
              key={partner.reference}
              href={`/${rolePrefix}/partners/${partner.reference}`}
              className="group block"
            >
              <Card className="h-full border-black/5 bg-white/60 backdrop-blur-xl rounded-[32px] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group-hover:bg-white/90">
                <CardContent className="p-6 space-y-6">
                  <div className="flex justify-between items-start">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        backgroundColor: primaryColor,
                        boxShadow: `0 10px 20px -5px ${primaryColor}4D`,
                      }}
                    >
                      <Users className="w-7 h-7" />
                    </div>
                    <Badge
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-none ${
                        partner.is_active
                          ? "bg-green-500/10 text-green-600"
                          : "bg-red-500/10 text-red-600"
                      }`}
                    >
                      {partner.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-black tracking-tight mb-1 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black/60 transition-all">
                      {partner.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-bold text-black/40 uppercase tracking-wider">
                      <Briefcase className="w-3 h-3" />
                      {partner.partner_type}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-black/5">
                    {/* <div className="flex items-center gap-3 text-sm text-black/60">
                      <Mail className="w-4 h-4 opacity-50" />
                      <span className="truncate">{partner.email}</span>
                    </div> */}
                    <div className="flex items-center gap-3 text-sm text-black/60">
                      <Building2 className="w-4 h-4 opacity-50" />
                      <span className="truncate">
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
        <Card className="border-black/5 bg-white/50 backdrop-blur-xl rounded-[32px] overflow-hidden shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-black/5">
                  <TableRow className="hover:bg-transparent border-black/5">
                    <TableHead className="py-3 px-4 text-[9px] font-black text-black/40 uppercase tracking-widest">
                      Entity
                    </TableHead>
                    <TableHead className="py-3 px-4 text-[9px] font-black text-black/40 uppercase tracking-widest">
                      Division
                    </TableHead>
                    <TableHead className="py-3 px-4 text-[9px] font-black text-black/40 uppercase tracking-widest">
                      Category
                    </TableHead>
                    <TableHead className="py-3 px-4 text-[9px] font-black text-black/40 uppercase tracking-widest">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPartners?.map((partner) => (
                    <TableRow
                      key={partner.reference}
                      className="hover:bg-white/50 border-black/5 transition-colors cursor-pointer group"
                      onClick={() =>
                        (window.location.href = `/${rolePrefix}/partners/${partner.reference}`)
                      }
                    >
                      <TableCell className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-110"
                            style={{ backgroundColor: primaryColor }}
                          >
                            <Users className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-black text-xs">
                              {partner.name}
                            </div>
                            <div className="text-[9px] uppercase font-bold text-black/40 tracking-wider">
                              {partner.reference}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 px-4 text-xs">
                        {partner.division}
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        <Badge
                          variant="secondary"
                          className="bg-white border border-black/5 text-black/70 font-bold text-[9px]"
                        >
                          {partner.partner_type}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        {partner.is_active ? (
                          <div className="flex items-center gap-2 text-[9px] font-black text-green-600 uppercase tracking-wider">
                            <CheckCircle2 className="w-3 h-3" /> Active
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-[9px] font-black text-red-600 uppercase tracking-wider">
                            <AlertCircle className="w-3 h-3" /> Inactive
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {filteredPartners?.length === 0 && (
        <div className="text-center py-24">
          <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-black/20" />
          </div>
          <h3 className="text-xl font-black text-black/30 tracking-tight">
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
