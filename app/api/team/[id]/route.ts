import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const payload = await getPayload({ config })

    // Find profile by slug or ID
    const profiles = await payload.find({
      collection: 'profiles',
      where: {
        or: [
          {
            slug: {
              equals: id,
            },
          },
          {
            id: {
              equals: id,
            },
          },
        ],
        showPublic: {
          equals: true,
        },
      },
      depth: 3,
      limit: 1,
    })

    if (profiles.docs.length === 0) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    const profile = profiles.docs[0]

    // Increment profile views
    await payload.update({
      collection: 'profiles',
      id: profile.id,
      data: {
        profileViews: (profile.profileViews || 0) + 1,
      },
    })

    return NextResponse.json(
      { profile },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}
