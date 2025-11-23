"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  FileText, 
  ExternalLink, 
  Download,
  Award,
  Users,
  BookOpen,
  Bookmark,
  Share2,
  Quote
} from "lucide-react"

interface Publication {
  id: string
  title?: string
  slug?: string
  publicationType?: string
  year?: number
  month?: string
  publishedDate?: string
  authors?: Array<{
    authorType?: 'internal' | 'external'
    author?: {
      id?: string
      slug?: string
      firstName?: string
      lastName?: string
      profileImage?: {
        url?: string
      }
    }
    externalAuthor?: string
    externalAuthorAffiliation?: string
    externalAuthorLink?: string
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
  keywords?: Array<{
    keyword?: string
    id?: string
  }>
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

export default function PublicationDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const [publication, setPublication] = useState<Publication | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/public-publications?slug=${slug}`)
        const data = await response.json()
        
        if (data.publications && data.publications.length > 0) {
          setPublication(data.publications[0])
        } else {
          setError("Publication not found")
        }
      } catch (err) {
        console.error("Error fetching publication:", err)
        setError("Failed to load publication")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchPublication()
    }
  }, [slug])

  const getAuthorName = (author: any) => {
    if (author.authorType === 'internal' && author.author) {
      return `${author.author.firstName || ""} ${author.author.lastName || ""}`.trim()
    }
    if (author.authorType === 'external' && author.externalAuthor) {
      return author.externalAuthor
    }
    // Fallback for old data structure
    if (author.author) {
      return `${author.author.firstName || ""} ${author.author.lastName || ""}`.trim()
    }
    return author.externalAuthor || "Unknown Author"
  }

  const getAuthorLink = (author: any) => {
    if (author.authorType === 'internal' && author.author?.slug) {
      return `/team/${author.author.slug}`
    }
    if (author.authorType === 'external' && author.externalAuthorLink) {
      return author.externalAuthorLink
    }
    // Fallback for old data structure
    if (author.author?.slug) {
      return `/team/${author.author.slug}`
    }
    return null
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: publication?.title,
          url: window.location.href,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !publication) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Publication Not Found</h1>
            <p className="text-muted-foreground mb-8">{error}</p>
            <Link
              href="/publications"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Publications
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/publications"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Publications
            </Link>
          </motion.div>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            {/* Publication Type Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {publicationTypeLabels[publication.publicationType || ""] || publication.publicationType}
              </span>
              {publication.openAccess && (
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-medium">
                  Open Access
                </span>
              )}
              {publication.peerReviewed && (
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium">
                  Peer Reviewed
                </span>
              )}
              {publication.featured && (
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-sm font-medium flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {publication.title}
            </h1>

            {/* Authors */}
            {publication.authors && publication.authors.length > 0 && (
              <div className="flex items-start gap-3 mb-4">
                <Users className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  {publication.authors.map((author, idx) => {
                    const authorName = getAuthorName(author)
                    const authorLink = getAuthorLink(author)
                    const isExternal = author.authorType === 'external' || author.externalAuthorLink
                    
                    return (
                      <span key={idx} className="text-lg">
                        {authorLink ? (
                          <Link
                            href={authorLink}
                            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="text-foreground hover:text-primary transition-colors underline decoration-transparent hover:decoration-primary"
                          >
                            {authorName}
                            {author.isCorresponding && <sup className="text-primary">*</sup>}
                          </Link>
                        ) : (
                          <span className="text-foreground">
                            {authorName}
                            {author.isCorresponding && <sup className="text-primary">*</sup>}
                          </span>
                        )}
                        {author.authorType === 'external' && author.externalAuthorAffiliation && (
                          <span className="text-sm text-muted-foreground ml-1">({author.externalAuthorAffiliation})</span>
                        )}
                        {idx < publication.authors!.length - 1 && <span className="text-foreground">, </span>}
                      </span>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Venue & Date */}
            <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
              {publication.venue?.name && (
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="italic">{publication.venue.name}</span>
                  {publication.venue.acronym && (
                    <span>({publication.venue.acronym})</span>
                  )}
                </div>
              )}
              {publication.year && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{publication.month} {publication.year}</span>
                </div>
              )}
              {publication.venue?.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{publication.venue.location}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {publication.identifiers?.doi && (
                <a
                  href={`https://doi.org/${publication.identifiers.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Publisher
                </a>
              )}
              {publication.files && publication.files.length > 0 && (
                <a
                  href={publication.files[0].file?.url}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              )}
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </motion.div>

          {/* Featured Image */}
          {publication.featuredImage?.url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12 rounded-2xl overflow-hidden border border-border shadow-xl"
            >
              <Image
                src={publication.featuredImage.url}
                alt={publication.featuredImage.alt || publication.title || "Publication image"}
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          )}

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Abstract */}
              {publication.abstract && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-card border border-border rounded-2xl p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Quote className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Abstract</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {publication.abstract}
                  </p>
                </motion.section>
              )}

              {/* Keywords */}
              {publication.keywords && publication.keywords.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-card border border-border rounded-2xl p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Bookmark className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Keywords</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {publication.keywords.map((k, idx) => (
                      <span
                        key={k.id || idx}
                        className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                      >
                        {k.keyword}
                      </span>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Awards */}
              {publication.awards && publication.awards.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-card border border-border rounded-2xl p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Awards & Recognition</h2>
                  </div>
                  <div className="space-y-4">
                    {publication.awards.map((award, idx) => (
                      <div key={idx} className="border-l-2 border-primary pl-4">
                        <h3 className="font-semibold text-foreground">{award.awardName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {award.awardingBody} • {award.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Metrics */}
              {publication.metrics && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <h3 className="text-lg font-bold text-foreground mb-4">Metrics</h3>
                  <div className="space-y-4">
                    {publication.metrics.citations !== undefined && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Citations</span>
                        <span className="text-2xl font-bold text-primary">{publication.metrics.citations}</span>
                      </div>
                    )}
                    {publication.metrics.downloads !== undefined && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Downloads</span>
                        <span className="text-2xl font-bold text-primary">{publication.metrics.downloads}</span>
                      </div>
                    )}
                    {publication.metrics.impactFactor !== undefined && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Impact Factor</span>
                        <span className="text-2xl font-bold text-primary">{publication.metrics.impactFactor}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Identifiers */}
              {publication.identifiers && Object.values(publication.identifiers).some(v => v) && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <h3 className="text-lg font-bold text-foreground mb-4">Identifiers</h3>
                  <div className="space-y-3 text-sm">
                    {publication.identifiers.doi && (
                      <div>
                        <span className="text-muted-foreground block mb-1">DOI</span>
                        <a
                          href={`https://doi.org/${publication.identifiers.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline break-all"
                        >
                          {publication.identifiers.doi}
                        </a>
                      </div>
                    )}
                    {publication.identifiers.arxivId && (
                      <div>
                        <span className="text-muted-foreground block mb-1">arXiv</span>
                        <span className="text-foreground">{publication.identifiers.arxivId}</span>
                      </div>
                    )}
                    {publication.identifiers.isbn && (
                      <div>
                        <span className="text-muted-foreground block mb-1">ISBN</span>
                        <span className="text-foreground">{publication.identifiers.isbn}</span>
                      </div>
                    )}
                    {publication.identifiers.issn && (
                      <div>
                        <span className="text-muted-foreground block mb-1">ISSN</span>
                        <span className="text-foreground">{publication.identifiers.issn}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Additional Links */}
              {publication.links && Object.values(publication.links).some(v => v) && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <h3 className="text-lg font-bold text-foreground mb-4">Additional Resources</h3>
                  <div className="space-y-2">
                    {publication.links.repository && (
                      <a
                        href={publication.links.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Code Repository
                      </a>
                    )}
                    {publication.links.dataset && (
                      <a
                        href={publication.links.dataset}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Dataset
                      </a>
                    )}
                    {publication.links.supplementary && (
                      <a
                        href={publication.links.supplementary}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Supplementary Material
                      </a>
                    )}
                    {publication.links.presentation && (
                      <a
                        href={publication.links.presentation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Presentation
                      </a>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Venue Details */}
              {publication.venue && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <h3 className="text-lg font-bold text-foreground mb-4">Publication Details</h3>
                  <div className="space-y-2 text-sm">
                    {publication.venue.volume && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Volume</span>
                        <span className="text-foreground">{publication.venue.volume}</span>
                      </div>
                    )}
                    {publication.venue.issue && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Issue</span>
                        <span className="text-foreground">{publication.venue.issue}</span>
                      </div>
                    )}
                    {publication.venue.pages && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pages</span>
                        <span className="text-foreground">{publication.venue.pages}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
