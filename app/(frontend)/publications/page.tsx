"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface Publication {
  id: string
  title?: string
  publicationType?: string
  year?: number
  authors?: Array<{
    author?: {
      firstName?: string
      lastName?: string
    }
    externalAuthor?: string
  }>
  venue?: string
  abstract?: string
  doi?: string
  url?: string
  status?: string
}

const publicationTypeLabels: Record<string, string> = {
  journal: "Journal Article",
  conference: "Conference Paper",
  "book-chapter": "Book Chapter",
  "technical-report": "Technical Report",
  thesis: "Thesis/Dissertation",
  preprint: "Preprint",
}

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch("/api/publications?depth=2&limit=100")
        const data = await response.json()
        setPublications(data.docs || [])
      } catch (error) {
        console.error("Error fetching publications:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPublications()
  }, [])

  const types = ["All", "Journal Article", "Conference Paper", "Book Chapter", "Technical Report", "Thesis/Dissertation", "Preprint"]
  
  // Get unique years from publications, filtering out undefined
  const years = [
    "All", 
    ...Array.from(new Set(publications.map(pub => pub.year).filter((year): year is number => year !== undefined)))
      .sort((a, b) => b - a)
  ]

  const filteredPublications = publications.filter((pub) => {
    const pubTypeLabel = pub.publicationType ? (publicationTypeLabels[pub.publicationType] || pub.publicationType) : ""
    const typeMatch = !selectedType || selectedType === "All" || pubTypeLabel === selectedType
    const yearMatch = !selectedYear || selectedYear === 0 || pub.year === selectedYear
    return typeMatch && yearMatch
  })

  // Format authors string
  const formatAuthors = (authors?: Publication["authors"]) => {
    if (!authors || authors.length === 0) return "No authors listed"
    
    return authors
      .map((author) => {
        if (author?.author) {
          const firstName = author.author.firstName || ""
          const lastName = author.author.lastName || ""
          return `${firstName} ${lastName}`.trim() || "Unknown"
        }
        return author?.externalAuthor || "Unknown"
      })
      .filter(name => name !== "Unknown")
      .join(", ") || "No authors listed"
  }

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
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading publications...</p>
              </div>
            ) : filteredPublications.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No publications found.</p>
              </div>
            ) : (
              filteredPublications.map((pub, index) => (
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
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {pub.title || "Untitled Publication"}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {formatAuthors(pub.authors)}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {pub.publicationType && (
                          <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                            {publicationTypeLabels[pub.publicationType] || pub.publicationType}
                          </span>
                        )}
                        {pub.year && (
                          <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium">
                            {pub.year}
                          </span>
                        )}
                        {pub.status && (
                          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 text-xs font-medium capitalize">
                            {pub.status}
                          </span>
                        )}
                      </div>
                    </div>

                    {pub.venue && (
                      <p className="text-sm text-muted-foreground mb-3">
                        <span className="font-medium">Venue:</span> {pub.venue}
                      </p>
                    )}
                    
                    {pub.abstract && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {pub.abstract}
                      </p>
                    )}

                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex gap-3">
                        {pub.doi && (
                          <a
                            href={`https://doi.org/${pub.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                          >
                            DOI: {pub.doi}
                          </a>
                        )}
                        {pub.url && (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                          >
                            <span>View Publication</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
