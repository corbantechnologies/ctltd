"use client";

import { useState, useMemo } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  X,
  Plus,
  Trash2,
  Calculator,
  FileText,
  Search,
  ChevronRight,
  ShieldCheck,
  Building2,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreateQuotation } from "@/hooks/quotations/actions";
import { useFetchProducts } from "@/hooks/products/actions";
import { useFetchLeads } from "@/hooks/leads/actions";
import { useFetchPartners } from "@/hooks/partners/actions";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import { toast } from "react-hot-toast";

interface LineItem {
  product: string;
  description: string;
  quantity: number;
  unit_price: number;
}

interface CreateQuotationModalProps {
  rolePrefix: string;
  initialLead?: { reference: string; name: string };
  initialPartner?: { reference: string; name: string };
  trigger: React.ReactNode;
}

export default function CreateQuotationModal({
  rolePrefix,
  initialLead,
  initialPartner,
  trigger
}: CreateQuotationModalProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Entity, 2: Items, 3: Review

  // Form State
  const [selectedEntity, setSelectedEntity] = useState<{ type: "LEAD" | "PARTNER"; reference: string } | null>(
    initialLead ? { type: "LEAD", reference: initialLead.reference } :
      initialPartner ? { type: "PARTNER", reference: initialPartner.reference } : null
  );
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [expiryDate, setExpiryDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [notes, setNotes] = useState("");
  const [lines, setLines] = useState<LineItem[]>([
    { product: "", description: "", quantity: 1, unit_price: 0 }
  ]);

  // Queries
  const { data: products } = useFetchProducts();
  const { data: leads } = useFetchLeads();
  const { data: partners } = useFetchPartners();
  const createMutation = useCreateQuotation(rolePrefix);

  const totalAmount = useMemo(() => {
    return lines.reduce((sum, line) => sum + (line.quantity * line.unit_price), 0);
  }, [lines]);

  const addLine = () => {
    setLines([...lines, { product: "", description: "", quantity: 1, unit_price: 0 }]);
  };

  const removeLine = (index: number) => {
    if (lines.length === 1) return;
    setLines(lines.filter((_, i) => i !== index));
  };

  const updateLine = (index: number, field: keyof LineItem, value: any) => {
    const newLines = [...lines];
    newLines[index] = { ...newLines[index], [field]: value };

    // Auto-fill price if product selected
    if (field === "product" && products) {
      const product = products.find(p => p.name === value);
      if (product) {
        newLines[index].description = product.description;
        newLines[index].unit_price = product.unit_price;
      }
    }

    setLines(newLines);
  };

  const handleSubmit = async () => {
    if (!selectedEntity) {
      toast.error("Please select a target entity");
      return;
    }

    if (lines.some(l => !l.product || l.quantity <= 0)) {
      toast.error("Please ensure all items have valid product and quantity");
      return;
    }

    const payload = {
      [selectedEntity.type.toLowerCase()]: selectedEntity.reference,
      date,
      expiry_date: expiryDate,
      notes,
      status: "DRAFT",
      lines: lines.map(l => ({
        product: l.product,
        description: l.description,
        quantity: l.quantity,
        unit_price: l.unit_price
      }))
    };

    createMutation.mutate(payload, {
      onSuccess: () => setOpen(false)
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] animate-in fade-in duration-300" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded shadow-2xl z-[101] overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200">

          <div className="flex h-[85vh]">
            {/* Sidebar Progressive Progress */}
            <div className="w-72 bg-slate-50 border-r border-slate-100 p-10 flex flex-col justify-between">
              <div className="space-y-10">
                <div className="w-12 h-12 rounded bg-[#D0402B] flex items-center justify-center text-white shadow-xl shadow-[#D0402B]/20">
                  <FileText className="w-6 h-6" />
                </div>

                <div className="space-y-8">
                  {[
                    { s: 1, l: "Target Selection", i: Users },
                    { s: 2, l: "Line Items", i: Plus },
                    { s: 3, l: "Review & Issue", i: ShieldCheck }
                  ].map((item) => (
                    <div key={item.s} className="flex items-center gap-4 group">
                      <div className={cn(
                        "w-10 h-10 rounded flex items-center justify-center transition-all border-2",
                        step >= item.s ? "bg-slate-900 border-slate-900 text-white shadow-lg" : "bg-white border-slate-100 text-slate-300"
                      )}>
                        <item.i className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", step >= item.s ? "text-slate-900" : "text-slate-300")}>
                          Step 0{item.s}
                        </p>
                        <p className={cn("text-xs font-bold", step >= item.s ? "text-slate-600" : "text-slate-300")}>
                          {item.l}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Calculator className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Running Total</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 tracking-tighter tabular-nums">
                  {totalAmount.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                </p>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
              <div className="p-10 border-b border-slate-100 flex items-center justify-between">
                <Dialog.Title className="text-2xl font-bold text-slate-900 tracking-tight italic">
                  Generate <span className="text-[#D0402B]">Official Quotation</span>
                </Dialog.Title>
                <Dialog.Close className="w-10 h-10 rounded hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                  <X className="w-5 h-5" />
                </Dialog.Close>
              </div>

              <div className="flex-1 overflow-y-auto p-10">
                {step === 1 && (
                  <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Effective Date</label>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full h-14 px-6 rounded bg-slate-50 border-none focus:ring-2 focus:ring-[#D0402B] font-semibold text-sm transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Expiry Date</label>
                        <input
                          type="date"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          className="w-full h-14 px-6 rounded bg-slate-50 border-none focus:ring-2 focus:ring-[#D0402B] font-semibold text-sm transition-all"
                        />
                      </div>
                    </div>

                    {!initialLead && !initialPartner && (
                      <div className="space-y-6">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Target Entity Selection</label>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#D0402B] transition-colors" />
                            <select
                              className="w-full h-16 pl-16 pr-6 rounded bg-slate-50 border-2 border-transparent focus:border-[#D0402B] focus:bg-white appearance-none font-bold text-slate-900 transition-all outline-none"
                              onChange={(e) => {
                                const [type, ref] = e.target.value.split(":");
                                setSelectedEntity({ type: type as any, reference: ref });
                              }}
                            >
                              <option value="">Identify Recipient...</option>
                              <optgroup label="Leads">
                                {leads?.map(l => (
                                  <option key={l.reference} value={`LEAD:${l.reference}`}>{l.first_name} {l.last_name} ({l.company_name})</option>
                                ))}
                              </optgroup>
                              <optgroup label="Partners">
                                {partners?.map(p => (
                                  <option key={p.reference} value={`PARTNER:${p.reference}`}>{p.name}</option>
                                ))}
                              </optgroup>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Corporate Notes (Private)</label>
                      <textarea
                        placeholder="Add strategic context or internal notes..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full h-32 p-6 rounded bg-slate-50 border-none focus:ring-2 focus:ring-[#D0402B] font-medium text-sm resize-none transition-all"
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Inventory Items</p>
                      <button
                        onClick={addLine}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-[#D0402B] transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Dimension
                      </button>
                    </div>

                    <div className="space-y-4">
                      {lines.map((line, index) => (
                        <div key={index} className="bg-slate-50 p-8 rounded border border-slate-100 flex flex-col gap-6 relative group/line transition-all hover:bg-white hover:shadow-xl hover:shadow-black/5 hover:border-[#D0402B]/20">
                          <button
                            onClick={() => removeLine(index)}
                            className="absolute -top-3 -right-3 w-8 h-8 bg-white text-red-500 rounded border border-slate-100 shadow-sm flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover/line:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400 ml-1">Product Origin</label>
                              <select
                                value={line.product}
                                onChange={(e) => updateLine(index, "product", e.target.value)}
                                className="w-full h-12 px-6 rounded bg-white border border-slate-100 focus:border-[#D0402B] transition-all font-bold text-sm outline-none"
                              >
                                <option value="">Select Asset...</option>
                                {products?.map(p => (
                                  <option key={p.reference} value={p.name}>{p.name}</option>
                                ))}
                              </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400 ml-1">Units</label>
                                <input
                                  type="number"
                                  value={line.quantity}
                                  onChange={(e) => updateLine(index, "quantity", parseFloat(e.target.value))}
                                  className="w-full h-12 px-6 rounded bg-white border border-slate-100 focus:border-[#D0402B] transition-all font-bold text-sm"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400 ml-1">Unit Valuation</label>
                                <input
                                  type="number"
                                  value={line.unit_price}
                                  onChange={(e) => updateLine(index, "unit_price", parseFloat(e.target.value))}
                                  className="w-full h-12 px-6 rounded bg-white border border-slate-100 focus:border-[#D0402B] transition-all font-bold text-sm"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400 ml-1">Display Description</label>
                            <input
                              type="text"
                              placeholder="Specify details for the document..."
                              value={line.description}
                              onChange={(e) => updateLine(index, "description", e.target.value)}
                              className="w-full h-12 px-6 rounded bg-white border border-slate-100 focus:border-[#D0402B] transition-all font-medium text-sm"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-10 animate-in slide-in-from-right-4 duration-500">
                    <div className="bg-[#D0402B]/5 p-10 rounded border border-[#D0402B]/10 space-y-8">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Executive Summary</h3>
                        <span className="px-4 py-1.5 bg-slate-900 text-white rounded text-[10px] font-bold uppercase tracking-widest">Draft Review</span>
                      </div>

                      <div className="grid grid-cols-2 gap-10">
                        <div className="space-y-6 border-r border-slate-200 pr-10">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded bg-white flex items-center justify-center text-slate-400 shadow-sm">
                              <Building2 className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Target Recipient</p>
                              <p className="text-sm font-bold text-slate-900">
                                {selectedEntity ? (
                                  selectedEntity.type === "LEAD" ?
                                    leads?.find(l => l.reference === selectedEntity.reference)?.company_name || leads?.find(l => l.reference === selectedEntity.reference)?.first_name :
                                    partners?.find(p => p.reference === selectedEntity.reference)?.name
                                ) : "Not Selection"}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Issuance Validity</p>
                            <p className="text-sm font-bold text-slate-900">{date} — {expiryDate}</p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Dimension Count</p>
                            <p className="text-sm font-bold text-slate-900">{lines.length} Line Items Identified</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Total Obligation</p>
                            <p className="text-2xl font-bold text-[#D0402B] tracking-tight">{totalAmount.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-8 rounded border border-slate-100 italic text-slate-500 text-xs font-medium leading-relaxed">
                      "By issuing this quotation, the document will enter the 'DRAFT' phase. You can later mark it as 'SENT' once the proposal has been delivered to the lead or partner through official channels."
                    </div>
                  </div>
                )}
              </div>

              <div className="p-10 border-t border-slate-100 flex items-center justify-between bg-white">
                <button
                  onClick={() => setStep(s => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className="px-8 py-4 rounded font-bold text-[11px] uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-0 transition-all"
                >
                  Previous Phase
                </button>

                {step < 3 ? (
                  <button
                    onClick={() => setStep(s => s + 1)}
                    className="flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#D0402B] transition-all shadow-xl active:scale-95 group"
                  >
                    Continue Progression
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    disabled={createMutation.isPending}
                    onClick={handleSubmit}
                    className="flex items-center gap-3 px-12 py-5 bg-[#D0402B] text-white rounded font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl shadow-[#D0402B]/20 active:scale-95 disabled:opacity-50"
                  >
                    {createMutation.isPending ? "Generating Record..." : "Authorize Issuance"}
                  </button>
                )}
              </div>
            </div>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
