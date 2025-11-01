import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getServerSideURL } from '@/lib/utilities/getURL'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  
  // Get the base URL
  const url = getServerSideURL()
  
  try {
    // Fetch all news articles
    const news = await payload.find({
      collection: 'news',
      limit: 0,
      where: {
        status: {
          equals: 'published',
        },
      },
    })
    
    // Fetch all publications
    const publications = await payload.find({
      collection: 'publications',
      limit: 0,
      where: {},
    })
    
    // Static pages
    const staticPages = [
      {
        url: `${url}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
      },
      {
        url: `${url}/team`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${url}/publications`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      },
      {
        url: `${url}/news`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: `${url}/contact`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.7,
      },
    ]
    
    // Dynamic news pages
    const newsPages = news.docs.map((item: any) => ({
      url: `${url}/news/${item.slug}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
    
    // Dynamic publication pages
    const publicationPages = publications.docs.map((item: any) => ({
      url: `${url}/publications/${item.slug}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    }))
    
    return [...staticPages, ...newsPages, ...publicationPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return at least the static pages if there's an error
    return [
      {
        url: `${url}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
      },
    ]
  }
}
