"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { teamMembers, TeamMember } from "@/lib/data/team";
import { Mail, ExternalLink, ChevronRight } from "lucide-react";
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

  const professors = teamMembers.filter((m) => m.memberType === "professor");
  const students = teamMembers.filter((m) => m.memberType === "student");
  const alumni = teamMembers.filter((m) => m.memberType === "alumni");

  const show = (type: FilterType) => filter === "all" || filter === type;

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
            className="text-center mb-12"
          >
            <p className="text-xs text-blue-400 uppercase tracking-widest font-medium mb-4">The People</p>
            <h1 className="text-3xl sm:text-4xl font-medium text-white mb-4">
              Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Meet the brilliant minds driving innovation in cyber-physical systems,
              AI, and blockchain research at CPLAB.
            </p>
          </motion.div>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-16"
          >
            {filters.map((f) => (
              <button
                key={f.value}
                id={`team-filter-${f.value}`}
                onClick={() => setFilter(f.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f.value
                    ? "bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/20"
                    : "glass border border-white/10 text-white/50 hover:text-white hover:border-white/20"
                }`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>

          {/* Faculty Section */}
          {show("professor") && professors.length > 0 && (
            <section className="mb-20">
              <SectionTitle title="Faculty & Researchers" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {professors.map((m, i) => (
                  <ProfessorCard key={m.id} member={m} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* Students Section */}
          {show("student") && students.length > 0 && (
            <section className="mb-20">
              <SectionTitle title="Current Students" />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
      className="text-2xl font-medium text-white mb-8 flex items-center gap-3"
    >
      <span className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-violet-600 inline-block" />
      {title}
    </motion.h2>
  );
}

function ProfessorCard({ member, index }: { member: TeamMember; index: number }) {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div onClick={() => router.push(`/team/${member.slug}`)} className="cursor-pointer">
        <div className="group glass-hover rounded-2xl p-6 flex gap-6 h-full">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center text-4xl font-medium text-blue-400 shrink-0">
            {member.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors leading-snug">
                {member.name}
              </h3>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
            </div>
            <p className="text-sm text-blue-400 font-medium mb-3">{member.designation}</p>
            <p className="text-sm text-white/50 line-clamp-2 mb-4">{member.bio}</p>
            {member.researchInterests && (
              <div className="flex flex-wrap gap-2 mb-3">
                {member.researchInterests.slice(0, 3).map((r) => (
                  <span key={r} className="px-2 py-0.5 rounded-full text-xs bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {r}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-3">
              {member.email && (
                <a href={`mailto:${member.email}`} onClick={(e) => e.stopPropagation()} className="text-white/30 hover:text-blue-400 transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              )}
              {member.github && (
                <a href={member.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-white/30 hover:text-white/70 transition-colors">
                  <GithubIcon />
                </a>
              )}
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-white/30 hover:text-blue-400 transition-colors">
                  <LinkedinIcon />
                </a>
              )}
              {member.googleScholar && (
                <a href={member.googleScholar} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-white/30 hover:text-amber-400 transition-colors">
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
    >
      <Link href={`/team/${member.slug}`}>
        <div className="group glass-hover rounded-2xl p-5 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/15 to-violet-500/15 border border-white/10 flex items-center justify-center text-2xl font-medium text-blue-400 mb-4 group-hover:scale-105 transition-transform">
            {member.name.charAt(0)}
          </div>
          <h3 className="font-medium text-white text-sm mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">
            {member.name}
          </h3>
          <p className="text-xs text-blue-400 mb-2">{member.designation}</p>
          {member.memberType === "alumni" && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Alumni
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
