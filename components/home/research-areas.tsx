"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

interface ResearchArea {
  title: string
  description: string
  icon: string
}

const defaultResearchAreas: ResearchArea[] = [
  {
    title: "Application Development",
    description: "Building scalable and efficient applications using modern frameworks and best practices.",
    icon: "💻",
  },
  {
    title: "Machine Learning",
    description: "Developing intelligent systems and algorithms for pattern recognition and prediction.",
    icon: "🤖",
  },
  {
    title: "Blockchain",
    description: "Exploring distributed ledger technologies and decentralized systems.",
    icon: "⛓️",
  },
  {
    title: "IoT & Sensors",
    description: "Integrating physical devices with digital systems for real-time data collection.",
    icon: "📡",
  },
  {
    title: "Cyber Security",
    description: "Protecting systems and data from cyber threats and vulnerabilities.",
    icon: "🔒",
  },
  {
    title: "Edge Computing",
    description: "Processing data closer to the source for reduced latency and improved performance.",
    icon: "🌐",
  },
]

export default function ResearchAreas() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [researchAreas, setResearchAreas] = useState<ResearchArea[]>(defaultResearchAreas)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResearchAreas = async () => {
      try {
        const response = await fetch('/api/research-areas', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch research areas')
        }
        
        const data = await response.json()
        if (Array.isArray(data) && data.length > 0) {
          setResearchAreas(data)
        }
      } catch (error) {
        console.error('Error fetching research areas:', error)
        // Keep default research areas on error
      } finally {
        setLoading(false)
      }
    }

    fetchResearchAreas()
  }, [])

  return (
    <section className="relative overflow-hidden py-12 sm:py-24 md:py-32">
      <div className="bg-primary absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none"></div>
      <div className="via-primary/50 absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all ease-in-out"></div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto flex flex-col items-center gap-12 px-4"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Research Areas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our laboratory focuses on cutting-edge research across multiple
            domains of cyber-physical systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {researchAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="text-4xl mb-4">{area.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {area.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {area.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
