import { formatCurrency, formatNumber } from "@/tools/format";
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
            <CardContent className="flex-1 -mx-4 px-4">
                <div>
                    <div className="hidden md:grid grid-cols-12 gap-2 border-b border-border pb-2 mb-2 text-xs font-semibold text-corporate-muted uppercase tracking-wider">
                        <div className="col-span-6">Account Name</div>
                        <div className="col-span-2 text-right">Debit</div>
                        <div className="col-span-2 text-right">Credit</div>
                        <div className="col-span-2 text-right">Balance</div>
                    </div>

                    <div className="space-y-4 md:space-y-1">
                        {data.trial_balance.map((row) => (
                            <div key={row.code} className="grid grid-cols-12 gap-2 py-2 text-sm border-b border-border/40 hover:bg-corporate-secondary/50 transition-colors">
                                <div className="col-span-12 md:col-span-6 flex items-center font-medium" title={row.name}>
                                    <span className="truncate mr-1">{row.name}</span>
                                    <span className="text-xs text-corporate-muted whitespace-nowrap hidden md:inline-block">- {row.code}</span>
                                    <span className="text-xs text-corporate-muted whitespace-nowrap md:hidden">({row.code})</span>
                                </div>

                                <div className="col-span-4 md:col-span-2 text-right font-mono text-corporate-muted flex flex-col md:block justify-end">
                                    <span className="text-[10px] uppercase text-corporate-muted md:hidden mb-1 text-green-500">Debit</span>
                                    <span className="text-xs md:text-sm">{row.debit > 0 ? formatNumber(row.debit) : "-"}</span>
                                </div>
                                <div className="col-span-4 md:col-span-2 text-right font-mono text-corporate-muted flex flex-col md:block justify-end">
                                    <span className="text-[10px] uppercase text-corporate-muted md:hidden mb-1 text-red-500">Credit</span>
                                    <span className="text-xs md:text-sm">{row.credit > 0 ? formatNumber(row.credit) : "-"}</span>
                                </div>
                                <div className={`col-span-4 md:col-span-2 text-right font-mono font-medium flex flex-col md:block justify-end ${row.balance < 0 ? "text-red-500" : ""}`}>
                                    <span className="text-[10px] uppercase text-corporate-muted md:hidden mb-1">Balance</span>
                                    <span className="text-xs md:text-sm">{formatNumber(row.balance)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="grid grid-cols-12 gap-2 mt-2 -mx-2 px-2 rounded-lg bg-corporate-secondary/20 font-bold text-sm py-2">
                        <div className="col-span-12 md:col-span-6 mb-2 md:mb-0">TOTALS</div>
                        <div className="col-span-4 md:col-span-2 text-right font-mono flex flex-col md:block">
                            <span className="text-[8px] uppercase text-corporate-muted md:hidden font-normal">Debit</span>
                            {formatNumber(data.totals.total_debit)}
                        </div>
                        <div className="col-span-4 md:col-span-2 text-right font-mono flex flex-col md:block">
                            <span className="text-[8px] uppercase text-corporate-muted md:hidden font-normal">Credit</span>
                            {formatNumber(data.totals.total_credit)}
                        </div>
                        <div className="col-span-4 md:col-span-2 text-right font-mono flex flex-col md:block">
                            <span className="text-[8px] uppercase text-corporate-muted md:hidden font-normal">Balance</span>
                            {formatNumber(data.totals.net_balance)}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card >
    );
}
