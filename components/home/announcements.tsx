"use client";

import { motion } from "framer-motion";
import type { Announcement } from "@/lib/types";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS } from "@/lib/firestore";
import { Bell, ExternalLink, CalendarDays } from "lucide-react";

export default function Announcements() {
  const { data: announcements } = useLiveCollection<Announcement>(COLLECTIONS.announcements, {
    orderByField: "date",
    orderDirection: "desc",
    limitCount: 5,
  });

  if (announcements.length === 0) return null;

  return (
    <section id="announcements" className="section-pad bg-gray-50 border-t border-gray-200">
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs text-oxford-600 uppercase tracking-widest font-bold mb-4">Stay Updated</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-6">
              Notices &{" "}
              <span className="text-oxford-800">Announcements</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-amber-500 pl-4">
              Important updates, deadlines, and announcements from the
              Cyber Physical Laboratory.
            </p>
          </motion.div>

          {/* Announcements List */}
          <div className="space-y-4">
            {announcements.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <div className="group academic-card p-5 flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-oxford-50 border border-oxford-100 flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5 text-oxford-600" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-gray-900 text-base leading-tight">
                        {item.title}
                      </h4>
                      {item.link && (
                        <a
                          href={item.link}
                          className="shrink-0 text-oxford-600 hover:text-oxford-800 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <div 
                      className="prose prose-sm max-w-none prose-gray prose-a:text-amber-600 hover:prose-a:text-amber-500 mt-2 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                    <div className="flex items-center gap-1.5 mt-3">
                      <CalendarDays className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-medium text-gray-500">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
