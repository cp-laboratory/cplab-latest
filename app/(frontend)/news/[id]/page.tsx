import { Suspense } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getPayload } from 'payload'
import config from '@payload-config'
import { NewsDetailArticle } from "../components/news-detail-content"

// Enable ISR with 1 hour revalidation
export const revalidate = 3600

interface NewsDetail {
  id: string
  title: string
  excerpt: string
  content: any // Lexical JSON
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

async function getNewsDetail(slug: string): Promise<NewsDetail | null> {
  try {
    const payload = await getPayload({ config })
    
    const result = await payload.find({
      collection: 'news',
      where: {
        slug: {
          equals: slug,
        },
        status: {
          equals: 'published',
        },
      },
      limit: 1,
    })

    if (!result.docs[0]) return null

    const doc = result.docs[0] as any
    return {
      id: doc.id,
      title: doc.title,
      excerpt: doc.excerpt,
      content: doc.content,
      publishedDate: doc.publishedDate,
      author: doc.author || { id: '', email: '', name: 'Unknown' },
      featuredImage: doc.featuredImage,
      slug: doc.slug,
    }
  } catch (error) {
    console.error('Error fetching news detail:', error)
    return null
  }
}

async function NewsDetailContent({ slug }: { slug: string }): Promise<JSX.Element> {
  const article = await getNewsDetail(slug)

  if (!article) {
    return (
      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link href="/news" className="text-primary hover:underline">
            ← Back to News
          </Link>
        </div>
      </div>
    )
  }

  return <NewsDetailArticle article={article} />
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'news',
      where: {
        status: {
          equals: 'published',
        },
      },
      limit: 1000,
    })

    return result.docs.map((doc: any) => ({
      id: doc.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params

  return (
    <div className="min-h-screen w-full relative bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #000000",
        }}
      />

      <Navbar />

      <Suspense fallback={<div className="relative z-10 text-center py-12 text-muted-foreground">Loading article...</div>}>
        {/* @ts-ignore - Async component */}
        <NewsDetailContent slug={resolvedParams.id} />
      </Suspense>

      <Footer />
    </div>
  )
}
