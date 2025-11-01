import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    if (!AUDIENCE_ID) {
      console.error('RESEND_AUDIENCE_ID is not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Add contact to Resend Audience
    const response = await fetch(
      `https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          unsubscribed: false,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      // Handle specific Resend errors
      if (response.status === 422 && data.message?.includes('already exists')) {
        return NextResponse.json(
          { message: 'You are already subscribed to our newsletter!' },
          { status: 200 }
        )
      }

      console.error('Resend API error:', data)
      return NextResponse.json(
        { error: data.message || 'Failed to subscribe' },
        { status: response.status }
      )
    }

    return NextResponse.json(
      {
        message: 'Successfully subscribed to newsletter!',
        contactId: data.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
