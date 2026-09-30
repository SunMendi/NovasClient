import React from "react";

interface NovasLogoProps {
  className?: string;
  variant?: "dark" | "light" | "auto";
  height?: number | string;
  showSubtitle?: boolean;
}

export const NovasLogo: React.FC<NovasLogoProps> = ({
  className = "",
  variant = "auto",
  height = 36,
  showSubtitle = false
}) => {
  // Letters N, O, V, S are Navy (#042E6F) on light, White on dark
  // Letter A is always Crimson Red (#ED145B / #EE4A5B)
  const isLight = variant === "light";
  const navyTextColor = isLight ? "#042E6F" : "#FFFFFF";

  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      <div className="flex items-center gap-1.5" style={{ height }}>
        {/* Exact vector replica of Novas Logo */}
        <span
          className="font-display font-black tracking-tight flex items-baseline leading-none"
          style={{ fontSize: "1.75rem" }}
        >
          <span style={{ color: navyTextColor }} className="transition-colors">
            NOV
          </span>
          {/* Stylized Chevron 'A' without crossbar */}
          <span className="relative mx-0.5 inline-block" style={{ color: "#ED145B" }}>
            <svg
              className="inline-block"
              style={{ width: "0.85em", height: "0.88em", verticalAlign: "-0.05em" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ED145B"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="miter"
            >
              <polyline points="3 21 12 3 21 21" />
            </svg>
          </span>
          <span style={{ color: navyTextColor }} className="transition-colors">
            S
          </span>
        </span>
      </div>

      {showSubtitle && (
        <span
          className="font-mono text-[9px] uppercase tracking-[0.22em] font-semibold text-slate-400 mt-0.5"
          style={{ letterSpacing: "0.18em" }}
        >
          Defence &amp; Maritime
        </span>
      )}
    </div>
  );
};
