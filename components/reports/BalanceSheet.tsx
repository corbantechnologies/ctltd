import { formatCurrency, formatNumber } from "@/tools/format";
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
            <h4 className="text-xs font-black uppercase tracking-wider text-corporate-foreground mb-3 flex items-center gap-2">
                {title}
                <div className="h-px flex-1 bg-border/50"></div>
            </h4>
            <div className="hidden md:grid grid-cols-3 gap-4 text-sm mb-2 px-1">
                <div className="text-corporate-muted">Debit</div>
                <div className="text-corporate-muted">Credit</div>
                <div className="text-right font-medium text-corporate-foreground">Net</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 font-mono text-sm p-4 md:p-2 rounded-lg bg-corporate-secondary/50">
                <div className="flex justify-between md:block">
                    <span className="md:hidden text-corporate-muted font-sans">Debit:</span>
                    {formatNumber(section.debit)}
                </div>
                <div className="flex justify-between md:block">
                    <span className="md:hidden text-corporate-muted font-sans">Credit:</span>
                    {formatNumber(section.credit)}
                </div>
                <div className={`flex justify-between md:block md:text-right font-bold ${section.net < 0 ? "text-red-500" : ""}`}>
                    <span className="md:hidden text-corporate-muted font-sans">Net:</span>
                    {formatNumber(section.net)}
                </div>
            </div>
        </div>
    );

    return (
        <Card className="h-full">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-black">Balance Sheet</CardTitle>
                        <CardDescription>{data.division} • {data.financial_year}</CardDescription>
                        <CardDescription className="text-xs text-corporate-muted">Check: {formatCurrency(data.balance_check, data.currency)}</CardDescription>
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
                        <span className="font-mono font-bold">{formatNumber(data.total_assets)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Total Liab + Equity</span>
                        <span className="font-mono font-bold">{formatNumber(data.total_liabilities_and_equity)}</span>
                    </div>
                </div>
            </CardContent>
        </Card >
    );
}
