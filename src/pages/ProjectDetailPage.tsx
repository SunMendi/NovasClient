import React from "react";
import { useParams, Link } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import { Button } from "../components/ui/button";
import {
  ChevronLeft,
  Calendar,
  MapPin,
  Building2,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  ArrowRight,
  ExternalLink
} from "lucide-react";

interface ProjectDetailPageProps {
  onOpenRfq: (item?: any) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ onOpenRfq }) => {
  const { id, _id } = useParams<{ id?: string; _id?: string }>();
  const projectId = id || _id;

  const project = PROJECTS.find((p) => p.id === projectId) || PROJECTS[0];

  return (
    <div className="flex flex-col space-y-12 pb-24">
      {/* Breadcrumb Navigation */}
      <section className="border-b border-slate-800 bg-[#061833]/60 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/projects" className="hover:text-white transition-colors">
              Projects
            </Link>
            <span>/</span>
            <span className="text-[#ed145b] truncate max-w-xs">{project.title}</span>
          </div>
        </div>
      </section>

      {/* Main Content Showcase */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Header & Badges */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#ed145b] px-3.5 py-1 text-xs font-mono font-bold uppercase text-white shadow-md">
                {project.sectorName}
              </span>
              <span className="rounded-full bg-[#10b981]/20 border border-[#10b981]/40 px-3 py-1 text-xs font-mono font-semibold text-[#10b981]">
                Status: {project.status}
              </span>
              <span className="rounded-full bg-[#061833] border border-slate-700 px-3 py-1 text-xs font-mono text-slate-300">
                Timeline: {project.year}
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {project.title}
            </h1>

            {/* Client & Location Meta Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-[#061833] p-4">
                <Building2 className="size-5 text-[#ed145b] shrink-0" />
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">Client / Authority</div>
                  <div className="text-sm font-semibold text-white">{project.client}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-[#061833] p-4">
                <MapPin className="size-5 text-sky-400 shrink-0" />
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">Deployment Location</div>
                  <div className="text-sm font-semibold text-white">{project.location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Featured Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Project Description (Prose) */}
          <div className="rounded-3xl border border-slate-800 bg-[#061833] p-8 sm:p-10 space-y-6">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              Project <span className="text-[#ed145b]">Overview</span>
            </h2>
            <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-4 font-sans whitespace-pre-line">
              {project.description}
            </div>
          </div>

          {/* Key Deliverables & Features */}
          <div className="rounded-3xl border border-slate-800 bg-[#061833] p-8 sm:p-10 space-y-6">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              Key Features &amp; <span className="text-[#ed145b]">Deliverables</span>
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-[#030a18]/60 p-4"
                >
                  <CheckCircle2 className="size-5 text-[#ed145b] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="rounded-3xl border border-slate-800 bg-[#061833] p-8 sm:p-10 space-y-6 overflow-hidden">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              Technical <span className="text-[#ed145b]">Specifications</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-700 font-mono text-xs text-slate-400 uppercase">
                    <th className="py-3 px-4">Parameter / Metric</th>
                    <th className="py-3 px-4">Specification Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-xs sm:text-sm">
                  {project.specs.map((spec, idx) => (
                    <tr key={idx} className="hover:bg-[#0f2c56]/40 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-300">{spec.label}</td>
                      <td className="py-3 px-4 font-mono font-semibold text-[#10b981]">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Request Project Quote CTA Box (Directly connects to RfqDrawer) */}
          <div className="rounded-3xl border border-[#ed145b]/40 bg-gradient-to-r from-[#002e6e] to-[#042e6f] p-8 sm:p-10 text-center text-white shadow-2xl space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold">
              Request Similar Project Quotation or Feasibility Study
            </h2>
            <p className="text-sm text-slate-200 max-w-xl mx-auto">
              Our 24-member specialized engineering team provides turnkey technical proposals, budget estimates, and DGDP compliance documentation.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button
                onClick={() => onOpenRfq({ name: project.title, sector: project.category } as any)}
                className="bg-[#ed145b] hover:bg-[#d00f4e] text-white font-bold h-11 px-8 rounded-lg shadow-crimson text-sm"
              >
                <FileCheck2 className="mr-2 size-4" />
                Request Project Quote
              </Button>
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 h-11 px-6 rounded-lg text-sm">
                <Link to="/projects">Back to All Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
