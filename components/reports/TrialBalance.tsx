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
            <CardContent className="flex-1 -mx-6 px-6">
                <div>
                    <div className="hidden md:grid grid-cols-12 gap-2 border-b border-border pb-2 mb-2 text-xs font-semibold text-corporate-muted uppercase tracking-wider">
                        <div className="col-span-2">Code</div>
                        <div className="col-span-4">Account Name</div>
                        <div className="col-span-2 text-right">Debit</div>
                        <div className="col-span-2 text-right">Credit</div>
                        <div className="col-span-2 text-right">Balance</div>
                    </div>

                    <div className="space-y-4 md:space-y-1">
                        {data.trial_balance.map((row) => (
                            <div key={row.code} className="grid grid-cols-12 gap-2 py-2 text-sm border-b border-border/40 hover:bg-corporate-secondary/50 transition-colors">
                                <div className="col-span-3 md:col-span-2 font-mono text-xs text-corporate-muted flex items-center">{row.code}</div>
                                <div className="col-span-9 md:col-span-4 font-medium truncate flex items-center" title={row.name}>{row.name}</div>

                                <div className="col-span-4 md:col-span-2 text-right font-mono text-corporate-muted flex flex-col md:block">
                                    <span className="text-[10px] uppercase text-corporate-muted md:hidden">Debit</span>
                                    {row.debit > 0 ? formatCurrency(row.debit, data.currency) : "-"}
                                </div>
                                <div className="col-span-4 md:col-span-2 text-right font-mono text-corporate-muted flex flex-col md:block">
                                    <span className="text-[10px] uppercase text-corporate-muted md:hidden">Credit</span>
                                    {row.credit > 0 ? formatCurrency(row.credit, data.currency) : "-"}
                                </div>
                                <div className={`col-span-4 md:col-span-2 text-right font-mono font-medium flex flex-col md:block ${row.balance < 0 ? "text-red-500" : ""}`}>
                                    <span className="text-[10px] uppercase text-corporate-muted md:hidden">Balance</span>
                                    {formatCurrency(row.balance, data.currency)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="grid grid-cols-12 gap-2 mt-2 -mx-2 px-2 rounded-lg bg-corporate-secondary/20 font-bold text-sm py-2">
                        <div className="col-span-12 md:col-span-6 mb-2 md:mb-0">TOTALS</div>
                        <div className="col-span-4 md:col-span-2 text-right font-mono flex flex-col md:block">
                            <span className="text-[10px] uppercase text-corporate-muted md:hidden font-normal">Debit</span>
                            {formatCurrency(data.totals.total_debit, data.currency)}
                        </div>
                        <div className="col-span-4 md:col-span-2 text-right font-mono flex flex-col md:block">
                            <span className="text-[10px] uppercase text-corporate-muted md:hidden font-normal">Credit</span>
                            {formatCurrency(data.totals.total_credit, data.currency)}
                        </div>
                        <div className="col-span-4 md:col-span-2 text-right font-mono flex flex-col md:block">
                            <span className="text-[10px] uppercase text-corporate-muted md:hidden font-normal">Balance</span>
                            {formatCurrency(data.totals.net_balance, data.currency)}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card >
    );
}
