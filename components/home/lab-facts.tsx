"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const facts = [
  {
    number: "50+",
    label: "Research Projects",
    description: "Active research initiatives across multiple domains",
  },
  {
    number: "200+",
    label: "Publications",
    description: "Peer-reviewed papers and conference proceedings",
  },
  {
    number: "30+",
    label: "Team Members",
    description: "Professors, researchers, and graduate students",
  },
  {
    number: "15+",
    label: "Years of Excellence",
    description: "Pioneering cyber-physical systems research",
  },
]

export function LabFactsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="relative overflow-hidden py-12 sm:py-24 md:py-32">
      <div className="bg-primary absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none"></div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto flex flex-col items-center gap-12 px-4"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">By The Numbers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our impact and achievements in advancing cyber-physical systems research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {facts.map((fact, index) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10 text-center">
                <motion.div
                  className="text-5xl font-bold text-primary mb-2"
                  initial={{ scale: 0.5 }}
                  animate={isInView ? { scale: 1 } : { scale: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  {fact.number}
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{fact.label}</h3>
                <p className="text-muted-foreground text-sm">{fact.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
