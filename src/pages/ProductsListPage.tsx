import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { ProductCard } from "../components/domain/ProductCard";
import { Button } from "../components/ui/button";
import { Product } from "../types";
import { Search, LayoutGrid, List, ShieldCheck } from "lucide-react";
import { DynamicTopBanner, DynamicBannerSlide } from "../components/common/DynamicTopBanner";
import { api } from "../services/api";

interface ProductsListPageProps {
  onOpenRfq: (item?: Product) => void;
}

export const PRODUCT_CATEGORY_SLIDES: Record<string, DynamicBannerSlide[]> = {
  all: [
    {
      imageUrl: "/assets/hero/hero-defence-CzOJrdZI.jpg",
      badgeText: "MISSION EQUIPMENT // ALL CATEGORIES",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Certified Mission Hardware &amp; <span className="text-[#ed145b]">Sovereign Equipment</span>
        </>
      ),
      subtitle:
        "Explore certified defense hardware, tactical protective armor, hydrographic marine sonar, emergency field medical equipment, and heavy industrial machinery.",
      tags: ["MIL-STD-810H", "NIJ Level IV", "IMO/SOLAS", "Direct OEM Supply"],
      link: "/products/defence",
      linkText: "Explore Defence Gear"
    },
    {
      imageUrl: "/assets/hero/hero-maritime-Z9Kk4jOd.jpg",
      badgeText: "MARITIME & COASTAL SYSTEMS",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Naval Interceptors, Radar &amp; <span className="text-[#ed145b]">Hydrographic Sonar</span>
        </>
      ),
      subtitle:
        "High-speed aluminum patrol craft, SOLAS davit-launched life rafts, and high-definition X-band naval surveillance radar arrays.",
      tags: ["Naval Vessels", "X-Band Radar", "Bureau Veritas", "IHO S-44"],
      link: "/products/maritime",
      linkText: "Explore Maritime Systems"
    },
    {
      imageUrl: "/assets/hero/hero-tactical-BSZNFcBk.jpg",
      badgeText: "TACTICAL & DEFENCE HARDWARE",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Ballistic Protection &amp; <span className="text-[#ed145b]">Advanced Optronics</span>
        </>
      ),
      subtitle:
        "Gen-3 white phosphor night vision binoculars, multi-curve Level IV stand-alone torso plates, and tactical communication headsets.",
      tags: ["NIJ Level IV", "STANAG 2920", "FOM ≥ 2000 Autogated"],
      link: "/products/tactical",
      linkText: "Explore Tactical Protection"
    },
    {
      imageUrl: "/assets/hero/hero-cyber-BQaYidYs.jpg",
      badgeText: "CYBER & MISSION-CRITICAL ICT",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Sovereign Cyber Defence &amp; <span className="text-[#ed145b]">Tactical Datalinks</span>
        </>
      ),
      subtitle:
        "Encrypted tactical radio communications, C4ISR command architectures, and sovereign Tier-III/IV data center infrastructure.",
      tags: ["Zero-Trust Architecture", "C4ISR Interoperable", "AES-256 Encryption"],
      link: "/products/ict",
      linkText: "Explore Cyber & ICT"
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
      subtitle:
        "Turnkey aluminum patrol craft with waterjet propulsion, shallow-draft harbor tugs, and SOLAS-certified life-saving apparatus.",
      tags: ["Bureau Veritas", "SOLAS Chapter V", "IMO MSC.192(79)"]
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
      subtitle:
        "Deep-water bathymetric mapping arrays, X-band/S-band IMO/SOLAS navigation radar, and harbor vessel traffic monitoring instrumentation.",
      tags: ["IHO S-44 Special Order", "IEC 62388 Ed.2", "MED-B Approved"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      badgeText: "MARITIME // LIFE-SAVING & MARITIME SAFETY",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Davit-Launched Life Rafts &amp; <span className="text-[#ed145b]">Marine Safety Systems</span>
        </>
      ),
      subtitle:
        "Self-righting, insulated dual-tube throw-overboard and davit-launched life rafts engineered for merchant vessels, warships, and offshore platforms.",
      tags: ["LSA Code", "EC MED Module B+D", "SOLAS 74/96"]
    }
  ],
  defence: [
    {
      imageUrl: "/assets/hero/hero-defence-CzOJrdZI.jpg",
      badgeText: "DEFENCE // BALLISTIC PROTECTION",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Combat Helmets &amp; <span className="text-[#ed145b]">Tactical Hard Armor</span>
        </>
      ),
      subtitle:
        "High-cut aramid composite combat helmets and multi-curve Level IV stand-alone ceramic armor plates engineered for armed forces.",
      tags: ["NIJ Level IIIA", "NIJ Level IV", "STANAG 2920", "MIL-STD-662F"]
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
      subtitle:
        "Autogated white phosphor dual-tube night vision binoculars and thermal weapon sights for defense forces and rapid response units.",
      tags: ["FOM ≥ 2000 Autogated", "MIL-STD-810H", "IP67 Submersible 20m"]
    }
  ],
  tactical: [
    {
      imageUrl: "/assets/hero/hero-tactical-BSZNFcBk.jpg",
      badgeText: "TACTICAL // SPECIAL OPERATIONS EQUIPMENT",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Rapid Response Systems &amp; <span className="text-[#ed145b]">Tactical Deployment Gear</span>
        </>
      ),
      subtitle:
        "Personal ballistic armor, advanced night vision systems, modular plate carriers, and tactical communication headsets.",
      tags: ["NIJ Level IIIA", "Wilcox Mounts", "Picatinny Modular Rails"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
      badgeText: "TACTICAL // BALLISTIC HARD ARMOR",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Silicon Carbide Ceramic &amp; <span className="text-[#ed145b]">UHMWPE Armor</span>
        </>
      ),
      subtitle:
        "Rifle-rated ballistic torso protection engineered with monolithic silicon carbide ceramics backed with multi-axial UHMWPE fiber matrix.",
      tags: ["NIJ Level IV (.30-06 AP)", "SAPI Multi-Curve", "Cordura Spall Wrap"]
    }
  ],
  medical: [
    {
      imageUrl: "/assets/hero/hero-medical-DBJtfXpF.jpg",
      badgeText: "MEDICAL // CASUALTY RESPONSE & TCCC",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Field Trauma Kits &amp; <span className="text-[#ed145b]">Deployable Healthcare</span>
        </>
      ),
      subtitle:
        "TCCC-compliant individual first aid kits, emergency surgical field units, and portable patient monitoring instrumentation for front-line medics.",
      tags: ["CoTCCC Approved", "ISO 13485 Medical", "Combat Trauma Care"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80",
      badgeText: "MEDICAL // CRITICAL CARE EQUIPMENT",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Tactical Evacuation &amp; <span className="text-[#ed145b]">Field Casualty Support</span>
        </>
      ),
      subtitle:
        "Ruggedized portable vital signs monitors, field transport litters, and casualty hypothermia prevention systems for rapid evacuation.",
      tags: ["Field Evacuation", "CE Mark Medical", "IP54 Weather-Sealed"]
    }
  ],
  agriculture: [
    {
      imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80",
      badgeText: "AGRICULTURE // PRECISION AERIAL ROBOTICS",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Autonomous Agricultural Drones &amp; <span className="text-[#ed145b]">Smart Sensors</span>
        </>
      ),
      subtitle:
        "Heavy-lift RTK-guided spraying UAVs, multispectral crop health analytics, and IoT smart soil telemetry networks for agricultural efficiency.",
      tags: ["RTK ±1cm Positioning", "IP67 Waterproof", "LoRaWAN 15km Telemetry"]
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1595838796899-8a56f2a873e8?auto=format&fit=crop&w=1200&q=80",
      badgeText: "AGRICULTURE // INDUSTRIAL AGRI MACHINERY",
      badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
      title: (
        <>
          Precision Harvesters &amp; <span className="text-[#ed145b]">Crop Sprayers</span>
        </>
      ),
      subtitle:
        "Modern combine harvesters with GPS yield monitoring and tractor-mounted variable-rate agricultural sprayers for food security initiatives.",
      tags: ["ISO 4254-7 Safety", "ISOBUS 11783", "CE Machinery Directive"]
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
      subtitle:
        "Dual-gantry heavy duty CNC plasma and oxy-fuel cutting stations handling high-tensile steel plates up to 50mm with automated nesting software.",
      tags: ["Heavy EPC Tooling", "50mm Steel Cutting", "Automated Nesting"]
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
      subtitle:
        "High-capacity synchronized diesel power generation, medium-voltage distribution switchgear, and industrial machinery for EPC megaprojects.",
      tags: ["Medium-Voltage Switchgear", "Turnkey EPC", "Continuous Duty"]
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
      subtitle:
        "Hardened server infrastructure, next-generation enterprise SIEM, air-gapped forensic labs, and high-density operator command video walls.",
      tags: ["Zero-Trust Architecture", "Tier-III/IV Data Center", "Air-Gapped Security"]
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
      subtitle:
        "Military-grade frequency-hopping tactical radios, encrypted microwave backbones, and sovereign edge computing data centers.",
      tags: ["Frequency Hopping", "AES-256 Encryption", "C4ISR Interoperable"]
    }
  ]
};

