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

    // Helper to get absolute URLs
    const getAbsoluteUrl = (url?: string) => {
      if (!url) return undefined
      if (url.startsWith('http')) return url
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
      return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`
    }

    const formattedNotifications = notifications.docs.map((notif: any) => ({
      id: notif.id,
      title: notif.title,
      body: notif.body,
      image: typeof notif.image === 'object' && notif.image?.url 
        ? getAbsoluteUrl(notif.image.url) 
        : undefined,
      icon: typeof notif.icon === 'object' && notif.icon?.url 
        ? getAbsoluteUrl(notif.icon.url) 
        : getAbsoluteUrl('/icon-192x192.png'),
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
