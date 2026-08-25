"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Publication } from "@/lib/types";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS } from "@/lib/firestore";
import { Search, BookOpen, ExternalLink, Users, Loader2 } from "lucide-react";

type TypeFilter = "all" | "journal" | "conference" | "book-chapter" | "workshop";
const typeOptions: { label: string; value: TypeFilter }[] = [
  { label: "All", value: "all" },
  { label: "Journal", value: "journal" },
  { label: "Conference", value: "conference" },
  { label: "Book Chapter", value: "book-chapter" },
];

const typeBadgeColors: Record<string, string> = {
  journal: "bg-oxford-50 text-oxford-700 border-oxford-200",
  conference: "bg-amber-50 text-amber-700 border-amber-200",
  "book-chapter": "bg-emerald-50 text-emerald-700 border-emerald-200",
  workshop: "bg-blue-50 text-blue-700 border-blue-200",
};

export default function PublicationsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [yearFilter, setYearFilter] = useState("all");
  const { data: publications, loading } = useLiveCollection<Publication>(COLLECTIONS.publications, {
    orderByField: "year",
    orderDirection: "desc",
  });

  const years = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);

  const filtered = publications.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.authors.some((a) => a.toLowerCase().includes(search.toLowerCase())) ||
      p.keywords.some((k) => k.toLowerCase().includes(search.toLowerCase()));
    const matchType = typeFilter === "all" || p.type === typeFilter;
    const matchYear = yearFilter === "all" || p.year === Number(yearFilter);
    return matchSearch && matchType && matchYear;
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
            <p className="text-xs text-amber-400 uppercase tracking-widest font-bold mb-4">Research Output</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Our <span className="text-amber-400">Publications</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Research papers, conference proceedings, and book chapters published by CPLAB researchers.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="pb-24 -mt-10 relative z-20">
        <div className="container-xl">
          {/* Filters Floating Above Hero */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="academic-card rounded-2xl p-5 mb-12 flex flex-col sm:flex-row gap-5 items-start sm:items-center bg-white shadow-xl shadow-oxford-900/5"
          >
            {/* Search */}
            <div className="relative flex-1 w-full sm:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="pub-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, author, keyword..."
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              {/* Type filter */}
              <div className="flex gap-2 flex-wrap">
                {typeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    id={`pub-filter-${opt.value}`}
                    onClick={() => setTypeFilter(opt.value)}
                    className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      typeFilter === opt.value
                        ? "bg-amber-500 text-oxford-900 shadow-sm"
                        : "bg-gray-50 text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent hover:border-gray-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Year filter */}
              <select
                id="pub-year-filter"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 focus:outline-none focus:border-amber-400 transition-colors cursor-pointer hover:bg-gray-100"
              >
                <option value="all">All Years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              {filtered.length} publication{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {loading && (
            <div className="flex justify-center py-24">
              <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
          )}

          {/* Publications List */}
          <div className="space-y-6">
            {filtered.map((pub, i) => (
              <PublicationCard key={pub.id} pub={pub} index={i} />
            ))}
            {!loading && filtered.length === 0 && (
              <div className="text-center py-24 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No publications found</h3>
                <p className="text-gray-500">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function PublicationCard({ pub, index }: { pub: Publication; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <div className="academic-card rounded-xl p-5 sm:p-6 bg-white group">
        {/* Top row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 rounded-lg text-xs font-bold border capitalize ${
              typeBadgeColors[pub.type]
            }`}
          >
            {pub.type.replace("-", " ")}
          </span>
          <span className="px-3 py-1 rounded-lg text-xs font-bold text-gray-500 bg-gray-50 border border-gray-200">
            {pub.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-3 leading-snug group-hover:text-oxford-600 transition-colors">{pub.title}</h3>

        {/* Authors */}
        <div className="flex items-start gap-2.5 mb-3">
          <Users className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed font-medium">{pub.authors.join(", ")}</p>
        </div>

        {/* Venue */}
        <p className="text-xs font-bold text-oxford-600 mb-4 bg-oxford-50 inline-block px-2.5 py-1 rounded-md border border-oxford-100">{pub.venue}</p>

        {/* Abstract toggle */}
        {pub.abstract && (
          <div className="mb-4">
            <div 
              className={`prose prose-sm max-w-none prose-gray ${!expanded ? "line-clamp-2" : ""}`}
              dangerouslySetInnerHTML={{ __html: pub.abstract }}
            />
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-bold text-oxford-600 hover:text-amber-500 transition-colors mt-2 uppercase tracking-wider"
            >
              {expanded ? "Show less" : "Read full abstract"}
            </button>
          </div>
        )}

        {/* Keywords */}
        <div className="flex flex-wrap gap-2 mb-4">
          {pub.keywords.map((k) => (
            <span key={k} className="px-2 py-0.5 rounded text-[11px] font-medium bg-gray-50 text-gray-500 border border-gray-200">
              {k}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          {pub.doi && (
            <a
              href={`https://doi.org/${pub.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-oxford-600 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> DOI
            </a>
          )}
          {pub.arxiv && (
            <a
              href={pub.arxiv}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-amber-500 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> arXiv
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