export const ProductsListPage: React.FC<ProductsListPageProps> = ({ onOpenRfq }) => {
  const { category_id } = useParams<{ category_id?: string }>();
  const currentCategory = category_id?.toLowerCase() || "all";

  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState(currentCategory);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  useEffect(() => {
    api.getProducts().then(setProducts).catch(() => {});
  }, []);

  const categories = [
    { id: "all", name: "All Products" },
    { id: "defence", name: "Defence" },
    { id: "tactical", name: "Tactical" },
    { id: "maritime", name: "Maritime" },
    { id: "medical", name: "Medical" },
    { id: "agriculture", name: "Agriculture" },
    { id: "industry", name: "Industry" },
    { id: "ict", name: "Cyber & ICT" }
  ];

  // Update selected sector if category param changes
  useEffect(() => {
    if (category_id) {
      setSelectedSector(category_id.toLowerCase());
    }
  }, [category_id]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const selected = selectedSector.toLowerCase();
      const matchesCategory =
        selected === "all" ||
        p.sectorId.toLowerCase() === selected ||
        p.category.toLowerCase() === selected ||
        p.category.toLowerCase().includes(selected) ||
        (selected === "agriculture" && (p.category.toLowerCase() === "agriculture" || p.category.toLowerCase() === "agri"));

      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedSector, searchQuery]);

  const currentCategoryName =
    categories.find((c) => c.id === selectedSector)?.name || "Mission Equipment";

  const categorySlides = useMemo<DynamicBannerSlide[]>(() => {
    const key = selectedSector.toLowerCase();
    return PRODUCT_CATEGORY_SLIDES[key] || PRODUCT_CATEGORY_SLIDES.all;
  }, [selectedSector]);

  return (
    <div className="flex flex-col space-y-10 pb-24">
      {/* Dynamic Header Banner with Specific Category Slides */}
      <DynamicTopBanner
        key={selectedSector}
        slides={categorySlides}
        align="left"
      />

      {/* Filter Tabs & Search Bar */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products/${cat.id}`}
                onClick={() => setSelectedSector(cat.id)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                  selectedSector === cat.id
                    ? "bg-[#ed145b] text-white shadow-md shadow-[#ed145b]/20"
                    : "bg-white text-[#133057] hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Controls: Search & View Toggle */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search equipment, specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs text-[#133057] placeholder-slate-400 focus:border-[#ed145b] focus:outline-none shadow-xs"
              />
            </div>

            <div className="flex items-center rounded-lg border border-slate-200 bg-white p-1 shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Grid View"
                className={`p-1.5 rounded transition-colors ${
                  viewMode === "grid" ? "bg-[#002e6e] text-white" : "text-slate-500 hover:text-[#002e6e]"
                }`}
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                aria-label="Table View"
                className={`p-1.5 rounded transition-colors ${
                  viewMode === "table" ? "bg-[#002e6e] text-white" : "text-slate-500 hover:text-[#002e6e]"
                }`}
              >
                <List className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Display (Grid or Table) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-4 shadow-sm">
            <p className="text-base text-slate-600">No products available in this category.</p>
            <Button
              onClick={() => {
                setSelectedSector("all");
                setSearchQuery("");
              }}
              variant="outline"
              className="border-slate-300 text-[#002e6e] hover:bg-[#002e6e] hover:text-white"
            >
              Reset Filters
            </Button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenRfq={onOpenRfq}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 font-sans text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <th className="py-3 px-4">Equipment</th>
                    <th className="py-3 px-4">Sector</th>
                    <th className="py-3 px-4">Certifications</th>
                    <th className="py-3 px-4">Origin</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="size-12 rounded-lg object-cover bg-slate-100 shrink-0"
                          />
                          <div>
                            <Link
                              to={`/product/${p.id}`}
                              className="font-display font-bold text-[#002e6e] hover:text-[#ed145b] transition-colors"
                            >
                              {p.name}
                            </Link>
                            <p className="text-xs text-slate-500 line-clamp-1">{p.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-sans text-slate-700 capitalize font-medium">{p.sectorId}</td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {p.certifications.slice(0, 2).map((c, idx) => (
                            <span
                              key={idx}
                              className="rounded bg-[#ed145b]/10 border border-[#ed145b]/30 px-2 py-0.5 font-sans text-[11px] text-[#ed145b] font-semibold"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-sans text-slate-600 font-medium">{p.origin}</td>
                      <td className="py-4 px-4 text-right">
                        <Button
                          onClick={() => onOpenRfq(p)}
                          size="sm"
                          className="bg-[#ed145b] hover:bg-[#d00f4e] text-white text-xs font-semibold rounded-lg shadow-sm shadow-[#ed145b]/20"
                        >
                          Request RFQ
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
