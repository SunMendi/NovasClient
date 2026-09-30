import React from "react";
import { Link } from "react-router-dom";
import { COMPANY_INFO } from "../data/company";
import { Button } from "../components/ui/button";
import {
  ShieldCheck,
  Award,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  Target,
  Eye,
  Heart,
  FileCheck2,
  Calendar,
  Sparkles
} from "lucide-react";

export const AboutUsPage: React.FC = () => {
  return (
    <div className="flex flex-col space-y-16 pb-24">
      {/* 1. HERO BANNER: Message from Founder & CEO */}
      <section className="relative overflow-hidden border-b border-border/80 bg-gradient-to-b from-[#061833] via-[#02163b] to-[#030a18] py-16 sm:py-20">
        <div className="pointer-events-none absolute -right-20 top-0 size-96 rounded-full bg-[#ed145b]/10 blur-3xl" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ed145b]/40 bg-[#002e6e]/60 px-4 py-1 text-xs font-mono uppercase tracking-wider text-[#ed145b]">
              <Calendar className="size-3.5" />
              <span>ESTABLISHED JULY 2012 • 13+ YEARS OF EXCELLENCE</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Message from <span className="text-[#ed145b]">Founder &amp; CEO</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-sans">
              &ldquo;Novas started in July 2012. Our eventual destination is to serve Bangladesh by achieving excellence in the field of science and technology.&rdquo;
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mx-auto font-sans">
              Our main objectives are quality service, innovation, and integrity. We act as a catalyst in the country&apos;s development, offering tailored solutions with dedicated after-sales support. Our 24-member specialized engineering and research team researches, shares, and supports one another across all defense, maritime and heavy industry disciplines.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CEO PROFILE & EXECUTIVE IDENTITY */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-800 bg-[#061833] p-8 sm:p-10 shadow-2xl flex flex-col sm:flex-row items-center gap-8">
          <div className="relative shrink-0">
            <div className="size-36 sm:size-44 rounded-2xl bg-gradient-to-br from-[#002e6e] to-[#042e6f] border-2 border-[#ed145b] shadow-crimson flex items-center justify-center text-center overflow-hidden">
              <span className="font-display text-5xl font-black text-white">RA</span>
            </div>
            <div className="absolute -bottom-2 -right-2 rounded-full bg-[#ed145b] p-2 text-white shadow-lg">
              <Sparkles className="size-4" />
            </div>
          </div>

          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="inline-block rounded-md bg-[#ed145b]/10 px-2.5 py-1 font-mono text-xs font-bold text-[#ed145b] uppercase">
              Executive Leadership
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              {COMPANY_INFO.founder}
            </h2>
            <div className="font-sans text-sm font-semibold text-slate-300">
              {COMPANY_INFO.founderTitle}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Leading Novas from its inception in July 2012 into a trusted tier-one partner for sovereign defense procurement, naval systems integration, and industrial turnkey execution across Bangladesh and South Asia.
            </p>
          </div>
        </div>
      </section>

      {/* 3. OUR MISSION & OUR VISION (Direct text from novasbd.com) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Mission Card */}
          <div className="relative rounded-3xl border border-slate-800 bg-[#061833] p-8 sm:p-10 shadow-xl overflow-hidden group hover:border-[#ed145b]/50 transition-colors">
            <div className="pointer-events-none absolute -right-10 -bottom-10 size-40 rounded-full bg-[#ed145b]/10 blur-2xl" />
            <div className="space-y-4 relative z-10">
              <div className="inline-flex p-3 rounded-2xl bg-[#002e6e] text-[#ed145b] shadow-md">
                <Target className="size-8" />
              </div>
              <h2 className="font-display text-2xl font-bold text-white group-hover:text-[#ed145b] transition-colors">
                Our <span className="text-[#ed145b]">Mission</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-[#ed145b]" />
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                {COMPANY_INFO.mission}
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="relative rounded-3xl border border-slate-800 bg-[#061833] p-8 sm:p-10 shadow-xl overflow-hidden group hover:border-sky-500/50 transition-colors">
            <div className="pointer-events-none absolute -right-10 -bottom-10 size-40 rounded-full bg-sky-500/10 blur-2xl" />
            <div className="space-y-4 relative z-10">
              <div className="inline-flex p-3 rounded-2xl bg-[#002e6e] text-sky-400 shadow-md">
                <Eye className="size-8" />
              </div>
              <h2 className="font-display text-2xl font-bold text-white group-hover:text-sky-400 transition-colors">
                Our <span className="text-sky-400">Vision</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-sky-400" />
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                {COMPANY_INFO.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR CORE VALUES (Honesty, Integrity, Commitment) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl border border-slate-800 bg-[#02163b] p-8 sm:p-12 shadow-2xl text-center space-y-8">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#ed145b] mb-1">
              FOUNDATIONAL ETHICS
            </div>
            <h2 className="font-display text-3xl font-extrabold text-white">
              OUR <span className="text-[#ed145b]">VALUES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-[#061833] p-6 text-center space-y-3">
              <div className="size-12 rounded-xl bg-[#ed145b]/10 text-[#ed145b] flex items-center justify-center mx-auto">
                <CheckCircle2 className="size-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">Honesty</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Absolute transparency in procurement, pricing, lead-time forecasting, and OEM verification.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#061833] p-6 text-center space-y-3">
              <div className="size-12 rounded-xl bg-[#002e6e] text-white flex items-center justify-center mx-auto">
                <ShieldCheck className="size-6 text-sky-400" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">Integrity</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Uncompromising adherence to military ballistic specs, SOLAS marine standards, and rigorous contract ethics.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#061833] p-6 text-center space-y-3">
              <div className="size-12 rounded-xl bg-[#ed145b]/10 text-[#ed145b] flex items-center justify-center mx-auto">
                <Heart className="size-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">Commitment</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Standing behind every delivery with certified engineers, on-site commissioning, and guaranteed long-term spare-parts supply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 24-MEMBER SPECIALIZED TEAM & FACILITY OVERVIEW */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-12 items-center">
          <div className="md:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#10b981]/40 bg-[#10b981]/10 px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-[#10b981]">
              <Users className="size-3.5" />
              <span>THE HUMAN CAPABILITY</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              24-Member Specialized Engineering &amp; Research Division
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Our multidisciplinary team comprises naval architects, electronics and radar engineers, certified TCCC clinical trainers, and international logistics coordinators.
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#ed145b]" />
                <span>Naval Architecture &amp; Vessel Construction Engineers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#ed145b]" />
                <span>Tactical Radar &amp; Optical Reconnaissance Specialists</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#ed145b]" />
                <span>Combat Trauma &amp; Emergency Medical Technical Advisors</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#ed145b]" />
                <span>Heavy Industry CNC Automation &amp; EPC Specialists</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-6 rounded-2xl border border-slate-800 bg-[#061833] p-6 space-y-4">
            <h3 className="font-display text-lg font-bold text-white">
              Headquarters &amp; Support Hub
            </h3>
            <div className="text-xs sm:text-sm text-slate-300 space-y-2">
              <p><strong className="text-white">Facility:</strong> House No-412, Road No-29, Flat-5A-5B-4B, Mohakhali DOHS, Dhaka, Bangladesh</p>
              <p><strong className="text-white">Direct Line:</strong> +8801711264822 / 9832552</p>
              <p><strong className="text-white">Official Email:</strong> info@novasbd.com</p>
              <p><strong className="text-white">Operating Scope:</strong> Armed Forces, Coast Guard, Port Authorities, Heavy EPC megaprojects</p>
            </div>
            <div className="pt-2">
              <Button asChild className="w-full bg-[#ed145b] hover:bg-[#d00f4e] text-white font-bold rounded-lg shadow-crimson">
                <Link to="/contact">Contact Our Office</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
