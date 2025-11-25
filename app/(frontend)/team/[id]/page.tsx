"use client"

import { useEffect, useState, useMemo, use } from "react"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"

// Define interfaces for the profile data
interface Profile {
  id: string
  slug: string
  personalInfo: {
    fullName: string
    memberType: string
    designation?: string
    profileImage?: {
      url: string
      alt?: string
    }
    bio?: string
    about?: any // Rich Text
  }
  contact?: {
    email?: string
    phone?: string
  }
  socialMedia?: {
    linkedin?: string
    twitter?: string
    github?: string
    googleScholar?: string
    website?: string
  }
  education?: Array<{
    degree: string
    field: string
    institution: string
    startYear: number
    endYear?: number
  }>
  experience?: Array<{
    position: string
    organization: string
    startDate: string
    endDate?: string
    isCurrent?: boolean
    description?: any // Rich Text
  }>
  skills?: Array<{
    category: string
    name: string
    proficiency?: string
  }>
  researchInterests?: Array<{
    area: string
  }>
  publications?: Array<{
    id: string
    slug?: string
    title: string
    year: number
    publicationType: string
  }>
  projects?: Array<{
    id: string
    title: string
    projectType: string
    status: string
  }>
  certificatesReceived?: Array<{
    id: string
    certificateName: string
    issuedAt: string
    shortCode?: string
  }>
  resume?: {
    resumeFile?: {
      url: string
    }
    resumeLink?: string
  }
}

// Lexical Renderer Components (simplified version)
function RichTextRenderer({ content }: { content: any }) {
  if (!content || !content.root) return null
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      {content.root.children.map((node: any, idx: number) => (
        <LexicalNode key={idx} node={node} />
      ))}
    </div>
  )
}

function LexicalNode({ node }: { node: any }) {
  if (!node) return null
  switch (node.type) {
    case 'paragraph':
      return (
        <p className="mb-4">
          {node.children?.map((child: any, idx: number) => <TextNode key={idx} node={child} />)}
        </p>
      )
    case 'heading':
      const Tag = node.tag || 'h3'
      return (
        <Tag className="font-bold my-4">
          {node.children?.map((child: any, idx: number) => <TextNode key={idx} node={child} />)}
        </Tag>
      )
    case 'list':
      const ListTag = node.listType === 'bullet' ? 'ul' : 'ol'
      return (
        <ListTag className="list-disc list-inside mb-4">
          {node.children?.map((child: any, idx: number) => <LexicalNode key={idx} node={child} />)}
        </ListTag>
      )
    case 'listitem':
      return (
        <li>
          {node.children?.map((child: any, idx: number) => <TextNode key={idx} node={child} />)}
        </li>
      )
    default:
      return null
  }
}

function TextNode({ node }: { node: any }) {
  if (node.type !== 'text') return null
  let text = <>{node.text}</>
  if (node.format & 1) text = <strong>{text}</strong>
  if (node.format & 2) text = <em>{text}</em>
  if (node.format & 8) text = <u>{text}</u>
  return text
}

