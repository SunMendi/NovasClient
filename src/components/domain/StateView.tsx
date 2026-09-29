import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { ShieldAlert, SearchX, RotateCcw, AlertTriangle } from "lucide-react";

export const LoadingSkeletonGrid: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col rounded-2xl border border-border/50 bg-navy-900 p-6 space-y-4"
        >
          <Skeleton className="aspect-[16/10] w-full rounded-xl bg-navy-800" />
          <Skeleton className="h-6 w-3/4 bg-navy-800" />
          <Skeleton className="h-4 w-full bg-navy-850" />
          <div className="space-y-2 pt-4">
            <Skeleton className="h-3 w-5/6 bg-navy-850" />
            <Skeleton className="h-3 w-4/6 bg-navy-850" />
          </div>
          <div className="flex gap-3 pt-4">
            <Skeleton className="h-10 flex-1 rounded-lg bg-navy-800" />
            <Skeleton className="h-10 flex-1 rounded-lg bg-navy-800" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const EmptyState: React.FC<{
  title?: string;
  message?: string;
  onReset?: () => void;
}> = ({
  title = "No Equipment or Records Found",
  message = "No products or vessels matched your current filter criteria. Adjust your search keywords or reset filters to browse the full catalogue.",
  onReset,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-navy-900/40 p-12 text-center">
      <div className="grid size-16 place-items-center rounded-2xl border border-border/60 bg-navy-850 text-amber-signal shadow-inner mb-4">
        <SearchX className="size-8" />
      </div>
      <span className="font-mono text-xs uppercase tracking-widest text-metal">
        STATUS // 0 RESULTS
      </span>
      <h3 className="mt-2 text-xl font-bold font-display text-ink">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-metal leading-relaxed">
        {message}
      </p>
      {onReset && (
        <Button
          onClick={onReset}
          variant="outline"
          className="mt-6 gap-2 text-xs"
        >
          <RotateCcw className="size-3.5" />
          Reset All Filters
        </Button>
      )}
    </div>
  );
};

export const ErrorState: React.FC<{
  title?: string;
  message?: string;
  onRetry?: () => void;
}> = ({
  title = "Telemetry Error Encountered",
  message = "Failed to load the requested procurement data. Please verify your network connection and retry.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-tactical-red/40 bg-tactical-red/5 p-12 text-center">
      <div className="grid size-16 place-items-center rounded-2xl border border-tactical-red/40 bg-navy-900 text-tactical-red shadow-inner mb-4">
        <AlertTriangle className="size-8" />
      </div>
      <span className="font-mono text-xs uppercase tracking-widest text-red-400">
        SYSTEM WARNING // CODE 500
      </span>
      <h3 className="mt-2 text-xl font-bold font-display text-ink">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-metal leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="destructive"
          className="mt-6 gap-2 text-xs font-semibold"
        >
          <ShieldAlert className="size-3.5" />
          Retry Connection
        </Button>
      )}
    </div>
  );
};
