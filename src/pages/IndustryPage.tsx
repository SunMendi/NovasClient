import React from "react";
import { useParams, Link } from "react-router-dom";
import { SECTORS } from "../data/sectors";
import { PRODUCTS } from "../data/products";
import { ProductCard } from "../components/domain/ProductCard";
import { Button } from "../components/ui/button";
import { Product } from "../types";
import { ShieldCheck, ArrowRight, CheckCircle2, Factory, Shield, Cpu, Map, Truck, Anchor } from "lucide-react";

import { DynamicTopBanner } from "../components/common/DynamicTopBanner";

const SECTOR_BANNER_IMAGES: Record<string, string[]> = {
  defence: [
    "/assets/hero/hero-defence-CzOJrdZI.jpg",
    "/assets/hero/hero-tactical-BSZNFcBk.jpg",
    "/assets/hero/hero-aerospace-CdirWyJV.jpg",
    "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=1200&q=80"
  ],
  industry: [
    "/assets/hero/hero-logistics-sV_p9M_H.jpg",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
  ],
  maritime: [
    "/assets/hero/hero-maritime-Z9Kk4jOd.jpg",
    "https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80"
  ],
  ict: [
    "/assets/hero/hero-cyber-BQaYidYs.jpg",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80"
  ],
  geospatial: [
    "/assets/hero/hero-aerospace-CdirWyJV.jpg",
    "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80"
  ]
};

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

  const bannerImages =
    SECTOR_BANNER_IMAGES[sector.id.toLowerCase()] ||
    SECTOR_BANNER_IMAGES.defence;

  const getSectorIcon = (name: string) => {
    switch (name) {
      case "Shield": return <Shield className="size-8 text-[#ed145b]" />;
      case "Anchor": return <Anchor className="size-8 text-[#005f99]" />;
      case "Factory": return <Factory className="size-8 text-amber-500" />;
      case "Map": return <Map className="size-8 text-[#059669]" />;
      case "Cpu": return <Cpu className="size-8 text-purple-600" />;
      default: return <Truck className="size-8 text-pink-500" />;
    }
  };

  return (
    <div className="flex flex-col space-y-12 pb-24">
      {/* Dynamic Header Banner with Moving Images & Smooth Cross-Fade */}
      <DynamicTopBanner
        images={bannerImages}
        badgeText="CORE SECTOR CAPABILITY"
        badgeIcon={<ShieldCheck className="size-3.5 text-[#ed145b]" />}
        icon={getSectorIcon(sector.iconName)}
        title={
          <>
            {sector.name} <span className="text-[#ed145b]">Sector</span>
          </>
        }
        subtitle={sector.description}
        tags={sector.capabilities}
        align="left"
      />

      {/* Sector Standards & Key Capabilities */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 space-y-6 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-[#002e6e]">
            Engineering Standards &amp; <span className="text-[#ed145b]">Compliance</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <ShieldCheck className="size-5 text-[#ed145b] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#133057] text-sm">International Verification</div>
                <p className="text-xs text-slate-600 mt-1">Direct OEM verification meeting NATO, MIL-STD-810H, and NIJ specifications.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <CheckCircle2 className="size-5 text-[#059669] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#133057] text-sm">Full Audit Trail</div>
                <p className="text-xs text-slate-600 mt-1">Traceable certificate of conformity (CoC), EUC handling, and DGDP protocol compliance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Equipment & Products */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <div className="font-sans text-xs font-bold uppercase tracking-wider text-[#ed145b] mb-1">
              SECTOR INVENTORY
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#002e6e]">
              Equipment for <span className="text-[#ed145b]">{sector.name}</span>
            </h2>
          </div>
          <Button asChild variant="outline" size="sm" className="border-slate-300 text-[#002e6e] hover:bg-[#002e6e] hover:text-white">
            <Link to="/products/all" className="gap-2">
              <span>All Equipment</span>
              <ArrowRight className="size-4 text-[#ed145b]" />
            </Link>
          </Button>
        </div>

        {relatedProducts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-600 shadow-sm">
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
