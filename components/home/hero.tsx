"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";

const words = [];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg"
    >
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-jade-600/10 blur-[100px] orb-float pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-jade-900/10 blur-[100px] orb-float-delayed pulse-glow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-jade-500/5 blur-[80px] pointer-events-none" />

      {/* Radial overlay */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(63,164,130,0.08), transparent)" }} />

      <div className="container-xl relative z-10 flex flex-col items-center text-center pt-32 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-jade-500/20 text-sm text-jade-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-jade-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-jade-500" />
            </span>
            Advancing Cyber-Physical Systems
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white pb-2">
            Cyber Physical{" "}
            <span className="gradient-text">Laboratory</span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Exploring cutting-edge research in Application Development, Machine Learning,
          Blockchain, IoT, and emerging technologies that shape the future of
          cyber-physical systems.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <Link
            href="/team"
            id="hero-meet-team"
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-jade-500 to-jade-900 text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-jade-500/20 hover:shadow-jade-500/40 hover:scale-105"
          >
            <Users className="w-4 h-4" />
            Meet Our Team
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/publications"
            id="hero-view-publications"
            className="flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/10 text-white/70 font-medium text-sm hover:text-white hover:border-white/20 transition-all"
          >
            View Publications
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Research tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-xs text-white/30 uppercase tracking-widest">Our Research Focus</p>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl">
            {[
              "Application Development",
              "Machine Learning",
              "Blockchain",
              "IoT",
              "Cyber-Physical Systems",
              "Edge Computing",
            ].map((area) => (
              <span
                key={area}
                className="px-4 py-1.5 rounded-full text-xs font-medium text-white/50 border border-white/10 hover:border-jade-500/30 hover:text-white/70 transition-all cursor-default"
              >
                {area}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/20" />
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1.5 rounded-full bg-white/50"
          />
        </div>
      </motion.div>
    </section>
  );
}
