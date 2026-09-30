import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight, CheckCircle2, FileText } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onOpenRfq?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenRfq }) => {
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#ed145b]/50 hover:shadow-lg">
      {/* Aspect Ratio Media Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Category & Status Chips */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <Badge variant="secondary" className="bg-[#002e6e] text-white border-0 font-medium">
            {product.category}
          </Badge>
          {product.featured && (
            <Badge variant="default" className="bg-[#ed145b] text-white border-0 shadow-sm font-semibold">
              Featured
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-[#002e6e] transition-colors group-hover:text-[#ed145b]">
          <Link to={`/product/${product.id}`} className="focus:outline-none">
            {product.name}
          </Link>
        </h3>
        
        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
          {product.tagline}
        </p>

        {/* Spec Highlights Preview */}
        <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs font-sans">
          {product.specs.slice(0, 3).map((spec, i) => (
            <div key={i} className="flex items-start gap-2 text-slate-600">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#ed145b]" />
              <span className="line-clamp-1">{spec.label}: <strong className="text-[#133057] font-semibold">{spec.value}</strong></span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto pt-6 flex items-center justify-between gap-3">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-1 text-xs font-semibold border-slate-200 text-[#133057] hover:bg-slate-50"
          >
            <Link to={`/product/${product.id}`}>
              <FileText className="mr-1.5 h-3.5 w-3.5" />
              Datasheet
            </Link>
          </Button>

          <Button
            size="sm"
            variant="default"
            className="flex-1 text-xs font-bold bg-[#ed145b] hover:bg-[#d00f4e] text-white shadow-sm shadow-[#ed145b]/20"
            onClick={() => onOpenRfq && onOpenRfq(product)}
          >
            Enquire
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
