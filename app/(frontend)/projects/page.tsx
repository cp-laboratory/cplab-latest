"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

interface Project {
  id: string
  title: string
  slug: string
  tagline?: string
  projectType: string
  status: string
  description: string
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
      firstName: string
      lastName: string
    }
    externalMember?: string
    role: string
  }>
  technologies?: Array<{
    name: string
    category: string
  }>
  researchAreas?: string[]
  links?: {
    github?: string
    live?: string
  }
  metrics?: {
    stars?: number
    users?: number
  }
  featured: boolean
  openSource: boolean
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects?depth=1&limit=100")
        const data = await response.json()
        
        if (data.docs) {
          setProjects(data.docs)
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const projectTypes = [
    { value: "all", label: "All Projects" },
    { value: "research", label: "Research" },
    { value: "student", label: "Student Projects" },
    { value: "open-source", label: "Open Source" },
    { value: "industry", label: "Industry" },
    { value: "hackathon", label: "Hackathon" },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = filter === "all" || project.projectType === filter
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      completed: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
      "in-progress": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      planning: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
      published: "bg-primary/10 text-primary border-primary/20",
    }
    return colors[status] || "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20"
  }

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      research: "🔬",
      student: "🎓",
      "open-source": "💻",
      industry: "🏢",
      hackathon: "⚡",
      capstone: "📚",
      competition: "🏆",
      grant: "💰",
      prototype: "🛠️",
      product: "📦",
      thesis: "📖",
    }
    return icons[type] || "📁"
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
        <div className="container mx-auto px-4 py-24 sm:py-32">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">Projects</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our innovative research projects, student work, and open-source contributions.
            </p>
          </motion.div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {projectTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setFilter(type.value)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === type.value
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card border border-border text-foreground hover:border-primary/50"
                }`}
              >
                {type.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-muted-foreground">Loading projects...</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="group h-full bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                    {/* Cover Image */}
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                      {project.coverImage?.url ? (
                        <Image
                          src={project.coverImage.url}
                          alt={project.coverImage.alt || project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                          {getTypeIcon(project.projectType)}
                        </div>
                      )}
                      
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground border-0">
                            ⭐ Featured
                          </Badge>
                        </div>
                      )}
                      
                      {/* Status Badge */}
                      <div className="absolute bottom-4 left-4">
                        <Badge className={`${getStatusColor(project.status)} backdrop-blur-sm border`}>
                          {project.status.replace("-", " ").toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      {/* Title & Type */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{getTypeIcon(project.projectType)}</span>
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {project.projectType.replace("-", " ")}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {project.title}
                        </h3>
                      </div>

                      {/* Tagline */}
                      {project.tagline && (
                        <p className="text-sm text-muted-foreground italic line-clamp-2">
                          "{project.tagline}"
                        </p>
                      )}

                      {/* Description */}
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs bg-background/50"
                            >
                              {tech.name}
                            </Badge>
                          ))}
                          {project.technologies.length > 4 && (
                            <Badge variant="outline" className="text-xs bg-background/50">
                              +{project.technologies.length - 4} more
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Team & Links */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        {/* Team Size */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>{project.teamMembers?.length || 0} members</span>
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-2">
                          {project.links?.github && (
                            <div className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                              </svg>
                            </div>
                          )}
                          {project.links?.live && (
                            <div className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors">
                              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                          )}
                          {project.openSource && (
                            <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                              Open Source
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? `No projects match "${searchQuery}"`
                : "No projects available in this category"}
            </p>
            {(filter !== "all" || searchQuery) && (
              <Button
                onClick={() => {
                  setFilter("all")
                  setSearchQuery("")
                }}
              >
                Clear Filters
              </Button>
            )}
          </motion.div>
        )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
