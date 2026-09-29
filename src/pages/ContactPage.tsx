import React, { useState } from "react";
import { COMPANY_INFO } from "../data/company";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Send,
  CheckCircle2,
  Copy,
  Clock,
  HelpCircle,
  FileCheck2
} from "lucide-react";

export const ContactPage: React.FC = () => {
  const [organization, setOrganization] = useState("");
  const [department, setDepartment] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sectorInterest, setSectorInterest] = useState("Defence Procurement");
  const [deliveryPort, setDeliveryPort] = useState("Chattogram Port");
  const [notes, setNotes] = useState("");
  const [endUserConfirmed, setEndUserConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState("");
  const [copied, setCopied] = useState(false);

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

  const faqs = [
    {
      q: "Can Novas supply equipment directly compliant with DGDP tender documentation?",
      a: "Yes. All our defense, tactical and maritime products can be bid directly under DGDP or state institutional tender formats with complete OEM authorizations, manufacturer warranty letters, and original ballistic/environmental lab test certificates."
    },
    {
      q: "What is the procedure for custom naval workboat or patrol craft construction?",
      a: "Our naval architects review your operational parameters (sea state requirements, required speed, weapon or radar integration). We submit general arrangement (GA) drawings, engine propulsion recommendations, and milestone delivery schedules certified by Bureau Veritas or Lloyds Register."
    },
    {
      q: "How are international export controls and End-User Certificates (EUC) handled?",
      a: "Novas has 25+ years of experience processing export licenses with government trade ministries in Germany, the UK, the US, and EU members, ensuring strict compliance with international non-proliferation laws and fast turnaround on EUC verifications."
    },
    {
      q: "Do you provide on-site commissioning and spare parts sustainment?",
      a: "Yes. Every naval platform, radar suite, and heavy machinery installation includes certified OEM on-site commissioning, operator training programs, and contractual 2- to 5-year guaranteed spare parts supply."
    }
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Banner */}
      <section className="border-b border-border/60 bg-navy-900/70 py-16 sm:py-24 bg-grid-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-signal font-bold">
              Procurement & Tender Inquiries
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-ink tracking-tight">
              Request a Formal Quote <br />
              <span className="text-amber-signal">or Tender Proposal.</span>
            </h1>
            <p className="text-base sm:text-lg text-metal leading-relaxed">
              Connect directly with our procurement officers in Dhaka for certified equipment scoping, naval architectural estimates, or urgent force supply requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Office Coordinates */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Comprehensive RFQ Form */}
          <div className="lg:col-span-7 rounded-3xl border border-border/80 bg-navy-900 p-6 sm:p-10 shadow-card">
            {submitted ? (
              <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="grid size-16 place-items-center rounded-2xl bg-sonar/15 text-sonar border border-sonar/30 shadow-sonar">
                  <CheckCircle2 className="size-8" />
                </div>
                <Badge variant="verified">SUBMISSION RECORDED</Badge>
                <h3 className="font-display text-2xl font-bold text-ink">
                  Inquiry Dispatched to Technical Advisory
                </h3>
                <p className="text-sm text-metal leading-relaxed max-w-md">
                  Thank you, <strong className="text-ink">{contactName}</strong>. Your inquiry on behalf of <strong className="text-ink">{organization}</strong> has been logged. Our defense and naval procurement desk will review your scope and follow up with tender documentation.
                </p>

                <div className="w-full rounded-xl border border-border/80 bg-navy-950 p-4 font-mono text-sm space-y-1">
                  <span className="text-xs text-metal">OFFICIAL TRACKING REFERENCE CODE</span>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-xl font-bold text-amber-signal">{referenceCode}</span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="rounded p-1 text-metal hover:text-ink hover:bg-navy-850"
                      title="Copy code"
                    >
                      <Copy className="size-4" />
                    </button>
                  </div>
                  {copied && <span className="text-[10px] text-sonar">Copied to clipboard</span>}
                </div>

                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setNotes("");
                  }}
                  variant="outline"
                  className="mt-4"
                >
                  Submit Additional Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-ink">
                    Technical Specification & RFQ Form
                  </h3>
                  <p className="text-xs text-metal mt-1">
                    Fields marked with an asterisk (*) are required for formal tender verification.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label htmlFor="c-org" className="text-xs font-semibold text-metal">
                        Organization / Military Branch *
                      </label>
                      <Input
                        id="c-org"
                        required
                        placeholder="e.g. Bangladesh Navy / Port Authority"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="c-dept" className="text-xs font-semibold text-metal">
                        Department / Directorate
                      </label>
                      <Input
                        id="c-dept"
                        placeholder="e.g. Directorate General Purchase"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1 sm:col-span-1">
                      <label htmlFor="c-name" className="text-xs font-semibold text-metal">
                        Authorized Officer Name *
                      </label>
                      <Input
                        id="c-name"
                        required
                        placeholder="Full Name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-1">
                      <label htmlFor="c-email" className="text-xs font-semibold text-metal">
                        Official Email *
                      </label>
                      <Input
                        id="c-email"
                        type="email"
                        required
                        placeholder="officer@domain.gov.bd"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-1">
                      <label htmlFor="c-phone" className="text-xs font-semibold text-metal">
                        Phone / Signal Line *
                      </label>
                      <Input
                        id="c-phone"
                        required
                        placeholder="+880 1700..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label htmlFor="c-sector" className="text-xs font-semibold text-metal">
                        Primary Sector Scope
                      </label>
                      <select
                        id="c-sector"
                        value={sectorInterest}
                        onChange={(e) => setSectorInterest(e.target.value)}
                        className="flex h-11 w-full rounded-lg border border-border/80 bg-navy-950 px-3 text-xs text-ink focus:border-amber-signal focus:outline-none"
                      >
                        <option value="Defence Procurement">Defence (Ballistic Armor, NVG, Comms)</option>
                        <option value="Maritime & Naval Vessels">Maritime (Workboats, Patrol Craft, Radar, Sonar)</option>
                        <option value="Heavy Industry & Machinery">Industry (Turnkey Plant, CNC, Power)</option>
                        <option value="Geospatial & Survey">Geospatial (RTK GNSS, LiDAR, Aerial Survey)</option>
                        <option value="Mission ICT & Cyber">ICT (Hardened Comms, Tactical Data Centers)</option>
                        <option value="Turnkey Logistics">Logistics & Supply Chain</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="c-port" className="text-xs font-semibold text-metal">
                        Intended Delivery Destination
                      </label>
                      <select
                        id="c-port"
                        value={deliveryPort}
                        onChange={(e) => setDeliveryPort(e.target.value)}
                        className="flex h-11 w-full rounded-lg border border-border/80 bg-navy-950 px-3 text-xs text-ink focus:border-amber-signal focus:outline-none"
                      >
                        <option value="Chattogram Port">Chattogram Port (Seaport)</option>
                        <option value="Mongla Port">Mongla Port (Seaport)</option>
                        <option value="Hazrat Shahjalal Int'l Airport">Hazrat Shahjalal Int'l Airport (Air Cargo)</option>
                        <option value="Dhaka Inland Depot">Dhaka Inland Depot</option>
                        <option value="Direct Shipyard Delivery">Direct Shipyard Delivery</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="c-notes" className="text-xs font-semibold text-metal">
                      Detailed Requirement / Specifications
                    </label>
                    <textarea
                      id="c-notes"
                      rows={4}
                      required
                      placeholder="Specify required quantities, ballistic protection level, delivery timeline, or vessel parameters (LOA, speed, engine horsepower)..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full rounded-lg border border-border/80 bg-navy-950 p-3 text-xs text-ink placeholder:text-metal/60 focus:border-amber-signal focus:outline-none"
                    />
                  </div>

                  {/* End-User Compliance Checkbox */}
                  <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-navy-950/70 p-4">
                    <input
                      type="checkbox"
                      id="c-euc"
                      checked={endUserConfirmed}
                      onChange={(e) => setEndUserConfirmed(e.target.checked)}
                      required
                      className="mt-0.5 size-4 rounded border-border text-amber-signal focus:ring-amber-signal"
                    />
                    <label htmlFor="c-euc" className="text-xs text-metal leading-relaxed cursor-pointer">
                      I confirm that this tender inquiry is submitted by an authorized institutional representative, and agree to supply certified End-User Documentation (EUC) for defense-grade items.
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  variant="default"
                  className="w-full gap-2 font-bold shadow-amber"
                >
                  <Send className="size-4" />
                  <span>Transmit Official Tender Inquiry</span>
                </Button>
              </form>
            )}
          </div>

          {/* Right Column: Office Coordinates & Operating Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-border/70 bg-navy-900 p-8 space-y-6 shadow-card">
              <div className="flex items-center gap-2 text-amber-signal font-mono text-xs uppercase tracking-wider font-semibold">
                <MapPin className="size-4" />
                <span>Headquarters & Command Desk</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold text-ink">
                  Novas Solutions BD
                </h3>
                <p className="text-xs font-mono text-metal">
                  Corporate Registry: {COMPANY_INFO.corporateRegistry}
                </p>
              </div>

              <div className="space-y-4 border-t border-border/60 pt-4 text-sm text-metal">
                <div className="flex items-start gap-3">
                  <MapPin className="size-4 shrink-0 text-amber-signal mt-1" />
                  <span className="text-xs text-secondary leading-relaxed">
                    {COMPANY_INFO.address}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-amber-signal" />
                  <a href={`tel:${COMPANY_INFO.phone}`} className="text-xs text-secondary hover:text-ink">
                    {COMPANY_INFO.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-amber-signal" />
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-xs text-secondary hover:text-ink">
                    {COMPANY_INFO.email}
                  </a>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Clock className="size-4 shrink-0 text-marine" />
                  <span className="text-xs text-metal font-mono">
                    Sunday – Thursday: 09:00 – 18:00 BST
                  </span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="rounded-2xl border border-sonar/30 bg-sonar/5 p-6 space-y-2">
              <div className="flex items-center gap-2 text-sonar font-mono text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="size-4" />
                <span>Encrypted & Audited Transmission</span>
              </div>
              <p className="text-xs text-metal leading-relaxed">
                All tender communications and technical schematics transmitted through this portal are handled under strict confidentiality protocols and ISO 9001:2015 audit guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Procurement FAQ Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/70 bg-navy-900/60 p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <Badge variant="secondary" className="gap-1.5">
              <HelpCircle className="size-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </Badge>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
              Institutional Procurement Protocol FAQs
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-border/60 bg-navy-950 p-6 space-y-2">
                <h4 className="font-display text-base font-bold text-ink">
                  {faq.q}
                </h4>
                <p className="text-xs text-metal leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
