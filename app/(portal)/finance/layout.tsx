"use client";

import { useState } from "react";
import CreateJournalType from "@/forms/journaltypes/CreateJournalType";
import CreatePartnerType from "@/forms/partnertypes/CreatePartnerType";
import { X, Settings2, Users } from "lucide-react";

export default function FinanceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [openCreateJournalType, setOpenCreateJournalType] = useState(false);
    const [openCreatePartnerType, setOpenCreatePartnerType] = useState(false);

    return (
        <div className="relative min-h-screen">
            {children}

            <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-40">
                <button
                    onClick={() => setOpenCreateJournalType(true)}
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded shadow-lg border border-black/5 hover:bg-black hover:text-white transition-all shadow-black/10 group"
                >
                    <span className="text-xs font-semibold uppercase tracking-widest hidden group-hover:block transition-all">New Journal Type</span>
                    <Settings2 className="w-5 h-5 flex-shrink-0" />
                </button>
                <button
                    onClick={() => setOpenCreatePartnerType(true)}
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded shadow-lg border border-black/5 hover:bg-black hover:text-white transition-all shadow-black/10 group"
                >
                    <span className="text-xs font-semibold uppercase tracking-widest hidden group-hover:block transition-all">New Partner Type</span>
                    <Users className="w-5 h-5 flex-shrink-0" />
                </button>
            </div>

            {/* Manual Modals - Global for Finance Section */}
            {openCreateJournalType && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-2xl animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setOpenCreateJournalType(false)}
                            className="absolute -top-4 -right-4 w-10 h-10 rounded bg-white text-black shadow-lg hover:bg-red-50 hover:text-red-600 z-10 flex items-center justify-center"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
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
                        <button
                            onClick={() => setOpenCreatePartnerType(false)}
                            className="absolute -top-4 -right-4 w-10 h-10 rounded bg-white text-black shadow-lg hover:bg-red-50 hover:text-red-600 z-10 flex items-center justify-center"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
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
