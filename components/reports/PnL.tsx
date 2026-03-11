import { formatCurrency } from "@/tools/format";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./Card";

interface PnLData {
    revenue: number;
    cost_of_sales: number;
    gross_profit: number;
    operating_expenses: number;
    net_profit: number;
    division: string;
    financial_year: string;
    currency: string;
}

export function PnLReport({ data }: { data: PnLData }) {
    const Row = ({ label, value, bold = false, net = false }: { label: string; value: number; bold?: boolean; net?: boolean }) => (
        <div className={`flex justify-between items-center py-0.5 gap-4 ${bold ? "" : ""} ${net ? "bg-corporate-primary/5 px-2 rounded -mx-2" : ""}`}>
            <span className="text-sm">{label}</span>
            <span className={`font-mono text-sm ${value < 0 ? "text-red-500" : ""} ${net ? "text-corporate-primary" : ""}`}>
                {formatCurrency(value, data.currency)}
            </span>
        </div>
    );

    return (
        <Card className="h-full rounded">
            <CardHeader>
                <CardTitle>Profit & Loss</CardTitle>
                <CardDescription>{data.division} • {data.financial_year}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1 p-1 sm:p-1">
                <Row label="Revenue" value={data.revenue} />
                <Row label="Cost of Sales" value={data.cost_of_sales} />
                <hr className="my-2 border-black/10" />
                <Row label="Gross Profit" value={data.gross_profit} bold />
                <Row label="Operating Expenses" value={data.operating_expenses} />
                <hr className="my-2 border-black/10" />
                <Row label="Net Profit" value={data.net_profit} bold net />
            </CardContent>
        </Card>
    );
}
