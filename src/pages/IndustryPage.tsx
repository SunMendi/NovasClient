import React from "react";
import { useParams, Link } from "react-router-dom";
import { SECTORS } from "../data/sectors";
import { PRODUCTS } from "../data/products";
import { ProductCard } from "../components/domain/ProductCard";
import { Button } from "../components/ui/button";
import { Product } from "../types";
import { ShieldCheck, ArrowRight, FileCheck2, CheckCircle2, Factory, Shield, Cpu, Map, Truck, Anchor } from "lucide-react";

interface IndustryPageProps {
  onOpenRfq: (item?: Product) => void;
}

export const IndustryPage: React.FC<IndustryPageProps> = ({ onOpenRfq }) => {
  const { category_id } = useParams<{ category_id?: string }>();
  const sectorId = category_id?.toLowerCase() || "defence";

  const sector =
    SECTORS.find((s) => s.slug === sectorId || s.id === sectorId) ||
    SECTORS[0];

  const relatedProducts = PRODUCTS.filter(
    (p) => p.sectorId.toLowerCase() === sector.id.toLowerCase() || p.sectorId.toLowerCase() === sectorId
  );

  const getSectorIcon = (name: string) => {
    switch (name) {
      case "Shield": return <Shield className="size-8 text-[#ed145b]" />;
      case "Anchor": return <Anchor className="size-8 text-[#005f99]" />;
      case "Factory": return <Factory className="size-8 text-orange-400" />;
      case "Map": return <Map className="size-8 text-[#10b981]" />;
      case "Cpu": return <Cpu className="size-8 text-purple-400" />;
      default: return <Truck className="size-8 text-pink-400" />;
    }
  };

  return (
    <div className="flex flex-col space-y-12 pb-24">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-border/80 bg-gradient-to-b from-[#061833] via-[#02163b] to-[#030a18] py-16 sm:py-20">
        <div className="pointer-events-none absolute -right-20 top-0 size-96 rounded-full bg-[#ed145b]/10 blur-3xl" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ed145b]/40 bg-[#002e6e]/60 px-4 py-1 text-xs font-mono uppercase tracking-wider text-[#ed145b]">
              <span>CORE SECTOR CAPABILITY</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-[#061833] border border-slate-700">
                {getSectorIcon(sector.iconName)}
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {sector.name}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              {sector.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {sector.capabilities.map((area, idx) => (
                <span
                  key={idx}
                  className="rounded-lg bg-[#061833] border border-slate-700 px-3 py-1 text-xs font-mono text-slate-300"
                >
                  • {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sector Standards & Key Capabilities */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-800 bg-[#061833] p-8 sm:p-10 space-y-6">
          <h2 className="font-display text-2xl font-bold text-white">
            Engineering Standards &amp; <span className="text-[#ed145b]">Compliance</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-[#030a18] p-4">
              <ShieldCheck className="size-5 text-[#ed145b] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white text-sm">International Verification</div>
                <p className="text-xs text-slate-400 mt-1">Direct OEM verification meeting NATO, MIL-STD-810H, and NIJ specifications.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-[#030a18] p-4">
              <CheckCircle2 className="size-5 text-[#10b981] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white text-sm">Full Audit Trail</div>
                <p className="text-xs text-slate-400 mt-1">Traceable certificate of conformity (CoC), EUC handling, and DGDP protocol compliance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Equipment & Products */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#ed145b] mb-1">
              SECTOR INVENTORY
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Equipment for <span className="text-[#ed145b]">{sector.name}</span>
            </h2>
          </div>
          <Button asChild variant="outline" size="sm" className="border-slate-700 text-white hover:bg-[#002e6e]">
            <Link to="/products/all" className="gap-2">
              <span>All Equipment</span>
              <ArrowRight className="size-4 text-[#ed145b]" />
            </Link>
          </Button>
        </div>

        {relatedProducts.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-[#061833] p-12 text-center text-slate-400">
            No specific products listed under this sector yet. Contact our desk for custom procurement.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onOpenRfq={onOpenRfq} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
