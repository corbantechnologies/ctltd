"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    X,
    Calendar,
    User,
    Book,
    CreditCard,
    FileText,
    Building2,
    Briefcase,
    Hash,
    DollarSign,
    Globe,
    File
} from "lucide-react";
import { JournalEntry } from "@/services/journalentries";

interface JournalEntryDetailModalProps {
    entry: JournalEntry | null;
    open: boolean;
    onClose: () => void;
}

export default function JournalEntryDetailModal({
    entry,
    open,
    onClose,
}: JournalEntryDetailModalProps) {
    if (!entry) return null;

    const DetailItem = ({ icon: Icon, label, value, className = "" }: any) => (
        <div className={`flex flex-col gap-1 ${className}`}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                <Icon className="w-3 h-3" />
                {label}
            </span>
            <span className="text-sm font-medium text-gray-900 break-words">{value || "—"}</span>
        </div>
    );

    const formatCurrency = (amount: string | number, currency: string) => {
        const val = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: currency,
        }).format(val);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-white rounded-2xl shadow-2xl border border-gray-100">
                <DialogHeader className="p-6 border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1.5">
                            <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                                {entry.code}
                            </Badge>
                            <DialogTitle className="text-xl font-bold text-gray-900">
                                Journal Entry Details
                            </DialogTitle>
                            <DialogDescription className="text-xs text-gray-500">
                                Created on {new Date(entry.created_at).toLocaleString()}
                            </DialogDescription>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="rounded-full hover:bg-gray-100 -mr-2 -mt-2"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </DialogHeader>

                <div className="p-6 space-y-8">
                    {/* Financials Section */}
                    <section className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            Financials
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                            <DetailItem
                                icon={DollarSign}
                                label="Debit"
                                value={formatCurrency(entry.debit, entry.currency)}
                                className="text-gray-900"
                            />
                            <DetailItem
                                icon={DollarSign}
                                label="Credit"
                                value={formatCurrency(entry.credit, entry.currency)}
                                className="text-gray-900"
                            />
                            <DetailItem
                                icon={Globe}
                                label="Currency"
                                value={entry.currency}
                            />
                            <DetailItem
                                icon={Hash}
                                label="Ex. Rate"
                                value={entry.exchange_rate}
                            />
                        </div>
                        {(parseFloat(entry.foreign_debit) > 0 || parseFloat(entry.foreign_credit) > 0) && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-4 bg-blue-50/30 rounded-xl border border-blue-100">
                                <DetailItem
                                    icon={Globe}
                                    label="Foreign Debit"
                                    value={formatCurrency(entry.foreign_debit, "USD")} // Assuming simplified display, ideally currency code should be dynamic if available for foreign
                                />
                                <DetailItem
                                    icon={Globe}
                                    label="Foreign Credit"
                                    value={formatCurrency(entry.foreign_credit, "USD")}
                                />
                            </div>
                        )}
                    </section>

                    <Separator />

                    {/* Entity & Classification */}
                    <section className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-blue-600" />
                            Entity & Classification
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                            <DetailItem
                                icon={Book}
                                label="Account Book"
                                value={entry.book}
                            />
                            <DetailItem
                                icon={Briefcase}
                                label="Partner"
                                value={entry.partner}
                            />
                            <DetailItem
                                icon={Building2}
                                label="Division"
                                value={entry.division}
                            />
                            <DetailItem
                                icon={User}
                                label="Created By"
                                value={entry.created_by}
                            />
                        </div>
                    </section>

                    <Separator />

                    {/* Documentation */}
                    <section className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-orange-600" />
                            Documentation
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                            <DetailItem
                                icon={CreditCard}
                                label="Payment Method"
                                value={entry.payment_method}
                            />
                            <DetailItem
                                icon={FileText}
                                label="Source Document"
                                value={`${entry.source_document} ${entry.document_number ? `#${entry.document_number}` : ''}`}
                            />
                            {entry.document_file && (
                                <div className="sm:col-span-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5 mb-2">
                                        <File className="w-3 h-3" />
                                        Attachment
                                    </span>
                                    <a
                                        href={entry.document_file}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                                    >
                                        <FileText className="w-4 h-4" />
                                        View Attached Document
                                    </a>
                                </div>
                            )}
                        </div>
                    </section>

                    <Separator />

                    {/* Notes */}
                    <section className="space-y-2">
                        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-600" />
                            Notes / Description
                        </h4>
                        <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-700 leading-relaxed border border-gray-100">
                            {entry.notes || "No additional notes provided for this entry."}
                        </div>
                    </section>
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <Button onClick={onClose} variant="outline" className="font-bold">
                        Close Details
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
