"use client";

import { motion } from "framer-motion";
import type { TeamMember } from "@/lib/types";
import { sortByHierarchy } from "@/lib/data/team";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS } from "@/lib/firestore";
import { Mail, ExternalLink, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfessorsSection() {
  const router = useRouter();
  const { data } = useLiveCollection<TeamMember>(COLLECTIONS.team);
  const professors = sortByHierarchy(data).filter((m) => m.memberType === "professor");
  const isSolo = professors.length === 1;

  if (professors.length === 0) return null;

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
          <p className="text-xs text-jade-400 uppercase tracking-widest font-medium mb-4">Leadership</p>
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
        <div className={isSolo ? "mb-12" : "grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"}>
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
                <div
                  className={`group glass-hover rounded-xl h-full ${
                    isSolo
                      ? "p-6 sm:p-7 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start text-center sm:text-left"
                      : "p-5 flex flex-col sm:flex-row gap-5"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`rounded-lg shrink-0 bg-gradient-to-br from-jade-500/20 to-jade-800/20 border border-white/10 flex items-center justify-center font-medium text-jade-400 overflow-hidden ${
                      isSolo ? "w-36 h-36 sm:w-44 sm:h-44 text-5xl" : "w-28 h-28 sm:w-32 sm:h-32 text-4xl"
                    }`}
                  >
                    {prof.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={prof.image} alt={prof.name} className="w-full h-full object-cover" />
                    ) : (
                      prof.name.charAt(0)
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className={`flex items-start justify-between gap-2 mb-1 ${isSolo ? "sm:justify-start" : ""}`}>
                      <h3 className={`font-medium text-white group-hover:text-jade-400 transition-colors leading-tight ${isSolo ? "text-2xl" : "text-lg"}`}>
                        {prof.name}
                      </h3>
                      {!isSolo && (
                        <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-jade-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                      )}
                    </div>
                    <p className={`text-jade-400 font-medium mb-3 ${isSolo ? "text-base" : "text-sm"}`}>{prof.designation}</p>
                    <p className={`text-white/50 leading-relaxed mb-4 ${isSolo ? "text-base" : "text-sm line-clamp-3"}`}>{prof.bio}</p>

                    {/* Research interests */}
                    {prof.researchInterests && (
                      <div className={`flex flex-wrap gap-2 mb-3 ${isSolo ? "justify-center sm:justify-start" : ""}`}>
                        {(isSolo ? prof.researchInterests : prof.researchInterests.slice(0, 3)).map((interest) => (
                          <span
                            key={interest}
                            className="px-2.5 py-0.5 rounded-full text-xs bg-jade-500/10 text-jade-300 border border-jade-500/20"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className={`flex items-center gap-3 ${isSolo ? "justify-center sm:justify-start" : ""}`}>
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/10 text-white/60 font-medium text-sm hover:text-white hover:border-jade-500/30 transition-all"
          >
            View Full Team
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
