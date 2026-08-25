"use client";

import { motion } from "framer-motion";
import type { NewsArticle } from "@/lib/types";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS } from "@/lib/firestore";
import { CalendarDays, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";

const categoryColors: Record<string, string> = {
  "Research Achievement": "bg-oxford-50 text-oxford-700 border-oxford-200",
  "Lab News": "bg-gray-100 text-gray-700 border-gray-200",
  "Project Update": "bg-blue-50 text-blue-700 border-blue-200",
  Recruitment: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function LatestNews() {
  const { data } = useLiveCollection<NewsArticle>(COLLECTIONS.news, {
    orderByField: "publishedDate",
    orderDirection: "desc",
    limitCount: 3,
  });
  const latest = data;

  if (latest.length === 0) return null;

  return (
    <section id="news" className="section-pad bg-gray-50 border-t border-gray-200">
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
            <p className="text-xs text-oxford-600 uppercase tracking-widest font-bold mb-4">Latest</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
              News &{" "}
              <span className="text-oxford-800">Updates</span>
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-oxford-800 transition-colors shrink-0"
          >
            All News <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latest.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/news/${article.slug}`}>
                <div className="group academic-card overflow-hidden h-full flex flex-col bg-white">
                  {/* Cover image */}
                  <div className="relative w-full aspect-video bg-gray-100 overflow-hidden shrink-0 border-b border-gray-100">
                    {article.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Tag className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {/* Category badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold border ${
                          categoryColors[article.category] ||
                          "bg-gray-100 text-gray-600 border-gray-200"
                        }`}
                      >
                        <Tag className="w-3 h-3" />
                        {article.category}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-oxford-600 group-hover:translate-x-1 transition-all" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-oxford-800 transition-colors line-clamp-2 flex-1">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-5">
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                      <CalendarDays className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-medium text-gray-500">
                        {new Date(article.publishedDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-xs font-medium text-gray-400 ml-auto">By {article.author}</span>
                    </div>
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
