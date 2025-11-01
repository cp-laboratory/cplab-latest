"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail("")
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  return (
    <section className="relative w-full py-12 md:py-20">
      <div className="mx-auto max-w-4xl rounded-[40px] border border-black/5 dark:border-white/20 p-2 shadow-sm">
        <div className="relative mx-auto overflow-hidden rounded-[38px] border border-black/5 dark:border-white/20 bg-primary p-8 md:p-12 shadow-sm">
          {/* Subtle radial glow from center */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255, 255, 255, 0.1), transparent 70%)",
            }}
          />

          {/* Film grain overlay */}
          <div
            className="absolute inset-0 z-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Updated</h2>
              <p className="text-white/70 mb-8 text-lg">
                Subscribe to our newsletter for the latest research insights and lab updates.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-6 py-3 rounded-full bg-white text-primary font-semibold hover:bg-white/90 transition-colors whitespace-nowrap"
                >
                  {isSubmitted ? "Subscribed!" : "Subscribe"}
                </motion.button>
              </form>

              {isSubmitted && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/70 text-sm mt-4">
                  Thank you for subscribing!
                </motion.p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
