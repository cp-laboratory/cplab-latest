import { NextRequest, NextResponse } from 'next/server'
import { saveSubscription } from '@/lib/push-notifications'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { subscription, userId } = body

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription data is required' },
        { status: 400 }
      )
    }

    // Get user agent from request headers
    const userAgent = request.headers.get('user-agent') || 'Unknown'

    await saveSubscription(subscription, userId, userAgent)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error subscribing to push notifications:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to push notifications' },
      { status: 500 }
    )
  }
}
