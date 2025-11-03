import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Cache for 1 hour

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username') || 'hasanshahriar32'

  try {
    // Fetch Medium RSS feed
    const rssUrl = `https://medium.com/feed/@${username}`
    
    // Use RSS2JSON API to convert RSS to JSON
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch Medium articles')
    }

    const data = await response.json()

    if (data.status !== 'ok') {
      throw new Error(data.message || 'Failed to fetch Medium articles')
    }

    // Transform the data to a cleaner format
    const articles = data.items.slice(0, 6).map((item: any) => ({
      title: item.title,
      description: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...' || '',
      url: item.link,
      published_at: item.pubDate,
      cover_image: extractImageFromContent(item.content) || item.thumbnail,
      categories: item.categories || [],
      reading_time_minutes: calculateReadingTime(item.content),
    }))

    return NextResponse.json(articles, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    })
  } catch (error: any) {
    console.error('Error fetching Medium articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Medium articles', articles: [] },
      { status: 500 }
    )
  }
}

// Helper function to extract first image from content
function extractImageFromContent(content: string): string | null {
  const imgRegex = /<img[^>]+src="([^">]+)"/
  const match = content.match(imgRegex)
  return match ? match[1] : null
}

// Helper function to calculate approximate reading time
function calculateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '')
  const wordCount = text.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200) // Average reading speed: 200 words/min
  return readingTime
}
