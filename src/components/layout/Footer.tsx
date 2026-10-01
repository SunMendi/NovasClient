import React, { useState } from "react";
import { Link } from "react-router-dom";
import { COMPANY_INFO } from "../../data/company";
import { NovasLogo } from "../common/NovasLogo";
import { MapPin, Mail, Phone, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterName, setNewsletterName] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
      setNewsletterName("");
    }, 3000);
  };

  return (
    <footer className="border-t border-slate-800 bg-[#02163b] text-slate-300">
      {/* Top Credentials Strip */}
      <div className="border-b border-slate-800/80 bg-[#030a18] py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 font-sans text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-[#ed145b]" />
              <span>DEFENCE &amp; SCIENCE PROCUREMENT EXCELLENCE // ESTABLISHED JULY 2012</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#10b981]" />
              <span>ISO 9001:2015 &amp; MIL-STD COMPLIANT VENDOR</span>
            </div>
            <div className="text-right">
              <span>HEAD OFFICE: MOHAKHALI DOHS, DHAKA, BANGLADESH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block py-1">
              <NovasLogo variant="dark" height={36} showSubtitle={true} />
            </Link>
            <p className="max-w-sm text-sm text-slate-300 leading-relaxed">
              {COMPANY_INFO.subheading}
            </p>
            <p className="text-xs text-slate-400 font-sans">
              24-member specialized engineering, procurement and after-sales support team.
            </p>

            {/* Direct Contact Pills */}
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="size-4 shrink-0 text-[#ed145b] mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="size-4 shrink-0 text-[#ed145b]" />
                <span>{COMPANY_INFO.phone} / {COMPANY_INFO.landline}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="size-4 shrink-0 text-[#ed145b]" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#ed145b] transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#ed145b] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/aboutus" className="hover:text-[#ed145b] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#ed145b] transition-colors">
                  Projects Catalog
                </Link>
              </li>
              <li>
                <Link to="/products/all" className="hover:text-[#ed145b] transition-colors">
                  Product Directory
                </Link>
              </li>
              <li>
                <Link to="/industry/defence" className="hover:text-[#ed145b] transition-colors">
                  Defence Sector
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#ed145b] transition-colors">
                  Contact &amp; Tender RFQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Consultancy Variations Column */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">
              Consultancy
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/consultancy/international" className="hover:text-[#ed145b] transition-colors">
                  International Consultancy
                </Link>
              </li>
              <li>
                <Link to="/consultancy/it-telecom" className="hover:text-[#ed145b] transition-colors">
                  IT &amp; Telecommunication
                </Link>
              </li>
              <li>
                <Link to="/consultancy/project" className="hover:text-[#ed145b] transition-colors">
                  Project Consultancy
                </Link>
              </li>
              <li>
                <Link to="/consultancy/tender" className="hover:text-[#ed145b] transition-colors">
                  Tender Advisory
                </Link>
              </li>
              <li>
                <Link to="/consultancy/real-estate-construction" className="hover:text-[#ed145b] transition-colors">
                  Real Estate &amp; Construction
                </Link>
              </li>
              <li>
                <Link to="/consultancy/all" className="hover:text-[#ed145b] transition-colors text-xs text-slate-400">
                  All Advisory Practices &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe Column (From novasbd.com) */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Stay Connected
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to official Novas procurement bulletins and technical specifications updates.
            </p>

            {subscribed ? (
              <div className="rounded-lg bg-[#061833] border border-[#10b981]/40 p-3 text-xs text-[#10b981] flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>Thank you for subscribing to Novas bulletins!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newsletterName}
                  onChange={(e) => setNewsletterName(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-[#061833] px-3 py-2 text-xs text-white placeholder-slate-400 focus:border-[#ed145b] focus:outline-none"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-[#061833] px-3 py-2 text-xs text-white placeholder-slate-400 focus:border-[#ed145b] focus:outline-none"
                  required
                />
                <Button
                  type="submit"
                  size="sm"
                  className="w-full bg-[#ed145b] hover:bg-[#d00f4e] text-white font-semibold text-xs py-2 shadow-crimson"
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip matching novasbd.com */}
      <div className="border-t border-slate-800 bg-[#002e6e] py-4 text-center text-xs text-slate-300">
        <p className="font-sans font-medium">
          &copy; Copyright 2025 by <span className="font-bold text-white">Novas</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
