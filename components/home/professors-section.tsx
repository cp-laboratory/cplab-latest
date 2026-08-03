"use client";

import { motion } from "framer-motion";
import { teamMembers } from "@/lib/data/team";
import { Mail, ExternalLink, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const professors = teamMembers.filter((m) => m.memberType === "professor");

export default function ProfessorsSection() {
  const router = useRouter();
  return (
    <section id="professors" className="section-pad">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs text-blue-400 uppercase tracking-widest font-medium mb-4">Leadership</p>
          <h2 className="text-3xl sm:text-4xl font-medium text-white mb-4">
            Faculty &{" "}
            <span className="gradient-text">Researchers</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Meet the principal investigators and faculty members leading our research
            agenda at CPLAB.
          </p>
        </motion.div>

        {/* Professor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {professors.map((prof, i) => (
            <motion.div
              key={prof.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                onClick={() => router.push(`/team/${prof.slug}`)}
                className="cursor-pointer"
              >
                <div className="group glass-hover rounded-2xl p-6 flex flex-col sm:flex-row gap-6 h-full">
                  {/* Avatar */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl shrink-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center text-4xl font-medium text-blue-400">
                    {prof.name.charAt(0)}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors leading-tight">
                        {prof.name}
                      </h3>
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                    </div>
                    <p className="text-sm text-blue-400 font-medium mb-3">{prof.designation}</p>
                    <p className="text-sm text-white/50 leading-relaxed line-clamp-3 mb-4">{prof.bio}</p>

                    {/* Research interests */}
                    {prof.researchInterests && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {prof.researchInterests.slice(0, 3).map((interest) => (
                          <span
                            key={interest}
                            className="px-2.5 py-0.5 rounded-full text-xs bg-blue-500/10 text-blue-300 border border-blue-500/20"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex items-center gap-3">
                      {prof.email && (
                        <a
                          href={`mailto:${prof.email}`}
                          className="text-xs text-white/40 hover:text-white/70 flex items-center gap-1 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Mail className="w-3 h-3" /> Email
                        </a>
                      )}
                      {prof.googleScholar && (
                        <a
                          href={prof.googleScholar}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-white/40 hover:text-white/70 flex items-center gap-1 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-3 h-3" /> Scholar
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link
            href="/team"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/10 text-white/60 font-medium text-sm hover:text-white hover:border-blue-500/30 transition-all"
          >
            View Full Team
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
