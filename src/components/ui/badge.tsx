import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold font-mono tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-amber-signal text-navy-950 font-bold",
        secondary:
          "border-border/60 bg-navy-850 text-metal hover:text-ink",
        destructive:
          "border-transparent bg-tactical-red/20 text-red-400 border border-tactical-red/40",
        outline: "text-foreground border border-border/80",
        verified:
          "border-sonar/40 bg-sonar/10 text-emerald-400",
        marine:
          "border-marine/40 bg-marine/10 text-sky-400",
        defence:
          "border-amber-signal/40 bg-amber-signal/10 text-amber-400",
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
