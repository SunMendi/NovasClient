import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { VESSELS } from "../data/vessels";
import { SpecBadge } from "../components/domain/SpecBadge";
import { VesselHud } from "../components/domain/VesselHud";
import { EmptyState } from "../components/domain/StateView";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Product, Vessel } from "../types";
import {
  ChevronLeft,
  Download,
  FileCheck2,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Clock,
  Globe2
} from "lucide-react";

interface ProductDetailPageProps {
  onOpenRfq: (item?: Product | Vessel) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onOpenRfq }) => {
  const { id } = useParams<{ id: string }>();
  const [downloading, setDownloading] = useState(false);

  const product = PRODUCTS.find((p) => p.slug === id || p.id === id);
  const vessel = !product ? VESSELS.find((v) => v.slug === id || v.id === id) : null;

  if (!product && !vessel) {
    return (
      <div className="container mx-auto px-4 py-24">
        <EmptyState
          title="Item Specification Not Found"
          message="The requested equipment or vessel datasheet does not exist or has been archived."
        />
      </div>
    );
  }

  const handleDownloadDatasheet = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert("Technical Datasheet download initiated: NOVAS-SPEC-" + (product ? product.id : vessel?.id) + ".pdf");
    }, 800);
  };

  return (
    <div className="space-y-16 pb-24">
      {/* Breadcrumb Bar */}
      <section className="border-b border-border/60 bg-navy-900/60 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/catalogue"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-metal hover:text-amber-signal transition-colors"
          >
            <ChevronLeft className="size-4" />
            <span>RETURN TO FULL CATALOGUE</span>
          </Link>
        </div>
      </section>

      {/* Main Spec Sheet Display */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Image & Provenance Badges */}
          <div className="space-y-6 lg:col-span-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/70 bg-navy-950 shadow-elevated">
              <img
                src={product ? product.imageUrl : vessel?.imageUrl}
                alt={product ? product.name : vessel?.name}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="default" className="shadow-md">
                  {product ? product.category : "Naval Vessel"}
                </Badge>
                {product?.featured && <Badge variant="secondary">Featured</Badge>}
              </div>
            </div>

            {/* Compliance Certifications Strip */}
            <div className="rounded-xl border border-border/70 bg-navy-900 p-5 space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-metal flex items-center gap-2">
                <ShieldCheck className="size-4 text-amber-signal" />
                Verified Standards & Certifications
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {product ? (
                  product.certifications.map((c, i) => <SpecBadge key={i} label={c} />)
                ) : (
                  <SpecBadge label={vessel?.classificationSociety || "Bureau Veritas"} />
                )}
              </div>
            </div>

            {/* Lead Time & Origin Stats */}
            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="rounded-xl border border-border/60 bg-navy-900 p-4 space-y-1">
                <span className="text-metal flex items-center gap-1.5">
                  <Clock className="size-3.5 text-amber-signal" />
                  LEAD TIME
                </span>
                <span className="font-bold text-ink text-sm">
                  {product ? product.leadTime : vessel?.deliveryLeadTime}
                </span>
              </div>
              <div className="rounded-xl border border-border/60 bg-navy-900 p-4 space-y-1">
                <span className="text-metal flex items-center gap-1.5">
                  <Globe2 className="size-3.5 text-marine" />
                  ORIGIN PROVENANCE
                </span>
                <span className="font-bold text-ink text-sm truncate block" title={product?.origin || "Shipyard Build"}>
                  {product ? product.origin : "Novas Yard / Partner Drydock"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Description, Spec Table & RFQ CTA */}
          <div className="space-y-8 lg:col-span-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-amber-signal font-bold">
                OFFICIAL SPECIFICATION SHEET // {product ? product.id.toUpperCase() : vessel?.id.toUpperCase()}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink mt-2">
                {product ? product.name : vessel?.name}
              </h1>
              <p className="font-display text-base font-semibold text-metal mt-2">
                {product ? product.tagline : vessel?.tagline}
              </p>
              <p className="text-sm text-metal leading-relaxed mt-4">
                {product ? product.description : vessel?.description}
              </p>
            </div>

            {/* If Vessel: Render HUD */}
            {vessel && <VesselHud vessel={vessel} />}

            {/* Technical Parameters Matrix Table */}
            <div className="space-y-3">
              <h3 className="font-display text-lg font-bold text-ink">
                Technical Data Matrix
              </h3>
              <div className="rounded-xl border border-border/70 bg-navy-950 overflow-hidden font-mono text-xs">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-border/40">
                    {product ? (
                      product.specs.map((spec, i) => (
                        <tr key={i} className="hover:bg-navy-900/50 transition-colors">
                          <td className="p-3.5 text-metal font-semibold w-1/2 bg-navy-900/30">
                            {spec.label}
                          </td>
                          <td className="p-3.5 text-ink font-bold w-1/2">
                            {spec.value}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr className="hover:bg-navy-900/50 transition-colors">
                          <td className="p-3.5 text-metal font-semibold bg-navy-900/30">Length Overall (LOA)</td>
                          <td className="p-3.5 text-ink font-bold">{vessel?.lengthOverall}</td>
                        </tr>
                        <tr className="hover:bg-navy-900/50 transition-colors">
                          <td className="p-3.5 text-metal font-semibold bg-navy-900/30">Beam</td>
                          <td className="p-3.5 text-ink font-bold">{vessel?.beam}</td>
                        </tr>
                        <tr className="hover:bg-navy-900/50 transition-colors">
                          <td className="p-3.5 text-metal font-semibold bg-navy-900/30">Draft</td>
                          <td className="p-3.5 text-ink font-bold">{vessel?.draft}</td>
                        </tr>
                        <tr className="hover:bg-navy-900/50 transition-colors">
                          <td className="p-3.5 text-metal font-semibold bg-navy-900/30">Max Speed</td>
                          <td className="p-3.5 text-ink font-bold">{vessel?.maxSpeed}</td>
                        </tr>
                        <tr className="hover:bg-navy-900/50 transition-colors">
                          <td className="p-3.5 text-metal font-semibold bg-navy-900/30">Propulsion & Engines</td>
                          <td className="p-3.5 text-ink font-bold">{vessel?.enginePower}</td>
                        </tr>
                        <tr className="hover:bg-navy-900/50 transition-colors">
                          <td className="p-3.5 text-metal font-semibold bg-navy-900/30">Hull Material</td>
                          <td className="p-3.5 text-ink font-bold">{vessel?.hullMaterial}</td>
                        </tr>
                        <tr className="hover:bg-navy-900/50 transition-colors">
                          <td className="p-3.5 text-metal font-semibold bg-navy-900/30">Classification</td>
                          <td className="p-3.5 text-ink font-bold">{vessel?.classificationSociety}</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border/60">
              <Button
                onClick={() => onOpenRfq(product || vessel || undefined)}
                size="lg"
                variant="default"
                className="flex-1 gap-2 font-bold shadow-amber"
              >
                <FileCheck2 className="size-4 text-navy-950" />
                <span>Request Tender Quotation (RFQ)</span>
              </Button>

              <Button
                onClick={handleDownloadDatasheet}
                disabled={downloading}
                size="lg"
                variant="outline"
                className="gap-2 font-semibold text-xs sm:text-sm"
              >
                <Download className="size-4 text-amber-signal" />
                <span>{downloading ? "Compiling PDF..." : "Download Spec PDF"}</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
