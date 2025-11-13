"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface NewsArticle {
  id: string
  title: string
  excerpt: string
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

export function NewsCard({ article, index }: { article: NewsArticle; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/news/${article.slug}`}>
        <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer h-full flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative z-10 flex flex-col h-full">
            <div className="overflow-hidden rounded-t-lg bg-muted">
              {article.featuredImage ? (
                <Image
                  src={article.featuredImage.url}
                  alt={article.featuredImage.alt || article.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
              {article.publishedDate && (
                <div className="mb-3">
                  <span className="text-xs text-muted-foreground">
                    {new Date(article.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}

              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {article.title || 'Untitled'}
              </h3>
              {article.excerpt && (
                <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">{article.excerpt}</p>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                {article.author?.name && (
                  <span className="text-xs text-muted-foreground truncate">{article.author.name}</span>
                )}
                <span className="text-primary text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                  Read →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
