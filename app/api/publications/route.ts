import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// Enable ISR with 1 hour revalidation
export const revalidate = 3600

export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    const publications = await payload.find({
      collection: 'publications',
      depth: 2,
      limit: 100,
    })

    return NextResponse.json(publications, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    })
  } catch (error) {
    console.error('Error fetching publications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch publications', docs: [] },
      { status: 500 }
    )
  }
}
