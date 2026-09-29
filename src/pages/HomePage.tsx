import React from "react";
import { Link } from "react-router-dom";
import { SECTORS } from "../data/sectors";
import { PRODUCTS } from "../data/products";
import { VESSELS } from "../data/vessels";
import { COMPANY_INFO } from "../data/company";
import { ProductCard } from "../components/domain/ProductCard";
import { VesselHud } from "../components/domain/VesselHud";
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
  ShieldCheck,
  Award,
  Layers,
  FileCheck2,
  CheckCircle2,
} from "lucide-react";
import { Product, Vessel } from "../types";

interface HomePageProps {
  onOpenRfq: (item?: Product | Vessel) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenRfq }) => {
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

  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 6);
  const featuredVessel = VESSELS[0];

  return (
    <div className="flex flex-col space-y-24 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 py-20 lg:py-32 bg-grid-pattern bg-radar-glow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-signal/40 bg-amber-signal/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-amber-signal">
              <span className="size-2 rounded-full bg-amber-signal animate-ping" />
              <span>DEFENCE-GRADE PROCUREMENT & NAVAL SHIPYARD</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-ink">
              Institutional Defence, <br />
              <span className="bg-gradient-to-r from-amber-signal via-amber-400 to-marine bg-clip-text text-transparent">
                Maritime & Heavy Supply.
              </span>
            </h1>

            <p className="max-w-2xl text-lg sm:text-xl text-metal leading-relaxed">
              Novas supplies certified defense systems, naval workboats, and mission-critical engineering solutions for armed forces, port authorities, and industrial operators across South Asia.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                asChild
                size="lg"
                variant="default"
                className="gap-2 font-bold shadow-amber text-sm sm:text-base"
              >
                <Link to="/catalogue">
                  <span>Explore Equipment Catalogue</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                onClick={() => onOpenRfq()}
                size="lg"
                variant="outline"
                className="gap-2 font-semibold text-sm sm:text-base"
              >
                <FileCheck2 className="size-4 text-amber-signal" />
                <span>Launch Tender RFQ</span>
              </Button>
            </div>

            {/* Live Metrics Counter HUD */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 border-t border-border/60 font-mono">
              <div className="rounded-xl border border-border/60 bg-navy-900/60 p-4">
                <span className="text-2xl sm:text-3xl font-bold text-ink">6</span>
                <p className="text-xs text-metal uppercase tracking-wider mt-1">Mission Sectors</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-navy-900/60 p-4">
                <span className="text-2xl sm:text-3xl font-bold text-amber-signal">MIL-STD</span>
                <p className="text-xs text-metal uppercase tracking-wider mt-1">NIJ & SOLAS Certified</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-navy-900/60 p-4">
                <span className="text-2xl sm:text-3xl font-bold text-marine">40+ Yrs</span>
                <p className="text-xs text-metal uppercase tracking-wider mt-1">Shipyard Heritage</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-navy-900/60 p-4">
                <span className="text-2xl sm:text-3xl font-bold text-sonar">100%</span>
                <p className="text-xs text-metal uppercase tracking-wider mt-1">Verified Chain of Custody</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CAPABILITY PILLARS */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <Badge variant="secondary" className="font-mono uppercase tracking-widest">
            Institutional Rigor
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink">
            Four Pillars of Mission Readiness
          </h2>
          <p className="text-sm sm:text-base text-metal">
            How Novas ensures uncompromising accountability from technical consultation to on-ground commissioning.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COMPANY_INFO.pillars.map((pillar, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-border/60 bg-navy-900 p-6 transition-all duration-300 hover:border-amber-signal/40 hover:-translate-y-1 shadow-card"
            >
              <div className="grid size-12 place-items-center rounded-xl bg-navy-850 border border-border/80 text-amber-signal mb-5 group-hover:scale-110 transition-transform">
                {i === 0 && <Award className="size-6 text-amber-signal" />}
                {i === 1 && <ShieldCheck className="size-6 text-sonar" />}
                {i === 2 && <Layers className="size-6 text-marine" />}
                {i === 3 && <Truck className="size-6 text-pink-400" />}
              </div>
              <h3 className="font-display text-lg font-bold text-ink mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-metal leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SIX MISSION SECTORS GRID */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-signal font-bold">
              Specialized Divisions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink">
              Six Sectors. One Strategic Partner.
            </h2>
          </div>
          <Button asChild variant="outline" className="gap-2 self-start md:self-auto text-xs">
            <Link to="/sectors">
              <span>View All Sectors</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((sector) => (
            <div
              key={sector.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-navy-900 transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-elevated"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-navy-950">
                <img
                  src={sector.imageUrl}
                  alt={sector.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent" />
                <div className="absolute left-4 top-4 grid size-12 place-items-center rounded-xl bg-navy-950/90 border border-border/80 backdrop-blur-md shadow-lg">
                  {getSectorIcon(sector.iconName)}
                </div>
              </div>

              <div className="p-6 flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-ink group-hover:text-amber-signal transition-colors">
                    {sector.name}
                  </h3>
                  <p className="mt-2 text-sm text-metal leading-relaxed line-clamp-3">
                    {sector.tagline}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40">
                  <Link
                    to={`/sectors/${sector.slug}`}
                    className="inline-flex items-center gap-2 font-display text-xs font-bold text-amber-signal group-hover:gap-3 transition-all"
                  >
                    <span>Explore {sector.name} Capabilities</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SHIPYARD & NAVAL ENGINEERING SPOTLIGHT (Loyd Shipyard Inspiration) */}
      <section className="border-y border-border/60 bg-navy-900/70 py-20 bg-marine-glow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-marine/40 bg-marine/10 px-3.5 py-1 font-mono text-xs font-semibold text-sky-400">
                <Anchor className="size-3.5" />
                <span>NAVAL ARCHITECTURE & WORKBOAT CONSTRUCTION</span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-ink leading-tight">
                Custom Vessel Construction & Shipyard Facilities
              </h2>

              <p className="text-metal text-sm sm:text-base leading-relaxed">
                Combining 40+ years of shipbuilding experience with Bureau Veritas and Lloyds Register certified fabrication. We engineer patrol interceptors, harbor escort tugs, fire boats, and multi-purpose offshore support craft tailored to coastal and blue-water operational envelopes.
              </p>

              <div className="space-y-3 font-mono text-xs text-secondary">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-marine" />
                  <span>35,000 m² Covered Fabrication Halls & 2x 120m Heavy Marine Slipways</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-marine" />
                  <span>High-Grade Marine 5083-H111 Aluminum & Structural Steel CNC Cutting</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-marine" />
                  <span>Full Harbor Sea-Trials & Classification Society Delivery Protocols</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  onClick={() => onOpenRfq(featuredVessel)}
                  variant="marine"
                  size="default"
                  className="gap-2"
                >
                  <Anchor className="size-4" />
                  <span>Request Custom Vessel Specification</span>
                </Button>

                <Button asChild variant="outline" size="default">
                  <Link to="/about">
                    <span>Inspect Shipyard Capacity</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Featured Vessel Card with Telemetry HUD */}
            <div className="rounded-2xl border border-marine/30 bg-navy-950 p-6 shadow-elevated space-y-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-navy-900">
                <img
                  src={featuredVessel.imageUrl}
                  alt={featuredVessel.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="marine">FLAGSHIP BUILD</Badge>
                </div>
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-metal">
                  {featuredVessel.vesselType}
                </span>
                <h3 className="font-display text-2xl font-bold text-ink mt-0.5">
                  {featuredVessel.name}
                </h3>
                <p className="text-xs text-metal mt-1.5 leading-relaxed">
                  {featuredVessel.tagline}
                </p>
              </div>

              {/* Naval Architecture HUD */}
              <VesselHud vessel={featuredVessel} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED EQUIPMENT CATALOGUE */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-signal font-bold">
              Catalogue Highlights
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink">
              Mission-Ready Equipment
            </h2>
            <p className="text-sm text-metal max-w-xl">
              Defence, tactical and maritime hardware ready for institutional tender scoping.
            </p>
          </div>

          <Button asChild variant="default" className="self-start md:self-auto gap-2">
            <Link to="/catalogue">
              <span>View Full Catalogue (13 Items)</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenRfq={onOpenRfq}
            />
          ))}
        </div>
      </section>

      {/* 6. PROCUREMENT BLUEPRINT (How We Work) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/80 bg-navy-900/60 p-8 sm:p-12 lg:p-16">
          <div className="max-w-3xl space-y-4 mb-12">
            <Badge variant="secondary" className="font-mono uppercase tracking-widest">
              Standard Operating Procedure
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink">
              The Novas Procurement Blueprint
            </h2>
            <p className="text-sm sm:text-base text-metal leading-relaxed">
              We blend engineering evaluation, global export compliance, and last-mile logistics into a single accountable workflow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            {COMPANY_INFO.blueprintSteps.map((step) => (
              <div
                key={step.step}
                className="relative flex flex-col justify-between rounded-xl border border-border/50 bg-navy-950/70 p-5 space-y-3"
              >
                <span className="font-mono text-2xl font-black text-amber-signal">
                  {step.step}
                </span>
                <div>
                  <h4 className="font-display text-base font-bold text-ink">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-xs text-metal leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM DIRECT ACTION CALLOUT */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-amber-signal/40 bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 p-8 sm:p-14 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink">
              Ready to Scope Your Next Mission Requirement?
            </h2>
            <p className="text-sm sm:text-base text-metal">
              Connect directly with our procurement and naval engineering advisory team for certified specifications, tender documentation, and formal proposals.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => onOpenRfq()}
                size="lg"
                variant="default"
                className="gap-2 shadow-amber font-bold"
              >
                <ShieldCheck className="size-4" />
                <span>Submit Tender Specification (RFQ)</span>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Speak with Technical Director</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
