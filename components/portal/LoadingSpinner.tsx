"use client";

import { Loader } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <Loader className="h-10 w-10 animate-spin text-corporate-primary" />
    </div>
  );
}
