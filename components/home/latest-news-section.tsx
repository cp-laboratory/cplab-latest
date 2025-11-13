"use client"

import { useRef } from "react"
import { Carousel, Card } from "@/components/ui/apple-cards-carousel"
import { motion, useInView } from "framer-motion"
import { NewsDetailArticle } from "@/app/(frontend)/news/components/news-detail-content"

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: any
  publishedDate: string
  author: {
    id: string
    email: string
    name: string
  }
  featuredImage?: {
    id: string
    url: string
    alt: string
  }
  slug: string
}

export function LatestNewsSection({ articles }: { articles: NewsArticle[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const cards = articles.map((article, index) => {
    const cardData = {
      category: new Date(article.publishedDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      title: article.title,
      src: article.featuredImage?.url || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=3540&auto=format&fit=crop",
      content: <NewsDetailArticle article={article} hideBackLink={true} hideTitle={true} hideMetadata={true} />,
    }
    
    return <Card key={article.id} card={cardData} index={index} layout={true} />
  })

  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-primary absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none"></div>
        <div className="via-primary/50 absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all ease-in-out"></div>
        
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <div className="text-center mb-8 px-4">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              Latest News & Updates
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with our recent achievements, research breakthroughs, and laboratory activities
            </p>
          </div>
          <Carousel items={cards} />
        </motion.div>
      </div>
    </section>
  )
}
