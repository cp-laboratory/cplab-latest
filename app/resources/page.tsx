"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Resource } from "@/lib/types";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS } from "@/lib/firestore";
import { Download, ExternalLink, Search, Loader2, Database, Wrench, Code2, FileText, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

type TypeFilter = "all" | "dataset" | "tool" | "code" | "paper";

const typeIcons: Record<Resource["resourceType"], typeof Database> = {
  dataset: Database,
  tool: Wrench,
  code: Code2,
  paper: FileText,
};

const typeColors: Record<Resource["resourceType"], string> = {
  dataset: "bg-oxford-50 text-oxford-700 border-oxford-200",
  tool: "bg-amber-50 text-amber-700 border-amber-200",
  code: "bg-blue-50 text-blue-700 border-blue-200",
  paper: "bg-purple-50 text-purple-700 border-purple-200",
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
              Open Access
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Research <span className="text-amber-400">Resources</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Datasets, tools, and code released from our research for the community to use and build on.
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
            transition={{ duration: 0.4, delay: 0.1 }}
            className="academic-card rounded-xl p-5 mb-12 flex flex-col sm:flex-row gap-5 items-start sm:items-center bg-white shadow-xl shadow-oxford-900/5"
          >
            <div className="relative flex-1 w-full sm:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="resources-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search resources, categories, or tags..."
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {(["all", "dataset", "tool", "code", "paper"] as TypeFilter[]).map((f) => (
                <button
                  key={f}
                  id={`resources-type-${f}`}
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
          </motion.div>

          {loading && (
            <div className="flex justify-center py-24">
              <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
          )}

          {/* Resources Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((resource, i) => (
              <ResourceCard key={resource.id} resource={resource} index={i} />
            ))}
          </div>

          {!loading && filtered.length === 0 && (
            <div className="text-center py-24 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <Database className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
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
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.35) }}
      className="h-full"
    >
      <div
        onClick={() => router.push(`/resources/${resource.slug}`)}
        className="group academic-card rounded-2xl overflow-hidden h-full flex flex-col cursor-pointer bg-white"
      >
        {/* Cover image */}
        {resource.coverImage && (
          <div className="relative w-full aspect-video bg-oxford-50 overflow-hidden shrink-0 border-b border-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resource.coverImage}
              alt={resource.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        )}

        <div className="p-6 flex flex-col flex-1">
          {/* Type & Category */}
          <div className="flex items-center justify-between gap-2 mb-5">
            <span
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border capitalize ${
                typeColors[resource.resourceType]
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {resource.resourceType}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold text-oxford-600 bg-oxford-50 border border-oxford-100">
              {resource.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 leading-snug group-hover:text-amber-500 transition-colors line-clamp-2">
            {resource.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-6 line-clamp-3">{resource.description}</p>

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {resource.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 text-gray-500 border border-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Access link */}
          <div className="flex items-center justify-between pt-5 border-t border-gray-100 mt-auto">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-xs font-bold text-oxford-600 hover:text-amber-500 transition-colors"
              >
                {resource.fileUrl ? <Download className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                {resource.fileUrl ? "Download" : "Access Resource"}
              </a>
            ) : (
              <span className="text-xs font-medium text-gray-400">Not yet available</span>
            )}
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 group-hover:translate-x-1.5 transition-all" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
