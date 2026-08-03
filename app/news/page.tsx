"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { newsArticles } from "@/lib/data/news";
import { CalendarDays, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";

const categoryColors: Record<string, string> = {
  "Research Achievement": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Lab News": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "Project Update": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Recruitment: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export default function NewsPage() {
  const featured = newsArticles.find((a) => a.featured);
  const rest = newsArticles.filter((a) => !a.featured);

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
            className="text-center mb-16"
          >
            <p className="text-xs text-blue-400 uppercase tracking-widest font-medium mb-4">
              What&apos;s Happening
            </p>
            <h1 className="text-3xl sm:text-4xl font-medium text-white mb-4">
              News &amp; <span className="gradient-text">Updates</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Stay up-to-date with research breakthroughs, project milestones, and lab
              announcements.
            </p>
          </motion.div>

          {/* Featured Article */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12"
            >
              <Link href={`/news/${featured.slug}`}>
                <div className="group glass-hover rounded-3xl p-8 sm:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-500/5 blur-[60px] pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        ⭐ Featured
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          categoryColors[featured.category] || "bg-white/5 text-white/50 border-white/10"
                        }`}
                      >
                        {featured.category}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-medium text-white mb-4 leading-snug group-hover:text-blue-400 transition-colors max-w-3xl">
                      {featured.title}
                    </h2>
                    <p className="text-white/50 text-lg leading-relaxed max-w-3xl mb-6">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm text-white/30">
                        <CalendarDays className="w-4 h-4" />
                        {new Date(featured.publishedDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                        <span>·</span>
                        <span>{featured.author}</span>
                      </div>
                      <span className="flex items-center gap-2 text-blue-400 font-medium text-sm group-hover:gap-3 transition-all">
                        Read More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* All Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
              >
                <Link href={`/news/${article.slug}`}>
                  <div className="group glass-hover rounded-2xl p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          categoryColors[article.category] || "bg-white/5 text-white/50 border-white/10"
                        }`}
                      >
                        <Tag className="w-3 h-3" /> {article.category}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors line-clamp-2 flex-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-white/50 line-clamp-2 mb-4">{article.excerpt}</p>
                    <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                      <CalendarDays className="w-3.5 h-3.5 text-white/30" />
                      <span className="text-xs text-white/30">
                        {new Date(article.publishedDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
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
