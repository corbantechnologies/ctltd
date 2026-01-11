"use client";

import { useState } from "react";
import { useFetchDivisions } from "@/hooks/divisions/actions";
import { useFetchJournalTypes } from "@/hooks/journaltypes/actions";
import { useFetchPartnerTypes } from "@/hooks/partnertypes/actions";
import CreateJournalType from "@/forms/journaltypes/CreateJournalType";
import CreatePartnerType from "@/forms/partnertypes/CreatePartnerType";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Layers,
  Settings2,
  Users,
  Plus,
  BookOpen,
  X,
  Building2,
} from "lucide-react";

export default function FinanceDashboard() {
  const { data: divisions, isLoading: isLoadingDivisions } =
    useFetchDivisions();
  const { data: journalTypes, isLoading: isLoadingJournalTypes } =
    useFetchJournalTypes();
  const { data: partnerTypes, isLoading: isLoadingPartnerTypes } =
    useFetchPartnerTypes();

  const [openCreateJournalType, setOpenCreateJournalType] = useState(false);
  const [openCreatePartnerType, setOpenCreatePartnerType] = useState(false);

  if (isLoadingDivisions || isLoadingJournalTypes || isLoadingPartnerTypes)
    return <LoadingSpinner />;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-black tracking-tighter">
          Finance Configuration
        </h1>
        <p className="text-black/60 font-medium mt-1">
          System-wide settings for divisions, journals, and partners
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Divisions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-black flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#045138]" />
              Divisions
            </h2>
            <Badge variant="secondary" className="bg-black/5 text-black">
              {divisions?.length || 0}
            </Badge>
          </div>
          <div className="space-y-3">
            {divisions?.map((division) => (
              <Card
                key={division.reference}
                className="group border-black/5 hover:border-[#045138]/20 bg-white/60 backdrop-blur-xl transition-all shadow-sm hover:shadow-md"
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#045138]/5 flex items-center justify-center text-[#045138] group-hover:bg-[#045138] group-hover:text-white transition-colors">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-sm">
                      {division.name}
                    </h3>
                    <p className="text-[10px] uppercase font-bold text-black/40">
                      {division.location || "Main HQ"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Journal Types Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-black flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#045138]" />
              Journal Types
            </h2>
            <Button
              size="sm"
              onClick={() => setOpenCreateJournalType(true)}
              className="h-8 bg-[#045138]/10 hover:bg-[#045138] text-[#045138] hover:text-white border-none rounded-lg text-xs font-black uppercase tracking-wider"
            >
              <Plus className="w-3 h-3 mr-1" /> New
            </Button>
          </div>
          <div className="space-y-3">
            {journalTypes?.map((type) => (
              <Card
                key={type.reference}
                className="group border-black/5 hover:border-[#045138]/20 bg-white/60 backdrop-blur-xl transition-all shadow-sm hover:shadow-md"
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#045138]/5 flex items-center justify-center text-[#045138] group-hover:bg-[#045138] group-hover:text-white transition-colors">
                    <Settings2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-sm">
                      {type.name}
                    </h3>
                    <p className="text-[10px] font-bold text-black/40 line-clamp-1">
                      {type.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partner Types Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-black flex items-center gap-2">
              <Users className="w-5 h-5 text-[#045138]" />
              Partner Types
            </h2>
            <Button
              size="sm"
              onClick={() => setOpenCreatePartnerType(true)}
              className="h-8 bg-[#045138]/10 hover:bg-[#045138] text-[#045138] hover:text-white border-none rounded-lg text-xs font-black uppercase tracking-wider"
            >
              <Plus className="w-3 h-3 mr-1" /> New
            </Button>
          </div>
          <div className="space-y-3">
            {partnerTypes?.map((type) => (
              <Card
                key={type.reference}
                className="group border-black/5 hover:border-[#045138]/20 bg-white/60 backdrop-blur-xl transition-all shadow-sm hover:shadow-md"
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#045138]/5 flex items-center justify-center text-[#045138] group-hover:bg-[#045138] group-hover:text-white transition-colors">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-sm">
                      {type.name}
                    </h3>
                    <p className="text-[10px] font-bold text-black/40 line-clamp-1">
                      {type.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Manual Modals */}
      {openCreateJournalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl animate-in zoom-in-95 duration-200">
            <Button
              onClick={() => setOpenCreateJournalType(false)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white text-black shadow-lg hover:bg-red-50 hover:text-red-600 z-10"
              size="icon"
            >
              <X className="w-5 h-5" />
            </Button>
            <CreateJournalType
              rolePrefix="finance"
              onSuccess={() => setOpenCreateJournalType(false)}
            />
          </div>
        </div>
      )}

      {openCreatePartnerType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl animate-in zoom-in-95 duration-200">
            <Button
              onClick={() => setOpenCreatePartnerType(false)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white text-black shadow-lg hover:bg-red-50 hover:text-red-600 z-10"
              size="icon"
            >
              <X className="w-5 h-5" />
            </Button>
            <CreatePartnerType
              rolePrefix="finance"
              onSuccess={() => setOpenCreatePartnerType(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
