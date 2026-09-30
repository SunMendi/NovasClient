import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import { Button } from "../components/ui/button";
import { Search, ChevronRight, MapPin, Building2 } from "lucide-react";

export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "defence", name: "Defence & Tactical" },
    { id: "maritime", name: "Maritime Platforms" },
    { id: "industry", name: "Heavy Industry" },
    { id: "consultancy", name: "Consultancy & ICT" },
    { id: "geospatial", name: "Aerospace & Geospatial" }
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col space-y-12 pb-24">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#002e6e] via-[#042e6f] to-[#001f4d] py-16 sm:py-20 text-white">
        <div className="pointer-events-none absolute -right-20 top-0 size-96 rounded-full bg-[#ed145b]/15 blur-3xl" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-sans font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            <span>NATIONAL INFRASTRUCTURE &amp; SOVEREIGN DEFENCE</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Our <span className="text-[#ed145b]">Projects</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Explore major turn-key procurement, naval vessel integrations, border surveillance deployments, and heavy industrial automation executed by Novas BD across South Asia.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#ed145b] text-white shadow-md shadow-[#ed145b]/20"
                    : "bg-white text-[#133057] hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects, client, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs text-[#133057] placeholder-slate-400 focus:border-[#ed145b] focus:outline-none shadow-xs"
            />
          </div>
        </div>

        {/* Results Counter */}
        <div className="pt-4 text-xs font-sans font-medium text-slate-500">
          Showing {filteredProjects.length} of {PROJECTS.length} Projects
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-4 shadow-sm">
            <p className="text-base text-slate-600">No projects found matching your criteria.</p>
            <Button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              variant="outline"
              className="border-slate-300 text-[#002e6e] hover:bg-[#002e6e] hover:text-white"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:border-[#ed145b]/50 hover:-translate-y-1.5 hover:shadow-lg"
              >
                {/* Project Image */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-[#ed145b] px-3 py-1 font-sans text-[11px] font-bold uppercase text-white shadow-md">
                      {project.sectorName}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="rounded-md bg-black/65 px-2.5 py-1 font-sans text-[11px] font-medium text-white backdrop-blur-sm">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <h2 className="font-display text-lg font-bold text-[#002e6e] group-hover:text-[#ed145b] transition-colors line-clamp-2">
                      {project.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Building2 className="size-3.5 text-[#ed145b] shrink-0" />
                      <span className="truncate">{project.client}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="size-3.5 text-[#005f99] shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 text-[#ed145b] font-semibold">
                      <span>View Specifications</span>
                      <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
