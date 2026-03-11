import { formatCurrency, formatNumber } from "@/tools/format";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./Card";
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
        <div className="mb-4">
            <h3 className="text-xs font-semibold uppercase text-corporate-foreground mb-2 flex items-center gap-2">
                {title}
                <div className="h-px flex-1 bg-border/50"></div>
            </h3>
            <div className="hidden md:grid grid-cols-3 gap-2 md:gap-2 text-[10px] font-bold text-corporate-muted/60 mb-2 px-1">
                <div>Debit</div>
                <div>Credit</div>
                <div className="text-right">Net</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-2 font-mono text-sm p-5 sm:p-6 md:p-3 rounded-2xl bg-corporate-secondary/40 border border-corporate-secondary/20">
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
        <Card className="h-full rounded">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-black text-xl">Balance Sheet</CardTitle>
                        <CardDescription className="font-bold text-xs uppercase mt-1">{data.division} • {data.financial_year}</CardDescription>
                        <CardDescription className="text-[10px] text-corporate-primary mt-2 bg-corporate-primary/5 px-3 py-1 rounded inline-block border border-corporate-primary/10">
                            Check: {formatCurrency(data.balance_check, data.currency)}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Section title="Assets" section={data.assets} />
                <hr className="my-2 border-black/10" />
                <Section title="Liabilities" section={data.liabilities} />
                <hr className="my-2 border-black/10" />
                <Section title="Equity" section={data.equity} />
                {data.other && (data.other.debit !== 0 || data.other.credit !== 0) && (
                    <>
                        <hr className="my-2 border-black/10" />
                        <Section title="Other" section={data.other} />
                    </>
                )}

                <hr className="my-2 border-black/10" />
                <div className="pt-2">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs italic">Total Assets</span>
                        <span className="font-mono text-xs italic">{formatNumber(data.total_assets)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs italic">Total Liab + Equity</span>
                        <span className="font-mono text-xs italic">{formatNumber(data.total_liabilities_and_equity)}</span>
                    </div>
                </div>
            </CardContent>
        </Card >
    );
}
