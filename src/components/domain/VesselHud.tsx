import React from "react";
import { Vessel } from "../../types";
import { Navigation, Gauge, Anchor, Compass } from "lucide-react";

interface VesselHudProps {
  vessel: Vessel;
}

export const VesselHud: React.FC<VesselHudProps> = ({ vessel }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 font-mono text-xs shadow-inner">
      <div className="flex flex-col gap-0.5 border-r border-slate-200 pr-2">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Navigation className="h-3.5 w-3.5 text-[#002e6e]" />
          <span>LOA / BEAM</span>
        </div>
        <span className="font-bold text-[#002e6e] text-sm tracking-tight">
          {vessel.lengthOverall} × {vessel.beam}
        </span>
      </div>

      <div className="flex flex-col gap-0.5 border-r border-slate-200 pr-2">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Gauge className="h-3.5 w-3.5 text-[#ed145b]" />
          <span>MAX SPEED</span>
        </div>
        <span className="font-bold text-[#ed145b] text-sm tracking-tight">
          {vessel.maxSpeed}
        </span>
      </div>

      <div className="flex flex-col gap-0.5 border-r border-slate-200 pr-2">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Anchor className="h-3.5 w-3.5 text-[#002e6e]" />
          <span>{vessel.bollardPull ? "BOLLARD PULL" : "DRAFT"}</span>
        </div>
        <span className="font-bold text-[#133057] text-sm tracking-tight">
          {vessel.bollardPull || vessel.draft}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Compass className="h-3.5 w-3.5 text-emerald-600" />
          <span>CLASS SOCIETY</span>
        </div>
        <span className="font-bold text-[#133057] text-xs truncate" title={vessel.classificationSociety}>
          {vessel.classificationSociety.split(' ')[0]}
        </span>
      </div>
    </div>
  );
};
