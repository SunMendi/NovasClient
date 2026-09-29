import { cn } from "../../lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-navy-800/80 border border-border/20",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
