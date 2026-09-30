import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu, ChevronDown, FileCheck2, Phone, Mail, ArrowRight } from "lucide-react";
import { NovasLogo } from "../common/NovasLogo";
import { COMPANY_INFO } from "../../data/company";

interface NavbarProps {
  onOpenRfq: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRfq }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  const productCategories = [
    { name: "All Products", path: "/products/all", desc: "Complete mission equipment catalog" },
    { name: "Defence Systems", path: "/products/defence", desc: "Ballistic armor, radar, tactical comms" },
    { name: "Tactical & Response", path: "/products/tactical", desc: "Personal protection & optics" },
    { name: "Maritime Platforms", path: "/products/maritime", desc: "Naval workboats & hydrographic sonar" },
    { name: "Medical & Trauma", path: "/products/medical", desc: "TCCC kits & field casualty gear" },
    { name: "Heavy Industry", path: "/products/industry", desc: "CNC fabrication & turnkey power" },
    { name: "ICT & Cyber Defence", path: "/products/ict", desc: "C4ISR & sovereign data security" },
  ];

  const mainNavLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Consultancy", path: "/industry/consultancy" },
    { name: "Defence", path: "/industry/defence" },
    { name: "Industry", path: "/industry/industry" },
    { name: "About us", path: "/aboutus" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isProductsActive = location.pathname.startsWith("/product");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-xs transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Identity: Official Novas Logo (Dark Navy Blue letters + Crimson Red 'A') */}
        <Link
          to="/"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ed145b] rounded-lg py-1"
          aria-label="Novas BD Homepage"
        >
          <NovasLogo variant="navy" height={36} showSubtitle={false} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
          <Link
            to="/"
            className={`relative font-display text-[15px] font-semibold transition-colors duration-200 py-5 ${
              location.pathname === "/"
                ? "text-[#ed145b] font-bold"
                : "text-[#133057] hover:text-[#ed145b]"
            }`}
          >
            Home
            {location.pathname === "/" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-[#ed145b] shadow-crimson" />
            )}
          </Link>

          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsDropdownOpen(true)}
            onMouseLeave={() => setProductsDropdownOpen(false)}
          >
            <button
              type="button"
              className={`flex items-center gap-1.5 font-display text-[15px] font-semibold transition-colors duration-200 py-5 focus:outline-none ${
                isProductsActive
                  ? "text-[#ed145b] font-bold"
                  : "text-[#133057] hover:text-[#ed145b]"
              }`}
            >
              <span>Products</span>
              <ChevronDown
                className={`size-4 transition-transform duration-200 ${
                  productsDropdownOpen ? "rotate-180 text-[#ed145b]" : "text-slate-500"
                }`}
              />
              {isProductsActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-[#ed145b] shadow-crimson" />
              )}
            </button>

            {/* Dropdown Menu */}
            {productsDropdownOpen && (
              <div className="absolute top-full left-0 w-80 rounded-xl border border-slate-200 bg-white p-3 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="mb-2 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#ed145b]">
                  Equipment Directory
                </div>
                <div className="space-y-1">
                  {productCategories.map((cat) => (
                    <Link
                      key={cat.path}
                      to={cat.path}
                      onClick={() => setProductsDropdownOpen(false)}
                      className="group flex flex-col rounded-lg px-3 py-2 transition-colors hover:bg-slate-50"
                    >
                      <span className="text-sm font-semibold text-[#133057] group-hover:text-[#ed145b] transition-colors">
                        {cat.name}
                      </span>
                      <span className="text-xs text-slate-500 group-hover:text-slate-600">
                        {cat.desc}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Other Main Links from novasbd.com */}
          {mainNavLinks.slice(1).map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-display text-[15px] font-semibold transition-colors duration-200 py-5 ${
                  active
                    ? "text-[#ed145b] font-bold"
                    : "text-[#133057] hover:text-[#ed145b]"
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-[#ed145b] shadow-crimson" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            onClick={onOpenRfq}
            variant="default"
            size="default"
            className="gap-2 bg-[#ed145b] hover:bg-[#d00f4e] text-white font-bold shadow-md shadow-[#ed145b]/20 transition-all h-10 px-5 rounded-lg"
          >
            <FileCheck2 className="size-4 text-white" />
            <span>Request a Quote</span>
          </Button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="flex lg:hidden items-center gap-2.5">
          <Button
            onClick={onOpenRfq}
            size="sm"
            variant="default"
            className="bg-[#ed145b] hover:bg-[#d00f4e] text-white text-xs px-3 font-semibold h-9 rounded-lg"
          >
            Quote
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open Navigation Menu"
                className="size-9 rounded-lg border-slate-200 bg-white text-[#133057]"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[360px] border-l border-slate-200 bg-white p-6 text-[#133057] overflow-y-auto"
            >
              <SheetHeader className="text-left border-b border-slate-200 pb-4">
                <SheetTitle className="flex items-center">
                  <NovasLogo variant="navy" height={32} showSubtitle={false} />
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-6 py-6">
                <div className="space-y-1">
                  <Link
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-semibold text-[#133057] hover:bg-slate-50"
                  >
                    <span>Home</span>
                  </Link>

                  <div className="pt-2 pb-1">
                    <span className="px-3 font-mono text-[10px] font-bold uppercase tracking-wider text-[#ed145b]">
                      Products
                    </span>
                  </div>
                  {productCategories.map((cat) => (
                    <Link
                      key={cat.path}
                      to={cat.path}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:text-[#ed145b] hover:bg-slate-50"
                    >
                      <span>{cat.name}</span>
                    </Link>
                  ))}

                  <div className="pt-3 pb-1">
                    <span className="px-3 font-mono text-[10px] font-bold uppercase tracking-wider text-[#ed145b]">
                      Navigation
                    </span>
                  </div>
                  {mainNavLinks.slice(1).map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-[#133057] hover:text-[#ed145b] hover:bg-slate-50"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="size-3.5 text-slate-400" />
                    </Link>
                  ))}
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs space-y-2">
                  <div className="font-mono uppercase font-bold text-[#ed145b]">Direct Desk</div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone className="size-3.5 text-[#ed145b]" />
                    <span>{COMPANY_INFO.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="size-3.5 text-[#ed145b]" />
                    <span>{COMPANY_INFO.email}</span>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenRfq();
                  }}
                  className="w-full bg-[#ed145b] hover:bg-[#d00f4e] text-white font-bold py-5 rounded-lg shadow-md shadow-[#ed145b]/20"
                >
                  <FileCheck2 className="mr-2 size-4" />
                  Request Tender RFQ
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
