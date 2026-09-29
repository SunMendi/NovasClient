import React from "react";
import { Vessel } from "../../types";
import { Navigation, Gauge, Anchor, Compass } from "lucide-react";

interface VesselHudProps {
  vessel: Vessel;
}

export const VesselHud: React.FC<VesselHudProps> = ({ vessel }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 rounded-xl border border-border/70 bg-navy-950/80 p-3.5 font-mono text-xs shadow-inner">
      <div className="flex flex-col gap-0.5 border-r border-border/40 pr-2">
        <div className="flex items-center gap-1.5 text-metal">
          <Navigation className="h-3.5 w-3.5 text-marine" />
          <span>LOA / BEAM</span>
        </div>
        <span className="font-bold text-ink text-sm tracking-tight">
          {vessel.lengthOverall} × {vessel.beam}
        </span>
      </div>

      <div className="flex flex-col gap-0.5 border-r border-border/40 pr-2">
        <div className="flex items-center gap-1.5 text-metal">
          <Gauge className="h-3.5 w-3.5 text-amber-signal" />
          <span>MAX SPEED</span>
        </div>
        <span className="font-bold text-amber-signal text-sm tracking-tight">
          {vessel.maxSpeed}
        </span>
      </div>

      <div className="flex flex-col gap-0.5 border-r border-border/40 pr-2">
        <div className="flex items-center gap-1.5 text-metal">
          <Anchor className="h-3.5 w-3.5 text-sky-400" />
          <span>{vessel.bollardPull ? "BOLLARD PULL" : "DRAFT"}</span>
        </div>
        <span className="font-bold text-ink text-sm tracking-tight">
          {vessel.bollardPull || vessel.draft}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5 text-metal">
          <Compass className="h-3.5 w-3.5 text-emerald-400" />
          <span>CLASS SOCIETY</span>
        </div>
        <span className="font-bold text-ink text-xs truncate" title={vessel.classificationSociety}>
          {vessel.classificationSociety.split(' ')[0]}
        </span>
      </div>
    </div>
  );
};
