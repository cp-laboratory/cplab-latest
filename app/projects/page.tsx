"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Project } from "@/lib/types";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS } from "@/lib/firestore";
import { ExternalLink, Users, Calendar, ChevronRight, Search, Loader2 } from "lucide-react";

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

type TypeFilter = "all" | "research" | "student" | "industry";
type StatusFilter = "all" | "active" | "completed" | "ongoing";

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  completed: "bg-jade-500/10 text-jade-400 border-jade-500/20",
  ongoing: "bg-amber-500/10 text-amber-400 border-amber-500/20",
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
    <div className="min-h-screen bg-[hsl(163_20%_5%)]">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container-xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-xs text-jade-400 uppercase tracking-widest font-medium mb-4">
              What We Build
            </p>
            <h1 className="text-3xl sm:text-4xl font-medium text-white mb-4">
              Research <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              From federated learning to blockchain supply chains — explore our ongoing and
              completed research projects.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass rounded-2xl p-4 mb-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                id="projects-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects or technologies..."
                className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm text-white placeholder-white/30 border border-white/10 rounded-xl focus:outline-none focus:border-jade-500/50 transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "research", "student"] as TypeFilter[]).map((f) => (
                <button
                  key={f}
                  id={`projects-type-${f}`}
                  onClick={() => setTypeFilter(f)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                    typeFilter === f
                      ? "bg-jade-500 text-white"
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {f === "all" ? "All Types" : f}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "active", "completed", "ongoing"] as StatusFilter[]).map((f) => (
                <button
                  key={f}
                  id={`projects-status-${f}`}
                  onClick={() => setStatusFilter(f)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                    statusFilter === f
                      ? "bg-jade-800 text-white"
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {f === "all" ? "All Status" : f}
                </button>
              ))}
            </div>
          </motion.div>

          {loading && (
            <div className="flex justify-center py-24">
              <Loader2 className="w-6 h-6 text-jade-400 animate-spin" />
            </div>
          )}

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {!loading && filtered.length === 0 && (
            <div className="text-center py-24 text-white/30">
              <p className="text-lg">No projects match your filters.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.35) }}
    >
      <div className="group glass-hover rounded-2xl p-6 h-full flex flex-col">
        {/* Status & Type */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${
              statusColors[project.status]
            }`}
          >
            {project.status}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs text-white/30 bg-white/5 border border-white/10 capitalize">
            {project.type}
          </span>
        </div>

        {/* Area tag */}
        <span className="text-xs text-jade-400 font-medium mb-2">{project.researchArea}</span>

        {/* Title */}
        <h3 className="text-lg font-medium text-white mb-3 leading-snug">{project.title}</h3>

        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed flex-1 mb-4">{project.description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-white/40 border border-white/10"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-white/30 border border-white/10">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Team & Dates */}
        <div className="flex items-center gap-3 text-xs text-white/30 mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{project.team.length} members</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {new Date(project.startDate).getFullYear()}
              {project.endDate ? ` – ${new Date(project.endDate).getFullYear()}` : " – Present"}
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              <GithubIcon /> GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Live Demo
            </a>
          )}
          <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-jade-400 ml-auto transition-colors" />
        </div>
      </div>
    </motion.div>
  );
}