export default function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [pubSortBy, setPubSortBy] = useState<'year' | 'title'>('year')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/team/${id}`)
        if (!response.ok) {
          notFound()
          return
        }
        const data = await response.json()
        setProfile(data.profile)
      } catch (error) {
        console.error("Failed to fetch profile:", error)
        notFound()
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <svg className="w-12 h-12 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
        <Footer />
      </div>
    )
  }

  if (!profile) {
    notFound()
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <header className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="relative w-40 h-40 rounded-full overflow-hidden flex-shrink-0 border-4 border-primary/20 shadow-lg">
              {profile.personalInfo.profileImage?.url ? (
                <Image
                  src={profile.personalInfo.profileImage.url}
                  alt={profile.personalInfo.profileImage.alt || profile.personalInfo.fullName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-6xl font-bold text-primary">
                  {profile.personalInfo.fullName.charAt(0)}
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{profile.personalInfo.fullName}</h1>
              {profile.personalInfo.designation && (
                <p className="text-xl text-primary mb-3">{profile.personalInfo.designation}</p>
              )}
              {profile.personalInfo.bio && (
                <p className="text-muted-foreground max-w-xl">{profile.personalInfo.bio}</p>
              )}
              <div className="flex gap-4 mt-4 justify-center md:justify-start">
                {profile.socialMedia?.linkedin && <SocialLink href={profile.socialMedia.linkedin} icon="linkedin" />}
                {profile.socialMedia?.twitter && <SocialLink href={profile.socialMedia.twitter} icon="twitter" />}
                {profile.socialMedia?.github && <SocialLink href={profile.socialMedia.github} icon="github" />}
                {profile.socialMedia?.googleScholar && <SocialLink href={profile.socialMedia.googleScholar} icon="scholar" />}
                {profile.socialMedia?.website && <SocialLink href={profile.socialMedia.website} icon="website" />}
              </div>
            </div>
          </header>

          {/* Contact Information */}
          {(profile.contact?.email || profile.contact?.phone) && (
            <div className="bg-card border border-border rounded-lg p-6 mb-12">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.contact.email && (
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href={`mailto:${profile.contact.email}`} className="text-primary hover:underline">
                      {profile.contact.email}
                    </a>
                  </div>
                )}
                {profile.contact.phone && (
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href={`tel:${profile.contact.phone}`} className="text-primary hover:underline">
                      {profile.contact.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-12">
              {profile.personalInfo.about && (
                <Section title="About Me">
                  <RichTextRenderer content={profile.personalInfo.about} />
                </Section>
              )}

              {profile.experience && profile.experience.length > 0 && (
                <Section title="Experience">
                  <div className="space-y-6">
                    {profile.experience.map((exp, i) => (
                      <div key={i} className="pl-4 border-l-2 border-primary/30">
                        <h3 className="font-bold text-lg">{exp.position}</h3>
                        <p className="text-primary">{exp.organization}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(exp.startDate).getFullYear()} - {exp.isCurrent ? 'Present' : exp.endDate ? new Date(exp.endDate).getFullYear() : ''}
                        </p>
                        {exp.description && <div className="mt-2"><RichTextRenderer content={exp.description} /></div>}
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {profile.publications && profile.publications.length > 0 && (
                <Section title="Publications">
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setPubSortBy('year')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        pubSortBy === 'year'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      Sort by Year
                    </button>
                    <button
                      onClick={() => setPubSortBy('title')}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        pubSortBy === 'title'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      Sort by Title
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[...profile.publications]
                      .sort((a, b) => {
                        if (pubSortBy === 'year') {
                          return (b.year || 0) - (a.year || 0)
                        }
                        return (a.title || '').localeCompare(b.title || '')
                      })
                      .map(pub => (
                      <Link 
                        key={pub.id} 
                        href={`/publications/${pub.slug || pub.id}`}
                        className="block group"
                      >
                        <div className="p-5 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-md transition-all duration-300">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 leading-relaxed">
                            {pub.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-md font-medium">
                              {pub.publicationType}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {pub.year}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Section>
              )}

              {profile.projects && profile.projects.length > 0 && (
                <Section title="Projects">
                  <div className="space-y-4">
                    {profile.projects.map(proj => (
                      <div key={proj.id} className="p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                        <Link href={`/projects/${proj.id}`} className="font-semibold hover:text-primary block">
                          {proj.title}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          {proj.projectType} - <span className="capitalize">{proj.status}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {profile.certificatesReceived && profile.certificatesReceived.length > 0 && (
                <Section title="Certificates & Awards">
                  <div className="space-y-4">
                    {profile.certificatesReceived.map(cert => (
                      <Link 
                        key={cert.id} 
                        href={`/certificate/${cert.shortCode || cert.id}`}
                        className="block group"
                      >
                        <div className="p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-md transition-all duration-300">
                          <h3 className="font-semibold group-hover:text-primary transition-colors">{cert.certificateName}</h3>
                          <p className="text-sm text-muted-foreground">
                            Issued on {new Date(cert.issuedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Section>
              )}
            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-8">
              {(profile.resume?.resumeFile?.url || profile.resume?.resumeLink) && (
                <a 
                  href={profile.resume.resumeFile?.url || profile.resume.resumeLink || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block w-full text-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
                >
                  Download Resume
                </a>
              )}

              {profile.researchInterests && profile.researchInterests.length > 0 && (
                <Section title="Research Interests">
                  <div className="flex flex-wrap gap-2">
                    {profile.researchInterests.map((interest, i) => (
                      <Badge key={i} variant="secondary">{interest.area}</Badge>
                    ))}
                  </div>
                </Section>
              )}

              {profile.skills && profile.skills.length > 0 && (
                <Section title="Skills">
                  <div className="space-y-4">
                    {/* Group skills by category */}
                    {Object.entries(
                      profile.skills.reduce((acc, skill) => {
                        (acc[skill.category] = acc[skill.category] || []).push(skill.name);
                        return acc;
                      }, {} as Record<string, string[]>)
                    ).map(([category, skills]) => (
                      <div key={category}>
                        <h4 className="font-semibold text-sm mb-2 capitalize">{category.replace(/_/g, ' ')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, i) => (
                            <Badge key={i} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {profile.education && profile.education.length > 0 && (
                <Section title="Education">
                  <div className="space-y-4">
                    {profile.education.map((edu, i) => (
                      <div key={i} className="p-4 bg-card border border-border rounded-lg">
                        <h4 className="font-semibold">{edu.degree}</h4>
                        <p className="text-sm text-primary">{edu.field}</p>
                        <p className="text-sm text-muted-foreground mt-1">{edu.institution}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {edu.startYear} - {edu.endYear || 'Present'}
                        </p>
                      </div>
                    ))}
                  </div>
                </Section>
              )}
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

// Helper components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">{title}</h2>
      {children}
    </section>
  )
}

function SocialLink({ href, icon }: { href: string; icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    github: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd"/>
      </svg>
    ),
    scholar: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.39L12 18l7.162-5.11L24 9.5z"/>
      </svg>
    ),
    website: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.555a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
      </svg>
    ),
  }
  
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-muted-foreground hover:text-primary transition-colors"
      aria-label={icon}
    >
      {icons[icon]}
    </a>
  )
}
