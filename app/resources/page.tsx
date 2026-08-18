"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Resource } from "@/lib/types";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS } from "@/lib/firestore";
import { Download, ExternalLink, Search, Loader2, Database, Wrench, Code2, FileText } from "lucide-react";

type TypeFilter = "all" | "dataset" | "tool" | "code" | "paper";

const typeIcons: Record<Resource["resourceType"], typeof Database> = {
  dataset: Database,
  tool: Wrench,
  code: Code2,
  paper: FileText,
};

const typeColors: Record<Resource["resourceType"], string> = {
  dataset: "bg-jade-500/10 text-jade-400 border-jade-500/20",
  tool: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  code: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  paper: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function ResourcesPage() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [search, setSearch] = useState("");
  const { data: resources, loading } = useLiveCollection<Resource>(COLLECTIONS.resources, {
    orderByField: "title",
  });

  const filtered = resources.filter((r) => {
    const matchType = typeFilter === "all" || r.resourceType === typeFilter;
    const matchSearch =
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase()) ||
      r.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchType && matchSearch;
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
              Open Access
            </p>
            <h1 className="text-3xl sm:text-4xl font-medium text-white mb-4">
              Research <span className="gradient-text">Resources</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Datasets, tools, and code released from our research for the community to use and build on.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass rounded-xl p-4 mb-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                id="resources-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search resources, categories, or tags..."
                className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm text-white placeholder-white/30 border border-white/10 rounded-xl focus:outline-none focus:border-jade-500/50 transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "dataset", "tool", "code", "paper"] as TypeFilter[]).map((f) => (
                <button
                  key={f}
                  id={`resources-type-${f}`}
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
          </motion.div>

          {loading && (
            <div className="flex justify-center py-24">
              <Loader2 className="w-6 h-6 text-jade-400 animate-spin" />
            </div>
          )}

          {/* Resources Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((resource, i) => (
              <ResourceCard key={resource.id} resource={resource} index={i} />
            ))}
          </div>

          {!loading && filtered.length === 0 && (
            <div className="text-center py-24 text-white/30">
              <p className="text-lg">No resources match your filters.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ResourceCard({ resource, index }: { resource: Resource; index: number }) {
  const Icon = typeIcons[resource.resourceType];
  const link = resource.fileUrl || resource.externalUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.35) }}
    >
      <div className="group glass-hover rounded-xl p-5 h-full flex flex-col">
        {/* Type & Category */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${
              typeColors[resource.resourceType]
            }`}
          >
            <Icon className="w-3 h-3" /> {resource.resourceType}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs text-white/30 bg-white/5 border border-white/10">
            {resource.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium text-white mb-3 leading-snug">{resource.title}</h3>

        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed flex-1 mb-4">{resource.description}</p>

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {resource.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-white/40 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Access link */}
        <div className="pt-4 border-t border-white/5">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-jade-400 hover:text-jade-300 transition-colors"
            >
              {resource.fileUrl ? <Download className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
              {resource.fileUrl ? "Download" : "Access Resource"}
            </a>
          ) : (
            <span className="text-xs text-white/30">Not yet available</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
