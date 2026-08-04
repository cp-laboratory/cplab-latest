"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function RecruitmentBanner() {
  return (
    <section id="recruitment" className="section-pad">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-jade-600/30 via-jade-900/20 to-jade-900/40" />
          <div className="absolute inset-0 grid-bg opacity-20" />

          {/* Glow orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-jade-500/20 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-jade-800/20 blur-[60px] pointer-events-none" />

          {/* Border */}
          <div className="absolute inset-0 rounded-3xl border border-jade-500/20" />

          <div className="relative z-10 px-8 py-16 sm:px-16 flex flex-col sm:flex-row items-center justify-between gap-8">
            {/* Text */}
            <div className="max-w-lg text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-jade-500/10 border border-jade-500/20 text-jade-400 text-xs font-medium mb-6">
                <Sparkles className="w-3.5 h-3.5" /> Now Recruiting — 2024 Cohort
              </div>
              <h2 className="text-3xl sm:text-4xl font-medium text-white mb-4">
                Ready to Push the{" "}
                <span className="gradient-text">Boundaries of Science?</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                Join CPLAB as a researcher or student collaborator. We offer hands-on
                research experience, mentorship from leading faculty, and access to
                cutting-edge lab infrastructure.
              </p>

              <div className="flex flex-wrap gap-4 mt-6 justify-center sm:justify-start">
                {["BSc Thesis", "MSc Research", "PhD Positions", "Industrial Projects"].map(
                  (t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs text-white/60 border border-white/10"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-4 shrink-0">
              <Link
                href="/recruitment"
                id="recruitment-banner-cta"
                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-jade-500 to-jade-900 text-white font-semibold hover:opacity-90 transition-all shadow-2xl shadow-jade-500/30 hover:scale-105"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-xs text-white/30">Applications close March 31, 2024</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
