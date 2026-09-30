import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SECTORS } from "../data/sectors";
import { PRODUCTS } from "../data/products";
import { VESSELS } from "../data/vessels";
import { PROJECTS } from "../data/projects";
import { COMPANY_INFO } from "../data/company";
import { ProductCard } from "../components/domain/ProductCard";
import { VesselHud } from "../components/domain/VesselHud";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Shield,
  Anchor,
  Factory,
  Map,
  Cpu,
  Truck,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  FileCheck2,
  CheckCircle2,
  Handshake,
  ListChecks,
  HeartHandshake,
  Wrench,
  Clock,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Product, Vessel } from "../types";

interface HomePageProps {
  onOpenRfq: (item?: Product | Vessel) => void;
}

interface HeroSlide {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  category: string;
  link: string;
  imageUrl: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    tag: "DEFENCE-GRADE PROCUREMENT & NAVAL SHIPYARD",
    title: "Institutional Defence, Maritime & Heavy Supply.",
    subtitle: "Novas supplies certified defense systems, naval workboats, and mission-critical engineering solutions for armed forces, port authorities, and industrial operators across South Asia.",
    category: "Defence",
    link: "/products/defence",
    imageUrl: "/assets/hero/hero-defence-CzOJrdZI.jpg"
  },
  {
    id: "slide-2",
    tag: "TACTICAL & LAW ENFORCEMENT",
    title: "Equipping the operators who go first.",
    subtitle: "Personal protection, less-lethal systems, tactical communications, and breaching tools for rapid response and elite tactical units.",
    category: "Tactical",
    link: "/products/tactical",
    imageUrl: "/assets/hero/hero-tactical-BSZNFcBk.jpg"
  },
  {
    id: "slide-3",
    tag: "MEDICAL & HUMANITARIAN SUPPLY",
    title: "Frontline medical kits when seconds count.",
    subtitle: "TCCC-aligned trauma kits, field patient monitors and deployable hospital casualty response equipment for armed forces and disaster relief.",
    category: "Medical",
    link: "/products/medical",
    imageUrl: "/assets/hero/hero-medical-DBJtfXpF.jpg"
  },
  {
    id: "slide-4",
    tag: "MARITIME & NAVAL PLATFORMS",
    title: "Commanding the littoral waters and ports.",
    subtitle: "Naval workboats, high-speed patrol interceptors, SOLAS life rafts, and high-definition X-band surveillance radar arrays for blue-water operators.",
    category: "Maritime",
    link: "/products/maritime",
    imageUrl: "/assets/hero/hero-maritime-Z9Kk4jOd.jpg"
  },
  {
    id: "slide-5",
    tag: "CYBER & C4ISR",
    title: "Defending the digital battlespace, 24/7.",
    subtitle: "Sovereign cyber defence, secure tactical communications, hardened data centers and mission-critical intelligence infrastructure.",
    category: "ICT",
    link: "/products/ict",
    imageUrl: "/assets/hero/hero-cyber-BQaYidYs.jpg"
  },
  {
    id: "slide-6",
    tag: "HEAVY INDUSTRY & AUTOMATION",
    title: "Powering strategic national infrastructure.",
    subtitle: "Heavy industrial fabrication machinery, automated CNC cutting lines, and high-capacity turnkey power systems for strategic EPC megaprojects.",
    category: "Industry",
    link: "/products/industry",
    imageUrl: "/assets/hero/hero-logistics-sV_p9M_H.jpg"
  },
  {
    id: "slide-7",
    tag: "AEROSPACE & SURVEILLANCE",
    title: "Precision aerial sensors & unmanned solutions.",
    subtitle: "Tactical UAVs, electro-optical sensor pods, and high-altitude mapping payloads for defense forces, coastal surveillance and border security.",
    category: "Geospatial",
    link: "/industry/geospatial",
    imageUrl: "/assets/hero/hero-aerospace-CdirWyJV.jpg"
  }
];

