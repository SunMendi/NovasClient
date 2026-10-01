import React, { useState, useEffect } from "react";

export interface DynamicTopBannerProps {
  images: string[];
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: string;
  tags?: string[];
  icon?: React.ReactNode;
  extraContent?: React.ReactNode;
  children?: React.ReactNode;
  align?: "center" | "left";
  intervalMs?: number;
  minHeightClass?: string;
}

export const DynamicTopBanner: React.FC<DynamicTopBannerProps> = ({
  images,
  badgeText,
  badgeIcon,
  title,
  subtitle,
  tags,
  icon,
  extraContent,
  children,
  align = "center",
  intervalMs = 4000,
  minHeightClass = "min-h-[380px] sm:min-h-[420px]"
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Preload all banner images for instantaneous cross-fade
  useEffect(() => {
    images.forEach((imgUrl) => {
      const img = new Image();
      img.src = imgUrl;
    });
  }, [images]);

  // Auto-rotation with Ken Burns motion & cross-fade
  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  const isLeft = align === "left";

  return (
    <section
      className={`relative overflow-hidden border-b border-border/80 bg-[#030a18] py-14 sm:py-20 text-white ${minHeightClass} flex items-center`}
    >
      {/* Dynamic Background Image Layers with Smooth Cross-Fade & Ken Burns Movement */}
      {images.map((imgUrl, idx) => {
        const isActive = idx === activeSlide;
        return (
          <div
            key={imgUrl + idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out overflow-hidden ${
              isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
            }`}
          >
            <div
              key={isActive ? `banner-kb-${activeSlide}` : `banner-idle-${idx}`}
              className={`absolute inset-0 bg-cover bg-center ${isActive ? "hero-kb" : "scale-105"}`}
              style={{ backgroundImage: `url(${imgUrl})` }}
            />
            {/* Tactical Vignette Gradient Overlay with Novas Navy & Crimson Depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#002e6e]/95 via-[#002e6e]/85 to-[#001c44]/75 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001c44]/90 via-transparent to-[#002e6e]/60 pointer-events-none" />
          </div>
        );
      })}

      {/* Tactical Ambient Grid Overlay & Subtle Crimson Glow */}
      <div className="pointer-events-none absolute inset-0 bg-novas-grid opacity-25 z-0" />
      <div className="pointer-events-none absolute inset-0 bg-crimson-glow opacity-35 z-0 hero-glow" />

      {/* Main Banner Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`space-y-4 max-w-4xl ${
            isLeft ? "text-left" : "mx-auto text-center"
          }`}
        >
          {/* Badge / Indicator */}
          {badgeText && (
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-sans font-semibold uppercase tracking-wider text-white backdrop-blur-md">
              {badgeIcon ? (
                badgeIcon
              ) : (
                <span className="size-1.5 rounded-full bg-[#ed145b] shadow-crimson" />
              )}
              <span>{badgeText}</span>
            </div>
          )}

          {/* Optional Icon Header */}
          {icon ? (
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shrink-0">
                {icon}
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {title}
              </h1>
            </div>
          ) : (
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {title}
            </h1>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p
              className={`text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-sans ${
                isLeft ? "max-w-2xl" : "max-w-2xl mx-auto"
              }`}
            >
              {subtitle}
            </p>
          )}

          {/* Capabilities Tags (e.g. for Sector / Industry / Defence) */}
          {tags && tags.length > 0 && (
            <div
              className={`flex flex-wrap gap-2 pt-2 ${
                isLeft ? "justify-start" : "justify-center"
              }`}
            >
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-lg bg-white/10 border border-white/20 px-3 py-1 text-xs font-sans text-white font-medium backdrop-blur-sm"
                >
                  • {tag}
                </span>
              ))}
            </div>
          )}

          {extraContent && <div className="pt-2">{extraContent}</div>}
          {children}
        </div>
      </div>

      {/* Slide Progress Indicators (Dots) */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeSlide
                  ? "w-6 bg-[#ed145b] shadow-crimson"
                  : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
