import React from "react";
import { useParams, Link } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import { Button } from "../components/ui/button";
import {
  MapPin,
  Building2,
  CheckCircle2,
  FileCheck2,
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
      <section className="border-b border-slate-200 bg-white py-4 shadow-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Link to="/" className="hover:text-[#002e6e] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/projects" className="hover:text-[#002e6e] transition-colors">
              Projects
            </Link>
            <span>/</span>
            <span className="text-[#ed145b] font-semibold truncate max-w-xs">{project.title}</span>
          </div>
        </div>
      </section>

      {/* Main Content Showcase */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Header & Badges */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#ed145b] px-3.5 py-1 text-xs font-mono font-bold uppercase text-white shadow-sm">
                {project.sectorName}
              </span>
              <span className="rounded-full bg-[#059669]/10 border border-[#059669]/30 px-3 py-1 text-xs font-mono font-semibold text-[#059669]">
                Status: {project.status}
              </span>
              <span className="rounded-full bg-[#002e6e] text-white px-3 py-1 text-xs font-mono">
                Timeline: {project.year}
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#002e6e] tracking-tight">
              {project.title}
            </h1>

            {/* Client & Location Meta Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <Building2 className="size-5 text-[#ed145b] shrink-0" />
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Client / Authority</div>
                  <div className="text-sm font-bold text-[#133057]">{project.client}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <MapPin className="size-5 text-[#005f99] shrink-0" />
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Deployment Location</div>
                  <div className="text-sm font-bold text-[#133057]">{project.location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Featured Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-md">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Project Description (Prose) */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 space-y-6 shadow-sm">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#002e6e]">
              Project <span className="text-[#ed145b]">Overview</span>
            </h2>
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-4 font-sans whitespace-pre-line">
              {project.description}
            </div>
          </div>

          {/* Key Deliverables & Features */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 space-y-6 shadow-sm">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#002e6e]">
              Key Features &amp; <span className="text-[#ed145b]">Deliverables</span>
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <CheckCircle2 className="size-5 text-[#ed145b] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 space-y-6 overflow-hidden shadow-sm">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#002e6e]">
              Technical <span className="text-[#ed145b]">Specifications</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 font-mono text-xs text-slate-500 uppercase bg-slate-50">
                    <th className="py-3 px-4">Parameter / Metric</th>
                    <th className="py-3 px-4">Specification Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {project.specs.map((spec, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-[#133057]">{spec.label}</td>
                      <td className="py-3 px-4 font-mono font-bold text-[#002e6e]">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Request Project Quote CTA Box (Directly connects to RfqDrawer) */}
          <div className="rounded-3xl border border-[#003882] bg-gradient-to-r from-[#002e6e] to-[#042e6f] p-8 sm:p-10 text-center text-white shadow-xl space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold">
              Request Similar Project Quotation or Feasibility Study
            </h2>
            <p className="text-sm text-slate-200 max-w-xl mx-auto">
              Our 24-member specialized engineering team provides turnkey technical proposals, budget estimates, and DGDP compliance documentation.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button
                onClick={() => onOpenRfq({ name: project.title, sector: project.category } as any)}
                className="bg-[#ed145b] hover:bg-[#d00f4e] text-white font-bold h-11 px-8 rounded-lg shadow-md shadow-[#ed145b]/25 text-sm"
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
