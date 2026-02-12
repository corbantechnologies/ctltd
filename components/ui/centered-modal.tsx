"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CenteredModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
    className?: string;
}

export function CenteredModal({
    open,
    onOpenChange,
    children,
    className,
}: CenteredModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className={cn(
                    "relative w-full max-w-2xl animate-in zoom-in-95 duration-200",
                    className
                )}
            >
                <Button
                    onClick={() => onOpenChange(false)}
                    className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white text-black shadow-lg hover:bg-red-50 hover:text-red-600 z-10"
                    size="icon"
                >
                    <X className="w-5 h-5" />
                </Button>
                {children}
            </div>
        </div>
    );
}
