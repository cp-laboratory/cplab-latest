import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    // Fetch only active lab highlights, sorted by order
    const highlights = await payload.find({
      collection: 'lab-highlights',
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: 'order',
      limit: 100,
    })

    // Transform the data to match the frontend interface
    const transformedHighlights = highlights.docs.map((highlight: any) => ({
      number: highlight.number,
      label: highlight.label,
      description: highlight.description,
    }))

    return NextResponse.json(transformedHighlights, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    })
  } catch (error) {
    console.error('Error fetching lab highlights:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lab highlights', highlights: [] },
      { status: 500 }
    )
  }
}
