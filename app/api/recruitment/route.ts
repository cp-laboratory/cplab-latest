import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()

    const result = await payload.create({
      collection: 'recruitment',
      data: body,
      overrideAccess: true,
    })

    return NextResponse.json({ success: true, id: result.id })
  } catch (error) {
    console.error('Recruitment submission error:', error)
    return NextResponse.json({ error: 'Failed to submit application.' }, { status: 500 })
  }
}
