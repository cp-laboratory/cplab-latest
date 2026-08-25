"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { NewsArticle } from "@/lib/types";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS } from "@/lib/firestore";
import { CalendarDays, Tag, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

const categoryColors: Record<string, string> = {
  "Research Achievement": "bg-oxford-50 text-oxford-700 border-oxford-200",
  "Lab News": "bg-amber-50 text-amber-700 border-amber-200",
  "Project Update": "bg-blue-50 text-blue-700 border-blue-200",
  Recruitment: "bg-purple-50 text-purple-700 border-purple-200",
};

export default function NewsPage() {
  const { data: newsArticles, loading } = useLiveCollection<NewsArticle>(COLLECTIONS.news, {
    orderByField: "publishedDate",
    orderDirection: "desc",
  });
  const featured = newsArticles.find((a) => a.featured);
  const rest = newsArticles.filter((a) => !a.featured);

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
              What&apos;s Happening
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              News &amp; <span className="text-amber-400">Updates</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Stay up-to-date with research breakthroughs, project milestones, and lab
              announcements.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="pb-24 -mt-10 relative z-20">
        <div className="container-xl">
          {/* Featured Article Floating Above Hero */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-16"
            >
              <Link href={`/news/${featured.slug}`}>
                <div className="group academic-card rounded-2xl overflow-hidden relative bg-white shadow-xl shadow-oxford-900/5 flex flex-col md:flex-row h-auto md:h-[400px]">
                  {featured.coverImage && (
                    <div className="w-full md:w-2/5 shrink-0 bg-oxford-50 border-b md:border-b-0 md:border-r border-gray-100 overflow-hidden relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={featured.coverImage}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out absolute inset-0"
                      />
                    </div>
                  )}
                  <div className="p-8 sm:p-10 relative overflow-hidden flex flex-col flex-1 justify-center">
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-500/5 blur-[60px] pointer-events-none" />
                    <div className="relative z-10">
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200">
                          ⭐ Featured
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${
                            categoryColors[featured.category] || "bg-gray-50 text-gray-600 border-gray-200"
                          }`}
                        >
                          {featured.category}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 leading-snug group-hover:text-amber-600 transition-colors max-w-3xl">
                        {featured.title}
                      </h2>
                      <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mb-8 line-clamp-3">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm font-bold text-gray-400">
                          <div className="flex items-center gap-1.5">
                            <CalendarDays className="w-4 h-4" />
                            {new Date(featured.publishedDate).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                          <span className="hidden sm:inline">·</span>
                          <span className="hidden sm:inline">{featured.author}</span>
                        </div>
                        <span className="flex items-center gap-2 text-oxford-600 font-bold text-sm group-hover:text-amber-500 group-hover:gap-3 transition-all">
                          Read More <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {loading && (
            <div className="flex justify-center py-24">
              <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
          )}

          {/* All Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                className="h-full"
              >
                <Link href={`/news/${article.slug}`}>
                  <div className="group academic-card rounded-2xl overflow-hidden h-full flex flex-col bg-white">
                    {/* Conditionally rendered cover image to remove ugly placeholder */}
                    {article.coverImage && (
                      <div className="relative w-full aspect-video bg-oxford-50 overflow-hidden shrink-0 border-b border-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>
                    )}
                    
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                            categoryColors[article.category] || "bg-gray-50 text-gray-600 border-gray-200"
                          }`}
                        >
                          <Tag className="w-3.5 h-3.5" /> {article.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 leading-snug group-hover:text-amber-600 transition-colors line-clamp-3 flex-1">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3 mb-6">{article.excerpt}</p>
                      
                      <div className="flex items-center justify-between pt-5 border-t border-gray-100 mt-auto">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                          <CalendarDays className="w-4 h-4" />
                          <span>
                            {new Date(article.publishedDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 group-hover:translate-x-1.5 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
