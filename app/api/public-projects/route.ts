import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// Enable ISR with 1 hour revalidation
export const revalidate = 3600

export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    const projects = await payload.find({
      collection: 'projects',
      depth: 1,
      limit: 100,
    })

    return NextResponse.json(projects, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects', docs: [] },
      { status: 500 }
    )
  }
}
