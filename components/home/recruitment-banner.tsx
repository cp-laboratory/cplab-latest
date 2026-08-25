"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function RecruitmentBanner() {
  return (
    <section id="recruitment" className="section-pad bg-white">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-xl bg-oxford-900 shadow-xl"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 pattern-bg opacity-10" />

          <div className="relative z-10 px-8 py-16 sm:px-16 flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Text */}
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" /> Now Recruiting — 2027 Cohort
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
                Join Us in Shaping the Next Generation of Research and Innovation
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Join CPLAB as a researcher or student collaborator. We offer hands-on
                research experience, mentorship from leading faculty, and access to
                cutting-edge lab infrastructure.
              </p>

              <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
                {["BSc Thesis", "MSc Research", "PhD Positions", "Industrial Projects"].map(
                  (t) => (
                    <span
                      key={t}
                      className="px-4 py-1.5 rounded text-xs font-medium text-white bg-white/10 border border-white/20"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center lg:items-end gap-4 shrink-0">
              <Link
                href="/recruitment"
                id="recruitment-banner-cta"
                className="group flex items-center gap-2 px-8 py-4 rounded bg-amber-500 text-oxford-900 font-bold hover:bg-amber-400 transition-colors shadow-lg"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-sm text-gray-400 font-medium">Applications open for Spring 2027 Intake.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
