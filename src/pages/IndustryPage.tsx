import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { useParams, Link } from "react-router-dom";
import { SECTORS } from "../data/sectors";
import { PRODUCTS } from "../data/products";
import { ProductCard } from "../components/domain/ProductCard";
import { Button } from "../components/ui/button";
import { Product } from "../types";
import { ShieldCheck, ArrowRight, CheckCircle2, Factory, Shield, Cpu, Map, Truck, Anchor } from "lucide-react";

import { DynamicTopBanner, DynamicBannerSlide } from "../components/common/DynamicTopBanner";

const SECTOR_SLIDES: Record<string, DynamicBannerSlide[]> = {
  defence: [
    {
      imageUrl: "/assets/hero/hero-defence-CzOJrdZI.jpg",
      badgeText: "DEFENCE // BALLISTIC FORCE PROTECTION",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Force Protection &amp; <span className="text-[#ed145b]">Combat Ballistic Systems</span>
        </>
      ),
      subtitle: "NIJ Level IV multi-curve ceramic torso plates, high-cut aramid combat helmets, and full traceability meeting MIL-STD-810H and STANAG 2920.",
      link: "/products/defence",
      linkText: "Explore Defence Products"
    },
    {
      imageUrl: "/assets/hero/hero-tactical-BSZNFcBk.jpg",
      badgeText: "DEFENCE // ADVANCED OPTRONICS",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Gen-3 Night Vision &amp; <span className="text-[#ed145b]">Thermal Optronics</span>
        </>
      ),
      subtitle: "Autogated white phosphor dual-tube night vision binoculars and thermal weapon sights for South Asian armed forces and rapid response units.",
      link: "/products/tactical",
      linkText: "Explore Tactical Gear"
    },
    {
      imageUrl: "/assets/hero/hero-aerospace-CdirWyJV.jpg",
      badgeText: "DEFENCE // BORDER SURVEILLANCE",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Tactical Border Radar &amp; <span className="text-[#ed145b]">UAV Reconnaissance</span>
        </>
      ),
      subtitle: "Long-range ground surveillance radar arrays and tactical reconnaissance UAV datalinks connecting frontier security sectors with central command.",
      link: "/projects/tactical-border-surveillance-radar",
      linkText: "View Border Surveillance"
    }
  ],
  industry: [
    {
      imageUrl: "/assets/hero/hero-logistics-sV_p9M_H.jpg",
      badgeText: "HEAVY INDUSTRY // SHIPYARD AUTOMATION",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Automated Shipyard <span className="text-[#ed145b]">CNC Plasma Cutting &amp; Fabrication</span>
        </>
      ),
      subtitle: "Dual-gantry heavy duty CNC plasma and oxy-fuel cutting stations handling high-tensile steel plates up to 50mm with automated nesting software.",
      link: "/projects/shipyard-heavy-industrial-cnc-automation",
      linkText: "View Shipyard EPC"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      badgeText: "HEAVY INDUSTRY // TURNKEY POWER & EPC",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Turnkey Power Generation &amp; <span className="text-[#ed145b]">Plant Machinery</span>
        </>
      ),
      subtitle: "High-capacity synchronized diesel power generation, medium-voltage distribution switchgear, and industrial machinery for EPC megaprojects.",
      link: "/products/industry",
      linkText: "Explore Industry Products"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
      badgeText: "HEAVY INDUSTRY // ADVANCED MANUFACTURING",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Industrial Automation &amp; <span className="text-[#ed145b]">Heavy Tooling Supply</span>
        </>
      ),
      subtitle: "Supplying process control hardware, heavy fabrication tooling, and pneumatic handling systems for high-output manufacturing and energy facilities.",
      link: "/products/industry",
      linkText: "Explore Industrial Supply"
    }
  ],
  maritime: [
    {
      imageUrl: "/assets/hero/hero-maritime-Z9Kk4jOd.jpg",
      badgeText: "MARITIME // NAVAL PLATFORMS & WORKBOATS",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          High-Speed Patrol Interceptors &amp; <span className="text-[#ed145b]">Naval Workboats</span>
        </>
      ),
      subtitle: "Turnkey aluminum patrol craft with waterjet propulsion, shallow-draft harbor tugs, and SOLAS-certified life-saving apparatus.",
      link: "/products/maritime",
      linkText: "Explore Maritime Products"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=1200&q=80",
      badgeText: "MARITIME // HYDROGRAPHIC SURVEY & SONAR",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Hydrographic Multibeam Sonar &amp; <span className="text-[#ed145b]">Navigation Radar</span>
        </>
      ),
      subtitle: "Deep-water bathymetric mapping arrays, X-band/S-band IMO/SOLAS navigation radar, and harbor vessel traffic monitoring instrumentation.",
      link: "/products/maritime",
      linkText: "Explore Sonar Systems"
    }
  ],
  ict: [
    {
      imageUrl: "/assets/hero/hero-cyber-BQaYidYs.jpg",
      badgeText: "CYBER DEFENCE // ZERO-TRUST ARCHITECTURE",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Sovereign Cyber Defence &amp; <span className="text-[#ed145b]">24/7 SOC Infrastructure</span>
        </>
      ),
      subtitle: "Hardened server infrastructure, next-generation enterprise SIEM, air-gapped forensic labs, and high-density operator command video walls.",
      link: "/products/ict",
      linkText: "Explore ICT Products"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      badgeText: "ICT // TACTICAL COMMUNICATIONS",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Encrypted Tactical Communications &amp; <span className="text-[#ed145b]">C4ISR Datalinks</span>
        </>
      ),
      subtitle: "Military-grade frequency-hopping tactical radios, encrypted microwave backbones, and sovereign edge computing data centers.",
      link: "/products/ict",
      linkText: "Explore Tactical Comms"
    }
  ],
  geospatial: [
    {
      imageUrl: "/assets/hero/hero-aerospace-CdirWyJV.jpg",
      badgeText: "AEROSPACE // TACTICAL RECONNAISSANCE",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Tactical Reconnaissance UAVs &amp; <span className="text-[#ed145b]">Sensors</span>
        </>
      ),
      subtitle: "Long-endurance tactical UAVs, electro-optical sensor pods, and high-altitude mapping payloads for defense forces and coastal surveillance.",
      link: "/industry/geospatial",
      linkText: "Explore Geospatial Systems"
    }
  ]
};

