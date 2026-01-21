"use client"

import { apiActions } from "@/tools/axios";
import { AxiosResponse } from "axios";

interface PnL {
    revenue: number;
    cost_of_sales: number;
    gross_profit: number;
    operating_expenses: number;
    net_profit: number;
    division: string;
    financial_year: string;
    currency: string;
}

interface BalanceSheet {
    assets: {
        debit: number;
        credit: number;
        net: number;
    };
    liabilities: {
        debit: number;
        credit: number;
        net: number;
    };
    equity: {
        debit: number;
        credit: number;
        net: number;
    };
    other: {
        debit: number;
        credit: number;
        net: number;
    };
    total_assets: number;
    total_liabilities_and_equity: number;
    balance_check: number;
    division: string;
    financial_year: string;
    currency: string;
}

interface TrialBalance {
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

interface Revenue {
    group_total_revenue: number;
    breakdown: {
        division: string;
        revenue: number;
    }[];
    financial_year: string;
    currency: string;
    warning: string | null;
}

interface CashBalance {
    cash_balance: number;
    currency: string;
    division: string;
    financial_year: string;
}

export const getPNL = async (headers: { headers: { Authorization: string } }): Promise<PnL> => {
    const response: AxiosResponse<PnL> = await apiActions.get(`/api/v1/reports/pnl/`, headers);
    return response.data;
}

export const getBalanceSheet = async (headers: { headers: { Authorization: string } }): Promise<BalanceSheet> => {
    const response: AxiosResponse<BalanceSheet> = await apiActions.get(`/api/v1/reports/balance-sheet/`, headers);
    return response.data;
}

export const getTrialBalance = async (headers: { headers: { Authorization: string } }): Promise<TrialBalance> => {
    const response: AxiosResponse<TrialBalance> = await apiActions.get(`/api/v1/reports/trial-balance/`, headers);
    return response.data;
}

export const getRevenue = async (headers: { headers: { Authorization: string } }): Promise<Revenue> => {
    const response: AxiosResponse<Revenue> = await apiActions.get(`/api/v1/reports/revenue/`, headers);
    return response.data;
}

export const getCashBalance = async (headers: { headers: { Authorization: string } }): Promise<CashBalance> => {
    const response: AxiosResponse<CashBalance> = await apiActions.get(`/api/v1/reports/cash-balance/`, headers);
    return response.data;
}