"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const publications = [
  {
    id: 1,
    title: "Deep Learning Architectures for Real-time IoT Processing",
    authors: "Sarah Johnson, Michael Chen, Alex Kumar",
    type: "Conference Paper",
    venue: "IEEE IoT Conference 2024",
    year: 2024,
    abstract:
      "This paper presents novel deep learning architectures optimized for real-time processing on IoT devices with limited computational resources.",
    citations: 45,
  },
  {
    id: 2,
    title: "Blockchain-based Security Framework for Distributed Systems",
    authors: "Emily Rodriguez, Lisa Wang",
    type: "Journal Article",
    venue: "IEEE Transactions on Distributed Systems",
    year: 2024,
    abstract:
      "We propose a comprehensive security framework leveraging blockchain technology to protect distributed cyber-physical systems.",
    citations: 28,
  },
  {
    id: 3,
    title: "Edge Computing Optimization for Latency-Critical Applications",
    authors: "Michael Chen, James O'Brien",
    type: "Conference Paper",
    venue: "ACM Edge Computing Summit 2023",
    year: 2023,
    abstract:
      "This work addresses latency optimization in edge computing environments through intelligent resource allocation.",
    citations: 32,
  },
  {
    id: 4,
    title: "Federated Learning in Heterogeneous IoT Networks",
    authors: "Sarah Johnson, Alex Kumar",
    type: "Research Paper",
    venue: "arXiv Preprint",
    year: 2024,
    abstract:
      "We explore federated learning techniques for training models across heterogeneous IoT networks while preserving privacy.",
    citations: 15,
  },
  {
    id: 5,
    title: "Intrusion Detection Systems for Cyber-Physical Systems",
    authors: "Lisa Wang, Emily Rodriguez",
    type: "Conference Paper",
    venue: "IEEE Cybersecurity Conference 2023",
    year: 2023,
    abstract: "Novel approaches to detecting and mitigating intrusions in cyber-physical system architectures.",
    citations: 22,
  },
  {
    id: 6,
    title: "Microservices Architecture for Scalable CPS Applications",
    authors: "Alex Kumar, Sarah Johnson",
    type: "Journal Article",
    venue: "Journal of Systems Architecture",
    year: 2023,
    abstract:
      "Design patterns and best practices for building scalable microservices-based cyber-physical system applications.",
    citations: 18,
  },
]

export default function PublicationsPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  const types = ["All", "Conference Paper", "Journal Article", "Research Paper"]
  const years = ["All", 2024, 2023, 2022]

  const filteredPublications = publications.filter((pub) => {
    const typeMatch = !selectedType || selectedType === "All" || pub.type === selectedType
    const yearMatch = !selectedYear || selectedYear === 0 || pub.year === selectedYear
    return typeMatch && yearMatch
  })

  return (
    <div className="min-h-screen w-full relative bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #000000",
        }}
      />

      <Navbar />

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">Publications</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our research contributions to the field of cyber-physical systems.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Publication Type</label>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type === "All" ? null : type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        (type === "All" && !selectedType) || selectedType === type
                          ? "bg-primary text-primary-foreground"
                          : "border border-border/50 text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Year</label>
                <div className="flex flex-wrap gap-2">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year === "All" ? null : (year as number))}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        (year === "All" && !selectedYear) || selectedYear === year
                          ? "bg-primary text-primary-foreground"
                          : "border border-border/50 text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Publications List */}
          <div className="space-y-4">
            {filteredPublications.map((pub, index) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{pub.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{pub.authors}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                        {pub.type}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium">
                        {pub.year}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{pub.venue}</p>
                  <p className="text-sm text-muted-foreground mb-4">{pub.abstract}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{pub.citations} citations</span>
                    <button className="text-primary text-sm font-medium hover:text-primary/80 transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