interface IndustryPageProps {
  onOpenRfq: (item?: Product) => void;
}

export const IndustryPage: React.FC<IndustryPageProps> = ({ onOpenRfq }) => {
  const { category_id } = useParams<{ category_id?: string }>();
  const sectorId = category_id?.toLowerCase() || "defence";

  const [products, setProducts] = useState(PRODUCTS);
  const [sectors, setSectors] = useState(SECTORS);
  useEffect(() => {
    let active = true;
    api.getProducts().then(data => { if (active) setProducts(data); }).catch(() => {});
    api.getSectors().then(data => { if (active) setSectors(data); }).catch(() => {});
    return () => { active = false; };
  }, []);

  const sector =
    sectors.find((s) => s.slug === sectorId || s.id === sectorId) ||
    SECTORS[0];

  const relatedProducts = products.filter(
    (p) => p.sectorId.toLowerCase() === sector.id.toLowerCase() || p.sectorId.toLowerCase() === sectorId
  );

  const sectorSlides =
    SECTOR_SLIDES[sector.id.toLowerCase()] ||
    SECTOR_SLIDES.defence;

  return (
    <div className="flex flex-col space-y-12 pb-24">
      {/* Dynamic Header Banner with Specific Sector Data Changing per Slide */}
      <DynamicTopBanner
        slides={sectorSlides}
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
