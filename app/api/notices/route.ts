import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    // Fetch only published notices, sorted by date (latest first) and order
    const notices = await payload.find({
      collection: 'notices',
      where: {
        isPublished: {
          equals: true,
        },
      },
      sort: '-date', // Sort by date descending (latest first)
      limit: 100,
    })

    // Transform the data to match the frontend interface
    const transformedNotices = notices.docs.map((notice: any) => ({
      id: notice.id,
      title: notice.title,
      description: notice.description,
      link: notice.link || undefined,
      pdfUrl: typeof notice.pdfFile === 'object' && notice.pdfFile?.url 
        ? notice.pdfFile.url 
        : undefined,
      date: notice.date,
    }))

    return NextResponse.json(transformedNotices, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    })
  } catch (error) {
    console.error('Error fetching notices:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notices', notices: [] },
      { status: 500 }
    )
  }
}
