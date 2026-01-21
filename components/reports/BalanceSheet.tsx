import { formatCurrency } from "@/tools/format";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./Card";
import { Separator } from "@/components/ui/separator";

interface BalanceCheckData {
    assets: SectionData;
    liabilities: SectionData;
    equity: SectionData;
    other: SectionData;
    total_assets: number;
    total_liabilities_and_equity: number;
    balance_check: number;
    division: string;
    financial_year: string;
    currency: string;
}

interface SectionData {
    debit: number;
    credit: number;
    net: number;
}

export function BalanceSheetReport({ data }: { data: BalanceCheckData }) {
    const Section = ({ title, section }: { title: string; section: SectionData }) => (
        <div className="mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-corporate-muted mb-3 flex items-center gap-2">
                {title}
                <div className="h-px flex-1 bg-border/50"></div>
            </h4>
            <div className="grid grid-cols-3 gap-4 text-sm mb-2 px-1">
                <div className="text-corporate-muted">Debit</div>
                <div className="text-corporate-muted">Credit</div>
                <div className="text-right font-medium text-corporate-foreground">Net</div>
            </div>
            <div className="grid grid-cols-3 gap-4 font-mono text-sm p-2 rounded-lg bg-corporate-secondary/50">
                <div>{formatCurrency(section.debit, data.currency)}</div>
                <div>{formatCurrency(section.credit, data.currency)}</div>
                <div className={`text-right font-bold ${section.net < 0 ? "text-red-500" : ""}`}>
                    {formatCurrency(section.net, data.currency)}
                </div>
            </div>
        </div>
    );

    return (
        <Card className="h-full">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Balance Sheet</CardTitle>
                        <CardDescription>{data.division} • {data.financial_year}</CardDescription>
                    </div>
                    <div className={`text-sm px-3 py-1 rounded-full ${data.balance_check !== 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                        Check: {formatCurrency(data.balance_check, data.currency)}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Section title="Assets" section={data.assets} />
                <Separator className="my-6" />
                <Section title="Liabilities" section={data.liabilities} />
                <Separator className="my-6" />
                <Section title="Equity" section={data.equity} />
                {data.other && (data.other.debit !== 0 || data.other.credit !== 0) && (
                    <>
                        <Separator className="my-6" />
                        <Section title="Other" section={data.other} />
                    </>
                )}

                <Separator className="my-8" />
                <div className="pt-2">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Total Assets</span>
                        <span className="font-mono font-bold">{formatCurrency(data.total_assets, data.currency)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Total Liab + Equity</span>
                        <span className="font-mono font-bold">{formatCurrency(data.total_liabilities_and_equity, data.currency)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
