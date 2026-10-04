import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CONSULTANCY_CATEGORIES,
  CONSULTANCY_SERVICES,
  getConsultancyCategoryById
} from "../data/consultancy";
import { ConsultancyCard } from "../components/domain/ConsultancyCard";
import { Button } from "../components/ui/button";
import { ConsultancyService } from "../types";
import {
  Search,
  LayoutGrid,
  List,
  ShieldCheck,
  Globe2,
  Cpu,
  Briefcase,
  FileCheck,
  Building2,
  Compass,
  ArrowRight
} from "lucide-react";

import { DynamicTopBanner, DynamicBannerSlide } from "../components/common/DynamicTopBanner";
import { api } from "../services/api";

const CONSULTANCY_SLIDES: DynamicBannerSlide[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80",
    badgeText: "INTERNATIONAL CONSULTANCY // GLOBAL TRADE",
    badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
    title: (
      <>
        Foreign OEM Representation &amp; <span className="text-[#ed145b]">Global Trade Alliances</span>
      </>
    ),
    subtitle: "Accredited local representation connecting European, North American, and Asian defense manufacturers with South Asian sovereign procurement directorates.",
    link: "/consultancy/international",
    linkText: "Explore International Practice"
  },
  {
    imageUrl: "/assets/hero/hero-cyber-BQaYidYs.jpg",
    badgeText: "IT & TELECOMMUNICATION // C4ISR & CYBER",
    badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
    title: (
      <>
        Tactical Defense Comms &amp; <span className="text-[#ed145b]">Sovereign Data Infrastructure</span>
      </>
    ),
    subtitle: "Architecting mission-critical tactical radio backbones, Tier-III/IV data centers, encrypted communication systems, and cyber defense operation centers.",
    link: "/consultancy/it-telecom",
    linkText: "Explore Telecom Practice"
  },
  {
    imageUrl: "/assets/hero/hero-logistics-sV_p9M_H.jpg",
    badgeText: "PROJECT CONSULTANCY // TURNKEY EPC",
    badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
    title: (
      <>
        Turnkey Industrial EPC &amp; <span className="text-[#ed145b]">Naval Modernization</span>
      </>
    ),
    subtitle: "Comprehensive project management, heavy shipyard engineering, automated CNC cutting lines, and high-capacity manufacturing plant feasibility.",
    link: "/consultancy/project",
    linkText: "Explore Project Advisory"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    badgeText: "TENDER ADVISORY // DGDP & ICB BIDDING",
    badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
    title: (
      <>
        DGDP Defense Procurement &amp; <span className="text-[#ed145b]">Government Tender Advisory</span>
      </>
    ),
    subtitle: "Directorate General Defence Purchase (DGDP) protocols, International Competitive Bidding (ICB), commercial valuation, and compliant bid documentation.",
    link: "/consultancy/tender",
    linkText: "Explore Tender Advisory"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80",
    badgeText: "REAL ESTATE & CONSTRUCTION // DEFENSE INFRASTRUCTURE",
    badgeIcon: <ShieldCheck className="size-3.5 text-[#ed145b]" />,
    title: (
      <>
        Specialized Defense Cantonments &amp; <span className="text-[#ed145b]">Coastal Port Civil Works</span>
      </>
    ),
    subtitle: "Structural engineering, marine jetty berth construction, specialized blast-hardened defense compounds, and coastal hydrodynamics.",
    link: "/consultancy/real-estate-construction",
    linkText: "Explore Construction Practice"
  }
];

interface ConsultancyListPageProps {
  onOpenRfq: (service?: ConsultancyService) => void;
}

