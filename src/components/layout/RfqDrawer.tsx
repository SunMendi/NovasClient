import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Product, Vessel, ConsultancyService } from "../../types";
import { ShieldCheck, CheckCircle2, Copy, Send, Trash2, Plus, Loader2 } from "lucide-react";
import { api } from "../../services/api";

export type RfqItem = Product | Vessel | ConsultancyService | { id: string; name: string; category: string };

interface RfqDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialItem?: RfqItem | null;
}

export const RfqDrawer: React.FC<RfqDrawerProps> = ({
  open,
  onOpenChange,
  initialItem,
}) => {
  const [selectedItems, setSelectedItems] = useState<{ id: string; name: string; type: string }[]>([]);
  const [organization, setOrganization] = useState("");
  const [department, setDepartment] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryPort, setDeliveryPort] = useState("Chattogram Port (Seaport)");
  const [timeframe, setTimeframe] = useState("60–90 Days (Standard)");
  const [endUserConfirmed, setEndUserConfirmed] = useState(false);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialItem) {
      setSelectedItems((prev) => {
        if (prev.some((item) => item.id === initialItem.id)) return prev;
        let itemType = "Equipment";
        if ("vesselType" in initialItem) {
          itemType = "Vessel";
        } else if ("categoryId" in initialItem) {
          itemType = `Consultancy: ${initialItem.categoryName}`;
        } else if ("category" in initialItem) {
          itemType = initialItem.category;
        }
        return [...prev, { id: initialItem.id, name: initialItem.name, type: itemType }];
      });
    }
  }, [initialItem]);

  const handleRemoveItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);
    try {
      const res = await api.submitRFQ({
        organizationName: organization,
        department,
        contactName,
        email,
        phone,
        deliveryPort,
        timeframe,
        endUserConfirmed,
        notes,
        items: selectedItems.map((item) => ({
          name: item.name,
          type: item.type,
          quantity: 1
        }))
      });
      setReferenceCode(res.referenceId);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Could not submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referenceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedItems([]);
    setOrganization("");
    setDepartment("");
    setContactName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setEndUserConfirmed(false);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col h-full overflow-y-auto bg-white text-[#133057]">
        <SheetHeader className="text-left border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-[#ed145b] font-mono text-xs uppercase tracking-wider font-semibold">
            <ShieldCheck className="size-4" />
            <span>Procurement &amp; Quotation Gateway</span>
          </div>
          <SheetTitle className="text-2xl font-bold font-display text-[#002e6e]">
            Request Formal Quotation (RFQ)
          </SheetTitle>
          <SheetDescription className="text-slate-500 text-xs">
            Submit your technical requirement for defense, maritime equipment, or custom shipyard vessel construction.
          </SheetDescription>
        </SheetHeader>

        {submitted ? (
          <div className="my-auto flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="grid size-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <CheckCircle2 className="size-8" />
            </div>
            <Badge variant="verified">SUBMISSION CONFIRMED</Badge>
            <h3 className="font-display text-2xl font-bold text-[#002e6e]">
              Tender RFQ Dispatched
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Your inquiry has been assigned to our procurement advisory unit. Our technical officer will review specifications and return a formal commercial proposal within 24–48 hours.
            </p>

            <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm space-y-1">
              <span className="text-xs text-slate-500 uppercase font-semibold">OFFICIAL TRACKING REFERENCE</span>
              <div className="flex items-center justify-center gap-3">
                <span className="text-lg font-bold text-[#ed145b]">{referenceCode}</span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="rounded p-1 text-slate-500 hover:text-[#002e6e] hover:bg-slate-200"
                  title="Copy reference code"
                >
                  <Copy className="size-4" />
                </button>
              </div>
              {copied && <span className="text-[10px] text-emerald-600 font-medium">Copied to clipboard</span>}
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full border-slate-300 text-[#002e6e]">
              Close &amp; Return to Portal
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 space-y-6 pt-4">
            {submitError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700 whitespace-pre-line">{submitError}</p>}
            {/* Selected Items / Cart */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold">
                  Target Equipment / Vessels ({selectedItems.length})
                </span>
                {selectedItems.length === 0 && (
                  <span className="text-xs text-[#ed145b] font-medium">General inquiry</span>
                )}
              </div>

              {selectedItems.length > 0 ? (
                <div className="space-y-2">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px] py-0">
                          {item.type}
                        </Badge>
                        <span className="font-semibold text-[#002e6e]">{item.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-slate-400 hover:text-[#ed145b] transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  No specific product pre-selected. Detail your specifications in the scope notes below.
                </p>
              )}
            </div>

            {/* Procurement Entity Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#002e6e] border-b border-slate-200 pb-1">
                1. Institutional Entity
              </h4>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label htmlFor="org" className="text-xs font-semibold text-slate-700">
                    Organization / Command *
                  </label>
                  <Input
                    id="org"
                    required
                    placeholder="e.g. Bangladesh Navy / Port Authority"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="dept" className="text-xs font-semibold text-slate-700">
                    Department / Division
                  </label>
                  <Input
                    id="dept"
                    placeholder="e.g. Directorate General Purchase"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="space-y-1 sm:col-span-1">
                  <label htmlFor="contact" className="text-xs font-semibold text-slate-700">
                    Contact Officer *
                  </label>
                  <Input
                    id="contact"
                    required
                    placeholder="Full Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                  />
                </div>

                <div className="space-y-1 sm:col-span-1">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-700">
                    Official Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="officer@domain.gov.bd"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-1 sm:col-span-1">
                  <label htmlFor="phone" className="text-xs font-semibold text-slate-700">
                    Phone / Signal *
                  </label>
                  <Input
                    id="phone"
                    required
                    placeholder="+880 1700..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Logistics & Delivery Options */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#002e6e] border-b border-slate-200 pb-1">
                2. Delivery &amp; Logistics Parameters
              </h4>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label htmlFor="port" className="text-xs font-semibold text-slate-700">
                    Designated Port of Entry
                  </label>
                  <select
                    id="port"
                    value={deliveryPort}
                    onChange={(e) => setDeliveryPort(e.target.value)}
                    className="flex h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-[#133057] focus:bg-white focus:border-[#ed145b] focus:outline-none"
                  >
                    <option value="Chattogram Port (Seaport)">Chattogram Port (Seaport)</option>
                    <option value="Mongla Port (Seaport)">Mongla Port (Seaport)</option>
                    <option value="Payra Port (Deep Sea)">Payra Port (Deep Sea)</option>
                    <option value="Hazrat Shahjalal Airport (Air Cargo)">Hazrat Shahjalal Int'l Airport (Air)</option>
                    <option value="Direct Shipyard Delivery">Direct Shipyard Delivery</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="timeframe" className="text-xs font-semibold text-slate-700">
                    Required Delivery Window
                  </label>
                  <select
                    id="timeframe"
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="flex h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-[#133057] focus:bg-white focus:border-[#ed145b] focus:outline-none"
                  >
                    <option value="Immediate Urgent (30 Days)">Immediate Urgent (30 Days)</option>
                    <option value="60–90 Days (Standard)">60–90 Days (Standard)</option>
                    <option value="Scheduled Tender (6–12 Months)">Scheduled Tender (6–12 Months)</option>
                    <option value="Custom Naval Construction (12–18 Months)">Custom Naval Construction (12–18 Months)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="notes" className="text-xs font-semibold text-slate-700">
                  Detailed Operational Scope &amp; Specs
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="Detail exact quantities, ballistic rating, propulsion options, or custom vessel modifications required..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-[#133057] placeholder:text-slate-400 focus:bg-white focus:border-[#ed145b] focus:outline-none"
                />
              </div>

              {/* End-User Compliance Check */}
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                <input
                  type="checkbox"
                  id="endUser"
                  checked={endUserConfirmed}
                  onChange={(e) => setEndUserConfirmed(e.target.checked)}
                  required
                  className="mt-0.5 size-4 rounded border-slate-300 accent-[#ed145b]"
                />
                <label htmlFor="endUser" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                  I certify that this inquiry is for legitimate institutional, government, or authorized corporate procurement, and agree to provide official End-User Certificates (EUC) if required.
                </label>
              </div>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={isSubmitting}
              className="w-full gap-2 font-bold bg-[#ed145b] hover:bg-[#d00f4e] text-white shadow-crimson disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Submitting RFQ to Defense Procurement...</span>
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  <span>Submit RFQ for Commercial Scoping</span>
                </>
              )}
            </Button>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
};
