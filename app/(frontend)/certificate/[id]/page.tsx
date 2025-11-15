"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { notFound } from "next/navigation"
import Image from "next/image"

// Import the Lexical renderer from news components
function LexicalNode({ node }: { node: any }) {
  if (!node) return null

  switch (node.type) {
    case 'paragraph':
      return (
        <p className="mb-4 leading-relaxed">
          {node.children?.map((child: any, idx: number) => (
            <span key={idx}>
              <TextNode node={child} />
            </span>
          ))}
        </p>
      )
    case 'heading':
      const HeadingTag = node.tag || 'h2'
      return (
        <HeadingTag className="text-2xl font-bold mb-4">
          {node.children?.map((child: any, idx: number) => (
            <span key={idx}>
              <TextNode node={child} />
            </span>
          ))}
        </HeadingTag>
      )
    case 'list':
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      const listTypeClass = node.listType === 'number' ? 'list-decimal' : 'list-disc'
      return (
        <ListTag className={`mb-4 pl-6 space-y-2 ${listTypeClass}`}>
          {node.children?.map((item: any, idx: number) => (
            <LexicalNode key={idx} node={item} />
          ))}
        </ListTag>
      )
    case 'listitem':
      return (
        <li className="leading-relaxed">
          {node.children?.map((child: any, idx: number) => (
            <span key={idx}>
              <TextNode node={child} />
            </span>
          ))}
        </li>
      )
    default:
      return null
  }
}

function TextNode({ node }: { node: any }) {
  if (!node) return null

  if (node.type === 'text') {
    let text = node.text || ''
    if (node.format === 1) return <strong>{text}</strong>
    if (node.format === 2) return <em>{text}</em>
    if (node.format === 8) return <code className="bg-muted px-1 rounded">{text}</code>
    return <>{text}</>
  }

  if (node.type === 'link') {
    return (
      <a href={node.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
        {node.children?.map((child: any, idx: number) => (
          <TextNode key={idx} node={child} />
        ))}
      </a>
    )
  }

  return null
}

function RichTextRenderer({ content }: { content: any }) {
  if (!content) return null

  let data = content
  if (typeof content === 'string') {
    try {
      data = JSON.parse(content)
    } catch {
      return <p className="whitespace-pre-wrap">{content}</p>
    }
  }

  if (data.root && data.root.children) {
    return (
      <div className="prose prose-sm max-w-none dark:prose-invert">
        {data.root.children.map((node: any, idx: number) => (
          <LexicalNode key={idx} node={node} />
        ))}
      </div>
    )
  }

  return <p>{String(content)}</p>
}

interface CertificateData {
  id: string
  certificateName: string
  recipientName: string
  achievement?: string
  reason: any
  issuedBy: string
  issuedAt: string
  shortCode: string
  certificateFile: {
    url: string
    alt?: string
  }
  tags?: string[]
}

export default function CertificateDetailPage({ params }: { params: { id: string } }) {
  const [certificate, setCertificate] = useState<CertificateData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await fetch(`/api/certificates/verify/${params.id}`)
        const data = await response.json()

        if (!response.ok) {
          setError(data.error || "Certificate not found")
          setIsLoading(false)
          return
        }

        setCertificate(data.certificate)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load certificate")
        setIsLoading(false)
      }
    }

    fetchCertificate()
  }, [params.id])

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = `Check out my certificate: ${certificate?.certificateName}`

    let shareUrl = ""
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (certificate?.certificateFile?.url) {
      const link = document.createElement("a")
      link.href = certificate.certificateFile.url
      link.download = `${certificate.recipientName}-${certificate.certificateName}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-muted-foreground">Loading certificate...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !certificate) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Certificate Not Found</h1>
            <p className="text-muted-foreground mb-8">{error}</p>
            <a href="/certificate" className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors inline-block">
              Verify Another Certificate
            </a>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Verification Badge */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Verified Certificate</span>
            </div>
          </div>

          {/* Certificate Image */}
          {certificate.certificateFile?.url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8 rounded-lg overflow-hidden border border-border shadow-2xl"
            >
              <div className="relative w-full aspect-[1.414/1] bg-card">
                <Image
                  src={certificate.certificateFile.url}
                  alt={certificate.certificateFile.alt || certificate.certificateName}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          )}

          {/* Certificate Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-lg p-8 mb-8"
          >
            <h1 className="text-3xl font-bold mb-6">{certificate.certificateName}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Recipient</p>
                <p className="text-lg font-semibold">{certificate.recipientName}</p>
              </div>

              {certificate.achievement && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Achievement</p>
                  <p className="text-lg font-semibold">{certificate.achievement}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground mb-1">Issued By</p>
                <p className="text-lg font-semibold">{certificate.issuedBy}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Issue Date</p>
                <p className="text-lg font-semibold">
                  {new Date(certificate.issuedAt).toLocaleDateString("en-US", { 
                    year: "numeric", 
                    month: "long", 
                    day: "numeric" 
                  })}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Verification Code</p>
                <p className="text-lg font-mono font-bold text-primary">{certificate.shortCode}</p>
              </div>
            </div>

            {/* Reason */}
            {certificate.reason && (
              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Reason for Award</p>
                <RichTextRenderer content={certificate.reason} />
              </div>
            )}

            {/* Tags */}
            {certificate.tags && certificate.tags.length > 0 && (
              <div className="pt-6 border-t border-border mt-6">
                <p className="text-sm text-muted-foreground mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {certificate.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Certificate
            </button>

            {/* Share Buttons */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => handleShare("twitter")}
                className="px-4 py-3 bg-card border border-border rounded-md hover:bg-accent transition-colors flex items-center justify-center"
                title="Share on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>

              <button
                onClick={() => handleShare("linkedin")}
                className="px-4 py-3 bg-card border border-border rounded-md hover:bg-accent transition-colors flex items-center justify-center"
                title="Share on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>

              <button
                onClick={() => handleShare("facebook")}
                className="px-4 py-3 bg-card border border-border rounded-md hover:bg-accent transition-colors flex items-center justify-center"
                title="Share on Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>

              <button
                onClick={handleCopyLink}
                className="px-4 py-3 bg-card border border-border rounded-md hover:bg-accent transition-colors flex items-center justify-center"
                title="Copy Link"
              >
                {copied ? (
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
