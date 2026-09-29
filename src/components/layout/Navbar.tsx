import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu, Shield, Phone, Mail, ArrowRight } from "lucide-react";
import { COMPANY_INFO } from "../../data/company";

interface NavbarProps {
  onOpenRfq: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRfq }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Sectors", path: "/sectors" },
    { name: "Product Catalogue", path: "/catalogue" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-navy-950/80 backdrop-blur-xl transition-all">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Identity */}
        <Link to="/" className="flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-signal rounded-lg p-1">
          <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-amber-signal to-amber-600 font-display text-xl font-black text-navy-950 shadow-amber">
            N
          </span>
          <div className="flex flex-col">
            <span className="font-display text-xl font-extrabold tracking-tight text-ink">
              NOVAS
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-amber-signal -mt-1 font-semibold">
              Defence & Maritime
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-display text-sm font-semibold transition-colors duration-200 hover:text-ink ${
                  active ? "text-amber-signal font-bold" : "text-metal"
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-amber-signal shadow-amber" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            onClick={onOpenRfq}
            variant="default"
            size="default"
            className="gap-2 shadow-amber"
          >
            <Shield className="size-4 text-navy-950" />
            <span>Request a Quote</span>
          </Button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="flex md:hidden items-center gap-3">
          <Button
            onClick={onOpenRfq}
            size="sm"
            variant="default"
            className="text-xs px-3"
          >
            Quote
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open Navigation Menu"
                className="size-11 rounded-lg border-border text-ink"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col justify-between">
              <div>
                <SheetHeader className="mb-6 text-left">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-amber-signal font-display text-lg font-black text-navy-950">
                      N
                    </span>
                    <SheetTitle className="text-xl font-bold font-display text-ink">
                      NOVAS
                    </SheetTitle>
                  </div>
                </SheetHeader>

                <nav className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                        isActive(link.path)
                          ? "bg-navy-800 text-amber-signal font-bold border border-amber-signal/40"
                          : "text-secondary hover:bg-navy-850 hover:text-ink"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="size-4 opacity-50" />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="border-t border-border/60 pt-6 space-y-4">
                <Button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenRfq();
                  }}
                  variant="default"
                  className="w-full justify-center gap-2"
                >
                  <Shield className="size-4" />
                  <span>Launch Tender RFQ</span>
                </Button>

                <div className="space-y-2 text-xs font-mono text-metal">
                  <div className="flex items-center gap-2">
                    <Phone className="size-3.5 text-amber-signal" />
                    <span>{COMPANY_INFO.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="size-3.5 text-amber-signal" />
                    <span>{COMPANY_INFO.email}</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
