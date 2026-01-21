"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

interface ClaimOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  offerTitle: string;
  offerSlug: string;
}

export function ClaimOfferModal({
  isOpen,
  onClose,
  offerTitle,
  offerSlug,
}: ClaimOfferModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    phone: "",
    whatsapp: "",
    email: "",
    website_url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, offerTitle, offerSlug }),
      });

      if (response.ok) {
        setSuccess(true);
      }
    } catch (error) {
      toast.error("Failed to send notification");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md rounded-[40px] border-none p-12 text-center space-y-8 animate-in zoom-in-95 duration-300 bg-white">
          <div className="w-24 h-24 bg-corporate-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-12 h-12 text-corporate-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Claim Received!</h2>
            <p className="font-bold opacity-60 leading-relaxed">
              Thank you,{" "}
              <span className="text-corporate-primary">
                {formData.userName}
              </span>
              . Our team will contact you shortly via{" "}
              {formData.whatsapp || formData.phone} to finalize your request.
            </p>
          </div>
          <Button
            onClick={onClose}
            className="w-full bg-corporate-primary hover:bg-orange-600 text-white rounded-2xl py-8 font-bold uppercase tracking-widest text-[10px]"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-[48px] border-none p-0 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <div className="relative">
          {/* Header Backdrop */}
          <div className="bg-black p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-corporate-primary/20 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2" />
            <Sparkles className="w-12 h-12 text-corporate-primary mb-6 animate-pulse" />
            <DialogTitle className="text-xl font-bold leading-tight mb-2 tracking-tighter">
              Claim Your Exclusive <br />
              <span className="text-corporate-primary italic">
                Opportunity.
              </span>
            </DialogTitle>
            <DialogDescription className="text-white/40 font-bold uppercase tracking-widest text-[10px]">
              {offerTitle}
            </DialogDescription>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-12 space-y-8 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label
                  htmlFor="userName"
                  className="font-bold uppercase tracking-widest text-[10px] opacity-40 ml-1"
                >
                  Your Full Name
                </Label>
                <Input
                  id="userName"
                  required
                  placeholder="e.g. John Doe"
                  className="rounded-2xl border-black/5 bg-corporate-secondary py-6 px-6 font-bold focus:ring-corporate-primary/30"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-3">
                <Label
                  htmlFor="phone"
                  className="font-bold uppercase tracking-widest text-[10px] opacity-40 ml-1"
                >
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  required
                  placeholder="+254..."
                  className="rounded-2xl border-black/5 bg-corporate-secondary py-6 px-6 font-bold focus:ring-corporate-primary/30"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label
                  htmlFor="whatsapp"
                  className="font-bold uppercase tracking-widest text-[10px] opacity-40 ml-1"
                >
                  WhatsApp (Optional)
                </Label>
                <Input
                  id="whatsapp"
                  placeholder="If different from phone"
                  className="rounded-2xl border-black/5 bg-corporate-secondary py-6 px-6 font-bold"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                />
              </div>
              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="font-bold uppercase tracking-widest text-[10px] opacity-40 ml-1"
                >
                  Email (Optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="For email confirmation"
                  className="rounded-2xl border-black/5 bg-corporate-secondary py-6 px-6 font-bold"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-corporate-primary hover:bg-orange-600 text-white rounded-[24px] py-10 text-xl font-bold shadow-2xl shadow-orange-500/20 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  "Claim This Offer"
                )}
              </Button>
            </div>
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 italic">
              Our team will contact you within 24 hours.
            </p>
            {/* Honeypot field */}
            <Input
              name="website_url"
              className="hidden absolute opacity-0 w-0 h-0 p-0 m-0 -z-50"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website_url}
              onChange={(e) =>
                setFormData({ ...formData, website_url: e.target.value })
              }
            />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
