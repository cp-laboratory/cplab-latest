"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Project } from "@/lib/types";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS } from "@/lib/firestore";
import { ExternalLink, Users, Calendar, ChevronRight, Search, Loader2, FolderGit2 } from "lucide-react";
import { useRouter } from "next/navigation";

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

type TypeFilter = "all" | "research" | "student" | "industry";
type StatusFilter = "all" | "active" | "completed" | "ongoing";

const statusColors: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-600 border-emerald-200",
  completed: "bg-oxford-50 text-oxford-600 border-oxford-200",
  ongoing: "bg-amber-50 text-amber-600 border-amber-200",
};

export default function ProjectsPage() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const { data: projects, loading } = useLiveCollection<Project>(COLLECTIONS.projects, {
    orderByField: "title",
  });

  const filtered = projects.filter((p) => {
    const matchType = typeFilter === "all" || p.type === typeFilter;
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      p.researchArea.toLowerCase().includes(search.toLowerCase());
    return matchType && matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen pattern-bg-light">
      <Navbar />

      {/* Premium Dark Hero */}
      <section className="hero-gradient pt-32 pb-24 border-b border-oxford-900 relative overflow-hidden">
        <div className="absolute inset-0 pattern-bg opacity-10 pointer-events-none" />
        <div className="container-xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs text-amber-400 uppercase tracking-widest font-bold mb-4">
              What We Build
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Research <span className="text-amber-400">Projects</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              From federated learning to blockchain supply chains — explore our ongoing and
              completed research projects.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="pb-24 -mt-10 relative z-20">
        <div className="container-xl">
          {/* Filters Floating Above Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="academic-card rounded-xl p-5 mb-12 flex flex-col lg:flex-row gap-5 items-start lg:items-center bg-white shadow-xl shadow-oxford-900/5"
          >
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="projects-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects or technologies..."
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-5 w-full lg:w-auto">
              {/* Type Filter */}
              <div className="flex flex-wrap gap-2 flex-1 sm:flex-none">
                {(["all", "research", "student"] as TypeFilter[]).map((f) => (
                  <button
                    key={f}
                    id={`projects-type-${f}`}
                    onClick={() => setTypeFilter(f)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                      typeFilter === f
                        ? "bg-amber-500 text-oxford-900 shadow-sm"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent hover:border-gray-200"
                    }`}
                  >
                    {f === "all" ? "All Types" : f}
                  </button>
                ))}
              </div>
              
              {/* Vertical Divider (Hidden on small) */}
              <div className="hidden sm:block w-px bg-gray-200" />
              
              {/* Status Filter */}
              <div className="flex flex-wrap gap-2 flex-1 sm:flex-none">
                {(["all", "active", "completed", "ongoing"] as StatusFilter[]).map((f) => (
                  <button
                    key={f}
                    id={`projects-status-${f}`}
                    onClick={() => setStatusFilter(f)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                      statusFilter === f
                        ? "bg-oxford-800 text-white shadow-sm"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent hover:border-gray-200"
                    }`}
                  >
                    {f === "all" ? "All Status" : f}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {loading && (
            <div className="flex justify-center py-24">
              <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
          )}

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {!loading && filtered.length === 0 && (
            <div className="text-center py-24 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <FolderGit2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.35) }}
      className="h-full"
    >
      <div
        onClick={() => router.push(`/projects/${project.slug}`)}
        className="group academic-card rounded-2xl overflow-hidden h-full flex flex-col cursor-pointer bg-white"
      >
        {/* Cover image */}
        {project.coverImage && (
          <div className="relative w-full aspect-video bg-oxford-50 overflow-hidden shrink-0 border-b border-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        )}

        <div className="p-6 flex flex-col flex-1">
          {/* Status & Type */}
          <div className="flex items-center justify-between gap-2 mb-5">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${
                statusColors[project.status]
              }`}
            >
              {project.status}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold text-oxford-600 bg-oxford-50 border border-oxford-100 capitalize">
              {project.type}
            </span>
          </div>

          {/* Area tag */}
          <span className="text-xs text-amber-500 font-bold tracking-wider uppercase mb-2 block">{project.researchArea}</span>

          {/* Title */}
          <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 leading-snug group-hover:text-amber-500 transition-colors line-clamp-2">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-6 line-clamp-3">{project.description}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 text-gray-400 border border-gray-200">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Team & Dates */}
          <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-5 pb-5 border-b border-gray-100">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-gray-400" />
              <span>{project.team.length} members</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>
                {new Date(project.startDate).getFullYear()}
                {project.endDate ? ` – ${new Date(project.endDate).getFullYear()}` : " – Present"}
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
              >
                <GithubIcon /> GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 group-hover:translate-x-1.5 ml-auto transition-all" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
