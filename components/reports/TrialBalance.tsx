import { formatCurrency } from "@/tools/format";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./Card";
import { Separator } from "@/components/ui/separator";

interface TrialBalanceData {
    trial_balance: {
        code: string;
        name: string;
        account_type: string;
        report_role: string;
        debit: number;
        credit: number;
        balance: number;
    }[];
    totals: {
        total_debit: number;
        total_credit: number;
        net_balance: number;
    };
    division: string;
    financial_year: string;
    currency: string;
}

export function TrialBalanceReport({ data }: { data: TrialBalanceData }) {
    return (
        <Card className="h-full overflow-hidden flex flex-col">
            <CardHeader>
                <CardTitle>Trial Balance</CardTitle>
                <CardDescription>{data.division} • {data.financial_year}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto -mx-6 px-6">
                <div className="min-w-[600px]">
                    <div className="grid grid-cols-12 gap-2 border-b border-border pb-2 mb-2 text-xs font-semibold text-corporate-muted uppercase tracking-wider">
                        <div className="col-span-2">Code</div>
                        <div className="col-span-4">Account Name</div>
                        <div className="col-span-2 text-right">Debit</div>
                        <div className="col-span-2 text-right">Credit</div>
                        <div className="col-span-2 text-right">Balance</div>
                    </div>

                    <div className="space-y-1">
                        {data.trial_balance.map((row) => (
                            <div key={row.code} className="grid grid-cols-12 gap-2 py-2 text-sm border-b border-border/40 hover:bg-corporate-secondary/50 transition-colors">
                                <div className="col-span-2 font-mono text-xs text-corporate-muted flex items-center">{row.code}</div>
                                <div className="col-span-4 font-medium truncate" title={row.name}>{row.name}</div>
                                <div className="col-span-2 text-right font-mono text-corporate-muted">{row.debit > 0 ? formatCurrency(row.debit, data.currency) : "-"}</div>
                                <div className="col-span-2 text-right font-mono text-corporate-muted">{row.credit > 0 ? formatCurrency(row.credit, data.currency) : "-"}</div>
                                <div className={`col-span-2 text-right font-mono font-medium ${row.balance < 0 ? "text-red-500" : ""}`}>
                                    {formatCurrency(row.balance, data.currency)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="grid grid-cols-12 gap-2 mt-2 -mx-2 px-2 rounded-lg bg-corporate-secondary/20 font-bold text-sm py-2">
                        <div className="col-span-6">TOTALS</div>
                        <div className="col-span-2 text-right font-mono">{formatCurrency(data.totals.total_debit, data.currency)}</div>
                        <div className="col-span-2 text-right font-mono">{formatCurrency(data.totals.total_credit, data.currency)}</div>
                        <div className="col-span-2 text-right font-mono">{formatCurrency(data.totals.net_balance, data.currency)}</div>
                    </div>
                </div>
            </CardContent>
        </Card >
    );
}