export const HomePage: React.FC<HomePageProps> = ({ onOpenRfq }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Preload all slide images for instantaneous cross-fading
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.imageUrl;
    });
  }, []);

  // Continuous auto-rotation every 4 seconds (Professional standard)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[activeSlide];

  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 6);
  const featuredProjects = PROJECTS.slice(0, 3);
  const featuredVessel = VESSELS[0];

  return (
    <div className="flex flex-col space-y-20 pb-24">
      {/* 1. HERO SECTION (Dynamic Moving Image, 4s Auto-Rotation & Brand Crimson Styling) */}
      <section className="relative overflow-hidden border-b border-border/80 bg-[#030a18] pt-3 sm:pt-4 lg:pt-6 pb-12 sm:pb-16 min-h-[540px] sm:min-h-[580px] lg:min-h-[620px] flex items-center">
        {/* Dynamic Background Image Layers with Smooth Cross-Fade & Ken Burns Movement */}
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === activeSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out overflow-hidden ${
                isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
              }`}
            >
              <div
                key={isActive ? `kb-${activeSlide}` : `idle-${idx}`}
                className={`absolute inset-0 bg-cover bg-center ${isActive ? "hero-kb" : "scale-105"}`}
                style={{ backgroundImage: `url(${slide.imageUrl})` }}
              />
              {/* Dark Tactical Vignette Overlay with Brand Deep Navy Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#030a18] via-[#030a18]/85 to-[#030a18]/55 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030a18] via-transparent to-[#030a18]/45 pointer-events-none" />
            </div>
          );
        })}

        {/* Tactical Ambient Grid Overlay & Dynamic Glowing Radar */}
        <div className="pointer-events-none absolute inset-0 bg-novas-grid opacity-30 z-0" />
        <div className="pointer-events-none absolute inset-0 bg-crimson-glow opacity-40 z-0 hero-glow" />

        {/* Content Container (Compact Padding for Immediate Above-the-Fold Visibility) */}
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Pill Tag, Punchy Headline, Subtitle, CTAs */}
            <div key={`content-${activeSlide}`} className="space-y-4 sm:space-y-5 lg:col-span-7">
              {/* Category Pill with Glowing Bullet */}
              <div className="hero-rise-1 inline-flex items-center gap-2 rounded-full border border-[#ed145b]/40 bg-[#061833]/90 px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-[#ed145b] backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-[#ed145b]" />
                <span className="font-bold">{currentSlide.tag}</span>
              </div>

              {/* Dynamic Animated Headline */}
              <h1 className="hero-rise-2 font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
                {activeSlide === 0 ? (
                  <>
                    Institutional Defence,<br />
                    <span className="bg-gradient-to-r from-[#ed145b] via-rose-400 to-sky-400 bg-clip-text text-transparent">
                      Maritime &amp; Heavy Supply.
                    </span>
                  </>
                ) : (
                  currentSlide.title
                )}
              </h1>

              {/* Dynamic Subtitle */}
              <p className="hero-rise-3 text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl leading-relaxed font-sans min-h-[48px]">
                {currentSlide.subtitle}
              </p>

              {/* CTA Action Buttons */}
              <div className="hero-rise-3 flex flex-wrap items-center gap-3 pt-2">
                <Button
                  asChild
                  size="default"
                  variant="default"
                  className="gap-2 font-bold shadow-crimson text-xs sm:text-sm h-11 px-6 rounded-lg bg-[#ed145b] text-white hover:bg-[#d00f4e] transition-all"
                >
                  <Link to={currentSlide.link}>
                    <span>Explore Products</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button
                  onClick={() => onOpenRfq()}
                  size="default"
                  variant="outline"
                  className="gap-2 font-semibold text-xs sm:text-sm h-11 px-5 rounded-lg border-slate-700 bg-[#061833]/80 backdrop-blur-md text-white hover:bg-[#002e6e] transition-colors"
                >
                  <FileCheck2 className="size-4 text-[#ed145b]" />
                  <span>Launch Tender RFQ</span>
                </Button>
              </div>
            </div>

            {/* Right Column: 2x2 "CAPABILITY SNAPSHOT" Widget */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#ed145b]">
                  CAPABILITY SNAPSHOT
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  LIVE TELEMETRY
                </span>
              </div>

              {/* 2x2 Grid of Frosted Capability Cards */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-2xl border border-white/10 bg-[#061833]/85 p-4 sm:p-5 backdrop-blur-md shadow-card transition-all hover:border-[#ed145b]/50 hover:-translate-y-0.5">
                  <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                    120+
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 mt-1">
                    ACTIVE CONTRACTS
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#061833]/85 p-4 sm:p-5 backdrop-blur-md shadow-card transition-all hover:border-[#ed145b]/50 hover:-translate-y-0.5">
                  <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                    5
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 mt-1">
                    SECTORS SERVED
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#061833]/85 p-4 sm:p-5 backdrop-blur-md shadow-card transition-all hover:border-[#ed145b]/50 hover:-translate-y-0.5">
                  <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                    40+
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 mt-1">
                    GLOBAL PARTNERS
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#061833]/85 p-4 sm:p-5 backdrop-blur-md shadow-card transition-all hover:border-[#ed145b]/50 hover:-translate-y-0.5">
                  <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                    21 d
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 mt-1">
                    AVG. LEAD TIME
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NOVAS BANGLADESH INTRO SECTION (Directly from novasbd.com) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-slate-800 bg-gradient-to-br from-[#061833] via-[#02163b] to-[#030a18] p-8 md:p-12 shadow-2xl overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-[#ed145b]/10 blur-3xl" />
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ed145b]/40 bg-[#002e6e]/60 px-4 py-1 text-xs font-mono uppercase tracking-wider text-[#ed145b]">
              <span>ESTABLISHED JULY 2012</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Serving Bangladesh through Excellence in{" "}
              <span className="text-[#ed145b]">Science, Technology &amp; Supply</span>.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Novas started in July 2012. Our eventual destination is to serve Bangladesh by achieving excellence in the field of science and technology. Our main objectives are quality service, innovation, and integrity. We act as a catalyst in the country&apos;s development, offering tailored solutions with dedicated after-sales support.
            </p>

            {/* Quick Stat Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="rounded-xl border border-slate-700/60 bg-[#030a18]/70 p-4">
                <div className="font-display text-2xl font-bold text-white">2012</div>
                <div className="font-mono text-xs text-slate-400 uppercase mt-1">Founded In Dhaka</div>
              </div>
              <div className="rounded-xl border border-slate-700/60 bg-[#030a18]/70 p-4">
                <div className="font-display text-2xl font-bold text-[#ed145b]">24</div>
                <div className="font-mono text-xs text-slate-400 uppercase mt-1">Specialized Engineers</div>
              </div>
              <div className="rounded-xl border border-slate-700/60 bg-[#030a18]/70 p-4">
                <div className="font-display text-2xl font-bold text-white">100%</div>
                <div className="font-mono text-xs text-slate-400 uppercase mt-1">Defence Audit Compliant</div>
              </div>
              <div className="rounded-xl border border-slate-700/60 bg-[#030a18]/70 p-4">
                <div className="font-display text-2xl font-bold text-[#10b981]">ISO</div>
                <div className="font-mono text-xs text-slate-400 uppercase mt-1">9001:2015 Certified</div>
              </div>
            </div>

            <div className="pt-2">
              <Button asChild variant="outline" className="border-slate-700 text-white hover:bg-[#002e6e] rounded-lg">
                <Link to="/aboutus" className="gap-2">
                  <span>Read Full Company Story</span>
                  <ArrowRight className="size-4 text-[#ed145b]" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "WE ARE BEST IN" 4-PILLAR SECTION (Exact replica from novasbd.com) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            We are <span className="text-[#ed145b] font-bold">BEST IN</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Our 4 fundamental commitments that set Novas apart in high-stakes defense, maritime and engineering procurement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Card 1: BEST COMMITMENT */}
          <div className="group rounded-2xl border border-slate-800 bg-[#061833] p-6 shadow-xl transition-all duration-300 hover:border-[#ed145b]/50 hover:-translate-y-1 flex items-center gap-5">
            <div className="shrink-0 p-4 rounded-2xl bg-[#002e6e]/60 border border-slate-700 text-[#ed145b] float-animation">
              <Handshake className="size-10" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display text-lg font-bold text-white group-hover:text-[#ed145b] transition-colors">
                BEST <span className="font-extrabold text-[#ed145b]">COMMITMENT</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We ensure an excellent commitment with our valuable vendors, government ministries, and armed forces operators.
              </p>
            </div>
          </div>

          {/* Card 2: BEST PLANNING */}
          <div className="group rounded-2xl border border-slate-800 bg-[#061833] p-6 shadow-xl transition-all duration-300 hover:border-[#ed145b]/50 hover:-translate-y-1 flex items-center gap-5">
            <div className="shrink-0 p-4 rounded-2xl bg-[#002e6e]/60 border border-slate-700 text-[#ed145b] float-animation" style={{ animationDelay: "0.5s" }}>
              <ListChecks className="size-10" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display text-lg font-bold text-white group-hover:text-[#ed145b] transition-colors">
                BEST <span className="font-extrabold text-[#ed145b]">PLANNING</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Equipment planning services include comprehensive evaluation of all equipment, facility needs, and operational oversight.
              </p>
            </div>
          </div>

          {/* Card 3: BEST DEAL */}
          <div className="group rounded-2xl border border-slate-800 bg-[#061833] p-6 shadow-xl transition-all duration-300 hover:border-[#ed145b]/50 hover:-translate-y-1 flex items-center gap-5">
            <div className="shrink-0 p-4 rounded-2xl bg-[#002e6e]/60 border border-slate-700 text-[#ed145b] float-animation" style={{ animationDelay: "1s" }}>
              <HeartHandshake className="size-10" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display text-lg font-bold text-white group-hover:text-[#ed145b] transition-colors">
                BEST <span className="font-extrabold text-[#ed145b]">DEAL</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Efforts focused on achieving &ldquo;win-win&rdquo; solutions, fostering mutual benefits, cost-efficiency, and positive long-term outcomes.
              </p>
            </div>
          </div>

          {/* Card 4: BEST SERVICE */}
          <div className="group rounded-2xl border border-slate-800 bg-[#061833] p-6 shadow-xl transition-all duration-300 hover:border-[#ed145b]/50 hover:-translate-y-1 flex items-center gap-5">
            <div className="shrink-0 p-4 rounded-2xl bg-[#002e6e]/60 border border-slate-700 text-[#ed145b] float-animation" style={{ animationDelay: "1.5s" }}>
              <Wrench className="size-10" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display text-lg font-bold text-white group-hover:text-[#ed145b] transition-colors">
                BEST <span className="font-extrabold text-[#ed145b]">SERVICE</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                End-to-end engineering support, tailored technology solutions, and dedicated 24/7 on-site after-sales technical maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS SHOWCASE (Matching novasbd.com /projects) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#ed145b] mb-1">
              FIELD IMPLEMENTATIONS
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Featured <span className="text-[#ed145b]">Projects</span>
            </h2>
          </div>
          <Button asChild variant="outline" size="sm" className="border-slate-700 text-white hover:bg-[#002e6e]">
            <Link to="/projects" className="gap-2">
              <span>View All Projects</span>
              <ArrowRight className="size-4 text-[#ed145b]" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group flex flex-col rounded-2xl border border-slate-800 bg-[#061833] overflow-hidden shadow-lg transition-all duration-300 hover:border-[#ed145b]/50 hover:-translate-y-1"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="rounded-full bg-[#ed145b] px-3 py-1 font-mono text-[10px] font-bold uppercase text-white shadow-md">
                    {project.sectorName}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="rounded-md bg-black/70 px-2 py-0.5 font-mono text-[10px] text-slate-300 backdrop-blur-sm">
                    {project.year}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
                <div className="space-y-2">
                  <h3 className="font-display text-base font-bold text-white group-hover:text-[#ed145b] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-400 font-mono">{project.client}</span>
                  <span className="flex items-center gap-1 text-[#ed145b] font-medium group-hover:underline">
                    <span>Details</span>
                    <ChevronRight className="size-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. MISSION EQUIPMENT DIRECTORY (Category Grid) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#ed145b] mb-1">
              HARDWARE CATALOGUE
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Mission-Ready <span className="text-[#ed145b]">Equipment</span>
            </h2>
          </div>
          <Button asChild variant="outline" size="sm" className="border-slate-700 text-white hover:bg-[#002e6e]">
            <Link to="/products/all" className="gap-2">
              <span>View Full Directory</span>
              <ArrowRight className="size-4 text-[#ed145b]" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenRfq={onOpenRfq}
            />
          ))}
        </div>
      </section>

      {/* 6. SHIPYARD SHOWCASE TEASER */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-[#061833] p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">
                <Anchor className="size-3" />
                <span>NAVAL SHIPYARD &amp; VESSEL PLATFORMS</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Sovereign Vessel Construction
              </h2>
            </div>
            <Button
              onClick={() => onOpenRfq(featuredVessel)}
              className="bg-[#ed145b] hover:bg-[#d00f4e] text-white font-bold rounded-lg shadow-crimson"
            >
              Request Vessel Spec Sheet
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5 space-y-4">
              <h3 className="font-display text-xl font-bold text-white">
                {featuredVessel.name}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {featuredVessel.description}
              </p>
              <VesselHud vessel={featuredVessel} />
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-xl">
                <img
                  src={featuredVessel.imageUrl}
                  alt={featuredVessel.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-navy-950/80 px-4 py-2.5 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300">
                  <span>HULL: {featuredVessel.hullMaterial}</span>
                  <span className="text-[#10b981]">CLASS: {featuredVessel.classificationSociety}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. QUICK TENDER RFQ CTA STRIP */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#ed145b]/40 bg-gradient-to-r from-[#002e6e] to-[#042e6f] p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="pointer-events-none absolute -left-10 -bottom-10 size-60 rounded-full bg-[#ed145b]/20 blur-3xl" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold">
              Need a Formal Tender RFQ or Technical Datasheet?
            </h2>
            <p className="text-sm sm:text-base text-slate-200">
              Submit your operational requirements to Novas procurement specialists at Mohakhali DOHS, Dhaka. Receive certified MIL-STD and SOLAS specifications within 24 hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button
                onClick={() => onOpenRfq()}
                className="bg-[#ed145b] hover:bg-[#d00f4e] text-white font-bold h-11 px-8 rounded-lg shadow-crimson text-sm"
              >
                <FileCheck2 className="mr-2 size-4" />
                Launch Tender RFQ
              </Button>
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 h-11 px-6 rounded-lg text-sm">
                <Link to="/contact">Contact Our Office</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
