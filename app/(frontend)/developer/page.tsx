"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Github,
  Linkedin,
  Facebook,
  Mail,
  Globe,
  MapPin,
  Building2,
  Calendar,
  Star,
  GitFork,
  ExternalLink,
  BookOpen,
} from "lucide-react"

interface GitHubUser {
  login: string
  name: string
  avatar_url: string
  bio: string
  location: string
  company: string
  blog: string
  email: string
  html_url: string
  public_repos: number
  followers: number
  following: number
}

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
  homepage: string
  updated_at: string
}

interface DevToArticle {
  id: number
  title: string
  description: string
  url: string
  published_at: string
  cover_image: string
  tag_list: string[]
  reading_time_minutes: number
}

interface MediumArticle {
  title: string
  description: string
  url: string
  published_at: string
  cover_image: string | null
  categories: string[]
  reading_time_minutes: number
}

const techStack = [
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Nest.js",
  "MongoDB",
  "PostgreSQL",
  "Tailwind CSS",
  "Docker",
  "Git",
  "AWS",
]

const experiences = [
  {
    title: "Full-stack Developer",
    company: "Bangladeshi Software",
    period: "October 2023 - Present",
    location: "Remote",
  },
  {
    title: "Front End Developer",
    company: "SJ Innovation",
    period: "May 2023 - July 2023",
    location: "Remote",
  },
  {
    title: "Front End Developer",
    company: "3W Business Private LTD",
    period: "February 2023 - February 2023",
    location: "Remote",
  },
]

const education = [
  {
    degree: "B.Sc Engg. in ECE",
    institution: "Hajee Mohammad Danesh Science and Technology University",
    location: "Dinajpur, Bangladesh",
    period: "2020 - Present",
  },
  {
    degree: "HSC & SSC",
    institution: "Saidpur Govt. Technical College",
    location: "Saidpur, Bangladesh",
    period: "2012 - 2019",
  },
]

export default function DeveloperPage() {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [articles, setArticles] = useState<DevToArticle[]>([])
  const [mediumArticles, setMediumArticles] = useState<MediumArticle[]>([])
  const [loading, setLoading] = useState(true)

  const username = "hasanshahriar32"

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`)
        const userData = await userResponse.json()
        setUser(userData)

        // Fetch repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=stars&per_page=6`
        )
        const reposData = await reposResponse.json()
        setRepos(reposData)

        // Fetch Dev.to articles
        try {
          const devToResponse = await fetch(`https://dev.to/api/articles?username=${username}`)
          const devToData = await devToResponse.json()
          setArticles(devToData.slice(0, 4))
        } catch (error) {
          console.error("Error fetching Dev.to articles:", error)
        }

        // Fetch Medium articles
        try {
          const mediumResponse = await fetch(`/api/medium-articles?username=${username}`)
          const mediumData = await mediumResponse.json()
          setMediumArticles(mediumData.slice(0, 4))
        } catch (error) {
          console.error("Error fetching Medium articles:", error)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  return (
    <div className="min-h-screen w-full relative bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #000000",
        }}
      />

      <Navbar />

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-24 sm:py-32">
          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-muted-foreground">Loading profile...</p>
            </div>
          )}

          {/* Profile Header */}
          {!loading && user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/20">
                      <Image
                        src={user.avatar_url}
                        alt={user.name || user.login}
                        width={160}
                        height={160}
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      Available
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-2">{user.name || user.login}</h1>
                    <p className="text-lg text-muted-foreground mb-4">{user.bio}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                      {user.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{user.location}</span>
                        </div>
                      )}
                      {user.company && (
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          <span>{user.company}</span>
                        </div>
                      )}
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={`https://github.com/${username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={`https://linkedin.com/in/${username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={`https://dev.to/${username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Dev.to
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={`https://medium.com/@${username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Medium
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href="mailto:hasanshahriar32@gmail.com">
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href="https://shahriarhasan.vercel.app"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="w-4 h-4 mr-2" />
                          Portfolio
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex md:flex-col gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-primary">{user.public_repos}</div>
                      <div className="text-sm text-muted-foreground">Repositories</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary">{user.followers}</div>
                      <div className="text-sm text-muted-foreground">Followers</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary">{user.following}</div>
                      <div className="text-sm text-muted-foreground">Following</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Popular Repositories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-6">Popular Repositories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {repos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-xl transition-all duration-300 h-full">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
                            {repo.name}
                          </h3>
                          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {repo.description || "No description available"}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {repo.language && (
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 rounded-full bg-primary"></div>
                              <span>{repo.language}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            <span>{repo.stargazers_count}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork className="w-4 h-4" />
                            <span>{repo.forks_count}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Blog Posts */}
              {(articles.length > 0 || mediumArticles.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Recent Blog Posts</h2>
                  
                  {/* Medium Articles */}
                  {mediumArticles.length > 0 && (
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold">From Medium</h3>
                      </div>
                      <div className="space-y-4">
                        {mediumArticles.map((article, index) => (
                          <a
                            key={`medium-${index}`}
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                          >
                            <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                              <div className="flex gap-4">
                                {article.cover_image && (
                                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image
                                      src={article.cover_image}
                                      alt={article.title}
                                      width={96}
                                      height={96}
                                      className="object-cover w-full h-full"
                                    />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                                    {article.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                    {article.description}
                                  </p>
                                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    <span>
                                      {new Date(article.published_at).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })}
                                    </span>
                                    <span>•</span>
                                    <span>{article.reading_time_minutes} min read</span>
                                    {article.categories.length > 0 && (
                                      <>
                                        <span>•</span>
                                        <div className="flex gap-2">
                                          {article.categories.slice(0, 2).map((category, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">
                                              {category}
                                            </Badge>
                                          ))}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dev.to Articles */}
                  {articles.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold">From Dev.to</h3>
                      </div>
                      <div className="space-y-4">
                        {articles.map((article) => (
                          <a
                            key={article.id}
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                          >
                            <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                              <div className="flex gap-4">
                                {article.cover_image && (
                                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image
                                      src={article.cover_image}
                                      alt={article.title}
                                      width={96}
                                      height={96}
                                      className="object-cover w-full h-full"
                                    />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                                    {article.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                    {article.description}
                                  </p>
                                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    <span>
                                      {new Date(article.published_at).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })}
                                    </span>
                                    <span>•</span>
                                    <span>{article.reading_time_minutes} min read</span>
                                    {article.tag_list.length > 0 && (
                                      <>
                                        <span>•</span>
                                        <div className="flex gap-2">
                                          {article.tag_list.slice(0, 2).map((tag) => (
                                            <Badge key={tag} variant="outline" className="text-xs">
                                              #{tag}
                                            </Badge>
                                          ))}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Experience */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-6">Experience</h2>
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="space-y-6">
                    {experiences.map((exp, index) => (
                      <div key={index} className="relative pl-6 border-l-2 border-primary/20">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                        <h3 className="font-semibold text-lg">{exp.title}</h3>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Education */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6">Education</h2>
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="space-y-6">
                    {education.map((edu, index) => (
                      <div key={index}>
                        <h3 className="font-semibold text-lg">{edu.degree}</h3>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                        <p className="text-xs text-muted-foreground mt-1">{edu.period}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
