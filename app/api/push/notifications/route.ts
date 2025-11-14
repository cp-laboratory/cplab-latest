import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// Disable caching for this route
export const dynamic = 'force-dynamic'
export const revalidate = 0

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
      depth: 2, // Populate image and icon relationships
    })

    console.log('Found notifications:', notifications.docs.length)

    // Helper to get absolute URLs
    const getAbsoluteUrl = (url?: string) => {
      if (!url) return undefined
      if (url.startsWith('http')) return url
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
      return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`
    }

    const formattedNotifications = notifications.docs.map((notif: any) => {
      console.log('Processing notification:', notif.id, 'Image:', notif.image)
      
      return {
        id: notif.id,
        title: notif.title,
        body: notif.body,
        image: typeof notif.image === 'object' && notif.image?.url 
          ? notif.image.url // Use direct URL from R2
          : undefined,
        icon: typeof notif.icon === 'object' && notif.icon?.url 
          ? notif.icon.url // Use direct URL from R2
          : '/cpl-logo.png',
        link: notif.link,
        sentAt: notif.sentAt,
      }
    })

    console.log('Returning notifications:', formattedNotifications.length)

    return NextResponse.json(
      { notifications: formattedNotifications },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}
