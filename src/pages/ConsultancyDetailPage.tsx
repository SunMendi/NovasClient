import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CONSULTANCY_SERVICES,
  getConsultancyServiceById,
  getConsultancyServicesByCategory
} from "../data/consultancy";
import { EmptyState } from "../components/domain/StateView";
import { Button } from "../components/ui/button";
import { ConsultancyService } from "../types";
import {
  Download,
  FileCheck2,
  ShieldCheck,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Briefcase,
  Layers,
  Award
} from "lucide-react";
import { api } from "../services/api";

interface ConsultancyDetailPageProps {
  onOpenRfq: (service?: ConsultancyService) => void;
}

export const ConsultancyDetailPage: React.FC<ConsultancyDetailPageProps> = ({ onOpenRfq }) => {
  const { id } = useParams<{ id?: string }>();
  const [downloading, setDownloading] = useState(false);

  const [service, setService] = useState<ConsultancyService | undefined>();
  const [allServices, setAllServices] = useState<ConsultancyService[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    setLoading(true); setService(undefined);
    api.getConsultancyServices().then(services => {
      if (active) {
        setAllServices(services);
        setService(services.find(s => s.id === id || s.slug === id));
      }
    }).catch(() => {}).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);
  if (loading) return <p role="status" className="container mx-auto p-12">Loading service…</p>;

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-24">
        <EmptyState
          title="Advisory Practice Not Found"
          message="The requested consultancy practice does not exist or has been relocated."
        />
        <div className="mt-6 text-center">
          <Button asChild variant="outline" className="border-[#002e6e] text-[#002e6e]">
            <Link to="/consultancy/all">View All Consultancy Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedServices = allServices
    .filter((s) => s.categoryId === service.categoryId && s.id !== service.id);

  const handleDownloadBrief = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`Technical Advisory Brief initiated: NOVAS-ADVISORY-${service.id.toUpperCase()}.pdf`);
    }, 700);
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Breadcrumb Bar */}
      <section className="border-b border-slate-200 bg-white py-4 shadow-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-[#002e6e] transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3 text-slate-400 shrink-0" />
            <Link to="/consultancy/all" className="hover:text-[#002e6e] transition-colors">
              Consultancy
            </Link>
            <ChevronRight className="size-3 text-slate-400 shrink-0" />
            <Link to={`/consultancy/${service.categoryId}`} className="hover:text-[#002e6e] transition-colors">
              {service.categoryName}
            </Link>
            <ChevronRight className="size-3 text-slate-400 shrink-0" />
            <span className="text-[#ed145b] font-semibold truncate max-w-xs">{service.name}</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start max-w-6xl mx-auto">
          {/* Left Column: Media & Core Technical Breakdown */}
          <div className="space-y-8 lg:col-span-7">
            {/* Visual Hero Container */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-md">
              <img
                src={service.imageUrl}
                alt={service.name}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="rounded-full bg-[#ed145b] px-3 py-1 font-mono text-xs font-bold uppercase text-white shadow-sm">
                  {service.categoryName}
                </span>
                {service.featured && (
                  <span className="rounded-full bg-[#002e6e] text-white px-3 py-1 font-mono text-xs font-semibold">
                    Strategic
                  </span>
                )}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-sans font-medium text-slate-200">Advisory Practice</span>
                <h1 className="font-display text-2xl sm:text-3xl font-bold leading-tight drop-shadow-sm">
                  {service.name}
                </h1>
              </div>
            </div>

            {/* Scope & Detailed Overview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#ed145b]">
                <Layers className="size-4" />
                <span>Executive Scope</span>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {service.description}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 italic border-l-2 border-[#ed145b] pl-3 py-1">
                "{service.tagline}"
              </p>
            </div>

            {/* Step-by-Step Methodology Roadmap */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#002e6e]">
                <Briefcase className="size-4 text-[#ed145b]" />
                <span>Consultancy Methodology &amp; Execution Roadmap</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {service.methodology.map((m, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-[#ed145b]/40 hover:bg-white"
                  >
                    <div className="text-2xl font-black text-[#ed145b]/30 font-mono mb-1">{m.step}</div>
                    <h3 className="font-display text-sm font-bold text-[#002e6e] mb-1">{m.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#002e6e]">
                <Award className="size-4 text-[#ed145b]" />
                <span>Formal Engagement Deliverables</span>
              </div>

              <div className="space-y-3 pt-2">
                {service.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                    <CheckCircle2 className="size-4 text-[#ed145b] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Engagement Meta & RFQ Action Box */}
          <div className="space-y-6 lg:col-span-5 lg:sticky lg:top-24">
            {/* Action Box */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-md">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#ed145b]">
                  Commercial Engagement
                </span>
                <h2 className="font-display text-2xl font-bold text-[#002e6e] mt-1">
                  Retain Advisory Practice
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Commission Novas for sovereign advisory, DGDP documentation, or turnkey technical oversight.
                </p>
              </div>

              {/* Engagement Meta */}
              <div className="space-y-3.5 text-xs font-sans">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Clock className="size-3.5 text-[#ed145b]" />
                    Estimated Duration:
                  </span>
                  <strong className="text-[#002e6e] font-semibold">{service.duration}</strong>
                </div>

                <div className="border-b border-slate-100 pb-2">
                  <span className="text-slate-500 flex items-center gap-1.5 mb-1">
                    <Users className="size-3.5 text-[#ed145b]" />
                    Lead Advisory Unit:
                  </span>
                  <strong className="text-[#133057] font-medium block">{service.leadAdvisors}</strong>
                </div>

                <div className="pb-1">
                  <span className="text-slate-500 flex items-center gap-1.5 mb-2">
                    <ShieldCheck className="size-3.5 text-[#002e6e]" />
                    Applicable Frameworks &amp; Protocols:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.standards.map((st, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-[11px] font-mono text-[#002e6e]"
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <Button
                  onClick={() => onOpenRfq(service)}
                  size="lg"
                  className="w-full bg-[#ed145b] hover:bg-[#d00f4e] text-white font-bold py-6 text-sm rounded-xl shadow-md shadow-[#ed145b]/20"
                >
                  <FileCheck2 className="mr-2 size-4" />
                  Request Advisory Quotation
                </Button>

                <Button
                  onClick={handleDownloadBrief}
                  disabled={downloading}
                  variant="outline"
                  size="default"
                  className="w-full border-slate-300 text-[#002e6e] hover:bg-slate-50 text-xs font-semibold py-5 rounded-xl"
                >
                  <Download className="mr-2 size-4" />
                  {downloading ? "Preparing Advisory PDF..." : "Download Technical Brief"}
                </Button>
              </div>
            </div>

            {/* Target Client Profiles */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#002e6e]">
                Target Institutions &amp; Clients
              </span>
              <ul className="space-y-2 text-xs text-slate-600 font-sans">
                {service.targetClients.map((client, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="size-1.5 rounded-full bg-[#ed145b] mt-1.5 shrink-0" />
                    <span>{client}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Services in Category */}
            {relatedServices.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#002e6e]">
                  Other {service.categoryName} Practices
                </span>
                <div className="space-y-2">
                  {relatedServices.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/consultancy/service/${rel.id}`}
                      className="group flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-2.5 hover:border-[#ed145b]/30 hover:bg-slate-100/80 transition-colors"
                    >
                      <span className="text-xs font-semibold text-[#133057] group-hover:text-[#ed145b] transition-colors truncate max-w-[220px]">
                        {rel.name}
                      </span>
                      <ArrowRight className="size-3.5 text-slate-400 group-hover:text-[#ed145b] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
