import React from "react";
import { Link } from "react-router-dom";
import { ConsultancyService } from "../../types";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight, CheckCircle2, FileText, Clock, Users } from "lucide-react";

interface ConsultancyCardProps {
  service: ConsultancyService;
  onOpenRfq?: (service: ConsultancyService) => void;
}

export const ConsultancyCard: React.FC<ConsultancyCardProps> = ({ service, onOpenRfq }) => {
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#ed145b]/50 hover:shadow-lg">
      {/* Aspect Ratio Media Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={service.imageUrl}
          alt={service.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

        {/* Category & Status Chips */}
        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="bg-[#002e6e] text-white border-0 font-medium text-[11px] shadow-sm">
            {service.categoryName}
          </Badge>
          {service.featured && (
            <Badge variant="default" className="bg-[#ed145b] text-white border-0 shadow-sm font-semibold text-[11px]">
              Strategic
            </Badge>
          )}
        </div>

        {/* Duration bottom-right tag */}
        <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-md bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-sans font-medium text-white">
          <Clock className="size-3 text-[#ed145b]" />
          <span>{service.duration}</span>
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg sm:text-xl font-bold text-[#002e6e] transition-colors group-hover:text-[#ed145b] line-clamp-2">
          <Link to={`/consultancy/service/${service.id}`} className="focus:outline-none">
            {service.name}
          </Link>
        </h3>

        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
          {service.summary}
        </p>

        {/* Deliverables Highlights Preview */}
        <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs font-sans">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#ed145b]">Key Scope &amp; Deliverables</div>
          {service.deliverables.slice(0, 3).map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-slate-600">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#ed145b]" />
              <span className="line-clamp-1">{item}</span>
            </div>
          ))}
        </div>

        {/* Advisors Strip */}
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 font-sans border-t border-slate-100 pt-3">
          <Users className="size-3.5 shrink-0 text-[#002e6e]" />
          <span className="truncate">Advisors: <strong className="text-[#133057] font-medium">{service.leadAdvisors}</strong></span>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-6 flex items-center justify-between gap-3">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-1 text-xs font-semibold border-slate-200 text-[#133057] hover:bg-slate-50 hover:text-[#002e6e]"
          >
            <Link to={`/consultancy/service/${service.id}`}>
              <FileText className="mr-1.5 h-3.5 w-3.5" />
              Scope &amp; Plan
            </Link>
          </Button>

          <Button
            size="sm"
            variant="default"
            className="flex-1 text-xs font-bold bg-[#ed145b] hover:bg-[#d00f4e] text-white shadow-sm shadow-[#ed145b]/20"
            onClick={() => onOpenRfq && onOpenRfq(service)}
          >
            Request RFQ
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
