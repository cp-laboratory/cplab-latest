import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    // Fetch only active research areas, sorted by order
    const areas = await payload.find({
      collection: 'research-areas',
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: 'order',
      limit: 100,
    })

    // Transform the data to match the frontend interface
    const transformedAreas = areas.docs.map((area: any) => ({
      title: area.title,
      description: area.description,
      icon: area.icon,
    }))

    return NextResponse.json(transformedAreas, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    })
  } catch (error) {
    console.error('Error fetching research areas:', error)
    return NextResponse.json(
      { error: 'Failed to fetch research areas', areas: [] },
      { status: 500 }
    )
  }
}
