import { CollectionConfig } from 'payload'

export const PushSubscriptions: CollectionConfig = {
  slug: 'push-subscriptions',
  admin: {
    useAsTitle: 'endpoint',
    defaultColumns: ['endpoint', 'userId', 'createdAt'],
    hidden: ({ user }) => {
      if (!user) return true
      // Only professors can see this collection
      return user.role !== 'professor'
    },
  },
  access: {
    // Only system can read/create subscriptions
    read: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
    create: () => true, // Allow public creation when user subscribes
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
      name: 'endpoint',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Push notification endpoint URL',
      },
    },
    {
      name: 'keys',
      type: 'group',
      fields: [
        {
          name: 'p256dh',
          type: 'text',
          required: true,
        },
        {
          name: 'auth',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'userId',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'User who subscribed (optional for anonymous users)',
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      admin: {
        description: 'Browser/device information',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this subscription is active',
      },
    },
  ],
}
