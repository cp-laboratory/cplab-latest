import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// GET - Fetch notifications
export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

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

    return NextResponse.json({
      docs: notifications.docs,
      totalDocs: notifications.totalDocs,
      limit: notifications.limit,
      totalPages: notifications.totalPages,
      page: notifications.page,
      pagingCounter: notifications.pagingCounter,
      hasPrevPage: notifications.hasPrevPage,
      hasNextPage: notifications.hasNextPage,
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

// POST - Create notification
export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()

    const notification = await payload.create({
      collection: 'push-notifications',
      data: body,
    })

    return NextResponse.json(notification)
  } catch (error) {
    console.error('Error creating notification:', error)
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    )
  }
}

// PATCH - Update notification
export async function PATCH(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Notification ID is required' },
        { status: 400 }
      )
    }

    const notification = await payload.update({
      collection: 'push-notifications',
      id,
      data: body,
    })

    return NextResponse.json(notification)
  } catch (error) {
    console.error('Error updating notification:', error)
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    )
  }
}

// DELETE - Delete notification
export async function DELETE(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Notification ID is required' },
        { status: 400 }
      )
    }

    await payload.delete({
      collection: 'push-notifications',
      id,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting notification:', error)
    return NextResponse.json(
      { error: 'Failed to delete notification' },
      { status: 500 }
    )
  }
}
