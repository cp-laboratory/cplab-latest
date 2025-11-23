import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// Enable ISR with 1 hour revalidation
export const revalidate = 3600

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config })
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    
    // If slug is provided, fetch single publication
    if (slug) {
      const publications = await payload.find({
        collection: 'publications',
        where: {
          slug: {
            equals: slug,
          },
        },
        depth: 2,
        limit: 1,
      })

      return NextResponse.json(
        { publications: publications.docs },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
          },
        }
      )
    }
    
    // Otherwise, fetch all publications
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
