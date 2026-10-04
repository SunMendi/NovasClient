import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { COMPANY_INFO } from "../data/company";
import { Button } from "../components/ui/button";
import {
  ShieldCheck,
  Users,
  CheckCircle2,
  ArrowRight,
  Target,
  Eye,
  Heart,
  Calendar,
  Sparkles
} from "lucide-react";
import { DynamicTopBanner, DynamicBannerSlide } from "../components/common/DynamicTopBanner";
import { api } from "../services/api";

export const AboutUsPage: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState(COMPANY_INFO);

  const [projectImages, setProjectImages] = useState<string[]>([]);
  useEffect(() => {
    let active = true;
    api.getCompanyOverview().then(data => { if (active) setCompanyInfo(data); }).catch(() => {});
    api.getProjects().then(projects => {
      if (active) setProjectImages([...new Set(projects.map(project => project.image).filter(Boolean))].slice(0, 3));
    }).catch(() => {});
    return () => { active = false; };
  }, []);
  const slides = useMemo<DynamicBannerSlide[]>(() => [
    {
      imageUrl: projectImages[0] || '/assets/hero/hero-maritime-Z9Kk4jOd.jpg',
      badgeText: `ABOUT ${companyInfo.shortName} • ESTABLISHED ${companyInfo.foundedMonth}`,
      title: <>Engineering purpose.<br /><span className="text-[#ed145b]">Building possibilities.</span></>,
      subtitle: companyInfo.tagline,
      link: '/projects', linkText: 'Explore our projects',
      tags: ['Defence', 'Maritime', 'Industry'],
    },
    {
      imageUrl: projectImages[1] || '/assets/hero/hero-defence-CzOJrdZI.jpg',
      badgeText: 'OUR MISSION',
      title: <>Technology with<br /><span className="text-[#ed145b]">a clear purpose.</span></>,
      subtitle: companyInfo.mission,
      link: '/consultancy/all', linkText: 'Explore our expertise',
    },
    {
      imageUrl: projectImages[2] || '/assets/hero/hero-logistics-sV_p9M_H.jpg',
      badgeText: 'OUR VISION',
      title: <>Working together.<br /><span className="text-[#ed145b]">Looking ahead.</span></>,
      subtitle: companyInfo.vision,
      link: '/contact', linkText: 'Talk to our team',
    },
  ], [companyInfo, projectImages]);
  return (
    <div className="flex flex-col space-y-16 pb-24">
      <div>
        <DynamicTopBanner slides={slides} align="left" intervalMs={6000} />
        <div className="border-b border-slate-200 bg-white">
          <div className="container mx-auto grid gap-5 px-4 py-6 sm:grid-cols-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3"><Calendar className="size-5 shrink-0 text-[#ed145b]" /><div><p className="text-xs uppercase tracking-wider text-slate-500">Established</p><p className="font-semibold text-[#002e6e]">{companyInfo.foundedMonth}</p></div></div>
            <div className="flex items-center gap-3"><Users className="size-5 shrink-0 text-[#ed145b]" /><div><p className="text-xs uppercase tracking-wider text-slate-500">Our people</p><p className="text-sm font-semibold text-[#002e6e]">{companyInfo.teamSize}</p></div></div>
            <div className="flex items-center gap-3"><ShieldCheck className="size-5 shrink-0 text-[#ed145b]" /><div><p className="text-xs uppercase tracking-wider text-slate-500">Our focus</p><p className="font-semibold text-[#002e6e]">Defence, Maritime &amp; Industry</p></div></div>
          </div>
        </div>
      </div>

      {/* 2. CEO PROFILE & EXECUTIVE IDENTITY */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center gap-8 md:gap-10">
          <div className="relative shrink-0">
            <div className="w-48 sm:w-56 aspect-[4/5] rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-100 relative group">
              <img
                src={companyInfo.founderImage}
                alt={companyInfo.founder}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002e6e]/50 via-transparent to-transparent opacity-30 pointer-events-none" />
            </div>
            <div className="absolute -bottom-2 -right-2 rounded-full bg-[#ed145b] p-2.5 text-white shadow-lg border-2 border-white">
              <Sparkles className="size-4" />
            </div>
          </div>

          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#ed145b]/10 px-3 py-1 font-sans text-xs font-bold text-[#ed145b] uppercase tracking-wide">
              <span>Message from our Founder &amp; CEO</span>
            </div>

            <div className="space-y-1">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#002e6e] tracking-tight">
                {companyInfo.founder}
              </h2>
              <div className="font-sans text-sm sm:text-base font-semibold text-[#ed145b]">
                {companyInfo.founderTitle}
              </div>
            </div>

            <blockquote className="border-l-4 border-[#ed145b] pl-5 text-left text-base sm:text-lg leading-relaxed text-slate-600">
              &ldquo;{companyInfo.subheading}&rdquo;
            </blockquote>

            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-sans text-slate-500">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 className="size-4 text-[#ed145b]" />
                <span>Founder since {companyInfo.foundedMonth}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 className="size-4 text-[#ed145b]" />
                <span>Defence &amp; Maritime Visionary</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR MISSION & OUR VISION (Direct text from novasbd.com) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Mission Card */}
          <div className="relative rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm overflow-hidden group hover:border-[#ed145b]/50 hover:shadow-md transition-all">
            <div className="space-y-4 relative z-10">
              <div className="inline-flex p-3 rounded-2xl bg-[#002e6e] text-white shadow-sm">
                <Target className="size-8 text-[#ed145b]" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#002e6e] group-hover:text-[#ed145b] transition-colors">
                Our <span className="text-[#ed145b]">Mission</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-[#ed145b]" />
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                {companyInfo.mission}
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="relative rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm overflow-hidden group hover:border-[#002e6e]/50 hover:shadow-md transition-all">
            <div className="space-y-4 relative z-10">
              <div className="inline-flex p-3 rounded-2xl bg-[#002e6e] text-white shadow-sm">
                <Eye className="size-8 text-sky-300" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#002e6e] group-hover:text-[#005f99] transition-colors">
                Our <span className="text-[#005f99]">Vision</span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-[#005f99]" />
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                {companyInfo.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR CORE VALUES (Honesty, Integrity, Commitment) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-12 shadow-sm text-center space-y-8">
          <div>
            <div className="font-sans text-xs font-bold uppercase tracking-wider text-[#ed145b] mb-1">
              FOUNDATIONAL ETHICS
            </div>
            <h2 className="font-display text-3xl font-extrabold text-[#002e6e]">
              OUR <span className="text-[#ed145b]">VALUES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center space-y-3 shadow-xs">
              <div className="size-12 rounded-xl bg-[#ed145b]/10 text-[#ed145b] flex items-center justify-center mx-auto">
                <CheckCircle2 className="size-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#002e6e]">Honesty</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Absolute transparency in procurement, pricing, lead-time forecasting, and OEM verification.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center space-y-3 shadow-xs">
              <div className="size-12 rounded-xl bg-[#002e6e] text-white flex items-center justify-center mx-auto">
                <ShieldCheck className="size-6 text-white" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#002e6e]">Integrity</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Uncompromising adherence to military ballistic specs, SOLAS marine standards, and rigorous contract ethics.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center space-y-3 shadow-xs">
              <div className="size-12 rounded-xl bg-[#ed145b]/10 text-[#ed145b] flex items-center justify-center mx-auto">
                <Heart className="size-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#002e6e]">Commitment</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
            <div className="inline-flex items-center gap-2 rounded-full border border-[#059669]/30 bg-[#059669]/10 px-3.5 py-1 text-xs font-sans uppercase tracking-wider text-[#059669] font-semibold">
              <Users className="size-3.5" />
              <span>THE HUMAN CAPABILITY</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#002e6e]">
              {companyInfo.teamSize}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our multidisciplinary team comprises naval architects, electronics and radar engineers, certified TCCC clinical trainers, and international logistics coordinators.
            </p>
            <ul className="space-y-2.5 text-sm text-slate-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-[#ed145b] shrink-0" />
                <span>Naval Architecture &amp; Vessel Construction Engineers</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-[#ed145b] shrink-0" />
                <span>Tactical Radar &amp; Optical Reconnaissance Specialists</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-[#ed145b] shrink-0" />
                <span>Combat Trauma &amp; Emergency Medical Technical Advisors</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-[#ed145b] shrink-0" />
                <span>Heavy Industry CNC Automation &amp; EPC Specialists</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="font-display text-lg font-bold text-[#002e6e]">
              Headquarters &amp; Support Hub
            </h3>
            <div className="text-xs sm:text-sm text-slate-600 space-y-2.5">
              <p><strong className="text-[#002e6e]">Facility:</strong> {companyInfo.address}</p>
              <p><strong className="text-[#002e6e]">Direct Line:</strong> {companyInfo.phone}{companyInfo.landline ? ` / ${companyInfo.landline}` : ''}</p>
              <p><strong className="text-[#002e6e]">Official Email:</strong> <a className="break-all hover:underline" href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a></p>
              <p><strong className="text-[#002e6e]">Operating Scope:</strong> Armed Forces, Coast Guard, Port Authorities, Heavy EPC megaprojects</p>
            </div>
            <div className="pt-2">
              <Button asChild className="w-full bg-[#ed145b] hover:bg-[#d00f4e] text-white font-bold rounded-lg shadow-md shadow-[#ed145b]/20">
                <Link to="/contact">Contact Our Office</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
