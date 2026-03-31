"use client";

import { useFetchBalanceSheet, useFetchCashBalance, useFetchPNL, useFetchRevenue, useFetchTrialBalance } from "@/hooks/reports/actions";
import { MetricCard } from "./MetricCard";
import { CalendarRange, DollarSignIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react";
import { PnLReport } from "./PnL";
import { RevenueReport } from "./Revenue";
import { BalanceSheetReport } from "./BalanceSheet";
import { TrialBalanceReport } from "./TrialBalance";
import LoadingSpinner from "@/components/portal/LoadingSpinner";


function ErrorMessage({ message }: { message: string }) {
    return <div className="p-4 rounded bg-red-50 text-red-600 text-sm border border-red-100">{message}</div>;
}

export default function ReportsDashboard({ rolePrefix = "director" }: { rolePrefix?: string }) {
    // Fetch all data
    const { data: cashData, isLoading: isCashLoading, isError: isCashError } = useFetchCashBalance();
    const { data: pnlData, isLoading: isPnlLoading, isError: isPnlError } = useFetchPNL();
    const { data: revenueData, isLoading: isRevenueLoading, isError: isRevenueError } = useFetchRevenue();
    const { data: bsData, isLoading: isBsLoading, isError: isBsError } = useFetchBalanceSheet();
    const { data: tbData, isLoading: isTbLoading, isError: isTbError } = useFetchTrialBalance();

    const isLoading = isCashLoading || isPnlLoading || isRevenueLoading || isBsLoading || isTbLoading;
    const isError = isCashError || isPnlError || isRevenueError || isBsError || isTbError;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <LoadingSpinner />
            </div>
        );
    }

    if (isError) {
        return <ErrorMessage message="Failed to load reports. Please try again later." />;
    }

    return (
        <div className="space-y-10 p-4 sm:p-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm">
                        <CalendarRange className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 tracking-tight">Audit & Period Reports</h3>
                        <p className="text-slate-400 text-[11px] font-medium uppercase tracking-widest mt-0.5">Monthly Financial Snapshots</p>
                    </div>
                </div>
                <a 
                    href={`/${rolePrefix}/fiscal-years`}
                    className="px-6 py-3 rounded-xl bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-900/20 active:scale-95"
                >
                    View Audit Trail
                </a>
            </div>

            <div>
                <h2 className="font-semibold tracking-tight text-corporate-foreground">Financial Summaries</h2>
                <p className="text-slate-400 text-sm mt-1">Real-time overview of your financial performance and position.</p>
            </div>

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {cashData && (
                    <MetricCard
                        title="Cash Balance"
                        value={cashData.cash_balance}
                        currency={cashData.currency}
                        icon={WalletIcon}
                        description="Total available cash"
                    />
                )}
                {pnlData && (
                    <MetricCard
                        title="Net Profit"
                        value={pnlData.net_profit}
                        currency={pnlData.currency}
                        icon={TrendingUpIcon}
                        description="Net income for the period"
                    />
                )}
                {revenueData && (
                    <MetricCard
                        title="Total Revenue"
                        value={revenueData.group_total_revenue}
                        currency={revenueData.currency}
                        icon={DollarSignIcon}
                        description="Gross revenue generated"
                    />
                )}
                {pnlData && (
                    <MetricCard
                        title="Total Expenses"
                        value={pnlData.operating_expenses + pnlData.cost_of_sales}
                        currency={pnlData.currency}
                        icon={TrendingDownIcon}
                        description="Operating + COGS"
                    />
                )}
            </div>

            {/* Main Content Areas */}
            <div className="tabs-container">
                {/* I'll use a simple layout first, maybe tabs later if needed. But dashboard is nice. */}
                {/* Split View: PnL and Revenue */}
                <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-8 mb-6">
                    <div className="col-span-4">
                        {pnlData && <PnLReport data={pnlData} />}
                    </div>
                    <div className="col-span-4">
                        {revenueData && <RevenueReport data={revenueData} />}
                    </div>
                </div>

                {/* Balance Sheet */}
                <div className="mb-6">
                    {bsData && <BalanceSheetReport data={bsData} />}
                </div>

                {/* Trial Balance */}
                <div className="mb-6">
                    {tbData && <TrialBalanceReport data={tbData} />}
                </div>
            </div>
        </div>
    );
}
