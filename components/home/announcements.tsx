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
    <section id="announcements" className="section-pad">
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs text-jade-400 uppercase tracking-widest font-medium mb-4">Stay Updated</p>
            <h2 className="text-3xl sm:text-4xl font-medium text-white mb-6">
              Notices &{" "}
              <span className="gradient-text">Announcements</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Important updates, deadlines, and announcements from the
              Cyber Physical Laboratory.
            </p>
          </motion.div>

          {/* Announcements List */}
          <div className="space-y-3">
            {announcements.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <div className="group glass-hover rounded-xl p-4 flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-lg bg-jade-500/10 border border-jade-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Bell className="w-4 h-4 text-jade-400" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-white text-sm leading-tight">
                        {item.title}
                      </h4>
                      {item.link && (
                        <a
                          href={item.link}
                          className="shrink-0 text-jade-400 hover:text-jade-300 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-white/40 text-xs mt-1 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <CalendarDays className="w-3 h-3 text-white/30" />
                      <span className="text-xs text-white/30">
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
