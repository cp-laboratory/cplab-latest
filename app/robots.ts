import type { MetadataRoute } from 'next'
import { getServerSideURL } from '@/lib/utilities/getURL'

export default function robots(): MetadataRoute.Robots {
  const url = getServerSideURL()
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${url}/sitemap.xml`,
  }
}
