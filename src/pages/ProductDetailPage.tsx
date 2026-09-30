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
  const { id, _id } = useParams<{ id?: string; _id?: string }>();
  const itemId = id || _id;
  const [downloading, setDownloading] = useState(false);

  const product = PRODUCTS.find((p) => p.slug === itemId || p.id === itemId);
  const vessel = !product ? VESSELS.find((v) => v.slug === itemId || v.id === itemId) : null;

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
      <section className="border-b border-slate-800 bg-[#061833]/60 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/products/all" className="hover:text-white transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-[#ed145b] truncate max-w-xs">{product ? product.name : vessel?.name}</span>
          </div>
        </div>
      </section>

      {/* Main Spec Sheet Display */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start max-w-6xl mx-auto">
          {/* Left Column: Image & Provenance Badges */}
          <div className="space-y-6 lg:col-span-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-xl">
              <img
                src={product ? product.imageUrl : vessel?.imageUrl}
                alt={product ? product.name : vessel?.name}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-60" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="rounded-full bg-[#ed145b] px-3 py-1 font-mono text-xs font-bold uppercase text-white shadow-md">
                  {product ? product.category : "Naval Vessel"}
                </span>
                {product?.featured && (
                  <span className="rounded-full bg-[#002e6e] border border-slate-600 px-3 py-1 font-mono text-xs text-white">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Compliance Certifications Strip */}
            <div className="rounded-xl border border-slate-800 bg-[#061833] p-5 space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#ed145b]" />
                Verified Standards &amp; Certifications
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {product ? (
                  product.certifications.map((c, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-[#ed145b]/10 border border-[#ed145b]/30 px-2.5 py-1 font-mono text-xs text-[#ed145b]"
                    >
                      {c}
                    </span>
                  ))
                ) : (
                  <span className="rounded-md bg-[#ed145b]/10 border border-[#ed145b]/30 px-2.5 py-1 font-mono text-xs text-[#ed145b]">
                    {vessel?.classificationSociety || "Bureau Veritas"}
                  </span>
                )}
              </div>
            </div>

            {/* Lead Time & Origin Stats */}
            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="rounded-xl border border-slate-800 bg-[#061833] p-4 space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="size-3.5 text-[#ed145b]" />
                  LEAD TIME
                </span>
                <span className="font-bold text-white text-sm">
                  {product ? product.leadTime : vessel?.deliveryLeadTime}
                </span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-[#061833] p-4 space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Globe2 className="size-3.5 text-sky-400" />
                  ORIGIN PROVENANCE
                </span>
                <span className="font-bold text-white text-sm truncate block" title={product?.origin || "Shipyard Build"}>
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
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-2">
                {product ? product.name : vessel?.name}
              </h1>
              <p className="font-display text-base font-semibold text-slate-300 mt-2">
                {product ? product.tagline : vessel?.tagline}
              </p>
              <p className="text-sm text-slate-300 leading-relaxed mt-4">
                {product ? product.description : vessel?.description}
              </p>
            </div>

            {/* If Vessel: Render HUD */}
            {vessel && <VesselHud vessel={vessel} />}

            {/* Technical Parameters Matrix Table */}
            <div className="space-y-3">
              <h3 className="font-display text-lg font-bold text-white">
                Technical Data Matrix
              </h3>
              <div className="rounded-xl border border-slate-800 bg-[#061833] overflow-hidden font-mono text-xs">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-slate-800">
                    {product ? (
                      product.specs.map((spec, i) => (
                        <tr key={i} className="hover:bg-[#0f2c56]/40 transition-colors">
                          <td className="p-3.5 text-slate-400 font-semibold w-1/2 bg-[#02163b]/50">
                            {spec.label}
                          </td>
                          <td className="p-3.5 text-white font-bold w-1/2">
                            {spec.value}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr className="hover:bg-[#0f2c56]/40 transition-colors">
                          <td className="p-3.5 text-slate-400 font-semibold bg-[#02163b]/50">Length Overall (LOA)</td>
                          <td className="p-3.5 text-white font-bold">{vessel?.lengthOverall}</td>
                        </tr>
                        <tr className="hover:bg-[#0f2c56]/40 transition-colors">
                          <td className="p-3.5 text-slate-400 font-semibold bg-[#02163b]/50">Beam</td>
                          <td className="p-3.5 text-white font-bold">{vessel?.beam}</td>
                        </tr>
                        <tr className="hover:bg-[#0f2c56]/40 transition-colors">
                          <td className="p-3.5 text-slate-400 font-semibold bg-[#02163b]/50">Draft</td>
                          <td className="p-3.5 text-white font-bold">{vessel?.draft}</td>
                        </tr>
                        <tr className="hover:bg-[#0f2c56]/40 transition-colors">
                          <td className="p-3.5 text-slate-400 font-semibold bg-[#02163b]/50">Max Speed</td>
                          <td className="p-3.5 text-white font-bold">{vessel?.maxSpeed}</td>
                        </tr>
                        <tr className="hover:bg-[#0f2c56]/40 transition-colors">
                          <td className="p-3.5 text-slate-400 font-semibold bg-[#02163b]/50">Propulsion &amp; Engines</td>
                          <td className="p-3.5 text-white font-bold">{vessel?.enginePower}</td>
                        </tr>
                        <tr className="hover:bg-[#0f2c56]/40 transition-colors">
                          <td className="p-3.5 text-slate-400 font-semibold bg-[#02163b]/50">Hull Material</td>
                          <td className="p-3.5 text-white font-bold">{vessel?.hullMaterial}</td>
                        </tr>
                        <tr className="hover:bg-[#0f2c56]/40 transition-colors">
                          <td className="p-3.5 text-slate-400 font-semibold bg-[#02163b]/50">Classification</td>
                          <td className="p-3.5 text-white font-bold">{vessel?.classificationSociety}</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-800">
              <Button
                onClick={() => onOpenRfq(product || vessel || undefined)}
                size="lg"
                variant="default"
                className="flex-1 gap-2 font-bold bg-[#ed145b] hover:bg-[#d00f4e] text-white rounded-lg shadow-crimson h-12"
              >
                <FileCheck2 className="size-4 text-white" />
                <span>Request Quotation</span>
              </Button>

              <Button
                onClick={handleDownloadDatasheet}
                disabled={downloading}
                size="lg"
                variant="outline"
                className="gap-2 font-semibold text-white border-slate-700 bg-[#061833] hover:bg-[#002e6e] rounded-lg h-12"
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
