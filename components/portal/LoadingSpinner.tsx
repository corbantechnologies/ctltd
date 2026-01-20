"use client";

import { Loader } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div
      className="
        fixed inset-0 
        z-50 
        flex items-center justify-center 
        bg-white/70 dark:bg-neutral-950/70 
        backdrop-blur-sm
      "
    >
      <Loader className="h-12 w-12 animate-spin text-corporate-primary" />
    </div>
  );
}
