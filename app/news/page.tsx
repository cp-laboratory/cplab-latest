"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const newsArticles = [
  {
    id: 1,
    title: "Lab Receives Major Grant for IoT Security Research",
    excerpt:
      "The Cyber Physical Laboratory has been awarded a $2M grant to advance research in IoT security and distributed systems.",
    date: "2024-01-15",
    author: "Dr. Sarah Johnson",
    category: "Funding",
    image: "/research-lab.jpg",
  },
  {
    id: 2,
    title: "New Publication on Federated Learning Accepted at Top Conference",
    excerpt:
      "Our latest research on federated learning in heterogeneous networks has been accepted for presentation at IEEE IoT Conference 2024.",
    date: "2024-01-10",
    author: "Alex Kumar",
    category: "Publication",
    image: "/business-conference.png",
  },
  {
    id: 3,
    title: "Team Member Wins Best Paper Award",
    excerpt:
      "Emily Rodriguez received the Best Paper Award at the IEEE Cybersecurity Conference for her work on blockchain-based security frameworks.",
    date: "2024-01-05",
    author: "Lab News",
    category: "Achievement",
    image: "/golden-trophy-on-pedestal.png",
  },
  {
    id: 4,
    title: "Collaboration with Industry Partners Announced",
    excerpt:
      "The lab has established new partnerships with leading tech companies to accelerate research in edge computing and AI.",
    date: "2023-12-28",
    author: "Prof. Michael Chen",
    category: "Partnership",
    image: "/partnership-hands.png",
  },
  {
    id: 5,
    title: "New Research Initiative on Cyber-Physical System Security",
    excerpt:
      "We are launching a new research initiative focused on securing critical infrastructure through advanced cyber-physical system architectures.",
    date: "2023-12-20",
    author: "Dr. Sarah Johnson",
    category: "Research",
    image: "/digital-security-abstract.png",
  },
  {
    id: 6,
    title: "Lab Hosts International Workshop on IoT",
    excerpt:
      "The laboratory successfully hosted an international workshop bringing together researchers from around the world to discuss IoT innovations.",
    date: "2023-12-15",
    author: "Lab News",
    category: "Event",
    image: "/workshop.png",
  },
]

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = ["All", "Funding", "Publication", "Achievement", "Partnership", "Research", "Event"]

  const filteredNews =
    selectedCategory && selectedCategory !== "All"
      ? newsArticles.filter((article) => article.category === selectedCategory)
      : newsArticles

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
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">Lab News & Updates</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest news, achievements, and announcements from our laboratory.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === "All" ? null : category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  (category === "All" && !selectedCategory) || selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredNews.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/news/${article.id}`}>
                  <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer h-full flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="overflow-hidden rounded-t-lg">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                            {article.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(article.date).toLocaleDateString()}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 flex-grow">{article.excerpt}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <span className="text-xs text-muted-foreground">{article.author}</span>
                          <span className="text-primary text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                            Read →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
