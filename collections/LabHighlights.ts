import { CollectionConfig } from 'payload'

export const LabHighlights: CollectionConfig = {
  slug: 'lab-highlights',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['number', 'label', 'order'],
    group: 'Administrative',
    description: 'Manage the Lab Highlights statistics shown on the homepage',
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
      name: 'number',
      type: 'text',
      required: true,
      admin: {
        description: 'The number/statistic to display (e.g., "50+", "100+", "15+")',
        placeholder: '50+',
      },
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'The main label for this highlight (e.g., "Research Papers")',
        placeholder: 'Research Papers',
      },
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      admin: {
        description: 'Short description of this highlight',
        placeholder: 'Published in top-tier conferences and journals',
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
        description: 'Only active highlights will be shown on the homepage',
        position: 'sidebar',
      },
    },
  ],
}
