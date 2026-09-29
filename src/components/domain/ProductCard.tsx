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
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-navy-900 transition-all duration-300 hover:-translate-y-1 hover:border-amber-signal/50 hover:shadow-card">
      {/* Aspect Ratio Media Container to Prevent CLS */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-950">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-black/30" />
        
        {/* Category & Status Chips */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <Badge variant="secondary" className="bg-navy-950/80 backdrop-blur-md text-ink">
            {product.category}
          </Badge>
          {product.featured && (
            <Badge variant="default" className="shadow-sm">
              Featured
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-ink transition-colors group-hover:text-amber-signal">
          <Link to={`/catalogue/${product.slug}`} className="focus:outline-none">
            {product.name}
          </Link>
        </h3>
        
        <p className="mt-2 text-sm text-metal leading-relaxed line-clamp-2">
          {product.tagline}
        </p>

        {/* Spec Highlights Preview */}
        <div className="mt-5 space-y-2 border-t border-border/60 pt-4 text-xs font-mono">
          {product.specs.slice(0, 3).map((spec, i) => (
            <div key={i} className="flex items-start gap-2 text-secondary">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-signal" />
              <span className="line-clamp-1">{spec.label}: <strong className="text-ink font-semibold">{spec.value}</strong></span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto pt-6 flex items-center justify-between gap-3">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-1 text-xs font-medium"
          >
            <Link to={`/catalogue/${product.slug}`}>
              <FileText className="mr-1.5 h-3.5 w-3.5" />
              Datasheet
            </Link>
          </Button>

          <Button
            size="sm"
            variant="default"
            className="flex-1 text-xs"
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
