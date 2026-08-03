"use client";

import { motion } from "framer-motion";
import { newsArticles } from "@/lib/data/news";
import { CalendarDays, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";

const categoryColors: Record<string, string> = {
  "Research Achievement": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Lab News": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "Project Update": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Recruitment: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export default function LatestNews() {
  const latest = newsArticles.slice(0, 3);

  return (
    <section id="news" className="section-pad">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-xs text-blue-400 uppercase tracking-widest font-medium mb-4">Latest</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-white">
              News &{" "}
              <span className="gradient-text">Updates</span>
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors shrink-0"
          >
            All News <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/news/${article.slug}`}>
                <div className="group glass-hover rounded-2xl p-6 h-full flex flex-col">
                  {/* Category badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        categoryColors[article.category] ||
                        "bg-white/5 text-white/50 border-white/10"
                      }`}
                    >
                      <Tag className="w-3 h-3" />
                      {article.category}
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-medium text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors line-clamp-2 flex-1">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-white/50 leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <CalendarDays className="w-3.5 h-3.5 text-white/30" />
                    <span className="text-xs text-white/30">
                      {new Date(article.publishedDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-xs text-white/20 ml-auto">By {article.author}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
