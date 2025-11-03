"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

interface Highlight {
  number: string
  label: string
  description: string
}

const defaultHighlights: Highlight[] = [
  {
    number: "50+",
    label: "Research Papers",
    description: "Published in top-tier conferences and journals",
  },
  {
    number: "15+",
    label: "Active Projects",
    description: "Ongoing research initiatives",
  },
  {
    number: "30+",
    label: "Team Members",
    description: "Professors and research students",
  },
  {
    number: "100+",
    label: "Citations",
    description: "Impact on the research community",
  },
]

export default function LabHighlights() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [highlights, setHighlights] = useState<Highlight[]>(defaultHighlights)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const response = await fetch('/api/public-lab-highlights', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch lab highlights')
        }
        
        const data = await response.json()
        if (Array.isArray(data) && data.length > 0) {
          setHighlights(data)
        }
      } catch (error) {
        console.error('Error fetching lab highlights:', error)
        // Keep default highlights on error
      } finally {
        setLoading(false)
      }
    }

    fetchHighlights()
  }, [])

  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="bg-primary absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none"></div>
      <div className="via-primary/50 absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all ease-in-out"></div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Lab Highlights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our achievements and contributions to the field of cyber-physical
            systems research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-8 text-center hover:border-primary/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="text-5xl font-bold text-primary mb-2">
                  {highlight.number}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {highlight.label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {highlight.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
