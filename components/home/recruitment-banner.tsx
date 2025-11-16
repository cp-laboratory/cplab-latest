"use client"

import { motion } from "framer-motion"
import { ArrowRight, Users, Lightbulb, Award, Clock } from "lucide-react"
import Link from "next/link"

export function RecruitmentBanner() {
  return (
    <section className="relative w-full py-12 md:py-20">
      <div className="mx-auto max-w-7xl rounded-[40px] border border-black/5 dark:border-white/20 p-2 shadow-lg">
        <div className="relative mx-auto overflow-hidden rounded-[38px] border border-black/5 dark:border-white/20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-8 md:p-12 shadow-xl">
          {/* Animated background gradients */}
          <div
            className="absolute inset-0 z-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255, 255, 255, 0.2), transparent 70%)",
            }}
          />

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          {/* Film grain overlay */}
          <div
            className="absolute inset-0 z-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-block mb-4 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  🎓 Now Hiring
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Join Our Research Team
                </h2>
                <p className="text-white/90 text-lg mb-6 leading-relaxed">
                  We're looking for passionate researchers, graduate students, and undergraduates to
                  join our cutting-edge research projects. Work on innovative problems with
                  world-class mentors.
                </p>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/recruitment"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-full font-semibold hover:bg-white/90 transition-colors shadow-lg hover:shadow-xl group"
                  >
                    Apply Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Content - Benefits Grid */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Users className="w-8 h-8 text-white mb-3" />
                  <h3 className="text-white font-semibold mb-1">Collaborative</h3>
                  <p className="text-white/80 text-sm">Work with expert researchers</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Lightbulb className="w-8 h-8 text-white mb-3" />
                  <h3 className="text-white font-semibold mb-1">Innovative</h3>
                  <p className="text-white/80 text-sm">Cutting-edge research areas</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Award className="w-8 h-8 text-white mb-3" />
                  <h3 className="text-white font-semibold mb-1">Publications</h3>
                  <p className="text-white/80 text-sm">Publish in top conferences</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Clock className="w-8 h-8 text-white mb-3" />
                  <h3 className="text-white font-semibold mb-1">Flexible</h3>
                  <p className="text-white/80 text-sm">Part-time & full-time options</p>
                </div>
              </motion.div>
            </div>

            {/* Bottom Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 pt-8 border-t border-white/20 flex flex-wrap gap-8 justify-center lg:justify-start"
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white mb-1">Multiple</div>
                <div className="text-white/80 text-sm">Open Positions</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white mb-1">All Levels</div>
                <div className="text-white/80 text-sm">Undergrad to Postdoc</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-white/80 text-sm">Lab Access</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
