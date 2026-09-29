import React from "react";
import { Badge } from "../ui/badge";
import { ShieldCheck, Anchor, CheckCircle2 } from "lucide-react";

interface SpecBadgeProps {
  label: string;
  className?: string;
}

export const SpecBadge: React.FC<SpecBadgeProps> = ({ label, className }) => {
  const isNaval = label.includes("SOLAS") || label.includes("IMO") || label.includes("MED") || label.includes("IHO");
  const isMilitary = label.includes("NIJ") || label.includes("MIL-STD") || label.includes("STANAG") || label.includes("EUC");

  if (isMilitary) {
    return (
      <Badge variant="defence" className={`gap-1.5 py-1 ${className}`}>
        <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
        <span>{label}</span>
      </Badge>
    );
  }

  if (isNaval) {
    return (
      <Badge variant="marine" className={`gap-1.5 py-1 ${className}`}>
        <Anchor className="h-3.5 w-3.5 text-sky-400" />
        <span>{label}</span>
      </Badge>
    );
  }

  return (
    <Badge variant="verified" className={`gap-1.5 py-1 ${className}`}>
      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
      <span>{label}</span>
    </Badge>
  );
};
