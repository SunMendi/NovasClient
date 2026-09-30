import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { ProductCard } from "../components/domain/ProductCard";
import { Button } from "../components/ui/button";
import { Product } from "../types";
import { Search, LayoutGrid, List, ShieldCheck } from "lucide-react";

interface ProductsListPageProps {
  onOpenRfq: (item?: Product) => void;
}

export const ProductsListPage: React.FC<ProductsListPageProps> = ({ onOpenRfq }) => {
  const { category_id } = useParams<{ category_id?: string }>();
  const currentCategory = category_id?.toLowerCase() || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState(currentCategory);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "defence", name: "Defence" },
    { id: "tactical", name: "Tactical" },
    { id: "medical", name: "Medical" },
    { id: "maritime", name: "Maritime" },
    { id: "industry", name: "Industry" },
    { id: "ict", name: "Cyber & ICT" }
  ];

  // Update selected sector if category param changes
  React.useEffect(() => {
    if (category_id) {
      setSelectedSector(category_id.toLowerCase());
    }
  }, [category_id]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory =
        selectedSector === "all" ||
        p.sectorId.toLowerCase() === selectedSector.toLowerCase() ||
        p.category.toLowerCase().includes(selectedSector.toLowerCase());

      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedSector, searchQuery]);

  const currentCategoryName =
    categories.find((c) => c.id === selectedSector)?.name || "Mission Equipment";

  return (
    <div className="flex flex-col space-y-10 pb-24">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#002e6e] via-[#042e6f] to-[#001f4d] py-14 sm:py-18 text-white">
        <div className="pointer-events-none absolute -right-20 top-0 size-96 rounded-full bg-[#ed145b]/15 blur-3xl" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-mono uppercase tracking-wider text-white backdrop-blur-md">
            <ShieldCheck className="size-3.5 text-[#ed145b]" />
            <span>MIL-STD-810H • NIJ LEVEL IV • IMO/SOLAS CERTIFIED</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {filteredProducts.length} Products in{" "}
            <span className="text-[#ed145b]">{currentCategoryName}</span> Category
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Explore certified hardware, tactical protective armor, hydrographic marine sonar, emergency field medical equipment, and heavy industrial fabrication machinery.
          </p>
        </div>
      </section>

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
                  <tr className="border-b border-slate-200 bg-slate-50 font-mono text-xs text-slate-500 uppercase">
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
                      <td className="py-4 px-4 font-mono text-slate-700 capitalize">{p.sectorId}</td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {p.certifications.slice(0, 2).map((c, idx) => (
                            <span
                              key={idx}
                              className="rounded bg-[#ed145b]/10 border border-[#ed145b]/30 px-2 py-0.5 font-mono text-[10px] text-[#ed145b] font-semibold"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-mono text-slate-600">{p.origin}</td>
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
