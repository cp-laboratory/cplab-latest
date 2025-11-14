import { CollectionConfig } from 'payload'

export const Notifications: CollectionConfig = {
  slug: 'notifications',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'sentAt', 'createdAt'],
    // Only professors can see this collection
    hidden: ({ user }) => {
      if (!user) return true
      return user.role !== 'professor'
    },
  },
  access: {
    // Only professors can manage notifications
    read: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
    create: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Notification title',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Notification message body',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Small image for notification (optional)',
      },
      filterOptions: {
        mimeType: {
          contains: 'image',
        },
      },
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: 'URL to redirect when notification is clicked',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Icon for notification (optional, will use default app icon if not set)',
      },
      filterOptions: {
        mimeType: {
          contains: 'image',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Scheduled',
          value: 'scheduled',
        },
        {
          label: 'Sent',
          value: 'sent',
        },
        {
          label: 'Failed',
          value: 'failed',
        },
      ],
      admin: {
        description: 'Notification status',
      },
    },
    {
      name: 'scheduledFor',
      type: 'date',
      admin: {
        description: 'Schedule notification for later (optional)',
        condition: (data) => data.status === 'scheduled',
      },
    },
    {
      name: 'sentAt',
      type: 'date',
      admin: {
        description: 'When the notification was sent',
        readOnly: true,
      },
    },
    {
      name: 'sentTo',
      type: 'number',
      admin: {
        description: 'Number of users who received this notification',
        readOnly: true,
      },
    },
    {
      name: 'failedCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Number of failed deliveries',
        readOnly: true,
      },
    },
    {
      name: 'sendImmediately',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Send this notification immediately upon save',
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        // Only send on create or update when sendImmediately is checked
        if (doc.sendImmediately && (operation === 'create' || operation === 'update')) {
          // Import the send notification function
          const { sendPushNotification } = await import('@/lib/push-notifications')
          
          try {
            const result = await sendPushNotification({
              title: doc.title,
              body: doc.body,
              image: typeof doc.image === 'object' && doc.image?.url ? doc.image.url : undefined,
              icon: typeof doc.icon === 'object' && doc.icon?.url ? doc.icon.url : '/icon-192x192.png',
              link: doc.link,
            })

            // Update the document to mark as sent
            await req.payload.update({
              collection: 'notifications',
              id: doc.id,
              data: {
                status: 'sent',
                sentAt: new Date().toISOString(),
                sentTo: result.success,
                failedCount: result.failed,
                sendImmediately: false,
              },
            })
          } catch (error) {
            console.error('Failed to send notification:', error)
            await req.payload.update({
              collection: 'notifications',
              id: doc.id,
              data: {
                status: 'failed',
                sendImmediately: false,
              },
            })
          }
        }
      },
    ],
  },
}
