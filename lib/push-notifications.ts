import webpush from 'web-push'
import { getPayload } from 'payload'
import config from '@payload-config'

// VAPID keys - Generate these once and store in environment variables
// Run: npx web-push generate-vapid-keys
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || ''
const VAPID_EMAIL = process.env.VAPID_EMAIL || 'mailto:admin@cplab.com'

// Configure web-push
if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    VAPID_EMAIL,
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
  )
}

interface PushNotificationPayload {
  title: string
  body: string
  image?: string
  icon?: string
  link?: string
  badge?: string
  tag?: string
  requireInteraction?: boolean
}

export async function sendPushNotification(payload: PushNotificationPayload) {
  try {
    const payloadCMS = await getPayload({ config })

    // Get all active subscriptions
    const subscriptions = await payloadCMS.find({
      collection: 'push-subscriptions',
      where: {
        isActive: {
          equals: true,
        },
      },
      limit: 10000, // Adjust based on your needs
    })

    if (!subscriptions.docs.length) {
      console.log('No active subscriptions found')
      return { success: 0, failed: 0 }
    }

    const notificationPayload = JSON.stringify({
      title: payload.title,
      body: payload.body,
      icon: payload.icon || '/icon-192x192.png',
      badge: payload.badge || '/icon-192x192.png',
      image: payload.image,
      data: {
        url: payload.link || '/',
        dateOfArrival: Date.now(),
      },
      tag: payload.tag || 'default',
      requireInteraction: payload.requireInteraction || false,
    })

    let successCount = 0
    let failedCount = 0

    // Send to all subscriptions
    const sendPromises = subscriptions.docs.map(async (sub: any) => {
      try {
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.keys.p256dh,
            auth: sub.keys.auth,
          },
        }

        await webpush.sendNotification(pushSubscription, notificationPayload)
        successCount++
      } catch (error: any) {
        console.error('Failed to send to subscription:', error)
        failedCount++

        // If subscription is no longer valid (410 Gone), mark as inactive
        if (error.statusCode === 410) {
          await payloadCMS.update({
            collection: 'push-subscriptions',
            id: sub.id,
            data: {
              isActive: false,
            },
          })
        }
      }
    })

    await Promise.all(sendPromises)

    console.log(`Push notifications sent: ${successCount} successful, ${failedCount} failed`)
    
    return { success: successCount, failed: failedCount }
  } catch (error) {
    console.error('Error sending push notifications:', error)
    throw error
  }
}

export async function saveSubscription(
  subscription: any,
  userId?: string,
  userAgent?: string
) {
  try {
    const payload = await getPayload({ config })

    // subscription is already in JSON format from the client
    const subscriptionData = subscription

    // Check if subscription already exists
    const existing = await payload.find({
      collection: 'push-subscriptions',
      where: {
        endpoint: {
          equals: subscriptionData.endpoint,
        },
      },
    })

    if (existing.docs.length > 0) {
      // Update existing subscription
      await payload.update({
        collection: 'push-subscriptions',
        id: existing.docs[0].id,
        data: {
          keys: {
            p256dh: subscriptionData.keys?.p256dh || '',
            auth: subscriptionData.keys?.auth || '',
          },
          userId,
          isActive: true,
          userAgent: userAgent || 'Unknown',
        },
      })
    } else {
      // Create new subscription
      await payload.create({
        collection: 'push-subscriptions',
        data: {
          endpoint: subscriptionData.endpoint || '',
          keys: {
            p256dh: subscriptionData.keys?.p256dh || '',
            auth: subscriptionData.keys?.auth || '',
          },
          userId,
          isActive: true,
          userAgent: userAgent || 'Unknown',
        },
      })
    }

    return { success: true }
  } catch (error) {
    console.error('Error saving subscription:', error)
    throw error
  }
}
