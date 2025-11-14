import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    // Get all sent notifications for public view
    const notifications = await payload.find({
      collection: 'push-notifications',
      where: {
        status: {
          equals: 'sent',
        },
      },
      sort: '-sentAt',
      limit: 50,
    })

    const formattedNotifications = notifications.docs.map((notif: any) => ({
      id: notif.id,
      title: notif.title,
      body: notif.body,
      image: typeof notif.image === 'object' && notif.image?.url ? notif.image.url : undefined,
      icon: typeof notif.icon === 'object' && notif.icon?.url ? notif.icon.url : '/icon-192x192.png',
      link: notif.link,
      sentAt: notif.sentAt,
    }))

    return NextResponse.json({ notifications: formattedNotifications })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}
