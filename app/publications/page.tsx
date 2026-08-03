"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { publications, Publication } from "@/lib/data/publications";
import { Search, BookOpen, ExternalLink, Users, Quote } from "lucide-react";

type TypeFilter = "all" | "journal" | "conference" | "book-chapter" | "workshop";
const typeOptions: { label: string; value: TypeFilter }[] = [
  { label: "All", value: "all" },
  { label: "Journal", value: "journal" },
  { label: "Conference", value: "conference" },
  { label: "Book Chapter", value: "book-chapter" },
];

const typeBadgeColors: Record<string, string> = {
  journal: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  conference: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "book-chapter": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  workshop: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export default function PublicationsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [yearFilter, setYearFilter] = useState("all");

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
    <div className="min-h-screen bg-[hsl(222_47%_6%)]">
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
            <p className="text-xs text-blue-400 uppercase tracking-widest font-medium mb-4">Research Output</p>
            <h1 className="text-3xl sm:text-4xl font-medium text-white mb-4">
              <span className="gradient-text">Publications</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Research papers, conference proceedings, and book chapters published by CPLAB researchers.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass rounded-2xl p-4 mb-10 flex flex-col sm:flex-row gap-4"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                id="pub-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, author, keyword..."
                className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm text-white placeholder-white/30 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>

            {/* Type filter */}
            <div className="flex gap-2 flex-wrap">
              {typeOptions.map((opt) => (
                <button
                  key={opt.value}
                  id={`pub-filter-${opt.value}`}
                  onClick={() => setTypeFilter(opt.value)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                    typeFilter === opt.value
                      ? "bg-blue-500 text-white"
                      : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10"
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
              className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white/70 focus:outline-none focus:border-blue-500/50 transition-colors"
            >
              <option value="all">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Results count */}
          <p className="text-sm text-white/30 mb-6">
            {filtered.length} publication{filtered.length !== 1 ? "s" : ""} found
          </p>

          {/* Publications List */}
          <div className="space-y-4">
            {filtered.map((pub, i) => (
              <PublicationCard key={pub.id} pub={pub} index={i} />
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-24 text-white/30">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No publications match your search.</p>
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
      <div className="glass-hover rounded-2xl p-6">
        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${
                typeBadgeColors[pub.type]
              }`}
            >
              {pub.type.replace("-", " ")}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs text-white/30 bg-white/5 border border-white/10">
              {pub.year}
            </span>
          </div>
          {pub.citations && (
            <div className="flex items-center gap-1 text-xs text-white/30">
              <Quote className="w-3 h-3" /> {pub.citations} citations
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium text-white mb-2 leading-snug">{pub.title}</h3>

        {/* Authors */}
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-3.5 h-3.5 text-white/30 shrink-0" />
          <p className="text-sm text-white/50">{pub.authors.join(", ")}</p>
        </div>

        {/* Venue */}
        <p className="text-sm text-blue-400 font-medium mb-4">{pub.venue}</p>

        {/* Abstract toggle */}
        {pub.abstract && (
          <>
            <p className={`text-sm text-white/40 leading-relaxed mb-3 ${!expanded ? "line-clamp-2" : ""}`}>
              {pub.abstract}
            </p>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors mb-4"
            >
              {expanded ? "Show less" : "Read abstract"}
            </button>
          </>
        )}

        {/* Keywords */}
        <div className="flex flex-wrap gap-2 mb-4">
          {pub.keywords.map((k) => (
            <span key={k} className="px-2.5 py-0.5 rounded-full text-xs bg-white/5 text-white/30 border border-white/10">
              {k}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
          {pub.doi && (
            <a
              href={`https://doi.org/${pub.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> DOI
            </a>
          )}
          {pub.arxiv && (
            <a
              href={pub.arxiv}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> arXiv
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
