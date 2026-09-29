import React from "react";
import { useParams, Link } from "react-router-dom";
import { SECTORS } from "../data/sectors";
import { PRODUCTS } from "../data/products";
import { ProductCard } from "../components/domain/ProductCard";
import { SpecBadge } from "../components/domain/SpecBadge";
import { EmptyState } from "../components/domain/StateView";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Product, Vessel } from "../types";
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  ArrowRight,
  FileCheck2,
  ChevronLeft
} from "lucide-react";

interface SectorDetailPageProps {
  onOpenRfq: (item?: Product | Vessel) => void;
}

export const SectorDetailPage: React.FC<SectorDetailPageProps> = ({ onOpenRfq }) => {
  const { slug } = useParams<{ slug: string }>();
  const sector = SECTORS.find((s) => s.slug === slug);

  if (!sector) {
    return (
      <div className="container mx-auto px-4 py-24">
        <EmptyState
          title="Sector Not Found"
          message="The requested mission sector does not exist or has been relocated."
        />
      </div>
    );
  }

  const sectorProducts = PRODUCTS.filter((p) => p.sectorId === sector.id);

  return (
    <div className="space-y-16 pb-24">
      {/* Sector Hero Header */}
      <section className="border-b border-border/60 bg-navy-900/80 py-16 sm:py-24 bg-grid-pattern relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/sectors"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-metal hover:text-amber-signal mb-6 transition-colors"
          >
            <ChevronLeft className="size-4" />
            <span>BACK TO ALL SECTORS</span>
          </Link>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="space-y-5 lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="defence">SECTOR OVERVIEW</Badge>
                <span className="font-mono text-xs text-metal">
                  STATUS // ACTIVE MISSION DEPLOYMENT
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-ink tracking-tight">
                {sector.name} Division
              </h1>

              <p className="font-display text-lg sm:text-xl font-bold text-amber-signal">
                {sector.headline}
              </p>

              <p className="text-base text-metal leading-relaxed max-w-2xl">
                {sector.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {sector.complianceStandards.map((std, i) => (
                  <SpecBadge key={i} label={std} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-border/80 bg-navy-950 p-6 space-y-4 shadow-elevated">
                <div className="flex items-center gap-2 text-ink font-display font-bold text-base border-b border-border/60 pb-3">
                  <Users className="size-5 text-amber-signal" />
                  <span>Primary Target Operators</span>
                </div>
                <ul className="space-y-2.5 text-xs font-mono text-secondary">
                  {sector.targetOperators.map((op, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-sonar mt-0.5" />
                      <span>{op}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => onOpenRfq()}
                  variant="default"
                  className="w-full gap-2 mt-4 text-xs font-bold"
                >
                  <FileCheck2 className="size-4" />
                  <span>Tender RFQ for {sector.name}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Capabilities Breakdown */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-2 mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            Core Technical Capabilities
          </h2>
          <p className="text-sm text-metal">
            Operational capability matrices delivered under the {sector.name} procurement mandate.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sector.capabilities.map((cap, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-border/60 bg-navy-900 p-5 shadow-sm"
            >
              <ShieldCheck className="size-5 shrink-0 text-amber-signal mt-0.5" />
              <span className="text-sm font-semibold text-ink leading-snug">{cap}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Linked Equipment Catalogue */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              Certified Equipment & Systems
            </h2>
            <p className="text-sm text-metal">
              Filterable products available for institutional supply under {sector.name}.
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="gap-2 self-start sm:self-auto text-xs">
            <Link to="/catalogue">
              <span>View All 13 Catalogue Products</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>

        {sectorProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectorProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenRfq={onOpenRfq}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Custom Sourcing Available"
            message={`Equipment under ${sector.name} is predominantly custom-tendered or commissioned per institutional specifications. Contact our technical director to request custom sourcing.`}
          />
        )}
      </section>
    </div>
  );
};
