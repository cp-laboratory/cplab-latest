import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Fetch all public profiles
    const profiles = await payload.find({
      collection: 'profiles',
      where: {
        showPublic: {
          equals: true,
        },
      },
      depth: 2,
      limit: 100,
      sort: 'displayOrder',
    })

    // Separate by member type
    const professors = profiles.docs.filter((p: any) => p.personalInfo?.memberType === 'professor')
    const students = profiles.docs.filter((p: any) => p.personalInfo?.memberType === 'student')
    const alumni = profiles.docs.filter((p: any) => p.personalInfo?.memberType === 'alumni')
    const scholars = profiles.docs.filter((p: any) => p.personalInfo?.memberType === 'scholar')

    return NextResponse.json(
      {
        members: {
          professors,
          students,
          alumni,
          scholars,
        },
        total: profiles.docs.length,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching team members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}