export const ConsultancyListPage: React.FC<ConsultancyListPageProps> = ({ onOpenRfq }) => {
  const { category_id } = useParams<{ category_id?: string }>();
  const activeCategoryId = category_id?.toLowerCase() || "all";

  const [services, setServices] = useState<ConsultancyService[]>(CONSULTANCY_SERVICES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(activeCategoryId);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  useEffect(() => {
    api.getConsultancyServices().then(setServices).catch(() => {});
  }, []);

  // Keep state in sync if URL route changes
  useEffect(() => {
    setSelectedCategory(category_id?.toLowerCase() || "all");
  }, [category_id]);

  const categories = [
    { id: "all", name: "All Consultancy", icon: Compass },
    { id: "international", name: "International Consultancy", icon: Globe2 },
    { id: "it-telecom", name: "IT & Telecommunication", icon: Cpu },
    { id: "project", name: "Project Consultancy", icon: Briefcase },
    { id: "tender", name: "Tender Consultancy", icon: FileCheck },
    { id: "real-estate-construction", name: "Real Estate & Construction", icon: Building2 }
  ];

  const currentCategoryData = getConsultancyCategoryById(selectedCategory);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        selectedCategory === "all" ||
        service.categoryId.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        service.name.toLowerCase().includes(query) ||
        service.summary.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.categoryName.toLowerCase().includes(query) ||
        service.deliverables.some((d) => d.toLowerCase().includes(query)) ||
        service.standards.some((s) => s.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCategory, searchQuery]);

  const currentCategoryTitle =
    categories.find((c) => c.id === selectedCategory)?.name || "Strategic Advisory";

  return (
    <div className="flex flex-col space-y-10 pb-24">
      {/* Dynamic Header Banner with Specific Consultancy Variation Data Changing per Slide */}
      <DynamicTopBanner
        slides={CONSULTANCY_SLIDES}
        align="left"
      />

      {/* Filter Tabs & Search Bar */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <Link
                  key={cat.id}
                  to={cat.id === "all" ? "/consultancy/all" : `/consultancy/${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#ed145b] text-white shadow-md shadow-[#ed145b]/20"
                      : "bg-white text-[#133057] hover:bg-slate-50 border border-slate-200"
                  }`}
                >
                  <Icon className={`size-3.5 ${isActive ? "text-white" : "text-[#002e6e]"}`} />
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Controls: Search & View Mode Toggle */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search advisory scope, tenders..."
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

        {/* Category Description Banner if a specific category is chosen */}
        {currentCategoryData && selectedCategory !== "all" && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#ed145b]">
                  Variation Overview
                </span>
                <h2 className="font-display text-xl font-bold text-[#002e6e]">
                  {currentCategoryData.name} — {currentCategoryData.tagline}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                  {currentCategoryData.description}
                </p>
              </div>

              <Button
                onClick={() => onOpenRfq()}
                variant="outline"
                size="sm"
                className="shrink-0 border-[#002e6e] text-[#002e6e] hover:bg-[#002e6e] hover:text-white text-xs font-semibold"
              >
                Book Advisory Session
                <ArrowRight className="ml-1.5 size-3.5" />
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Services Display (Grid or Table) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        {filteredServices.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-4 shadow-sm">
            <p className="text-base text-slate-600">No consultancy services found matching your criteria.</p>
            <Button
              onClick={() => {
                setSelectedCategory("all");
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
            {filteredServices.map((service) => (
              <ConsultancyCard
                key={service.id}
                service={service}
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
                    <th className="py-3 px-4">Advisory Practice</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Engagement Duration</th>
                    <th className="py-3 px-4">Lead Advisory Unit</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredServices.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={s.imageUrl}
                            alt={s.name}
                            className="size-12 rounded-lg object-cover bg-slate-100 shrink-0"
                          />
                          <div>
                            <Link
                              to={`/consultancy/service/${s.id}`}
                              className="font-display font-bold text-[#002e6e] hover:text-[#ed145b] transition-colors"
                            >
                              {s.name}
                            </Link>
                            <p className="text-xs text-slate-500 line-clamp-1">{s.tagline}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-sans text-slate-700 font-medium">
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-[#002e6e] font-semibold">
                          {s.categoryName}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-sans text-slate-600">{s.duration}</td>
                      <td className="py-4 px-4 font-sans text-slate-600 text-xs">{s.leadAdvisors}</td>
                      <td className="py-4 px-4 text-right">
                        <Button
                          onClick={() => onOpenRfq(s)}
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
