"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { TeamMember } from "@/lib/types";
import { sortByHierarchy } from "@/lib/data/team";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS } from "@/lib/firestore";
import { Mail, ExternalLink, ChevronRight, Loader2, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

type FilterType = "all" | "professor" | "student" | "alumni" | "scholar";

const filters: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Faculty", value: "professor" },
  { label: "Students", value: "student" },
  { label: "Alumni", value: "alumni" },
];

export default function TeamPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const { data, loading } = useLiveCollection<TeamMember>(COLLECTIONS.team);
  const teamMembers = sortByHierarchy(data);

  const professors = teamMembers.filter((m) => m.memberType === "professor");
  const students = teamMembers.filter((m) => m.memberType === "student");
  const alumni = teamMembers.filter((m) => m.memberType === "alumni");

  const show = (type: FilterType) => filter === "all" || filter === type;

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
            <p className="text-xs text-amber-400 uppercase tracking-widest font-bold mb-4">The People</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Our <span className="text-amber-400">Team</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Meet the brilliant minds driving innovation in cyber-physical systems,
              AI, and blockchain research at CPLAB.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="pb-24 -mt-8 relative z-20">
        <div className="container-xl">
          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            {filters.map((f) => (
              <button
                key={f.value}
                id={`team-filter-${f.value}`}
                onClick={() => setFilter(f.value)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  filter === f.value
                    ? "bg-amber-500 text-oxford-900 shadow-md shadow-amber-500/20"
                    : "bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 shadow-sm"
                }`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>

          {loading && (
            <div className="flex justify-center py-24">
              <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
          )}

          {/* Faculty Section */}
          {show("professor") && professors.length > 0 && (
            <section className="mb-20">
              <SectionTitle title="Faculty & Researchers" />
              <div className={professors.length === 1 ? "" : "grid grid-cols-1 md:grid-cols-2 gap-8"}>
                {professors.map((m, i) => (
                  <ProfessorCard key={m.id} member={m} index={i} solo={professors.length === 1} />
                ))}
              </div>
            </section>
          )}

          {/* Students Section */}
          {show("student") && students.length > 0 && (
            <section className="mb-20">
              <SectionTitle title="Current Students" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.map((m, i) => (
                  <StudentCard key={m.id} member={m} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* Alumni Section */}
          {show("alumni") && alumni.length > 0 && (
            <section>
              <SectionTitle title="Alumni" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {alumni.map((m, i) => (
                  <StudentCard key={m.id} member={m} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-10 flex items-center gap-4"
    >
      <span className="w-1.5 h-8 rounded bg-amber-500 inline-block shadow-sm" />
      {title}
    </motion.h2>
  );
}

function ProfessorCard({ member, index, solo = false }: { member: TeamMember; index: number; solo?: boolean }) {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="h-full"
    >
      <div onClick={() => router.push(`/team/${member.slug}`)} className="cursor-pointer h-full">
        <div
          className={`group academic-card rounded-2xl h-full bg-white ${
            solo
              ? "p-8 sm:p-10 flex flex-col sm:flex-row gap-8 sm:gap-10 items-center sm:items-start text-center sm:text-left"
              : "p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left"
          }`}
        >
          <div
            className={`rounded-xl bg-oxford-50 border border-oxford-100 flex items-center justify-center font-bold text-oxford-800 shrink-0 overflow-hidden shadow-sm ${
              solo ? "w-40 h-40 sm:w-48 sm:h-48 text-6xl" : "w-32 h-32 sm:w-36 sm:h-36 text-5xl"
            }`}
          >
            {member.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            ) : (
              member.name.charAt(0)
            )}
          </div>
          <div className="flex-1 min-w-0 flex flex-col h-full">
            <div className={`flex items-start justify-between gap-2 mb-2 ${solo ? "sm:justify-start" : "sm:justify-between"}`}>
              <h3 className={`font-serif font-bold text-gray-900 group-hover:text-amber-600 transition-colors leading-snug ${solo ? "text-3xl" : "text-xl"}`}>
                {member.name}
              </h3>
              {!solo && (
                <ChevronRight className="hidden sm:block w-5 h-5 text-gray-300 group-hover:text-amber-500 group-hover:translate-x-1.5 transition-all shrink-0 mt-1" />
              )}
            </div>
            <p className={`text-oxford-600 font-bold mb-4 ${solo ? "text-lg" : "text-base"}`}>{member.designation}</p>
            <p className={`text-gray-600 mb-6 flex-1 ${solo ? "text-lg leading-relaxed" : "text-sm leading-relaxed line-clamp-3"}`}>{member.bio}</p>
            
            {member.researchInterests && (
              <div className={`flex flex-wrap gap-2 mb-6 ${solo ? "justify-center sm:justify-start" : "justify-center sm:justify-start"}`}>
                {(solo ? member.researchInterests : member.researchInterests.slice(0, 3)).map((r) => (
                  <span key={r} className="px-3 py-1 rounded-lg text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-200">
                    {r}
                  </span>
                ))}
              </div>
            )}
            
            <div className={`flex items-center gap-4 pt-4 border-t border-gray-100 ${solo ? "justify-center sm:justify-start mt-auto" : "justify-center sm:justify-start mt-auto"}`}>
              {member.email && (
                <a href={`mailto:${member.email}`} onClick={(e) => e.stopPropagation()} className="p-2 rounded bg-gray-50 text-gray-400 hover:text-oxford-600 hover:bg-oxford-50 transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              )}
              {member.github && (
                <a href={member.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 rounded bg-gray-50 text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                  <GithubIcon />
                </a>
              )}
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 rounded bg-gray-50 text-gray-400 hover:text-oxford-600 hover:bg-blue-50 transition-colors">
                  <LinkedinIcon />
                </a>
              )}
              {member.googleScholar && (
                <a href={member.googleScholar} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 rounded bg-gray-50 text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StudentCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <Link href={`/team/${member.slug}`}>
        <div className="group academic-card rounded-2xl p-5 flex items-center gap-5 h-full bg-white">
          <div className="w-24 h-24 rounded-xl shrink-0 bg-oxford-50 border border-oxford-100 flex items-center justify-center text-3xl font-bold text-oxford-800 overflow-hidden shadow-sm">
            {member.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            ) : (
              member.name.charAt(0)
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-serif font-bold text-gray-900 text-lg mb-1 group-hover:text-amber-600 transition-colors line-clamp-1">
              {member.name}
            </h3>
            <p className="text-sm font-medium text-oxford-600 line-clamp-2">{member.designation}</p>
            {member.memberType === "alumni" && (
              <span className="inline-block mt-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Alumni
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
