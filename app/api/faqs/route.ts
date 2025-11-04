import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// Enable ISR with 1 hour revalidation
export const revalidate = 3600

export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    // Fetch only published FAQs, sorted by order
    const faqs = await payload.find({
      collection: 'faq',
      where: {
        isPublished: {
          equals: true,
        },
      },
      sort: 'order',
      limit: 100,
    })

    return NextResponse.json(faqs.docs, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    })
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch FAQs', docs: [] },
      { status: 500 }
    )
  }
}
