import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { VESSELS } from "../data/vessels";
import { ProductCard } from "../components/domain/ProductCard";
import { VesselHud } from "../components/domain/VesselHud";
import { EmptyState, LoadingSkeletonGrid } from "../components/domain/StateView";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  Table as TableIcon,
  Shield,
  Anchor,
  ArrowRight,
  FileText
} from "lucide-react";
import { Product, Vessel, ProductCategory } from "../types";

interface CataloguePageProps {
  onOpenRfq: (item?: Product | Vessel) => void;
}

export const CataloguePage: React.FC<CataloguePageProps> = ({ onOpenRfq }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSector = searchParams.get("sector");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"featured" | "name-asc" | "name-desc">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Categories list with count
  const categories: { label: string; value: string; count: number }[] = [
    { label: "All", value: "All", count: PRODUCTS.length + VESSELS.length },
    { label: "Defence", value: "Defence", count: PRODUCTS.filter((p) => p.category === "Defence").length },
    { label: "Tactical", value: "Tactical", count: PRODUCTS.filter((p) => p.category === "Tactical").length },
    { label: "Maritime", value: "Maritime", count: PRODUCTS.filter((p) => p.category === "Maritime").length },
    { label: "Medical", value: "Medical", count: PRODUCTS.filter((p) => p.category === "Medical").length },
    { label: "Agri", value: "Agri", count: PRODUCTS.filter((p) => p.category === "Agri").length },
    { label: "Naval Vessels", value: "Vessels", count: VESSELS.length },
  ];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let list: Product[] = [...PRODUCTS];

    if (initialSector) {
      list = list.filter((p) => p.sectorId === initialSector);
    }

    if (selectedCategory !== "All" && selectedCategory !== "Vessels") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedCategory === "Vessels") {
      list = []; // vessels handled separately
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.certifications.some((c) => c.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [searchTerm, selectedCategory, sortBy, initialSector]);

  // Filtered vessels
  const filteredVessels = useMemo(() => {
    if (selectedCategory !== "All" && selectedCategory !== "Vessels" && selectedCategory !== "Maritime") {
      return [];
    }

    let list = [...VESSELS];
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.vesselType.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [searchTerm, selectedCategory]);

  const totalResults = filteredProducts.length + filteredVessels.length;

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("featured");
    setSearchParams({});
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Banner */}
      <section className="border-b border-border/60 bg-navy-900/70 py-16 sm:py-20 bg-grid-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-signal font-bold">
              Product Catalogue & Vessel Fleet
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-ink tracking-tight">
              Mission-Ready Equipment. <br />
              <span className="text-amber-signal">All in One Directory.</span>
            </h1>
            <p className="text-base text-metal leading-relaxed">
              Explore 13+ certified products and custom naval vessels across Defence, Tactical, Maritime, Medical, and Agricultural sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar Controls */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          {/* Top Controls: Search Input + Sort + View Mode Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-metal" />
              <Input
                type="search"
                placeholder="Search equipment, MIL-STD specs, radar, sonar or vessels…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 pr-4 bg-navy-900"
              />
            </div>

            {/* Sort Controls & View Mode */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-metal">
                <SlidersHorizontal className="size-3.5 text-amber-signal" />
                <span className="hidden sm:inline">SORT:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-lg border border-border/80 bg-navy-900 px-3 py-2 text-xs font-semibold text-ink focus:border-amber-signal focus:outline-none"
                >
                  <option value="featured">Featured First</option>
                  <option value="name-asc">Name (A–Z)</option>
                  <option value="name-desc">Name (Z–A)</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center rounded-lg border border-border/60 bg-navy-900 p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`rounded p-1.5 transition-colors ${
                    viewMode === "grid"
                      ? "bg-amber-signal text-navy-950 font-bold"
                      : "text-metal hover:text-ink"
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={`rounded p-1.5 transition-colors ${
                    viewMode === "table"
                      ? "bg-amber-signal text-navy-950 font-bold"
                      : "text-metal hover:text-ink"
                  }`}
                  title="Table View"
                >
                  <TableIcon className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills with Item Counters */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-display text-xs font-semibold transition-all ${
                    isSelected
                      ? "border-amber-signal bg-amber-signal text-navy-950 font-bold shadow-amber"
                      : "border-border/70 bg-navy-900 text-metal hover:border-amber-signal/40 hover:text-ink"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                      isSelected ? "bg-navy-950/20 text-navy-950" : "bg-navy-850 text-secondary"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <LoadingSkeletonGrid count={6} />
        ) : totalResults === 0 ? (
          <EmptyState
            title="No Matching Equipment Found"
            message={`No specifications matched "${searchTerm}". Try broadening your search or resetting category filters.`}
            onReset={handleReset}
          />
        ) : viewMode === "grid" ? (
          <div className="space-y-16">
            {/* Products Grid */}
            {filteredProducts.length > 0 && (
              <div className="space-y-6">
                {selectedCategory === "All" && (
                  <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                    <Shield className="size-4 text-amber-signal" />
                    <h2 className="font-mono text-xs uppercase tracking-widest text-secondary font-bold">
                      Mission Hardware & Protective Systems ({filteredProducts.length})
                    </h2>
                  </div>
                )}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenRfq={onOpenRfq}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Custom Naval Vessels Grid (Inspired by Loyd Shipyard) */}
            {filteredVessels.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                  <Anchor className="size-4 text-marine" />
                  <h2 className="font-mono text-xs uppercase tracking-widest text-secondary font-bold">
                    Custom Workboats & Naval Vessels ({filteredVessels.length})
                  </h2>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  {filteredVessels.map((vessel) => (
                    <Card
                      key={vessel.id}
                      className="group overflow-hidden rounded-2xl border border-border/70 bg-navy-900 transition-all duration-300 hover:-translate-y-1 hover:border-marine/50 shadow-card"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-navy-950">
                        <img
                          src={vessel.imageUrl}
                          alt={vessel.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <Badge variant="marine">{vessel.vesselType}</Badge>
                        </div>
                      </div>

                      <CardContent className="p-6 space-y-4">
                        <div>
                          <h3 className="font-display text-2xl font-bold text-ink group-hover:text-sky-400 transition-colors">
                            {vessel.name}
                          </h3>
                          <p className="text-xs text-metal mt-1 leading-relaxed">
                            {vessel.description}
                          </p>
                        </div>

                        {/* Vessel HUD telemetry */}
                        <VesselHud vessel={vessel} />

                        <div className="flex items-center gap-3 pt-2">
                          <Button
                            onClick={() => onOpenRfq(vessel)}
                            variant="marine"
                            size="sm"
                            className="flex-1 text-xs"
                          >
                            <span>Request Vessel Quotation</span>
                            <ArrowRight className="ml-1.5 size-3.5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Table View for Technical Officers */
          <div className="rounded-2xl border border-border/70 bg-navy-900 p-2 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="border-b border-border/80 bg-navy-950 text-metal uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-bold text-ink">Designation / Model</th>
                  <th className="p-4 font-bold text-ink">Category</th>
                  <th className="p-4 font-bold text-ink">Key Standard / Cert</th>
                  <th className="p-4 font-bold text-ink">Lead Time</th>
                  <th className="p-4 font-bold text-ink text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-secondary">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-navy-850/60 transition-colors">
                    <td className="p-4 font-bold text-ink font-display text-sm">
                      {p.name}
                      <span className="block font-mono text-xs text-metal font-normal mt-0.5">
                        {p.tagline}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary">{p.category}</Badge>
                    </td>
                    <td className="p-4 text-secondary">
                      {p.certifications[0] || "MIL-STD"}
                    </td>
                    <td className="p-4 text-metal">{p.leadTime}</td>
                    <td className="p-4 text-right space-x-2">
                      <Button
                        onClick={() => onOpenRfq(p)}
                        size="sm"
                        variant="default"
                        className="text-xs h-8"
                      >
                        Enquire
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredVessels.map((v) => (
                  <tr key={v.id} className="hover:bg-navy-850/60 transition-colors">
                    <td className="p-4 font-bold text-ink font-display text-sm">
                      {v.name}
                      <span className="block font-mono text-xs text-sky-400 font-normal mt-0.5">
                        {v.vesselType} ({v.lengthOverall})
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge variant="marine">Vessel</Badge>
                    </td>
                    <td className="p-4 text-secondary">
                      {v.classificationSociety}
                    </td>
                    <td className="p-4 text-metal">{v.deliveryLeadTime}</td>
                    <td className="p-4 text-right space-x-2">
                      <Button
                        onClick={() => onOpenRfq(v)}
                        size="sm"
                        variant="marine"
                        className="text-xs h-8"
                      >
                        Quote
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};
