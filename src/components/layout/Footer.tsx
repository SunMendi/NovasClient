import React from "react";
import { Link } from "react-router-dom";
import { COMPANY_INFO } from "../../data/company";
import { SECTORS } from "../../data/sectors";
import { MapPin, Mail, Phone, ShieldCheck, Anchor } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/70 bg-navy-950 text-secondary">
      {/* Top Credentials Strip */}
      <div className="border-b border-border/40 bg-navy-900/60 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-metal">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-amber-signal" />
              <span>DEFENCE-GRADE AUDIT TRAIL // ISO 9001:2015 CERTIFIED</span>
            </div>
            <div className="flex items-center gap-2">
              <Anchor className="size-4 text-marine" />
              <span>BUREAU VERITAS & LLOYDS REGISTER COMPLIANCE</span>
            </div>
            <div className="text-right">
              <span>SOUTH ASIA REGISTRY: {COMPANY_INFO.corporateRegistry}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-amber-signal to-amber-600 font-display text-lg font-black text-navy-950 shadow-amber">
                N
              </span>
              <span className="font-display text-2xl font-extrabold tracking-tight text-ink">
                NOVAS
              </span>
            </Link>
            <p className="max-w-sm text-sm text-metal leading-relaxed">
              {COMPANY_INFO.subheading}
            </p>
            <div className="pt-2 text-xs font-mono text-metal/70 space-y-1">
              <p>Trusted by naval headquarters, security forces, and industrial EPCs across the region.</p>
            </div>
          </div>

          {/* Sectors Navigation */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-ink mb-4">
              Mission Sectors
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SECTORS.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/sectors/${s.slug}`}
                    className="text-metal hover:text-amber-signal transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-ink mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-metal hover:text-amber-signal transition-colors">
                  About Our Shipyard
                </Link>
              </li>
              <li>
                <Link to="/catalogue" className="text-metal hover:text-amber-signal transition-colors">
                  Equipment Catalogue
                </Link>
              </li>
              <li>
                <Link to="/sectors" className="text-metal hover:text-amber-signal transition-colors">
                  Capability Blueprint
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-metal hover:text-amber-signal transition-colors">
                  Request a Tender Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-ink mb-4">
              Headquarters
            </h4>
            <ul className="space-y-3 text-sm text-metal">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-amber-signal" />
                <span className="text-xs leading-relaxed">{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-amber-signal" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-xs hover:text-ink">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-amber-signal" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="text-xs hover:text-ink">
                  {COMPANY_INFO.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50 py-6 text-center sm:text-left">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-metal/70">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
          <p className="tracking-widest">
            DEFENCE · MARITIME · HEAVY INDUSTRY · TACTICAL · MEDICAL
          </p>
        </div>
      </div>
    </footer>
  );
};
