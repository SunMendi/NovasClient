import React, { useState } from "react";
import { COMPANY_INFO } from "../data/company";
import { Button } from "../components/ui/button";
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
  FileCheck2,
  Building2,
  Globe
} from "lucide-react";

export const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [priceQuotation, setPriceQuotation] = useState(true);
  const [productInformation, setProductInformation] = useState(true);

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
      a: "Novas has extensive experience processing export licenses with government trade ministries in Germany, the UK, the US, and EU members, ensuring strict compliance with international non-proliferation laws and fast turnaround on EUC verifications."
    },
    {
      q: "Do you provide on-site commissioning and spare parts sustainment?",
      a: "Yes. Every naval platform, radar suite, and heavy machinery installation includes certified OEM on-site commissioning, operator training programs, and contractual guaranteed spare parts supply."
    }
  ];

  return (
    <div className="flex flex-col space-y-16 pb-24 bg-[#f9f8fb]">
      {/* 1. HEADER BANNER: Let's Connect */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#002e6e] via-[#042e6f] to-[#001f4d] py-16 sm:py-20 text-white">
        <div className="pointer-events-none absolute -right-20 top-0 size-96 rounded-full bg-[#ed145b]/15 blur-3xl" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1 text-xs font-sans font-semibold uppercase tracking-wider text-white">
            <Globe className="size-3.5 text-[#ed145b]" />
            <span>MOHAKHALI DOHS, DHAKA • 24/7 PROCUREMENT DESK</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Let&apos;s <span className="text-[#ed145b]">Connect !</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            In business, maintaining proper contact with clients, colleagues, and customers is crucial for success. Novas connects armed forces, port authorities, and industrial leaders with certified global OEMs.
          </p>
        </div>
      </section>

      {/* 2. DIRECT CONTACT CHANNELS & INTERACTIVE RFQ FORM */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 max-w-6xl mx-auto">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#ed145b]">
                OFFICIAL LIAISON
              </span>
              <h2 className="font-display text-2xl font-bold text-[#002e6e]">
                Contact Details
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Reach out to our specialized procurement desk for tenders, technical datasheets, and OEM agency verifications.
              </p>
            </div>

            {/* Email Card */}
            <div
              onClick={() => (window.location.href = `mailto:${COMPANY_INFO.email}`)}
              className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 cursor-pointer hover:border-[#ed145b]/50 hover:shadow-md transition-all shadow-sm"
            >
              <div className="p-3 rounded-xl bg-[#ed145b]/10 text-[#ed145b]">
                <Mail className="size-6" />
              </div>
              <div>
                <div className="font-sans text-[11px] text-slate-500 uppercase font-semibold">Email Enquiries</div>
                <div className="font-display text-sm sm:text-base font-bold text-[#002e6e] hover:text-[#ed145b] transition-colors">
                  {COMPANY_INFO.email}
                </div>
              </div>
            </div>

            {/* Mobile / Direct Phone Card */}
            <div
              onClick={() => (window.location.href = `tel:${COMPANY_INFO.phone}`)}
              className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 cursor-pointer hover:border-[#ed145b]/50 hover:shadow-md transition-all shadow-sm"
            >
              <div className="p-3 rounded-xl bg-[#002e6e]/10 text-[#002e6e]">
                <Phone className="size-6" />
              </div>
              <div>
                <div className="font-sans text-[11px] text-slate-500 uppercase font-semibold">Mobile Hot-Desk</div>
                <div className="font-display text-sm sm:text-base font-bold text-[#002e6e]">
                  {COMPANY_INFO.phone}
                </div>
              </div>
            </div>

            {/* Landline Phone Card */}
            <div
              onClick={() => (window.location.href = `tel:${COMPANY_INFO.landline}`)}
              className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 cursor-pointer hover:border-[#ed145b]/50 hover:shadow-md transition-all shadow-sm"
            >
              <div className="p-3 rounded-xl bg-slate-100 text-[#002e6e]">
                <Phone className="size-6" />
              </div>
              <div>
                <div className="font-sans text-[11px] text-slate-500 uppercase font-semibold">Headquarters Landline</div>
                <div className="font-display text-sm sm:text-base font-bold text-[#002e6e]">
                  {COMPANY_INFO.landline}
                </div>
              </div>
            </div>

            {/* Physical Facility Card */}
            <div className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <div className="p-3 rounded-xl bg-[#ed145b]/10 text-[#ed145b] shrink-0 mt-0.5">
                <MapPin className="size-6" />
              </div>
              <div>
                <div className="font-sans text-[11px] text-slate-500 uppercase font-semibold">Head Office</div>
                <div className="font-sans text-xs sm:text-sm font-semibold text-[#133057] leading-relaxed">
                  {COMPANY_INFO.address}
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-xs font-sans text-slate-600 shadow-sm">
              <Clock className="size-4 text-[#ed145b]" />
              <span>Sun - Thu: 09:00 - 18:00 BST // Emergency Duty Officer: 24/7</span>
            </div>
          </div>

          {/* Right Column: Tender RFQ / Quote Request Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden">
              <div className="space-y-2 mb-6">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#002e6e]">
                  Submit a <span className="text-[#ed145b]">Tender RFQ</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Fill in your institutional procurement details to receive formal specifications and commercial pricing.
                </p>
              </div>

              {submitted ? (
                <div className="space-y-6 py-6 text-center animate-in fade-in zoom-in-95 duration-200">
                  <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-[#ed145b]/10 border border-[#ed145b]/30 text-[#ed145b]">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display text-xl font-bold text-[#002e6e]">
                      RFQ Transmitted Successfully!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                      Your procurement request has been routed to our technical desk at Mohakhali DOHS, Dhaka.
                    </p>
                  </div>

                  <div className="mx-auto max-w-sm rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                    <span className="font-mono text-[10px] text-slate-500 uppercase font-semibold">
                      Official RFQ Reference Code
                    </span>
                    <div className="mt-1 flex items-center justify-center gap-2">
                      <span className="font-mono text-base font-bold text-[#ed145b]">
                        {referenceCode}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="p-1 rounded text-slate-500 hover:text-[#002e6e]"
                        title="Copy RFQ Code"
                      >
                        <Copy className="size-4" />
                      </button>
                    </div>
                    {copied && <span className="text-[10px] text-emerald-600 font-medium">Copied to clipboard</span>}
                  </div>

                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setEmail("");
                      setCompany("");
                      setAddress("");
                      setMessage("");
                    }}
                    variant="outline"
                    className="border-slate-300 text-[#002e6e] hover:bg-slate-50"
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-sans font-semibold text-slate-700">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Commander / Director Name"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-[#133057] placeholder-slate-400 focus:bg-white focus:border-[#ed145b] focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-sans font-semibold text-slate-700">Official Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="officer@mod.gov.bd"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-[#133057] placeholder-slate-400 focus:bg-white focus:border-[#ed145b] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-sans font-semibold text-slate-700">Company / Ministry *</label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Ministry of Defence / Port Authority"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-[#133057] placeholder-slate-400 focus:bg-white focus:border-[#ed145b] focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-sans font-semibold text-slate-700">Delivery Address / Port *</label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Chittagong Port / Dhaka Central"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-[#133057] placeholder-slate-400 focus:bg-white focus:border-[#ed145b] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Checklist Toggles from novasbd.com */}
                  <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-sans text-slate-700">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={priceQuotation}
                        onChange={(e) => setPriceQuotation(e.target.checked)}
                        className="size-4 rounded accent-[#ed145b]"
                      />
                      <span>Request Commercial Price Quotation</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productInformation}
                        onChange={(e) => setProductInformation(e.target.checked)}
                        className="size-4 rounded accent-[#ed145b]"
                      />
                      <span>Request Technical Datasheet &amp; CoC</span>
                    </label>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-sans font-semibold text-slate-700">Project / Equipment Specifications *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify required quantities, doctrine standards (MIL-STD, NIJ, SOLAS), target delivery dates, or technical questions..."
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-[#133057] placeholder-slate-400 focus:bg-white focus:border-[#ed145b] focus:outline-none transition-colors"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#ed145b] hover:bg-[#d00f4e] text-white font-bold h-11 rounded-lg shadow-crimson text-sm"
                  >
                    <Send className="mr-2 size-4" />
                    Transmit Official Tender RFQ
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. GOOGLE MAP EMBED (MOHAKHALI DOHS, DHAKA) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-md space-y-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-[#002e6e] font-semibold">
              <MapPin className="size-4 text-[#ed145b]" />
              <span>GEOLOCATION: MOHAKHALI DOHS, DHAKA-1206, BANGLADESH</span>
            </div>
            <span className="font-mono text-[10px] text-slate-500">23.7772° N, 90.3995° E</span>
          </div>

          <div className="relative aspect-[21/9] w-full min-h-[300px] overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              title="Novas BD Office Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0264023719086!2d90.39566377602334!3d23.782071687541624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c76c12513f13%3A0x6b9d628d0859c258!2sMohakhali%20DOHS%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
            />
          </div>
        </div>
      </section>

      {/* 4. PROCUREMENT FAQS */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#ed145b]">
              FAQ &amp; ADVISORY
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#002e6e]">
              Institutional Procurement Protocols
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 space-y-2 shadow-sm"
              >
                <h4 className="font-display text-base font-bold text-[#002e6e] flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#ed145b]" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans pl-4">
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
