import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold font-sans tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#ed145b] text-white font-bold",
        secondary:
          "border-slate-200 bg-slate-100 text-[#133057]",
        destructive:
          "border-transparent bg-red-100 text-red-700 border border-red-200",
        outline: "text-[#002e6e] border border-slate-300",
        verified:
          "border-emerald-200 bg-emerald-50 text-emerald-700",
        marine:
          "border-[#002e6e]/20 bg-[#002e6e]/10 text-[#002e6e]",
        defence:
          "border-[#ed145b]/20 bg-[#ed145b]/10 text-[#ed145b]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
