"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FullScreenModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}

export function FullScreenModal({
    open,
    onOpenChange,
    children,
}: FullScreenModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-200">
            {/* Optional: Add a close button wrapper here if the child form doesn't have one */}
            {/* But since the child forms usually have their own headers/close buttons, we usually just render children */}
            {children}
        </div>
    );
}
