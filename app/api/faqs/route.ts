import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

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
      // No depth needed as FAQ has no relationships
    })

    return NextResponse.json(faqs)
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    )
  }
}
