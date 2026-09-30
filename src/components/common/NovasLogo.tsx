import React, { useState } from "react";

interface NovasLogoProps {
  className?: string;
  variant?: "navy" | "white" | "dark" | "light" | "auto";
  height?: number | string;
  showSubtitle?: boolean;
}

export const NovasLogo: React.FC<NovasLogoProps> = ({
  className = "",
  variant = "navy",
  height = 36,
  showSubtitle = false
}) => {
  const [imageError, setImageError] = useState(false);

  // If variant is specifically "white" or "dark", use the white letters for dark backgrounds (footer)
  // Otherwise, default to official logo standard: Dark Navy Blue (#002E6E / #042E6F) for N, O, V, S and Crimson Red (#ED145B) for A
  const isWhiteVariant = variant === "white" || variant === "dark";
  const logoImageSrc = isWhiteVariant
    ? "/assets/novas_logo_footer.png"
    : "/assets/novas-nav-logo.webp";

  const navyTextColor = isWhiteVariant ? "#FFFFFF" : "#002E6E";

  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      <div className="flex items-center gap-1.5" style={{ height }}>
        {!imageError ? (
          <img
            src={logoImageSrc}
            alt="NOVAS"
            onError={() => setImageError(true)}
            style={{ height, width: "auto" }}
            className="object-contain"
          />
        ) : (
          /* Exact vector replica matching client's logo */
          <span
            className="font-display font-black tracking-tight flex items-baseline leading-none"
            style={{ fontSize: "1.75rem" }}
          >
            <span style={{ color: navyTextColor }} className="transition-colors">
              NOV
            </span>
            {/* Stylized Chevron 'A' */}
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
        )}
      </div>

      {showSubtitle && (
        <span
          className={`font-mono text-[9px] uppercase tracking-[0.22em] font-semibold mt-0.5 ${
            isWhiteVariant ? "text-slate-400" : "text-[#133057]/70"
          }`}
          style={{ letterSpacing: "0.18em" }}
        >
          Defence &amp; Maritime
        </span>
      )}
    </div>
  );
};
