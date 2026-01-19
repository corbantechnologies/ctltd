"use client";

import { useState } from "react";
import SpeedDial from "@/components/ui/SpeedDial";
import CreateJournalType from "@/forms/journaltypes/CreateJournalType";
import CreatePartnerType from "@/forms/partnertypes/CreatePartnerType";
import { Button } from "@/components/ui/button";
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

            <SpeedDial
                actions={[
                    {
                        icon: Settings2,
                        label: "New Journal Type",
                        onClick: () => setOpenCreateJournalType(true),
                    },
                    {
                        icon: Users,
                        label: "New Partner Type",
                        onClick: () => setOpenCreatePartnerType(true),
                    },
                ]}
            />

            {/* Manual Modals - Global for Finance Section */}
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
