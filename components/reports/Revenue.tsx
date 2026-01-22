import { formatCurrency, formatPercent } from "@/tools/format";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./Card";
import { Separator } from "@/components/ui/separator";

interface RevenueData {
    group_total_revenue: number;
    breakdown: {
        division: string;
        revenue: number;
    }[];
    financial_year: string;
    currency: string;
    warning: string | null;
}

export function RevenueReport({ data }: { data: RevenueData }) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>{data.financial_year}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-6 flex flex-col">
                    <span className="text-sm font-medium text-corporate-muted">Total Group Revenue</span>
                    <span className="text-3xl font-bold font-mono">{formatCurrency(data.group_total_revenue, data.currency)}</span>
                </div>

                <Separator className="mb-6" />

                <div className="space-y-4">
                    {data.breakdown.map((item, idx) => {
                        const percent = data.group_total_revenue ? (item.revenue / data.group_total_revenue) : 0;
                        return (
                            <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-sm gap-4">
                                    <span className="font-medium">{item.division}</span>
                                    <span className="font-mono">{formatCurrency(item.revenue, data.currency)}</span>
                                </div>
                                <div className="h-2 w-full bg-corporate-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-corporate-primary rounded-full"
                                        style={{ width: `${percent * 100}%` }}
                                    />
                                </div>
                                <div className="text-right text-xs text-corporate-muted">{formatPercent(percent)}</div>
                            </div>
                        );
                    })}
                </div>

                {data.warning && (
                    <div className="mt-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start gap-2">
                        <span>⚠️</span>
                        <span>{data.warning}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
