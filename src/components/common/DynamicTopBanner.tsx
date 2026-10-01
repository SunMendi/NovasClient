import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export interface DynamicBannerSlide {
  imageUrl: string;
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: string;
  tags?: string[];
  link?: string;
  linkText?: string;
  icon?: React.ReactNode;
}

export interface DynamicTopBannerProps {
  slides?: DynamicBannerSlide[];
  // Legacy / fallback props
  images?: string[];
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: string;
  tags?: string[];
  icon?: React.ReactNode;
  align?: "center" | "left";
  intervalMs?: number;
  minHeightClass?: string;
}

export const DynamicTopBanner: React.FC<DynamicTopBannerProps> = ({
  slides,
  images,
  badgeText: fallbackBadgeText,
  badgeIcon: fallbackBadgeIcon,
  title: fallbackTitle,
  subtitle: fallbackSubtitle,
  tags: fallbackTags,
  icon: fallbackIcon,
  align = "center",
  intervalMs = 4500,
  minHeightClass = "min-h-[420px] sm:min-h-[460px] lg:min-h-[480px]"
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Normalize slides
  const normalizedSlides: DynamicBannerSlide[] = slides && slides.length > 0
    ? slides
    : (images || []).map((imgUrl) => ({
        imageUrl: imgUrl,
        badgeText: fallbackBadgeText,
        badgeIcon: fallbackBadgeIcon,
        title: fallbackTitle,
        subtitle: fallbackSubtitle,
        tags: fallbackTags,
        icon: fallbackIcon
      }));

  // Preload all banner images for instantaneous cross-fade
  useEffect(() => {
    normalizedSlides.forEach((slide) => {
      const img = new Image();
      img.src = slide.imageUrl;
    });
  }, [normalizedSlides]);

  // Auto-rotation with Ken Burns motion & cross-fade
  useEffect(() => {
    if (normalizedSlides.length <= 1) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % normalizedSlides.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [normalizedSlides.length, intervalMs]);

  if (normalizedSlides.length === 0) return null;

  const currentSlide = normalizedSlides[activeSlide];
  const isLeft = align === "left";

  return (
    <section
      className={`relative overflow-hidden border-b border-border/80 bg-[#030a18] py-16 sm:py-20 text-white ${minHeightClass} flex items-center`}
    >
      {/* Dynamic Background Image Layers with Smooth Cross-Fade & Ken Burns Movement */}
      {normalizedSlides.map((slide, idx) => {
        const isActive = idx === activeSlide;
        return (
          <div
            key={slide.imageUrl + idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out overflow-hidden ${
              isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
            }`}
          >
            <div
              key={isActive ? `banner-kb-${activeSlide}` : `banner-idle-${idx}`}
              className={`absolute inset-0 bg-cover bg-center ${isActive ? "hero-kb" : "scale-105"}`}
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
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

      {/* Main Banner Content - Keyed to activeSlide for Staged Rise Animations */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div
          key={`content-${activeSlide}`}
          className={`space-y-4 sm:space-y-5 max-w-4xl ${
            isLeft ? "text-left" : "mx-auto text-center"
          }`}
        >
          {/* Badge / Indicator with glowing indicator */}
          {currentSlide.badgeText && (
            <div className="hero-rise-1 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-sans font-semibold uppercase tracking-wider text-white backdrop-blur-md">
              {currentSlide.badgeIcon ? (
                currentSlide.badgeIcon
              ) : (
                <span className="size-1.5 rounded-full bg-[#ed145b] shadow-crimson" />
              )}
              <span className="font-bold text-[#ed145b]">{currentSlide.badgeText}</span>
            </div>
          )}

          {/* Dynamic Animated Headline */}
          {currentSlide.icon ? (
            <div className="hero-rise-2 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shrink-0">
                {currentSlide.icon}
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {currentSlide.title}
              </h1>
            </div>
          ) : (
            <h1 className="hero-rise-2 font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {currentSlide.title}
            </h1>
          )}

          {/* Dynamic Subtitle */}
          {currentSlide.subtitle && (
            <p
              className={`hero-rise-3 text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-sans min-h-[48px] ${
                isLeft ? "max-w-2xl" : "max-w-2xl mx-auto"
              }`}
            >
              {currentSlide.subtitle}
            </p>
          )}

          {/* Capabilities Tags (e.g. for Sector / Industry / Defence) */}
          {currentSlide.tags && currentSlide.tags.length > 0 && (
            <div
              className={`hero-rise-3 flex flex-wrap gap-2 pt-1 ${
                isLeft ? "justify-start" : "justify-center"
              }`}
            >
              {currentSlide.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-lg bg-white/10 border border-white/20 px-3 py-1 text-xs font-sans text-white font-medium backdrop-blur-sm"
                >
                  • {tag}
                </span>
              ))}
            </div>
          )}

          {/* Optional Direct Slide Action Link */}
          {currentSlide.link && (
            <div className={`hero-rise-3 pt-2 ${isLeft ? "text-left" : "text-center"}`}>
              <Button
                asChild
                size="sm"
                variant="default"
                className="bg-[#ed145b] hover:bg-[#d00f4e] text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-md shadow-[#ed145b]/30"
              >
                <Link to={currentSlide.link}>
                  <span>{currentSlide.linkText || "View Details"}</span>
                  <ArrowRight className="ml-1.5 size-3.5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Slide Progress Indicators (Dots) */}
      {normalizedSlides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {normalizedSlides.map((_, i) => (
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
