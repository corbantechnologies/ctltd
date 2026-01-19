"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface Action {
    icon: any;
    label: string;
    onClick: () => void;
}

interface SpeedDialProps {
    actions: Action[];
}

export default function SpeedDial({ actions }: SpeedDialProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {open && (
                <div className="flex flex-col items-end gap-3 animate-in slide-in-from-bottom-5 fade-in duration-200">
                    {actions.map((action, i) => (
                        <TooltipProvider key={i}>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            action.onClick();
                                            setOpen(false);
                                        }}
                                        className="h-12 w-12 rounded-full bg-white text-black border border-black/5 shadow-lg hover:bg-gray-50 transition-all flex items-center justify-center p-0"
                                    >
                                        <action.icon className="h-5 w-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="left" className="font-bold">
                                    {action.label}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                </div>
            )}
            <Button
                size="lg"
                onClick={() => setOpen(!open)}
                className={`h-14 w-14 rounded-full shadow-xl transition-all duration-300 ${open ? "bg-red-500 hover:bg-red-600 rotate-45" : "bg-[#045138] hover:bg-[#045138]/90"
                    }`}
            >
                <Plus className="h-6 w-6 text-white" />
            </Button>
        </div>
    );
}
