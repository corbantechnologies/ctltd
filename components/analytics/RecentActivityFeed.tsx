/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollText } from "lucide-react";

interface RecentActivityFeedProps {
  entries: any[];
}

export default function RecentActivityFeed({
  entries,
}: RecentActivityFeedProps) {
  // Sort by created_at desc and take top 5
  if (!entries) return null;

  const recentEntries = [...entries]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  return (
    <Card className="col-span-1 shadow-xl shadow-black/5 border-none rounded-[32px] bg-white/60 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-black flex items-center gap-2">
          <ScrollText className="w-5 h-5 text-[#045138]" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentEntries.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              No recent activity.
            </p>
          ) : (
            recentEntries.map((entry) => (
              <div
                key={entry.reference}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-black/5 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#045138]/10 flex items-center justify-center text-[#045138] font-bold text-xs uppercase">
                    JE
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-black group-hover:text-[#045138] transition-colors">
                      {entry.notes || "Journal Entry"}
                    </h4>
                    <p className="text-[10px] uppercase font-bold text-black/40">
                      {entry.created_at
                        ? new Date(entry.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm block">
                    {Number(entry.debit).toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-black/30 bg-black/5 px-2 py-0.5 rounded-full">
                    {entry.code}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
