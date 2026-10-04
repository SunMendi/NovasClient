import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { VESSELS } from "../data/vessels";
import { VesselHud } from "../components/domain/VesselHud";
import { EmptyState } from "../components/domain/StateView";
import { Button } from "../components/ui/button";
import { Product, Vessel } from "../types";
import {
  Download,
  FileCheck2,
  ShieldCheck,
  Clock,
  Globe2
} from "lucide-react";
import { api } from "../services/api";

interface ProductDetailPageProps {
  onOpenRfq: (item?: Product | Vessel) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onOpenRfq }) => {
  const { id, _id } = useParams<{ id?: string; _id?: string }>();
  const itemId = id || _id;
  const [downloading, setDownloading] = useState(false);

  const [product, setProduct] = useState<Product | undefined>();
  const [vessel, setVessel] = useState<Vessel | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true); setProduct(undefined); setVessel(undefined);
    const load = async () => {
      try {
        if (!itemId) return;
        const foundProduct = await api.getProductBySlug(itemId);
        if (foundProduct) { if (active) setProduct(foundProduct); }
        else {
          const foundVessel = await api.getVesselBySlug(itemId);
          if (active) setVessel(foundVessel);
        }
      } finally { if (active) setLoading(false); }
    };
    void load().catch(() => {});
    return () => { active = false; };
  }, [itemId]);

  if (loading) return <p role="status" className="container mx-auto p-12">Loading details…</p>;

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
    <div className="space-y-12 pb-24">
      {/* Breadcrumb Bar */}
      <section className="border-b border-slate-200 bg-white py-4 shadow-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
            <Link to="/" className="hover:text-[#002e6e] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/products/all" className="hover:text-[#002e6e] transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-[#ed145b] font-semibold truncate max-w-xs">{product ? product.name : vessel?.name}</span>
          </div>
        </div>
      </section>

      {/* Main Spec Sheet Display */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start max-w-6xl mx-auto">
          {/* Left Column: Image & Provenance Badges */}
          <div className="space-y-6 lg:col-span-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-md">
              <img
                src={product ? product.imageUrl : vessel?.imageUrl}
                alt={product ? product.name : vessel?.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="rounded-full bg-[#ed145b] px-3 py-1 font-mono text-xs font-bold uppercase text-white shadow-sm">
                  {product ? product.category : "Naval Vessel"}
                </span>
                {product?.featured && (
                  <span className="rounded-full bg-[#002e6e] text-white px-3 py-1 font-mono text-xs font-semibold">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Compliance Certifications Strip */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#002e6e] flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#ed145b]" />
                Verified Standards &amp; Certifications
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {product ? (
                  product.certifications.map((c, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-[#ed145b]/10 border border-[#ed145b]/30 px-2.5 py-1 font-mono text-xs text-[#ed145b] font-semibold"
                    >
                      {c}
                    </span>
                  ))
                ) : (
                  <span className="rounded-md bg-[#ed145b]/10 border border-[#ed145b]/30 px-2.5 py-1 font-mono text-xs text-[#ed145b] font-semibold">
                    {vessel?.classificationSociety || "Bureau Veritas"}
                  </span>
                )}
              </div>
            </div>

            {/* Lead Time & Origin Stats */}
            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1 shadow-xs">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <Clock className="size-3.5 text-[#ed145b]" />
                  LEAD TIME
                </span>
                <span className="font-bold text-[#002e6e] text-sm">
                  {product ? product.leadTime : vessel?.deliveryLeadTime}
                </span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1 shadow-xs">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <Globe2 className="size-3.5 text-[#005f99]" />
                  ORIGIN PROVENANCE
                </span>
                <span className="font-bold text-[#002e6e] text-sm truncate block" title={product?.origin || "Shipyard Build"}>
                  {product ? product.origin : "Novas Yard / Partner Drydock"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Description, Spec Table & RFQ CTA */}
          <div className="space-y-8 lg:col-span-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#ed145b] font-bold">
                OFFICIAL SPECIFICATION SHEET // {product ? product.id.toUpperCase() : vessel?.id.toUpperCase()}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#002e6e] mt-2">
                {product ? product.name : vessel?.name}
              </h1>
              <p className="font-display text-base font-semibold text-slate-700 mt-2">
                {product ? product.tagline : vessel?.tagline}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                {product ? product.description : vessel?.description}
              </p>
            </div>

            {/* If Vessel: Render HUD */}
            {vessel && <VesselHud vessel={vessel} />}

            {/* Technical Parameters Matrix Table */}
            <div className="space-y-3">
              <h3 className="font-display text-lg font-bold text-[#002e6e]">
                Technical Data Matrix
              </h3>
              <div className="rounded-xl border border-slate-200 bg-white overflow-hidden font-mono text-xs shadow-xs">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-slate-100">
                    {product ? (
                      product.specs.map((spec, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 text-slate-500 font-semibold w-1/2 bg-slate-50">
                            {spec.label}
                          </td>
                          <td className="p-3.5 text-[#133057] font-bold w-1/2">
                            {spec.value}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 text-slate-500 font-semibold bg-slate-50">Length Overall (LOA)</td>
                          <td className="p-3.5 text-[#133057] font-bold">{vessel?.lengthOverall}</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 text-slate-500 font-semibold bg-slate-50">Beam</td>
                          <td className="p-3.5 text-[#133057] font-bold">{vessel?.beam}</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 text-slate-500 font-semibold bg-slate-50">Draft</td>
                          <td className="p-3.5 text-[#133057] font-bold">{vessel?.draft}</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 text-slate-500 font-semibold bg-slate-50">Max Speed</td>
                          <td className="p-3.5 text-[#133057] font-bold">{vessel?.maxSpeed}</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 text-slate-500 font-semibold bg-slate-50">Propulsion &amp; Engines</td>
                          <td className="p-3.5 text-[#133057] font-bold">{vessel?.enginePower}</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 text-slate-500 font-semibold bg-slate-50">Hull Material</td>
                          <td className="p-3.5 text-[#133057] font-bold">{vessel?.hullMaterial}</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 text-slate-500 font-semibold bg-slate-50">Classification</td>
                          <td className="p-3.5 text-[#133057] font-bold">{vessel?.classificationSociety}</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200">
              <Button
                onClick={() => onOpenRfq(product || vessel || undefined)}
                size="lg"
                variant="default"
                className="flex-1 gap-2 font-bold bg-[#ed145b] hover:bg-[#d00f4e] text-white rounded-lg shadow-md shadow-[#ed145b]/20 h-12"
              >
                <FileCheck2 className="size-4 text-white" />
                <span>Request Quotation</span>
              </Button>

              <Button
                onClick={handleDownloadDatasheet}
                disabled={downloading}
                size="lg"
                variant="outline"
                className="gap-2 font-semibold text-[#002e6e] border-slate-300 bg-white hover:bg-slate-50 rounded-lg h-12"
              >
                <Download className="size-4 text-[#ed145b]" />
                <span>{downloading ? "Generating PDF..." : "Download PDF"}</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
