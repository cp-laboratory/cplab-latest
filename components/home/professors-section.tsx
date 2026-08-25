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
    <section id="professors" className="section-pad bg-white">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs text-oxford-600 uppercase tracking-widest font-bold mb-4">Leadership</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            Faculty &{" "}
            <span className="text-oxford-800">Researchers</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
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
                  className={`group academic-card h-full ${
                    isSolo
                      ? "p-6 sm:p-7 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start text-center sm:text-left"
                      : "p-5 flex flex-col sm:flex-row gap-5"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`rounded-lg shrink-0 bg-oxford-50 border border-oxford-100 flex items-center justify-center font-bold text-oxford-800 overflow-hidden shadow-sm ${
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
                      <h3 className={`font-bold text-gray-900 group-hover:text-oxford-800 transition-colors leading-tight ${isSolo ? "text-2xl" : "text-lg"}`}>
                        {prof.name}
                      </h3>
                      {!isSolo && (
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-oxford-600 group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
                      )}
                    </div>
                    <p className={`text-oxford-600 font-semibold mb-3 ${isSolo ? "text-base" : "text-sm"}`}>{prof.designation}</p>
                    <p className={`text-gray-600 leading-relaxed mb-4 ${isSolo ? "text-base" : "text-sm line-clamp-3"}`}>{prof.bio}</p>

                    {/* Research interests */}
                    {prof.researchInterests && (
                      <div className={`flex flex-wrap gap-2 mb-4 ${isSolo ? "justify-center sm:justify-start" : ""}`}>
                        {(isSolo ? prof.researchInterests : prof.researchInterests.slice(0, 3)).map((interest) => (
                          <span
                            key={interest}
                            className="px-2.5 py-0.5 rounded font-medium text-xs bg-oxford-50 text-oxford-800 border border-oxford-100"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className={`flex items-center gap-4 ${isSolo ? "justify-center sm:justify-start" : ""}`}>
                      {prof.email && (
                        <a
                          href={`mailto:${prof.email}`}
                          className="text-sm font-medium text-gray-500 hover:text-oxford-800 flex items-center gap-1.5 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Mail className="w-4 h-4" /> Email
                        </a>
                      )}
                      {prof.googleScholar && (
                        <a
                          href={prof.googleScholar}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-gray-500 hover:text-oxford-800 flex items-center gap-1.5 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" /> Scholar
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            View Full Team
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
