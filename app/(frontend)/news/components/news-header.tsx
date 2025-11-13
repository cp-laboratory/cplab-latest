"use client"

import { motion } from "framer-motion"

export default function NewsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">Lab News & Updates</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Stay updated with the latest news, achievements, and announcements from our laboratory.
      </p>
    </motion.div>
  )
}
