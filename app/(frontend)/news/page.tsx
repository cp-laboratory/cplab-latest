import { Suspense } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getPayload } from 'payload'
import config from '@payload-config'
import NewsHeader from "./components/news-header"
import { NewsCard } from "./components/news-card"

// Enable ISR with 1 hour revalidation
export const revalidate = 3600

const ITEMS_PER_PAGE = 6

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

async function getNews(page: number = 1): Promise<{
  articles: NewsArticle[]
  totalPages: number
  currentPage: number
  totalDocs: number
}> {
  try {
    const payload = await getPayload({ config })
    
    const skip = (page - 1) * ITEMS_PER_PAGE

    const result = await payload.find({
      collection: 'news',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedDate',
      limit: ITEMS_PER_PAGE,
      offset: skip,
    } as any)

    return {
      articles: result.docs.map((doc: any) => ({
        id: doc.id,
        title: doc.title,
        excerpt: doc.excerpt,
        publishedDate: doc.publishedDate,
        author: doc.author || { id: '', email: '', name: 'Unknown' },
        featuredImage: doc.featuredImage,
        slug: doc.slug,
      })),
      totalPages: Math.ceil(result.totalDocs / ITEMS_PER_PAGE),
      currentPage: page,
      totalDocs: result.totalDocs,
    }
  } catch (error) {
    console.error('Error fetching news:', error)
    return {
      articles: [],
      totalPages: 0,
      currentPage: 1,
      totalDocs: 0,
    }
  }
}

async function NewsGrid({ page }: { page: number }): Promise<JSX.Element> {
  const { articles, totalPages, currentPage } = await getNews(page)

  if (articles.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-muted-foreground">No news articles found.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <NewsCard key={article.id} article={article} index={index} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          {page > 1 && (
            <Link href={`/news?page=${page - 1}`}>
              <button className="px-4 py-2 rounded-lg border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all">
                ← Previous
              </button>
            </Link>
          )}
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link key={p} href={`/news?page=${p}`}>
                <button
                  className={`px-3 py-2 rounded-lg transition-all ${
                    p === currentPage
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                  }`}
                >
                  {p}
                </button>
              </Link>
            ))}
          </div>

          {page < totalPages && (
            <Link href={`/news?page=${page + 1}`}>
              <button className="px-4 py-2 rounded-lg border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all">
                Next →
              </button>
            </Link>
          )}
        </div>
      )}
    </>
  )
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const page = parseInt(params.page || '1', 10)

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
          <NewsHeader />

          {/* News Grid */}
          <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Loading news...</div>}>
            {/* @ts-ignore - Async component */}
            <NewsGrid page={page} />
          </Suspense>
        </div>
      </div>

      <Footer />
    </div>
  )
}
