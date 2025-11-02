"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
interface Project {
  id: string
  title: string
  slug: string
  tagline?: string
  projectType: string
  status: string
  description: string
  problem?: string
  solution?: string
  impact?: string
  coverImage: {
    url: string
    alt: string
  }
  logo?: {
    url: string
    alt: string
  }
  teamMembers: Array<{
    member?: {
      id: string
      firstName: string
      lastName: string
      profileImage?: { url: string }
    }
    externalMember?: string
    role: string
  }>
  timeline?: {
    startDate: string
    endDate?: string
    duration?: string
  }
  technologies?: Array<{
    name: string
    category: string
  }>
  researchAreas?: string[]
  tags?: Array<{ tag: string }>
  links?: {
    github?: string
    gitlab?: string
    live?: string
    documentation?: string
    youtube?: string
    reddit?: string
    devpost?: string
    twitter?: string
    other?: Array<{ label: string; url: string }>
  }
  images?: Array<{
    image: { url: string; alt?: string }
    caption?: string
    imageType: string
    order?: number
  }>
  documents?: Array<{
    file: { url: string; filename: string }
    documentType: string
    title: string
    description?: string
  }>
  features?: Array<{
    title: string
    description?: string
    icon?: string
  }>
  achievements?: Array<{
    title: string
    description?: string
    date?: string
    url?: string
  }>
  challenges?: string
  learnings?: string
  futureWork?: string
  metrics?: {
    stars?: number
    forks?: number
    contributors?: number
    downloads?: number
    users?: number
    views?: number
  }
  funding?: Array<{
    source: string
    amount?: string
    type?: string
  }>
  license?: string
  featured: boolean
  openSource: boolean
  lookingForCollaborators?: boolean
  acceptingContributions?: boolean
  contactEmail?: string
}

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`/api/projects?where[slug][equals]=${params.id}&depth=2`)
        const data = await response.json()
        
        if (data.docs && data.docs.length > 0) {
          setProject(data.docs[0])
        }
      } catch (error) {
        console.error("Error fetching project:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProject()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-muted-foreground">Loading project...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist.</p>
          <Link href="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const sortedImages = project.images?.sort((a, b) => (a.order || 0) - (b.order || 0)) || []

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      completed: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
      "in-progress": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      planning: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
      published: "bg-primary/10 text-primary border-primary/20",
    }
    return colors[status] || "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/projects" className="hover:text-foreground transition-colors">
              Projects
            </Link>
            <span>/</span>
            <span className="text-foreground">{project.title}</span>
          </div>

          {/* Title & Badges */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className={`${getStatusColor(project.status)} border`}>
                  {project.status.replace("-", " ").toUpperCase()}
                </Badge>
                <Badge variant="outline">
                  {project.projectType.replace("-", " ").toUpperCase()}
                </Badge>
                {project.featured && (
                  <Badge className="bg-primary/90 text-primary-foreground border-0">
                    ⭐ Featured
                  </Badge>
                )}
                {project.openSource && (
                  <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                    Open Source
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {project.title}
              </h1>
              
              {project.tagline && (
                <p className="text-xl text-muted-foreground italic mb-6">
                  "{project.tagline}"
                </p>
              )}
            </div>

            {project.logo && (
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-border bg-card">
                <Image
                  src={project.logo.url}
                  alt={project.logo.alt || "Project logo"}
                  fill
                  className="object-contain p-2"
                />
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-3">
            {project.links?.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  GitHub
                </Button>
              </a>
            )}
            {project.links?.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </Button>
              </a>
            )}
            {project.links?.documentation && (
              <a href={project.links.documentation} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  📚 Documentation
                </Button>
              </a>
            )}
          </div>
        </motion.div>

        {/* Cover Image */}
        {project.coverImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 border border-border"
          >
            <Image
              src={project.coverImage.url}
              alt={project.coverImage.alt || project.title}
              fill
              className="object-cover"
            />
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </motion.section>

            {/* Problem, Solution, Impact */}
            {(project.problem || project.solution || project.impact) && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {project.problem && (
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="text-3xl mb-3">🎯</div>
                    <h3 className="text-lg font-bold mb-2">Problem</h3>
                    <p className="text-sm text-muted-foreground">{project.problem}</p>
                  </div>
                )}
                {project.solution && (
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="text-3xl mb-3">💡</div>
                    <h3 className="text-lg font-bold mb-2">Solution</h3>
                    <p className="text-sm text-muted-foreground">{project.solution}</p>
                  </div>
                )}
                {project.impact && (
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="text-3xl mb-3">📈</div>
                    <h3 className="text-lg font-bold mb-2">Impact</h3>
                    <p className="text-sm text-muted-foreground">{project.impact}</p>
                  </div>
                )}
              </motion.section>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                      {feature.icon && <div className="text-3xl mb-3">{feature.icon}</div>}
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      {feature.description && (
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Image Gallery */}
            {sortedImages.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6">Gallery</h2>
                
                {/* Main Image */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-4 border border-border">
                  <Image
                    src={sortedImages[selectedImageIndex].image.url}
                    alt={sortedImages[selectedImageIndex].image.alt || sortedImages[selectedImageIndex].caption || "Project image"}
                    fill
                    className="object-cover"
                  />
                </div>
                {sortedImages[selectedImageIndex].caption && (
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    {sortedImages[selectedImageIndex].caption}
                  </p>
                )}

                {/* Thumbnails */}
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                  {sortedImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Image
                        src={img.image.url}
                        alt={img.image.alt || `Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Videos */}
            {project.links?.youtube && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-6">🎥 Video Demo</h2>
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${project.links.youtube}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Project video demo"
                  />
                </div>
              </motion.section>
            )}

            {/* Achievements */}
            {project.achievements && project.achievements.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="text-2xl font-bold mb-6">🏆 Achievements & Awards</h2>
                <div className="space-y-4">
                  {project.achievements.map((achievement, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                          {achievement.description && (
                            <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                          )}
                          {achievement.date && (
                            <p className="text-xs text-muted-foreground">
                              {formatDate(achievement.date)}
                            </p>
                          )}
                        </div>
                        {achievement.url && (
                          <a href={achievement.url} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline">View</Button>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Challenges & Learnings */}
            {(project.challenges || project.learnings || project.futureWork) && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-6"
              >
                {project.challenges && (
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <span>⚠️</span> Challenges
                    </h3>
                    <p className="text-muted-foreground whitespace-pre-line">{project.challenges}</p>
                  </div>
                )}
                {project.learnings && (
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <span>💡</span> Key Learnings
                    </h3>
                    <p className="text-muted-foreground whitespace-pre-line">{project.learnings}</p>
                  </div>
                )}
                {project.futureWork && (
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <span>🚀</span> Future Work
                    </h3>
                    <p className="text-muted-foreground whitespace-pre-line">{project.futureWork}</p>
                  </div>
                )}
              </motion.section>
            )}

            {/* Documents */}
            {project.documents && project.documents.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <h2 className="text-2xl font-bold mb-6">📄 Documents & Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.documents.map((doc, index) => (
                    <a
                      key={index}
                      href={doc.file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">📎</div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                            {doc.title}
                          </h3>
                          {doc.description && (
                            <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {doc.documentType.replace("-", " ").toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Project Stats */}
            {project.metrics && Object.values(project.metrics).some(v => v) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-bold mb-4">📊 Stats</h3>
                <div className="space-y-3">
                  {project.metrics.stars !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">⭐ Stars</span>
                      <span className="font-semibold">{project.metrics.stars}</span>
                    </div>
                  )}
                  {project.metrics.forks !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">🔱 Forks</span>
                      <span className="font-semibold">{project.metrics.forks}</span>
                    </div>
                  )}
                  {project.metrics.users !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">👥 Users</span>
                      <span className="font-semibold">{project.metrics.users.toLocaleString()}</span>
                    </div>
                  )}
                  {project.metrics.downloads !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">⬇️ Downloads</span>
                      <span className="font-semibold">{project.metrics.downloads.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Timeline */}
            {project.timeline && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-bold mb-4">📅 Timeline</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Started</p>
                    <p className="font-semibold">{formatDate(project.timeline.startDate)}</p>
                  </div>
                  {project.timeline.endDate && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Completed</p>
                      <p className="font-semibold">{formatDate(project.timeline.endDate)}</p>
                    </div>
                  )}
                  {project.timeline.duration && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Duration</p>
                      <p className="font-semibold">{project.timeline.duration}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Team */}
            {project.teamMembers && project.teamMembers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-bold mb-4">👥 Team</h3>
                <div className="space-y-4">
                  {project.teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {member.member?.profileImage ? (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-border">
                          <Image
                            src={member.member.profileImage.url}
                            alt={`${member.member.firstName} ${member.member.lastName}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          {member.member 
                            ? `${member.member.firstName[0]}${member.member.lastName[0]}`
                            : member.externalMember?.[0] || "?"
                          }
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {member.member 
                            ? `${member.member.firstName} ${member.member.lastName}`
                            : member.externalMember
                          }
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {member.role.replace("-", " ")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-bold mb-4">🛠️ Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="bg-background/50">
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Research Areas */}
            {project.researchAreas && project.researchAreas.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-bold mb-4">🔬 Research Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {project.researchAreas.map((area, index) => (
                    <Badge key={index} className="bg-primary/10 text-primary border-primary/20">
                      {area.replace("-", " ").toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Links */}
            {project.links && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-bold mb-4">🔗 Links</h3>
                <div className="space-y-2">
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                      <span>→</span> GitHub Repository
                    </a>
                  )}
                  {project.links.gitlab && (
                    <a href={project.links.gitlab} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                      <span>→</span> GitLab Repository
                    </a>
                  )}
                  {project.links.live && (
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                      <span>→</span> Live Demo
                    </a>
                  )}
                  {project.links.documentation && (
                    <a href={project.links.documentation} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                      <span>→</span> Documentation
                    </a>
                  )}
                  {project.links.reddit && (
                    <a href={project.links.reddit} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                      <span>→</span> Reddit Discussion
                    </a>
                  )}
                  {project.links.devpost && (
                    <a href={project.links.devpost} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                      <span>→</span> Devpost
                    </a>
                  )}
                  {project.links.twitter && (
                    <a href={project.links.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                      <span>→</span> Twitter/X
                    </a>
                  )}
                  {project.links.other?.map((link, index) => (
                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                      <span>→</span> {link.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Funding */}
            {project.funding && project.funding.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-bold mb-4">💰 Funding</h3>
                <div className="space-y-3">
                  {project.funding.map((fund, index) => (
                    <div key={index} className="pb-3 border-b border-border last:border-0 last:pb-0">
                      <p className="font-semibold text-sm">{fund.source}</p>
                      {fund.amount && (
                        <p className="text-xs text-muted-foreground mt-1">{fund.amount}</p>
                      )}
                      {fund.type && (
                        <Badge variant="outline" className="text-xs mt-2">
                          {fund.type.replace("-", " ")}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Collaboration */}
            {(project.lookingForCollaborators || project.acceptingContributions) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="bg-primary/5 border border-primary/20 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold mb-3">🤝 Get Involved</h3>
                {project.lookingForCollaborators && (
                  <p className="text-sm mb-2">✅ Looking for collaborators</p>
                )}
                {project.acceptingContributions && (
                  <p className="text-sm mb-4">✅ Accepting contributions</p>
                )}
                {project.contactEmail && (
                  <a href={`mailto:${project.contactEmail}`}>
                    <Button className="w-full">Contact Team</Button>
                  </a>
                )}
              </motion.div>
            )}

            {/* License */}
            {project.license && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-bold mb-3">📜 License</h3>
                <Badge variant="outline" className="bg-background/50">
                  {project.license.replace("-", " ").toUpperCase()}
                </Badge>
              </motion.div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-center"
        >
          <Link href="/projects">
            <Button variant="outline" className="gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Projects
            </Button>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
