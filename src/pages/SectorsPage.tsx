import React from "react";
import { Link } from "react-router-dom";
import { SECTORS } from "../data/sectors";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Shield,
  Anchor,
  Factory,
  Map,
  Cpu,
  Truck,
  ArrowRight,
  CheckCircle2,
  FileCheck2
} from "lucide-react";

export const SectorsPage: React.FC = () => {
  const getSectorIcon = (name: string) => {
    switch (name) {
      case "Shield": return <Shield className="size-6 text-amber-signal" />;
      case "Anchor": return <Anchor className="size-6 text-marine" />;
      case "Factory": return <Factory className="size-6 text-orange-500" />;
      case "Map": return <Map className="size-6 text-sonar" />;
      case "Cpu": return <Cpu className="size-6 text-purple-400" />;
      default: return <Truck className="size-6 text-pink-400" />;
    }
  };

  return (
    <div className="space-y-16 pb-24">
      {/* Sector Hub Banner */}
      <section className="border-b border-border/60 bg-navy-900/60 py-16 sm:py-24 bg-grid-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-signal font-bold">
              Core Capabilities
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-ink tracking-tight">
              Six Mission Sectors. <br />
              <span className="text-amber-signal">One Trusted Partner.</span>
            </h1>
            <p className="text-base sm:text-lg text-metal leading-relaxed">
              We bring together vetted OEMs, naval architects, and defense engineers to deliver complete turnkey solutions — from tactical ballistic gear to nationwide industrial energy automation.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Sectors Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10">
          {SECTORS.map((sector) => (
            <div
              key={sector.id}
              className="grid gap-8 rounded-3xl border border-border/70 bg-navy-900 p-6 sm:p-10 lg:grid-cols-12 lg:items-center shadow-card hover:border-amber-signal/40 transition-colors"
            >
              {/* Sector Media */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-navy-950 lg:col-span-5">
                <img
                  src={sector.imageUrl}
                  alt={sector.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 grid size-12 place-items-center rounded-xl bg-navy-950/90 border border-border/80 backdrop-blur-md">
                  {getSectorIcon(sector.iconName)}
                </div>
              </div>

              {/* Sector Information & Capabilities */}
              <div className="space-y-6 lg:col-span-7">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      SECTOR 0{SECTORS.indexOf(sector) + 1}
                    </Badge>
                    {sector.complianceStandards.slice(0, 2).map((std, idx) => (
                      <span key={idx} className="font-mono text-[11px] text-metal border border-border/50 rounded px-2 py-0.5">
                        {std}
                      </span>
                    ))}
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
                    {sector.name}
                  </h2>
                  <p className="font-display text-sm font-semibold text-amber-signal mt-1">
                    {sector.headline}
                  </p>
                  <p className="text-sm text-metal leading-relaxed mt-2">
                    {sector.description}
                  </p>
                </div>

                {/* Key Capabilities Pills */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-secondary">
                    Core Operational Capabilities:
                  </h4>
                  <ul className="grid gap-2 sm:grid-cols-2 text-xs text-secondary">
                    {sector.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 shrink-0 text-amber-signal mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button asChild variant="default" size="sm" className="gap-2">
                    <Link to={`/sectors/${sector.slug}`}>
                      <span>Deep Dive into {sector.name}</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </Button>

                  <Button asChild variant="outline" size="sm" className="gap-2 text-xs">
                    <Link to={`/catalogue?sector=${sector.id}`}>
                      <FileCheck2 className="size-3.5 text-amber-signal" />
                      <span>Browse Sector Hardware</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
