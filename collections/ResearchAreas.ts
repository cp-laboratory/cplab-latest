import { CollectionConfig } from 'payload'

export const ResearchAreas: CollectionConfig = {
  slug: 'research-areas',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'order'],
    group: 'Administrative',
    description: 'Manage the Research Areas displayed on the homepage',
    // Hide from students - only professors can access
    hidden: ({ user }) => {
      if (!user) return true
      return user.role !== 'professor'
    },
  },
  access: {
    // Only professors can read
    read: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
    // Only professors can create
    create: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
    // Only professors can update
    update: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'professor'
    },
    // Only professors can delete
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
        description: 'The title of the research area',
        placeholder: 'Machine Learning',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief description of this research area',
        placeholder: 'Developing intelligent systems and algorithms for pattern recognition and prediction.',
      },
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
      admin: {
        description: 'Emoji icon for this research area (e.g., 🤖, 💻, ⛓️)',
        placeholder: '🤖',
      },
      validate: (value: any) => {
        // Optional: Validate that it's an emoji
        if (value && value.length > 4) {
          return 'Please use a single emoji character'
        }
        return true
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      required: true,
      admin: {
        description: 'Display order (lower numbers appear first)',
        position: 'sidebar',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Only active research areas will be shown on the homepage',
        position: 'sidebar',
      },
    },
  ],
}
