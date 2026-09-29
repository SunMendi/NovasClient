import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Product, Vessel } from "../../types";
import { ShieldCheck, CheckCircle2, Copy, Send, Trash2, Plus } from "lucide-react";

interface RfqDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialItem?: Product | Vessel | null;
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

  useEffect(() => {
    if (initialItem) {
      setSelectedItems((prev) => {
        if (prev.some((item) => item.id === initialItem.id)) return prev;
        return [...prev, { id: initialItem.id, name: initialItem.name, type: "vesselType" in initialItem ? "Vessel" : initialItem.category }];
      });
    }
  }, [initialItem]);

  const handleRemoveItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `RFQ-NOVAS-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceCode(code);
    setSubmitted(true);
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
      <SheetContent side="right" className="flex flex-col h-full overflow-y-auto">
        <SheetHeader className="text-left border-b border-border/70 pb-4">
          <div className="flex items-center gap-2 text-amber-signal font-mono text-xs uppercase tracking-wider font-semibold">
            <ShieldCheck className="size-4" />
            <span>Procurement & Quotation Gateway</span>
          </div>
          <SheetTitle className="text-2xl font-bold font-display text-ink">
            Request Formal Quotation (RFQ)
          </SheetTitle>
          <SheetDescription className="text-metal text-xs">
            Submit your technical requirement for defense, maritime equipment, or custom shipyard vessel construction.
          </SheetDescription>
        </SheetHeader>

        {submitted ? (
          <div className="my-auto flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="grid size-16 place-items-center rounded-2xl bg-sonar/15 text-sonar border border-sonar/30 shadow-sonar">
              <CheckCircle2 className="size-8" />
            </div>
            <Badge variant="verified">SUBMISSION CONFIRMED</Badge>
            <h3 className="font-display text-2xl font-bold text-ink">
              Tender RFQ Dispatched
            </h3>
            <p className="text-sm text-metal leading-relaxed max-w-sm">
              Your inquiry has been assigned to our procurement advisory unit. Our technical officer will review specifications and return a formal commercial proposal within 24–48 hours.
            </p>

            <div className="w-full rounded-xl border border-border/80 bg-navy-950 p-4 font-mono text-sm space-y-1">
              <span className="text-xs text-metal">OFFICIAL TRACKING REFERENCE</span>
              <div className="flex items-center justify-center gap-3">
                <span className="text-lg font-bold text-amber-signal">{referenceCode}</span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="rounded p-1 text-metal hover:text-ink hover:bg-navy-850"
                  title="Copy reference code"
                >
                  <Copy className="size-4" />
                </button>
              </div>
              {copied && <span className="text-[10px] text-sonar">Copied to clipboard</span>}
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              Close & Return to Portal
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 space-y-6 pt-4">
            {/* Selected Items / Cart */}
            <div className="rounded-xl border border-border/60 bg-navy-950/60 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-metal">
                  Target Equipment / Vessels ({selectedItems.length})
                </span>
                {selectedItems.length === 0 && (
                  <span className="text-xs text-amber-signal">General inquiry</span>
                )}
              </div>

              {selectedItems.length > 0 ? (
                <div className="space-y-2">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border border-border/40 bg-navy-900 px-3 py-2 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px] py-0">
                          {item.type}
                        </Badge>
                        <span className="font-semibold text-ink">{item.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-metal hover:text-tactical-red"
                        title="Remove item"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-metal/70 italic">
                  No specific product pre-selected. Detail your specifications in the scope notes below.
                </p>
              )}
            </div>

            {/* Procurement Entity Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink border-b border-border/40 pb-1">
                1. Institutional Entity
              </h4>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label htmlFor="org" className="text-xs font-semibold text-metal">
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
                  <label htmlFor="dept" className="text-xs font-semibold text-metal">
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
                  <label htmlFor="contact" className="text-xs font-semibold text-metal">
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
                  <label htmlFor="email" className="text-xs font-semibold text-metal">
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
                  <label htmlFor="phone" className="text-xs font-semibold text-metal">
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
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink border-b border-border/40 pb-1">
                2. Delivery & Logistics Parameters
              </h4>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label htmlFor="port" className="text-xs font-semibold text-metal">
                    Designated Port of Entry
                  </label>
                  <select
                    id="port"
                    value={deliveryPort}
                    onChange={(e) => setDeliveryPort(e.target.value)}
                    className="flex h-11 w-full rounded-lg border border-border/80 bg-navy-950 px-3 text-xs text-ink focus:border-amber-signal focus:outline-none"
                  >
                    <option value="Chattogram Port (Seaport)">Chattogram Port (Seaport)</option>
                    <option value="Mongla Port (Seaport)">Mongla Port (Seaport)</option>
                    <option value="Payra Port (Deep Sea)">Payra Port (Deep Sea)</option>
                    <option value="Hazrat Shahjalal Airport (Air Cargo)">Hazrat Shahjalal Int'l Airport (Air)</option>
                    <option value="Direct Shipyard Delivery">Direct Shipyard Delivery</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="timeframe" className="text-xs font-semibold text-metal">
                    Required Delivery Window
                  </label>
                  <select
                    id="timeframe"
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="flex h-11 w-full rounded-lg border border-border/80 bg-navy-950 px-3 text-xs text-ink focus:border-amber-signal focus:outline-none"
                  >
                    <option value="Immediate Urgent (30 Days)">Immediate Urgent (30 Days)</option>
                    <option value="60–90 Days (Standard)">60–90 Days (Standard)</option>
                    <option value="Scheduled Tender (6–12 Months)">Scheduled Tender (6–12 Months)</option>
                    <option value="Custom Naval Construction (12–18 Months)">Custom Naval Construction (12–18 Months)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="notes" className="text-xs font-semibold text-metal">
                  Detailed Operational Scope & Specs
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="Detail exact quantities, ballistic rating, propulsion options, or custom vessel modifications required..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-lg border border-border/80 bg-navy-950 p-3 text-xs text-ink placeholder:text-metal/60 focus:border-amber-signal focus:outline-none"
                />
              </div>

              {/* End-User Compliance Check */}
              <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-navy-950/60 p-3.5">
                <input
                  type="checkbox"
                  id="endUser"
                  checked={endUserConfirmed}
                  onChange={(e) => setEndUserConfirmed(e.target.checked)}
                  required
                  className="mt-0.5 size-4 rounded border-border text-amber-signal focus:ring-amber-signal"
                />
                <label htmlFor="endUser" className="text-xs text-metal leading-relaxed cursor-pointer">
                  I certify that this inquiry is for legitimate institutional, government, or authorized corporate procurement, and agree to provide official End-User Certificates (EUC) if required.
                </label>
              </div>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full gap-2 font-bold shadow-amber"
            >
              <Send className="size-4" />
              <span>Submit RFQ for Commercial Scoping</span>
            </Button>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
};
