"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white pattern-bg pt-20"
    >
      <div className="container-xl relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Column: Text Content */}
        <div className="flex flex-col items-start text-left max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-oxford-50 border border-oxford-100 text-xs font-semibold text-oxford-800 uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              Advancing Cyber-Physical Systems
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
              Cyber Physical <br />
              <span className="text-oxford-800">Laboratory</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-600 mb-10 leading-relaxed border-l-4 border-amber-500 pl-4"
          >
            Dedicated to exploring cutting-edge research in Application Development, Machine Learning,
            Blockchain, IoT, and emerging technologies that shape the future of
            cyber-physical systems.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/team"
              id="hero-meet-team"
              className="flex items-center gap-2 px-6 py-3 rounded bg-oxford-800 text-white font-medium hover:bg-oxford-700 transition-colors shadow-sm"
            >
              <Users className="w-4 h-4" />
              Meet Our Team
            </Link>
            <Link
              href="/publications"
              id="hero-view-publications"
              className="flex items-center gap-2 px-6 py-3 rounded bg-white text-oxford-800 border border-oxford-200 font-medium hover:bg-oxford-50 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              View Publications
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Visual/Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative lg:h-full flex items-center justify-center lg:justify-end"
        >
          <div className="w-full max-w-md academic-card p-8 relative overflow-hidden bg-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-16 -mt-16 z-0"></div>
            
            <h3 className="relative z-10 text-xl font-serif font-bold text-gray-900 mb-6 border-b pb-4">
              Our Research Focus
            </h3>
            
            <ul className="relative z-10 space-y-4">
              {[
                "Application Development & Engineering",
                "Applied Machine Learning & AI",
                "Blockchain Technologies",
                "Internet of Things (IoT)",
                "Edge Computing Architectures",
              ].map((area, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 bg-oxford-100 p-1 rounded">
                    <ArrowRight className="w-3 h-3 text-oxford-800" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{area}</span>
                </li>
              ))}
            </ul>

            <div className="relative z-10 mt-8 pt-6 border-t flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold text-oxford-800">20+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mt-1">Active Projects</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-500">50+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mt-1">Publications</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
