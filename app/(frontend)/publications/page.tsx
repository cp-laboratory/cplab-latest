"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface Publication {
  id: string
  title?: string
  slug?: string
  publicationType?: string
  year?: number
  month?: string
  publishedDate?: string
  authors?: Array<{
    author?: {
      firstName?: string
      lastName?: string
      profileImage?: {
        url?: string
      }
    }
    externalAuthor?: string
    isCorresponding?: boolean
  }>
  venue?: {
    name?: string
    acronym?: string
    volume?: string
    issue?: string
    pages?: string
    location?: string
  }
  abstract?: string
  keywords?: string[]
  identifiers?: {
    doi?: string
    isbn?: string
    issn?: string
    arxivId?: string
    pubmedId?: string
  }
  links?: {
    publisher?: string
    repository?: string
    dataset?: string
    supplementary?: string
    presentation?: string
  }
  files?: Array<{
    file?: {
      url?: string
      filename?: string
    }
    fileType?: string
    label?: string
  }>
  featuredImage?: {
    url?: string
    alt?: string
  }
  metrics?: {
    citations?: number
    impactFactor?: number
    hIndex?: number
    downloads?: number
  }
  researchAreas?: string[]
  awards?: Array<{
    awardName?: string
    awardingBody?: string
    year?: number
  }>
  funding?: Array<{
    agency?: string
    grantNumber?: string
    amount?: string
  }>
  status?: string
  featured?: boolean
  openAccess?: boolean
  peerReviewed?: boolean
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
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch("/api/public-publications?depth=2&limit=100")
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

  // Format venue string
  const formatVenue = (venue?: Publication["venue"]) => {
    if (!venue) return null
    
    const parts: string[] = []
    
    // Add venue name and acronym
    if (venue.name) {
      parts.push(venue.acronym ? `${venue.name} (${venue.acronym})` : venue.name)
    }
    
    // Add volume and issue for journals
    if (venue.volume || venue.issue) {
      const volIssue: string[] = []
      if (venue.volume) volIssue.push(`Vol. ${venue.volume}`)
      if (venue.issue) volIssue.push(`No. ${venue.issue}`)
      if (volIssue.length > 0) parts.push(volIssue.join(', '))
    }
    
    // Add pages
    if (venue.pages) {
      parts.push(`pp. ${venue.pages}`)
    }
    
    // Add location for conferences
    if (venue.location) {
      parts.push(venue.location)
    }
    
    return parts.length > 0 ? parts.join(', ') : null
  }

  const types = ["All", "Journal Article", "Conference Paper", "Book Chapter", "Technical Report", "Thesis/Dissertation", "Preprint"]
  
  // Get unique years from publications, filtering out undefined
  const years = [
    "All", 
    ...Array.from(new Set(publications.map(pub => pub.year).filter((year): year is number => year !== undefined)))
      .sort((a, b) => b - a)
  ]

  const filteredPublications = publications.filter((pub) => {
    const matchesType = !selectedType || pub.publicationType === selectedType
    const matchesYear = !selectedYear || pub.year === selectedYear
    const matchesSearch = !searchQuery || 
      pub.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.abstract?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.keywords?.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      formatAuthors(pub.authors).toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesYear && matchesSearch
  })

  // Pagination
  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedPublications = filteredPublications.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedType, selectedYear, searchQuery])

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
        <div className="max-w-7xl mx-auto px-4 py-24 sm:py-32">
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
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search publications by title, author, keywords, or abstract..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-12 rounded-lg bg-card/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

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
          <div className="space-y-4 mb-8">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading publications...</p>
              </div>
            ) : filteredPublications.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No publications found.</p>
              </div>
            ) : (
              <>
                <div className="text-sm text-muted-foreground mb-4">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredPublications.length)} of {filteredPublications.length} publications
                </div>
                
                {paginatedPublications.map((pub, index) => {
                  const isExpanded = expandedId === pub.id
                  
                  return (
                    <motion.div
                      key={pub.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative z-10 p-6">
                        {/* Compact View */}
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

                        {formatVenue(pub.venue) && (
                          <p className="text-sm text-muted-foreground mb-3">
                            <span className="font-medium">Venue:</span> {formatVenue(pub.venue)}
                          </p>
                        )}
                        
                        {!isExpanded && pub.abstract && (
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {pub.abstract}
                          </p>
                        )}

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {pub.openAccess && (
                            <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Open Access
                            </span>
                          )}
                          {pub.peerReviewed && (
                            <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                              Peer Reviewed
                            </span>
                          )}
                          {pub.featured && (
                            <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                              Featured
                            </span>
                          )}
                        </div>

                        {/* Expandable Details */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-6 pt-6 border-t border-border/50 space-y-6"
                            >
                              {/* Abstract */}
                              {pub.abstract && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Abstract</h4>
                                  <p className="text-sm text-muted-foreground leading-relaxed">{pub.abstract}</p>
                                </div>
                              )}

                              {/* Keywords */}
                              {pub.keywords && pub.keywords.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Keywords</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {pub.keywords.map((keyword, idx) => (
                                      <span key={idx} className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs">
                                        {keyword}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Identifiers */}
                              {pub.identifiers && Object.values(pub.identifiers).some(v => v) && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Identifiers</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                    {pub.identifiers.doi && (
                                      <div>
                                        <span className="text-muted-foreground">DOI:</span>{" "}
                                        <a 
                                          href={`https://doi.org/${pub.identifiers.doi}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-primary hover:underline"
                                        >
                                          {pub.identifiers.doi}
                                        </a>
                                      </div>
                                    )}
                                    {pub.identifiers.isbn && (
                                      <div>
                                        <span className="text-muted-foreground">ISBN:</span> {pub.identifiers.isbn}
                                      </div>
                                    )}
                                    {pub.identifiers.issn && (
                                      <div>
                                        <span className="text-muted-foreground">ISSN:</span> {pub.identifiers.issn}
                                      </div>
                                    )}
                                    {pub.identifiers.arxivId && (
                                      <div>
                                        <span className="text-muted-foreground">arXiv:</span>{" "}
                                        <a 
                                          href={`https://arxiv.org/abs/${pub.identifiers.arxivId}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-primary hover:underline"
                                        >
                                          {pub.identifiers.arxivId}
                                        </a>
                                      </div>
                                    )}
                                    {pub.identifiers.pubmedId && (
                                      <div>
                                        <span className="text-muted-foreground">PubMed:</span>{" "}
                                        <a 
                                          href={`https://pubmed.ncbi.nlm.nih.gov/${pub.identifiers.pubmedId}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-primary hover:underline"
                                        >
                                          {pub.identifiers.pubmedId}
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Links */}
                              {pub.links && Object.values(pub.links).some(v => v) && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Links</h4>
                                  <div className="flex flex-wrap gap-3">
                                    {pub.links.publisher && (
                                      <a href={pub.links.publisher} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                                        Publisher
                                      </a>
                                    )}
                                    {pub.links.repository && (
                                      <a href={pub.links.repository} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                                        Repository
                                      </a>
                                    )}
                                    {pub.links.dataset && (
                                      <a href={pub.links.dataset} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                                        Dataset
                                      </a>
                                    )}
                                    {pub.links.supplementary && (
                                      <a href={pub.links.supplementary} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                                        Supplementary
                                      </a>
                                    )}
                                    {pub.links.presentation && (
                                      <a href={pub.links.presentation} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                                        Presentation
                                      </a>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Files */}
                              {pub.files && pub.files.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Files</h4>
                                  <div className="space-y-2">
                                    {pub.files.filter(f => f.file?.url).map((file, idx) => (
                                      <a
                                        key={idx}
                                        href={file.file!.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                                      >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span>{file.label || file.file!.filename || `${file.fileType || 'File'}`}</span>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Metrics */}
                              {pub.metrics && Object.values(pub.metrics).some(v => v) && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Metrics</h4>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {pub.metrics.citations !== undefined && (
                                      <div className="text-center p-3 rounded-lg bg-card/50 border border-border/30">
                                        <div className="text-2xl font-bold text-primary">{pub.metrics.citations}</div>
                                        <div className="text-xs text-muted-foreground">Citations</div>
                                      </div>
                                    )}
                                    {pub.metrics.impactFactor !== undefined && (
                                      <div className="text-center p-3 rounded-lg bg-card/50 border border-border/30">
                                        <div className="text-2xl font-bold text-primary">{pub.metrics.impactFactor}</div>
                                        <div className="text-xs text-muted-foreground">Impact Factor</div>
                                      </div>
                                    )}
                                    {pub.metrics.hIndex !== undefined && (
                                      <div className="text-center p-3 rounded-lg bg-card/50 border border-border/30">
                                        <div className="text-2xl font-bold text-primary">{pub.metrics.hIndex}</div>
                                        <div className="text-xs text-muted-foreground">h-Index</div>
                                      </div>
                                    )}
                                    {pub.metrics.downloads !== undefined && (
                                      <div className="text-center p-3 rounded-lg bg-card/50 border border-border/30">
                                        <div className="text-2xl font-bold text-primary">{pub.metrics.downloads}</div>
                                        <div className="text-xs text-muted-foreground">Downloads</div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Research Areas */}
                              {pub.researchAreas && pub.researchAreas.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Research Areas</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {pub.researchAreas.map((area, idx) => (
                                      <span key={idx} className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-xs">
                                        {area}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Awards */}
                              {pub.awards && pub.awards.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Awards</h4>
                                  <div className="space-y-2">
                                    {pub.awards.map((award, idx) => (
                                      <div key={idx} className="text-sm">
                                        <span className="text-foreground font-medium">{award.awardName}</span>
                                        {award.awardingBody && <span className="text-muted-foreground"> - {award.awardingBody}</span>}
                                        {award.year && <span className="text-muted-foreground"> ({award.year})</span>}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Funding */}
                              {pub.funding && pub.funding.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Funding</h4>
                                  <div className="space-y-2">
                                    {pub.funding.map((fund, idx) => (
                                      <div key={idx} className="text-sm">
                                        <span className="text-foreground font-medium">{fund.agency}</span>
                                        {fund.grantNumber && <span className="text-muted-foreground"> (Grant: {fund.grantNumber})</span>}
                                        {fund.amount && <span className="text-muted-foreground"> - {fund.amount}</span>}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Featured Image */}
                              {pub.featuredImage?.url && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2">Featured Image</h4>
                                  <div className="relative w-full h-64 rounded-lg overflow-hidden">
                                    <Image
                                      src={pub.featuredImage.url}
                                      alt={pub.featuredImage.alt || pub.title || "Publication image"}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Show Details Button */}
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : pub.id)}
                          className="mt-4 w-full py-2 px-4 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium text-sm transition-colors flex items-center justify-center gap-2"
                        >
                          {isExpanded ? (
                            <>
                              <span>Show Less</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            </>
                          ) : (
                            <>
                              <span>Show Details</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </>
            )}
          </div>

          {/* Pagination */}
          {!loading && filteredPublications.length > 0 && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-card/50 border border-border/50 text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary/50 transition-colors"
              >
                Previous
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === page
                            ? "bg-primary text-primary-foreground"
                            : "bg-card/50 border border-border/50 text-foreground hover:border-primary/50"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2 text-muted-foreground">...</span>
                  }
                  return null
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-card/50 border border-border/50 text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary/50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
