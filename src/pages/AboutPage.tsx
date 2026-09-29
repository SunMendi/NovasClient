import React from "react";
import { Link } from "react-router-dom";
import { COMPANY_INFO } from "../data/company";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  ShieldCheck,
  Anchor,
  Award,
  Truck,
  Layers,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Globe2,
  Factory
} from "lucide-react";

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-24">
      {/* Hero */}
      <section className="border-b border-border/60 bg-navy-900/70 py-16 sm:py-24 bg-grid-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-signal font-bold">
              Corporate & Naval Profile
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-ink tracking-tight">
              Defence Reliability. <br />
              <span className="text-amber-signal">Naval Engineering Excellence.</span>
            </h1>
            <p className="text-base sm:text-lg text-metal leading-relaxed">
              Nova Solutions BD operates as a trusted strategic procurement agency and naval engineering contractor for South Asian defense forces, law enforcement, and blue-economy marine enterprises.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Overview & Heritage */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Badge variant="defence">ORGANIZATIONAL HERITAGE</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink">
              Bridging Strategic Needs with Certified Global Manufacturing
            </h2>
            <p className="text-sm sm:text-base text-metal leading-relaxed">
              Founded to eliminate vulnerability in mission-critical procurement, Novas provides defense ministries and commercial operators with an accountable partner. We manage technical advisory, tender documentation, export licensing, hazardous freight, customs clearance, and on-site testing under a single accountable contract.
            </p>
            <p className="text-sm sm:text-base text-metal leading-relaxed">
              Every equipment model in our portfolio is tested to international standards — including NIJ ballistic ratings, MIL-STD environmental tolerances, and IMO/SOLAS maritime life safety directives.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs">
              <div className="rounded-xl border border-border/70 bg-navy-900 p-4">
                <span className="text-2xl font-bold text-amber-signal block">100%</span>
                <span className="text-metal mt-1 block">Audit-Ready Documentation</span>
              </div>
              <div className="rounded-xl border border-border/70 bg-navy-900 p-4">
                <span className="text-2xl font-bold text-marine block">ISO 9001</span>
                <span className="text-metal mt-1 block">Certified Quality Management</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/70 bg-navy-950 shadow-elevated">
            <img
              src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80"
              alt="Novas Operations"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-border/80 bg-navy-900/90 p-4 backdrop-blur-md font-mono text-xs text-secondary">
              <span className="text-amber-signal font-bold block mb-1">MOHAKHALI DOHS, DHAKA HQ</span>
              Central procurement command & technical coordination office.
            </div>
          </div>
        </div>
      </section>

      {/* Shipyard Facilities & Capacities (Loyd Shipyard Heritage) */}
      <section className="border-y border-border/60 bg-navy-900/60 py-20 bg-marine-glow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3 mb-12">
            <Badge variant="marine">NAVAL INFRASTRUCTURE</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink">
              Shipyard Capacities & Fabrication Facilities
            </h2>
            <p className="text-sm sm:text-base text-metal">
              Through strategic naval shipyard partnerships and 40+ years of workboat construction experience, we provide custom vessel design and heavy marine manufacturing.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(COMPANY_INFO.shipyardCapacity).map(([key, value], i) => (
              <div
                key={i}
                className="rounded-2xl border border-border/70 bg-navy-950 p-6 space-y-2 shadow-card"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-marine font-semibold flex items-center gap-2">
                  <Anchor className="size-4" />
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="font-display text-xl font-bold text-ink block">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blueprint Workflow */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <Badge variant="secondary">ACCOUNTABILITY BLUEPRINT</Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink">
            End-to-End Accountable Workflow
          </h2>
          <p className="text-sm sm:text-base text-metal">
            From technical scope definition to harbor commissioning and post-delivery maintenance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-5">
          {COMPANY_INFO.blueprintSteps.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl border border-border/60 bg-navy-900 p-6 space-y-3"
            >
              <span className="font-mono text-3xl font-black text-amber-signal">
                {step.step}
              </span>
              <h3 className="font-display text-base font-bold text-ink">
                {step.title}
              </h3>
              <p className="text-xs text-metal leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Global Sourcing Network */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/80 bg-navy-900 p-8 sm:p-12 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-amber-signal font-mono text-xs uppercase tracking-wider">
                <Globe2 className="size-4" />
                <span>Global OEM Alliances</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                Direct Vetted OEM Network Across 3 Continents
              </h3>
              <p className="text-sm text-metal leading-relaxed">
                We maintain direct procurement and technical agency agreements with certified manufacturers in Germany, the United Kingdom, Sweden, the United States, Norway, and Japan.
              </p>
            </div>

            <Button asChild size="lg" variant="default" className="gap-2 font-bold shadow-amber shrink-0">
              <Link to="/contact">
                <FileCheck2 className="size-4" />
                <span>Request Procurement Consultation</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
